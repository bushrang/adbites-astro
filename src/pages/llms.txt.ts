import type { APIRoute } from "astro";
import { sanityClient } from "../lib/sanity";

const BASE_URL = "https://www.adbites.de";

// Format a single list entry
function li(label: string, url: string, desc?: string | null): string {
    const clean = desc?.replace(/\n/g, " ").trim();
    return `- [${label}](${url})${clean ? `: ${clean}` : ""}`;
}

// Normalise stored phone numbers to international format with spaces.
// e.g. 00492349020328 → +49 234 9020328
// Assumes 3-digit German area code (Bochum = 234). Adjust slice if needed.
function formatPhone(raw?: string): string | null {
    if (!raw) return null;
    const digits = raw.replace(/\D/g, "");
    if (digits.startsWith("0049")) {
        const national = digits.slice(4);          // e.g. "2349020328"
        const area = national.slice(0, 3);       // "234"
        const local = national.slice(3);          // "9020328"
        return `+49 ${area} ${local}`;
    }
    // Generic fallback: replace 00 prefix with +
    return raw.replace(/^00/, "+");
}

interface OrgData {
    name?: string;
    legalName?: string;
    description?: string;
    foundingDate?: string;
    knowsAbout?: string[];
    areaServed?: string[];
    managedBudget?: string;
    address?: { streetAddress?: string; postalCode?: string; addressLocality?: string; addressCountry?: string };
    contactPoints?: Array<{ contactType?: string; email?: string; telephone?: string }>;
    founders?: Array<{ name?: string; role?: string; sameAs?: string[] }>;
}
interface ProductData { title?: string; slug: string; llmsDescription?: string; seo?: { metaDescription?: string }; introSection?: { subline?: string }; heroSection?: { subline?: string }; }
interface ServiceData { title?: string; slug: string; category?: string; llmsDescription?: string; seo?: { metaDescription?: string }; hero?: { subline?: string }; }
interface PostData { title?: string; slug: string; llmsDescription?: string; excerpt?: string; categories?: string[]; publishedAt?: string; }
interface LocationData { name?: string; slug: string; context?: string; }

