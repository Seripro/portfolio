export function normalizeMarkdown(markdown: string) {
  return markdown
    .replace(/<a\b[^>]*>\s*<\/a>/gi, "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(
      /<\/?(?:p|div|section|article|header|footer|li|blockquote)\b[^>]*>/gi,
      "\n\n",
    )
    .replace(/<\/?span\b[^>]*>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(^\|[^\n]*\|)\n+(?=\|[^\n]*\|$)/gm, "$1\n");
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
