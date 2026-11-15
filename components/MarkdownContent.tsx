import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { Components } from "react-markdown";
import { normalizeMarkdown } from "@/lib/markdown";
import remarkLinkCards from "@/lib/remark-link-cards";
import LinkCard from "@/components/LinkCard";

type MarkdownContentProps = {
  children: string;
  className?: string;
};

export default function MarkdownContent({
  children,
  className,
}: MarkdownContentProps) {
  const components = {
    "link-card": LinkCard,
    code: ({ children, className, ...props }) => (
      <code
        {...props}
        className={`not-prose rounded bg-gray-100 px-1 py-0.5 font-mono text-[0.875em] text-gray-800 ${className ?? ""}`}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        {...props}
        className="not-prose my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm leading-6 text-gray-100 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
      >
        {children}
      </pre>
    ),
    table: ({ children: tableChildren }) => (
      <div className="my-6 w-full overflow-x-auto">
        <table>{tableChildren}</table>
      </div>
    ),
  } as Components;

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkLinkCards]}
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeSanitize,
            {
              ...defaultSchema,
              tagNames: [...(defaultSchema.tagNames ?? []), "link-card"],
              attributes: {
                ...defaultSchema.attributes,
                "link-card": ["href"],
              },
            },
          ],
        ]}
        components={components}
      >
        {normalizeMarkdown(children)}
      </ReactMarkdown>
    </div>
  );
}
