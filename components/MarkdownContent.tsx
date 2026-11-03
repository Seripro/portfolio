import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { normalizeMarkdown } from "@/lib/markdown";

type MarkdownContentProps = {
  children: string;
  className?: string;
};

export default function MarkdownContent({
  children,
  className,
}: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          code: ({ children, className, ...props }) => (
            <code
              {...props}
              className={`not-prose rounded bg-gray-100 px-1 py-0.5 font-mono text-[0.875em] text-gray-800 ${className ?? ""}`}
            >
              {children}
            </code>
          ),
          table: ({ children: tableChildren }) => (
            <div className="my-6 w-full overflow-x-auto">
              <table>{tableChildren}</table>
            </div>
          ),
        }}
      >
        {normalizeMarkdown(children)}
      </ReactMarkdown>
    </div>
  );
}
