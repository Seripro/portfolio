import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Keigo Seriguchi",
  description: "芹口京悟について",
};

const photos = [
  {
    src: "/about/lt.JPG",
    alt: "教室で発表する芹口京悟",
    position: "18% center",
  },
  {
    src: "/about/okinawa.JPG",
    alt: "沖縄の海辺で過ごす芹口京悟",
    position: "center",
  },
  {
    src: "/about/okinawa2-photo.jpg",
    alt: "沖縄のシーサーの前でポーズをとる芹口京悟",
    position: "center",
  },
  {
    src: "/about/cat-photo.jpg",
    alt: "こちらを見つめる猫",
    position: "center",
  },
];

const careers = [
  {
    title: "学習塾向け業務管理システム開発",
    term: "2026年8月〜9月",
    type: "業務委託",
    role: "Webアプリケーションエンジニア",
    description: [
      "学習塾向け業務管理システムの開発において、要件定義から技術選定、設計、実装まで一貫して担当しました。",
      "顧客へのヒアリングを通じて要望の背景にある本来の課題を明確にし、予算や開発工数の制約を踏まえながら、機能の優先順位や実現方法を検討しました。",
      "開発者と利用者の認識の違いや、実装段階で初めて判明する技術的な制約にも向き合い、顧客との合意形成から実装までを経験しました。",
    ],
  },
  {
    title: "株式会社ドリーム・アーツ",
    term: "2025年10月〜12月",
    type: "長期インターン",
    role: "バックエンドエンジニア",
    description: [
      "大規模SaaSプロダクトのバックエンド開発および品質改善に携わりました。",
      "既存コードの調査やIssueの実装・修正に取り組むとともに、テストコードの品質改善やドキュメント整備など、開発環境の改善にも貢献しました。",
    ],
  },
  {
    title: "つばさ株式会社",
    term: "2025年4月〜8月",
    type: "長期インターン",
    role: "ソフトウェアテスター",
    description: [
      "ソフトウェアの動作検証や不具合の発見・報告、必要なテストケースの追加を担当しました。",
      "IT未経験から実務に携わり、ソフトウェア開発の流れや品質保証の考え方、IT業界の基礎知識を身につけました。",
    ],
  },
];

function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-gray-300 pt-4">
      <p className="font-mono text-xs tracking-[0.16em] text-indigo-600">
        {number}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
        {children}
      </h2>
    </div>
  );
}

