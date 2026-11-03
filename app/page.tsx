import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/keikeigokeigo",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.74-8.85L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z"
        />
      </svg>
    ),
  },
  {
    name: "Qiita",
    href: "https://qiita.com/keikeigo",
    icon: (
      <Image
        src="/social/qiita-icon.png"
        width={22}
        height={22}
        alt=""
      />
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/Seripro",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M12 2C6.48 2 2 6.59 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .08 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 7a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.89 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.26C22 6.59 17.52 2 12 2Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href:
      "https://www.linkedin.com/in/%E4%BA%AC%E6%82%9F-%E8%8A%B9%E5%8F%A3-4a54a13a4/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.3ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47Z"
        />
      </svg>
    ),
  },
] as const;

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section>
        <div className="flex items-center gap-5">
          <h1 className="text-4xl font-bold text-gray-900">
            芹口 京悟
            <span className="ml-3 text-lg font-normal text-gray-500">
              Keigo Seriguchi
            </span>
          </h1>
          <Link
            href="/about"
            className="rounded-full border-2 border-indigo-600 bg-indigo-600 px-10 py-4 text-2xl font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-indigo-600 hover:shadow-lg active:translate-y-0 active:shadow-sm"
          >
            About Me →
          </Link>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          横浜国立大学 理工学部 数物・電子情報系学科 物理工学EP
          <br />
          バックエンド・フルスタックエンジニアを目指し、Web・モバイルアプリ開発に取り組んでいます。
        </p>

        <nav aria-label="SNS" className="mt-10 border-t border-gray-200 pt-6">
          <ul className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex size-11 items-center justify-center rounded-full text-gray-600 outline-none transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  aria-label={`${social.name}のプロフィールを新しいタブで開く`}
                >
                  <span className="size-6 transition-transform duration-200 group-hover:-translate-y-0.5">
                    {social.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  );
}
