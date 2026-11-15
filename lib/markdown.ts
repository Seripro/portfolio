const CODE_LANGUAGES =
  "bash|sh|shell|zsh|json|js|javascript|ts|typescript|tsx|jsx|html|css|sql|yaml|yml|python|py|go|java|ruby|php";

function decodeCodeHtml(html: string) {
  return html
    .replace(
      /<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>[\s\S]*?<\/a>/gi,
      "$1",
    )
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
}

function restoreRichTextCodeBlocks(markdown: string) {
  const fencedCodeBlock =
    /<p>\s*```([a-z0-9_-]*)\s*<\/p>((?:\s*<p>[\s\S]*?<\/p>)*?)<p>\s*```\s*<\/p>/gi;
  const codeBlock = new RegExp(
    `<p>\\s*(${CODE_LANGUAGES})\\s*<\\/p>((?:\\s*<p>[\\s\\S]*?<\\/p>)+?)(?=\\s*<p>\\s*(?:<br\\s*\\/?\\s*>)?\\s*<\\/p>|\\s*$)`,
    "gi",
  );

  const toFencedCode = (_match: string, language: string, body: string) => {
    const code = body
      .replace(/^\s*<p>/i, "")
      .replace(/<\/p>\s*<p>/gi, "\n")
      .replace(/<\/p>\s*$/i, "");

    return `\n\n\`\`\`${language}\n${decodeCodeHtml(code)}\n\`\`\`\n\n`;
  };

  return markdown
    .replace(fencedCodeBlock, toFencedCode)
    .replace(codeBlock, toFencedCode);
}

export function normalizeMarkdown(markdown: string) {
  const normalizeText = (text: string) =>
    text
    // When Markdown is pasted into the rich-text editor, its automatic
    // linkifier can absorb the closing `)` and following prose into href.
    // Restore `[label](URL)following prose` from that malformed anchor.
    .replace(
      /\]\(\s*<a\b[^>]*\bhref=["'](https?:\/\/[^)\s"']+)\)([^"']*)["'][^>]*>[\s\S]*?<\/a>/gi,
      "]($1)$2",
    )
    // microCMS may auto-link a pasted URL even when it is already inside a
    // Markdown link destination: [label](<a href="…">…</a>). Convert that
    // nested HTML link back to a regular Markdown destination before parsing.
    .replace(
      /\]\(\s*<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>[\s\S]*?<\/a>\s*\)/gi,
      "]($1)",
    )
    .replace(/<a\b[^>]*>\s*<\/a>/gi, "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(
      /<\/?(?:p|div|section|article|header|footer|li|blockquote)\b[^>]*>/gi,
      "\n\n",
    )
    .replace(/<\/?span\b[^>]*>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(^\|[^\n]*\|)\n+(?=\|[^\n]*\|$)/gm, "$1\n");

  return restoreRichTextCodeBlocks(markdown)
    .split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/g)
    .map((part, index) => (index % 2 === 0 ? normalizeText(part) : part))
    .join("");
}

export function markdownToPlainText(markdown: string) {
  return normalizeMarkdown(markdown)
    .replace(/<[^>]*>/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^(\s{0,3}#{1,6}\s+|\s*[-+*]\s+|\s*\d+\.\s+)/gm, "")
    .replace(/(\*\*|__|~~|\*|_)/g, "")
    .replace(/^\s*\|/gm, "")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
