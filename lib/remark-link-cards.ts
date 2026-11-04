import type { Link, Paragraph, Root } from "mdast";
import type { Plugin } from "unified";

type Parent = Root | Paragraph;

function isTextLink(node: Paragraph["children"][number]): node is Link {
  return (
    node.type === "link" &&
    node.children.length === 1 &&
    node.children[0].type === "text"
  );
}

function isStandaloneUrl(paragraph: Paragraph, markdown: string) {
  const links = paragraph.children.filter(isTextLink);
  if (links.length !== 1) return null;

  const child = links[0];
  if (!child.url.startsWith("http://") && !child.url.startsWith("https://")) {
    return null;
  }

  const start = paragraph.position?.start.offset;
  const end = paragraph.position?.end.offset;
  if (start === undefined || end === undefined) return null;

  const source = markdown
    .slice(start, end)
    .replace(/<[^>]*>/g, "")
    .trim();

  if (source !== child.url) return null;

  paragraph.children = [child];
  return child.url;
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
