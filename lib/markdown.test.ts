import { describe, expect, it } from "vitest";

import { markdownToPlainText, normalizeMarkdown } from "./markdown";

describe("normalizeMarkdown", () => {
  it("unwraps a rich-text editor link nested in a Markdown link destination", () => {
    const markdown =
      '[プロフィール](<a href="https://example.com/profile">https://example.com/profile</a>)';

    expect(normalizeMarkdown(markdown)).toBe(
      "[プロフィール](https://example.com/profile)",
    );
  });

  it("repairs an auto-link that has absorbed a closing parenthesis and prose", () => {
    const markdown =
      '[記事](<a href="https://example.com/article)続きを読む">https://example.com/article)続きを読む</a>';

    expect(normalizeMarkdown(markdown)).toBe(
      "[記事](https://example.com/article)続きを読む",
    );
  });

  it("converts rich-text block tags and line breaks into Markdown line breaks", () => {
    expect(
      normalizeMarkdown("<p>一行目<br>二行目</p><div>三行目</div><span>四行目</span>"),
    ).toBe("\n\n一行目\n二行目\n\n三行目\n\n四行目");
  });

  it("restores explicitly fenced code blocks and decodes their HTML entities", () => {
    const richText =
      "<p>```typescript</p><p>const message = &quot;hello&quot;;</p><p>```</p>";

    expect(normalizeMarkdown(richText)).toBe(
      '\n\n```typescript\nconst message = "hello";\n```\n\n',
    );
  });

  it("restores language-prefixed rich-text code blocks and replaces links with their URLs", () => {
    const richText =
      '<p>typescript</p><p>const url = <a href="https://example.com">example</a>;</p>';

    expect(normalizeMarkdown(richText)).toBe(
      "\n\n```typescript\nconst url = https://example.com;\n```\n\n",
    );
  });

  it("does not normalize HTML-looking text inside existing fenced code", () => {
    const markdown = "before\n```html\n<p>keep</p><br>\n```\nafter";

    expect(normalizeMarkdown(markdown)).toBe(markdown);
  });

  it("removes blank lines between Markdown table rows", () => {
    const markdown = "| Name | URL |\n\n| --- | --- |\n\n| site | https://example.com |";

    expect(normalizeMarkdown(markdown)).toBe(
      "| Name | URL |\n| --- | --- |\n| site | https://example.com |",
    );
  });
});

describe("markdownToPlainText", () => {
  it("extracts readable text from common Markdown constructs", () => {
    const markdown = `# Title

- one
- two

[Docs](https://example.com)
![Logo](https://example.com/logo.png)

\`inline\` **bold** ~~old~~`;

    expect(markdownToPlainText(markdown)).toBe(
      "Title one two Docs Logo inline bold old",
    );
  });

  it("omits fenced code and flattens tables", () => {
    const markdown = `| Name | Value |
| --- | --- |
| Foo | Bar |

\`\`\`ts
const ignored = true;
\`\`\``;

    expect(markdownToPlainText(markdown)).toBe("Name Value --- --- Foo Bar");
  });
});
