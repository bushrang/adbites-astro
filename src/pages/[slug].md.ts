import type { APIRoute } from "astro";
import { sanityClient } from "../lib/sanity";
import { ptToMd } from "../lib/ptToMd";

const BASE_URL = "https://www.adbites.de";

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params;

    const s = await sanityClient.fetch(
        `*[_type == "service" && slug.current == $slug][0] {
            title,
            "slug": slug.current,
            llmsDescription,
            seo,
            category,
            focus,
            hero { headline, subline },
            content,
            kpis,
            priceRange,
            faqs[]{ question, answer },
            "managedBy": managedBy->{ name, role, knowsAbout }
        }`,
        { slug }
    );

    if (!s) return new Response("Not found", { status: 404 });

    const L: string[] = [];

    L.push(`# ${s.title ?? slug}`);
    L.push("");
    const aiDesc = s.llmsDescription?.trim() || s.seo?.metaDescription?.trim();
    if (aiDesc) {
        L.push(`> ${aiDesc}`);
        L.push("");
    }

    // Meta tags
    const meta: string[] = [];
    if (s.category) meta.push(`**Kategorie:** ${s.category}`);
    if (s.focus) meta.push(`**Fokus:** ${s.focus}`);
    if (s.priceRange) meta.push(`**Preisniveau:** ${s.priceRange}`);
    if (meta.length) { L.push(meta.join("  \n")); L.push(""); }

    // Hero
    if (s.hero?.headline && s.hero.headline !== s.title) {
        L.push(`## ${s.hero.headline}`);
        L.push("");
    }
    if (s.hero?.subline) { L.push(s.hero.subline); L.push(""); }

    // Body (Portable Text)
    if (s.content?.length) {
        L.push(ptToMd(s.content));
        L.push("");
    }

    // KPIs
    if (s.kpis && Object.keys(s.kpis).length) {
        L.push("## Kennzahlen");
        L.push("");
        for (const [key, val] of Object.entries(s.kpis)) {
            if (val) L.push(`- **${key}:** ${val}`);
        }
        L.push("");
    }

    // Expert
    if (s.managedBy?.name) {
        L.push(`## Verantwortlich: ${s.managedBy.name}`);
        L.push("");
        if (s.managedBy.role) { L.push(`*${s.managedBy.role}*`); L.push(""); }
        if (s.managedBy.knowsAbout?.length) {
            L.push(`Expertise: ${s.managedBy.knowsAbout.join(", ")}`);
            L.push("");
        }
    }

    // FAQ
    if (s.faqs?.length) {
        L.push("## Häufige Fragen");
        L.push("");
        for (const faq of s.faqs) {
            L.push(`### ${faq.question}`);
            L.push("");
            if (faq.answer) { L.push(faq.answer); L.push(""); }
        }
    }

    L.push("---");
    L.push("");
    L.push(`*Quelle: [${BASE_URL}/${slug}](${BASE_URL}/${slug})*`);

    return new Response(L.join("\n"), {
        status: 200,
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
};
