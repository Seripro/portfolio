export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">About</h1>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          芹口 京悟
          <span className="ml-2 text-base font-normal text-gray-500">
            Keigo Seriguchi
          </span>
        </h2>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">所属</dt>
            <dd className="mt-1 text-gray-900">
              横浜国立大学 理工学部 数物・電子情報系学科 物理工学EP（27卒）
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">目標</dt>
            <dd className="mt-1 text-gray-900">
              バックエンド・フルスタックエンジニアを目指し、論理的な思考を活かしてWeb・モバイルアプリ開発に取り組んでいます。
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500">趣味・特技</dt>
            <dd className="mt-1 text-gray-900">
              5歳から続けているサッカー（特にドリブル）、論理的な課題解決。
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">このサイトについて</h2>
        <p className="mt-3 text-gray-600 leading-relaxed">
          このポートフォリオサイトは、私がこれまでに取り組んだ制作物をまとめたものです。
          各プロジェクトの詳細ページでは、使用技術や構成図、関連リンクを確認できます。
        </p>
      </section>
    </div>
  );
}
