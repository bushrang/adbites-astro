import type { APIRoute } from "astro";
import { sanityClient } from "../../lib/sanity";
import { ptToMd } from "../../lib/ptToMd";

const BASE_URL = "https://www.adbites.de";

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params;

    const p = await sanityClient.fetch(
        `*[_type == "product" && slug.current == $slug][0] {
            title,
            "slug": slug.current,
            llmsDescription,
            seo { metaDescription },
            heroSection { headline, subline },
            introSection { headline, subline },
            featureSections[] { badge, headline, text, buttonText, buttonUrl },
            featureGridSection {
                sectionHeadline, sectionSubline,
                features[]{ icon, headline, description }
            },
            successNumbersSection {
                title,
                metrics[]{ topLabel, value, bottomLabel }
            },
            faqSection { headline, faqs[]{ question, answer } },
            ctaSection { headline, description, buttonText, buttonUrl }
        }`,
        { slug }
    );

    if (!p) return new Response("Not found", { status: 404 });

    const L: string[] = [];

    L.push(`# ${p.title ?? slug}`);
    L.push("");
    // llmsDescription takes priority; fall back to SEO meta
    const aiDesc = p.llmsDescription?.trim() || p.seo?.metaDescription?.trim();
    if (aiDesc) {
        L.push(`> ${aiDesc}`);
        L.push("");
    }

    // Hero
    if (p.heroSection?.headline && p.heroSection.headline !== p.title) {
        L.push(`## ${p.heroSection.headline}`);
        L.push("");
    }
    if (p.heroSection?.subline) {
        L.push(p.heroSection.subline);
        L.push("");
    }

    // Intro
    if (p.introSection?.headline) {
        L.push(`## ${p.introSection.headline}`);
        L.push("");
    }
    if (p.introSection?.subline) {
        L.push(p.introSection.subline);
        L.push("");
    }

    // Feature sections
    if (p.featureSections?.length) {
        for (const f of p.featureSections) {
            if (f.badge) { L.push(`*${f.badge}*`); L.push(""); }
            if (f.headline) { L.push(`## ${f.headline}`); L.push(""); }
            if (f.text) {
                const rendered = Array.isArray(f.text) ? ptToMd(f.text) : String(f.text);
                if (rendered) { L.push(rendered); L.push(""); }
            }
        }
    }

    // Feature grid
    if (p.featureGridSection) {
        const fg = p.featureGridSection;
        if (fg.sectionHeadline) { L.push(`## ${fg.sectionHeadline}`); L.push(""); }
        if (fg.sectionSubline) { L.push(fg.sectionSubline); L.push(""); }
        if (fg.features?.length) {
            for (const f of fg.features) {
                L.push(`### ${[f.icon, f.headline].filter(Boolean).join(" ")}`);
                L.push("");
                if (f.description) { L.push(f.description); L.push(""); }
            }
        }
    }

    // Success numbers
    if (p.successNumbersSection) {
        const sn = p.successNumbersSection;
        if (sn.title) { L.push(`## ${sn.title}`); L.push(""); }
        if (sn.metrics?.length) {
            for (const m of sn.metrics) {
                const parts = [m.topLabel, m.value, m.bottomLabel].filter(Boolean);
                L.push(`- ${parts.join(" · ")}`);
            }
            L.push("");
        }
    }

    // FAQ
    if (p.faqSection?.faqs?.length) {
        L.push(`## ${p.faqSection.headline ?? "FAQ"}`);
        L.push("");
        for (const faq of p.faqSection.faqs) {
            L.push(`### ${faq.question}`);
            L.push("");
            if (faq.answer) { L.push(faq.answer); L.push(""); }
        }
    }

    // CTA
    if (p.ctaSection?.headline) {
        L.push("---");
        L.push("");
        L.push(`## ${p.ctaSection.headline}`);
        L.push("");
        if (p.ctaSection.description) { L.push(p.ctaSection.description); L.push(""); }
        if (p.ctaSection.buttonText && p.ctaSection.buttonUrl) {
            L.push(`[${p.ctaSection.buttonText}](${p.ctaSection.buttonUrl})`);
            L.push("");
        }
    }

    L.push("---");
    L.push("");
    L.push(`*Quelle: [${BASE_URL}/produkte/${slug}](${BASE_URL}/produkte/${slug})*`);

    return new Response(L.join("\n"), {
        status: 200,
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
};