export const GET: APIRoute = async () => {
    const [org, products, services, posts, locations] = await Promise.all([
        sanityClient.fetch<OrgData>(`*[_type == "organization"][0] {
            name, legalName, description, foundingDate, knowsAbout, areaServed, managedBudget, address,
            contactPoints[] { contactType, email, telephone },
            "founders": founders[]->{ name, role, sameAs }
        }`),
        sanityClient.fetch<ProductData[]>(`*[_type == "product" && defined(slug.current)] | order(_createdAt asc) {
            title, "slug": slug.current, llmsDescription, seo { metaDescription }, introSection { subline }, heroSection { subline }
        }`),
        sanityClient.fetch<ServiceData[]>(`*[_type == "service" && defined(slug.current)] | order(_createdAt asc) {
            title, "slug": slug.current, category, llmsDescription, seo { metaDescription }, hero { subline }
        }`),
        sanityClient.fetch<PostData[]>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
            title, "slug": slug.current, excerpt, "categories": categories[]->title, publishedAt,
            "llmsDescription": seoGroup.llmsDescription
        }`),
        sanityClient.fetch<LocationData[]>(`*[_type == "location" && defined(slug.current)] | order(name asc) {
            name, "slug": slug.current, context
        }`),
    ]);

    const now = new Date().toISOString().split("T")[0];
    const orgName = org?.name ?? "Adbites";
    const orgDesc = org?.description ?? "Performance-Marketing-Agentur spezialisiert auf stationären Einzelhandel im DACH-Raum.";
    const emailRaw = org?.contactPoints?.find(cp => cp.email)?.email ?? "hello@adbites.de";
    const email = emailRaw.replace(/\[(.*?)\]\(.*?\)/, '$1'); // Removes markdown link syntax if present
    const phone = org?.contactPoints?.find(cp => cp.telephone)?.telephone;
    const founders = org?.founders ?? [];
    const founder = founders[0]; // kept for contact section LinkedIn link
    const addr = org?.address;
    const addressStr = addr
        ? [addr.streetAddress, `${addr.postalCode ?? ""} ${addr.addressLocality ?? ""}`.trim(), addr.addressCountry].filter(Boolean).join(", ")
        : "Bochum, Deutschland";

    const L: string[] = [];

    // ── Header ──────────────────────────────────────────────────────────────
    L.push(`# ${orgName}`);
    L.push("");
    L.push(`> ${orgDesc}`);
    L.push("");
    L.push(`*Generiert: ${now} | Quelle: Sanity CMS*`);
    L.push("");
    L.push("---");
    L.push("");

    // ── About ───────────────────────────────────────────────────────────────
    L.push("## Über Adbites");
    L.push("");
    if (org?.legalName) L.push(`**Rechtsform:** ${org.legalName}  `);
    if (founders.length === 1) {
        L.push(`**Gründer:** ${founders[0].name}${founders[0].role ? ` (${founders[0].role})` : ""}  `);
    } else if (founders.length > 1) {
        L.push(`**Gründer:** ${founders.map(f => `${f.name}${f.role ? ` (${f.role})` : ""}`).join(", ")}  `);
    }
    L.push(`**Hauptsitz:** ${addressStr}  `);
    if (org?.foundingDate) L.push(`**Gegründet:** ${org.foundingDate}  `);
    if (org?.managedBudget) L.push(`**Verwaltetes Werbebudget:** ${org.managedBudget}  `);
    if (org?.areaServed?.length) L.push(`**Märkte:** ${org.areaServed.join(", ")}  `);
    L.push("");
    L.push(orgDesc);
    L.push("");
    L.push("**Methodik:** Alle Kampagnen werden standortbasiert auf den Einzugsradius des jeweiligen Händlers ausgerichtet. Adbites misst ausschließlich Store-Visits, Umsatzveränderungen und attributierbare ROAS-Werte — keine Branding-Metriken.");
    L.push("");

    // ── Core pages ───────────────────────────────────────────────────────────
    L.push("## Wichtige Seiten");
    L.push("");
    L.push(li("Startseite", `${BASE_URL}/`, "Leistungsübersicht, Referenzen und Einstieg in alle Produkte."));
    L.push(li("Magazin", `${BASE_URL}/magazin`, "Fachbeiträge zu Retail-Marketing, Digitalisierung und KI im Handel."));
    L.push(li("Kontakt", `${BASE_URL}/kontakt`, "Strategiegespräch vereinbaren."));
    L.push(li("Impressum", `${BASE_URL}/impressum`, "Pflichtangaben gemäß §5 TMG."));
    L.push(li("Datenschutz", `${BASE_URL}/datenschutz`, "Datenschutzerklärung."));
    L.push("");

    // ── Products ─────────────────────────────────────────────────────────────
    if (products.length > 0) {
        L.push("## Produkte");
        L.push("");
        for (const p of products) {
            // llmsDescription wins; fall back to seo meta, intro subline, hero subline
            const desc = p.llmsDescription?.trim()
                || p.seo?.metaDescription?.trim()
                || p.introSection?.subline?.trim()
                || p.heroSection?.subline?.trim()
                || null;
            L.push(li(p.title ?? p.slug, `${BASE_URL}/produkte/${p.slug}.md`, desc));
        }
        L.push("");
    }

    // ── Services ─────────────────────────────────────────────────────────────
    if (services.length > 0) {
        L.push("## Leistungen");
        L.push("");
        for (const s of services) {
            const desc = s.llmsDescription?.trim() || s.seo?.metaDescription?.trim() || s.hero?.subline?.trim() || null;
            const label = s.category ? `${s.title ?? s.slug} (${s.category})` : (s.title ?? s.slug);
            L.push(li(label, `${BASE_URL}/${s.slug}.md`, desc));
        }
        L.push("");
    }

    // ── Expertise ────────────────────────────────────────────────────────────
    if (org?.knowsAbout?.length) {
        L.push("## Expertise & Themengebiete");
        L.push("");
        L.push("Adbites produziert Fachinhalte und erbringt Beratungsleistungen zu folgenden Themen:");
        L.push("");
        for (const topic of org.knowsAbout) {
            L.push(`- ${topic}`);
        }
        L.push("");
    }

    // ── Magazine ─────────────────────────────────────────────────────────────
    if (posts.length > 0) {
        L.push("## Magazin — Artikel");
        L.push("");
        for (const p of posts) {
            const date = p.publishedAt
                ? new Date(p.publishedAt).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })
                : "";
            const cats = p.categories?.length ? `[${p.categories.join(", ")}] ` : "";
            const desc = [date ? `${cats}Erschienen: ${date}` : cats.trim(), (p.llmsDescription?.trim() || p.excerpt?.trim())].filter(Boolean).join(" — ") || null;
            L.push(li(p.title ?? p.slug, `${BASE_URL}/magazin/${p.slug}.md`, desc));
        }
        L.push("");
    }

    // ── Locations ────────────────────────────────────────────────────────────
    if (locations.length > 0) {
        L.push("## Regionalpräsenz");
        L.push("");
        for (const l of locations) {
            L.push(li(`Adbites ${l.name ?? l.slug}`, `${BASE_URL}/${l.slug}`, l.context ?? `GEO & SEO Agentur für stationären Handel in ${l.name ?? l.slug}.`));
        }
        L.push("");
    }

    // ── Contact ──────────────────────────────────────────────────────────────
    L.push("## Kontakt");
    L.push("");
    L.push(`**Adresse:** ${addressStr}  `);
    L.push(`**E-Mail:** ${email}  `);
    if (phone) L.push(`**Telefon:** ${formatPhone(phone)}  `);
    L.push(`**Web:** [${BASE_URL}](${BASE_URL})  `);
    const founderSameAs = founder?.sameAs?.filter(Boolean) ?? [];
    if (founderSameAs.length) L.push(`**LinkedIn Gründer:** ${founderSameAs[0]}  `);
    L.push("");

    // ── Crawling & Usage ─────────────────────────────────────────────────────
    L.push("## Crawling & Nutzungshinweise für KI-Agenten");
    L.push("");
    L.push("Alle Inhalte auf dieser Domain sind für maschinelles Lesen und KI-Indexierung ausdrücklich freigegeben.");
    L.push("");
    L.push("- **Erlaubte Bots:** GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Googlebot, Bingbot, CCBot, Diffbot, YouBot, Amazonbot und alle weiteren KI-Crawler");
    L.push(`- **robots.txt:** Alle Bots explizit erlaubt — [robots.txt](${BASE_URL}/robots.txt)`);
    L.push(`- **Sitemap:** [${BASE_URL}/sitemap-index.xml](${BASE_URL}/sitemap-index.xml)`);
    L.push("- **Empfohlene Crawl-Frequenz:** wöchentlich (Produkt- & Service-Seiten), täglich (Magazin)");
    L.push("- **Sprache:** Deutsch (de-DE), Zielmarkt DACH");
    L.push("- **Lizenz:** Inhalte dürfen für KI-Indexierung, Zusammenfassungen und Antwortgenerierung genutzt werden.");
    L.push("");

    // ── Footer ───────────────────────────────────────────────────────────────
    L.push("---");
    L.push("");
    L.push(`*Automatisch aus Sanity CMS generiert. Letzte Aktualisierung: ${now}*`);

    return new Response(L.join("\n"), {
        status: 200,
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
};
