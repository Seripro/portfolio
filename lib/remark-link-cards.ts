import type { Link, Paragraph, Root } from "mdast";
import type { Plugin } from "unified";

type Parent = Root | Paragraph;

function isStandaloneUrl(paragraph: Paragraph, markdown: string) {
  if (paragraph.children.length !== 1) return null;

  const child = paragraph.children[0];
  if (child.type !== "link" || child.children.length !== 1) return null;
  if (child.children[0].type !== "text") return null;
  if (!child.url.startsWith("http://") && !child.url.startsWith("https://")) {
    return null;
  }

  const start = paragraph.position?.start.offset;
  const end = paragraph.position?.end.offset;
  if (start === undefined || end === undefined) return null;

  const source = markdown.slice(start, end).trim();
  const unwrappedSource =
    source.startsWith("<") && source.endsWith(">")
      ? source.slice(1, -1)
      : source;

  return unwrappedSource === child.url ? (child as Link).url : null;
}

const remarkLinkCards: Plugin<[], Root> = () => (tree, file) => {
  const markdown = String(file.value);

  const visit = (parent: Parent) => {
    for (const node of parent.children) {
      if (node.type === "paragraph") {
        const url = isStandaloneUrl(node, markdown);

        if (url) {
          node.data = {
            ...node.data,
            hName: "link-card",
            hProperties: { href: url },
          };
        }
      }

      if ("children" in node) visit(node as Parent);
    }
  };

  visit(tree);
};

export default remarkLinkCards;
