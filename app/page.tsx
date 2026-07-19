import Link from "next/link";

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
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          このサイトについて
        </h2>
        <p className="mt-3 leading-relaxed text-gray-600">
          このポートフォリオサイトは、私がこれまでに取り組んだ制作物や習得した技術をまとめたものです。
          各ページでは制作物の詳細やスキルシートを確認できます。
        </p>
      </section>
    </div>
  );
}
