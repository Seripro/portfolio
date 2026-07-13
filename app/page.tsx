import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section>
        <h1 className="text-4xl font-bold text-gray-900">
          芹口 京悟
          <span className="ml-3 text-lg font-normal text-gray-500">
            Keigo Seriguchi
          </span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          横浜国立大学 理工学部 数物・電子情報系学科 物理工学EP（27卒）。
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

      <nav className="mt-12 grid gap-4 sm:grid-cols-2">
        <Link
          href="/projects"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            Works
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            制作物の一覧を見る
          </p>
        </Link>
        <Link
          href="/skills"
          className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            Skills
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            スキルシートを見る
          </p>
        </Link>
      </nav>
    </div>
  );
}
