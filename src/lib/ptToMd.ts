/**
 * Minimal Portable Text → Markdown converter.
 * Handles: paragraphs, headings (h2–h4), blockquotes, bullet/number lists,
 * inline strong, em, code, and link marks.
 * Custom block types (images, callouts, tables) are silently skipped.
 */
export function ptToMd(blocks: any[]): string {
    if (!Array.isArray(blocks) || blocks.length === 0) return "";

    const out: string[] = [];
    let listBuffer: string[] = [];
    let listType: "bullet" | "number" | null = null;

    function flushList() {
        if (!listBuffer.length) return;
        out.push(listBuffer.join("\n"));
        out.push("");
        listBuffer = [];
        listType = null;
    }

    function renderSpan(span: any, markDefs: any[]): string {
        let text: string = span.text ?? "";
        const marks: string[] = span.marks ?? [];

        // Resolve link marks first so we can wrap text
        for (const mark of marks) {
            const def = markDefs?.find((d: any) => d._key === mark);
            if (def?._type === "link") {
                text = `[${text}](${def.href})`;
            }
        }
        if (marks.includes("strong")) text = `**${text}**`;
        if (marks.includes("em")) text = `*${text}*`;
        if (marks.includes("code")) text = `\`${text}\``;

        return text;
    }

    for (const block of blocks) {
        if (block._type !== "block") {
            flushList();
            continue; // skip images, callouts, tables, etc.
        }

        const markDefs = block.markDefs ?? [];
        const inlineText = (block.children ?? [])
            .map((span: any) => renderSpan(span, markDefs))
            .join("");

        const style: string = block.style ?? "normal";
        const listItem: string | undefined = block.listItem;

        // List items
        if (listItem === "bullet") {
            if (listType === "number") flushList();
            listType = "bullet";
            listBuffer.push(`- ${inlineText}`);
            continue;
        }
        if (listItem === "number") {
            if (listType === "bullet") flushList();
            listType = "number";
            listBuffer.push(`${listBuffer.length + 1}. ${inlineText}`);
            continue;
        }

        flushList();

        if (!inlineText.trim()) {
            out.push("");
            continue;
        }

        const headingMap: Record<string, string> = {
            h1: "# ",
            h2: "## ",
            h3: "### ",
            h4: "#### ",
            h5: "##### ",
            h6: "###### ",
            blockquote: "> ",
        };

        out.push((headingMap[style] ?? "") + inlineText);
        out.push("");
    }

    flushList();

    return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