export default function Page() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
      <header className="grid gap-10 border-b border-gray-300 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <h1 className="text-5xl font-semibold tracking-[-0.06em] text-gray-950 sm:text-7xl">
            About
          </h1>
        </div>
        <div className="lg:pb-1">
          <p className="text-2xl font-semibold tracking-tight text-gray-950">
            芹口 京悟
          </p>
          <p className="mt-1 font-mono text-sm text-indigo-600">
            KEIGO SERIGUCHI
          </p>
          <p className="mt-6 border-l-2 border-indigo-500 pl-4 leading-8 text-gray-700">
            東京出身。横浜国立大学で物理学を学んでいます。
            <br />
            ソフトウェア開発と、人の成長に関わることが好きです。
            <br />
            ナンを作ったり、サッカーゲームをしたりしています。
          </p>
        </div>
      </header>

      <section className="py-12 sm:py-16" aria-labelledby="photos-heading">
        <div className="mb-5">
          <h2 id="photos-heading" className="text-sm font-medium text-gray-950">
            Photos
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className="group relative aspect-[3/4] overflow-hidden bg-gray-200"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 260px"
                style={{ objectPosition: photo.position }}
                className="object-cover grayscale-[40%] transition duration-500 ease-out group-hover:scale-[1.035] group-hover:grayscale-0"
              />
              <figcaption className="absolute bottom-0 left-0 bg-indigo-600/90 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                0{index + 1}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="grid gap-10 py-12 sm:grid-cols-[0.8fr_1.2fr] sm:py-20">
        <SectionHeading number="01">About me</SectionHeading>
        <p className="max-w-2xl text-lg leading-9 text-gray-700">
          塾講師やソフトウェア開発の経験を通じて、技術で課題を解決すること、人が成長できる環境をつくることにやりがいを感じています。
        </p>
      </section>
      <section className="grid gap-10 py-12 sm:grid-cols-[0.8fr_1.2fr] sm:py-20">
        <SectionHeading number="02">どんなエンジニアか</SectionHeading>
        <div className="max-w-2xl space-y-6 leading-8 text-gray-700">
          <p>
            私は、誰よりも活躍できるエンジニアになりたいという思いを原動力に、日々学習を続けています。
          </p>
          <p>
            フロントエンドからバックエンド、インフラまで幅広い技術に関心があり、単に使い方を覚えるだけでなく、その裏側にある仕組みや設計思想を理解することに面白さを感じています。
          </p>
          <p>
            また、自分自身の成長だけでなく、周囲の人の成長にも関わっていきたいと考えています。友人と勉強会を開催するなど、互いに学び、刺激し合える環境づくりも大切にしています。
          </p>
          <p>
            技術を深く理解し、学び続ける姿勢を持ちながら、自分自身も周囲も成長させられるエンジニアを目指しています。
          </p>
        </div>
      </section>
      <section className="grid gap-10 py-12 sm:grid-cols-[0.8fr_1.2fr] sm:py-20">
        <SectionHeading number="03">
          組織で目指すこと・やっていること
        </SectionHeading>
        <div className="max-w-2xl space-y-6 leading-8 text-gray-700">
          <p>
            チームや組織が成果を最大化するためには、円滑で透明性の高いコミュニケーションが欠かせないと考えています。
          </p>
          <p>
            そのため、たとえ言いづらいことであっても、組織の目的達成に必要だと感じたことは率直に伝えるようにしています。また、情報の行き違いや認識のずれを防ぐため、全体チャットでの情報共有などを通じて、メンバー間のコンテキストを揃えることも意識しています。
          </p>
          <p>
            一人ひとりが必要な情報を持ち、遠慮なく意見を交わせる環境をつくることで、チーム全体が迷いなく前に進める組織づくりに貢献したいと考えています。
          </p>
        </div>
      </section>
      <section className="grid gap-10 py-12 sm:grid-cols-[0.8fr_1.2fr] sm:py-20">
        <SectionHeading number="04">個人として目指すこと</SectionHeading>
        <div className="max-w-2xl space-y-6 leading-8 text-gray-700">
          <p>
            フロントエンドからバックエンド、インフラまで幅広い技術領域に精通し、技術力でチームを牽引できるフルスタックなテックリードを目指しています。
          </p>
          <p>
            また、将来的には自分自身が成果を出すだけでなく、若手エンジニアの育成にも積極的に携わりたいです。技術的な判断に迷ったときに「この人に聞けば大丈夫」と思ってもらえるような、技術力と信頼を兼ね備えたエンジニアになることが目標です。
          </p>
        </div>
      </section>
      <section className="grid gap-10 py-12 sm:grid-cols-[0.8fr_1.2fr] sm:py-20">
        <SectionHeading number="05">仕事以外の自分</SectionHeading>
        <div className="max-w-2xl space-y-6 leading-8 text-gray-700">
          <p>
            友人や家族と過ごす時間が好きで、友人を家に招いてサッカーを観戦したり、一緒に遊んだりしています。一方で、一人で過ごす時間も同じくらい好きで、休日には自転車で少し離れたカフェに行き、勉強したり、のんびり過ごしたりしています。
          </p>
          <p>
            体を動かすことも好きで、サッカーをしたり、ジムでトレーニングをしたりしています。
          </p>
        </div>
      </section>

      <section className="border-t border-gray-300 py-12 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading number="06">経歴</SectionHeading>
          <div>
            {careers.map((career, index) => (
              <article
                key={career.title}
                className={
                  index === 0 ? "" : "mt-12 border-t border-gray-200 pt-12"
                }
              >
                <p className="font-mono text-xs tracking-[0.12em] text-gray-500">
                  {career.term}
                  {career.type ? ` ｜ ${career.type}` : ""}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-gray-950">
                  {career.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  職種：{career.role}
                </p>
                <div className="mt-6 space-y-4 leading-8 text-gray-700">
                  {career.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
