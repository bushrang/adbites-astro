import type { APIRoute } from "astro";
import { sanityClient } from "../../lib/sanity";
import { ptToMd } from "../../lib/ptToMd";

const BASE_URL = "https://www.adbites.de";

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params;

    const post = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug][0] {
            title,
            "slug": slug.current,
            publishedAt,
            excerpt,
            "categories": categories[]->title,
            "author": author->{ name, role },
            body,
            faqs[]{ question, answer },
            sources[]{ title, url },
            seoGroup,
            "llmsDescription": seoGroup.llmsDescription
        }`,
        { slug }
    );

    if (!post) return new Response("Not found", { status: 404 });

    const L: string[] = [];
    const date = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("de-DE", {
              year: "numeric", month: "long", day: "numeric",
          })
        : null;

    L.push(`# ${post.title ?? slug}`);
    L.push("");
    if (post.llmsDescription?.trim() || post.seoGroup?.metaDescription || post.excerpt) {
        L.push(`> ${post.llmsDescription?.trim() ?? post.seoGroup?.metaDescription ?? post.excerpt}`);
        L.push("");
    }

    // Meta
    const meta: string[] = [];
    if (post.author?.name) meta.push(`**Autor:** ${post.author.name}${post.author.role ? ` (${post.author.role})` : ""}`);
    if (date) meta.push(`**Erschienen:** ${date}`);
    if (post.categories?.length) meta.push(`**Kategorien:** ${post.categories.join(", ")}`);
    if (meta.length) { L.push(meta.join("  \n")); L.push(""); }

    L.push("---");
    L.push("");

    // Body
    if (post.body?.length) {
        L.push(ptToMd(post.body));
        L.push("");
    }

    // FAQs
    if (post.faqs?.length) {
        L.push("## Häufige Fragen");
        L.push("");
        for (const faq of post.faqs) {
            L.push(`### ${faq.question}`);
            L.push("");
            if (faq.answer) { L.push(faq.answer); L.push(""); }
        }
    }

    // Sources
    if (post.sources?.length) {
        L.push("## Quellen");
        L.push("");
        for (const src of post.sources) {
            L.push(`- [${src.title}](${src.url})`);
        }
        L.push("");
    }

    L.push("---");
    L.push("");
    L.push(`*Quelle: [${BASE_URL}/magazin/${slug}](${BASE_URL}/magazin/${slug})*`);

    return new Response(L.join("\n"), {
        status: 200,
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
};
