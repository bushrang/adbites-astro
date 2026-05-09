import type { APIRoute } from "astro";
import { sanityClient } from "../lib/sanity";

const BASE_URL = "https://www.adbites.de";

// Priority / changefreq config per route type
const ROUTE_CONFIG: Record<string, { priority: string; changefreq: string }> = {
    static: { priority: "1.0", changefreq: "weekly" },
    product: { priority: "0.9", changefreq: "weekly" },
    service: { priority: "0.8", changefreq: "weekly" },
    post: { priority: "0.7", changefreq: "monthly" },
    city: { priority: "0.6", changefreq: "monthly" },
    legal: { priority: "0.3", changefreq: "yearly" },
};

function formatDate(date?: string): string {
    if (!date) return new Date().toISOString().split("T")[0];
    return new Date(date).toISOString().split("T")[0];
}

function url(
    loc: string,
    type: keyof typeof ROUTE_CONFIG,
    lastmod?: string
): string {
    const cfg = ROUTE_CONFIG[type];
    return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${formatDate(lastmod)}</lastmod>
    <changefreq>${cfg.changefreq}</changefreq>
    <priority>${cfg.priority}</priority>
  </url>`;
}

export const GET: APIRoute = async () => {
    // ── 1. Fetch all dynamic slugs from Sanity ──────────────────────────────
    const [productSlugs, serviceSlugs, postData, locationData] =
        await Promise.all([
            // Products  →  /produkte/[slug]
            sanityClient.fetch<string[]>(
                `*[_type == "product" && defined(slug.current)][].slug.current`
            ),
            // Services  →  /[slug]
            sanityClient.fetch<string[]>(
                `*[_type == "service" && defined(slug.current)][].slug.current`
            ),
            // Magazine posts  →  /magazin/[slug]
            sanityClient.fetch<{ slug: string; publishedAt?: string }[]>(
                `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
                    "slug": slug.current,
                    publishedAt
                }`
            ),
            // City / location pages  →  /[city]
            sanityClient.fetch<{ slug: string }[]>(
                `*[_type == "location" && defined(slug.current)] { "slug": slug.current }`
            ),
        ]);

    // ── 2. Assemble all <url> entries ────────────────────────────────────────
    const entries: string[] = [
        // Static pages
        url("/", "static"),
        url("/magazin", "static"),
        url("/kontakt", "static"),
        url("/produkte/ki-fotoshootings", "product"),

        // Legal pages
        url("/impressum", "legal"),
        url("/datenschutz", "legal"),

        // Products
        ...productSlugs.map((slug) => url(`/produkte/${slug}`, "product")),

        // Services (root-level slugs)
        ...serviceSlugs.map((slug) => url(`/${slug}`, "service")),

        // Magazine articles
        ...postData.map((p) =>
            url(`/magazin/${p.slug}`, "post", p.publishedAt)
        ),

        // City / location pages
        ...locationData.map((l) => url(`/${l.slug}`, "city")),
    ];

    // ── 3. Return XML ────────────────────────────────────────────────────────
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.join("\n")}
</urlset>`;

    return new Response(xml, {
        status: 200,
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            // Cache for 1 hour on CDN, revalidate in background
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
};
