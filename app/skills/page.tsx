import Image from "next/image";
import { getSkills } from "@/lib/microcms";
import type { Skill, SkillCategory } from "@/types/microcms";

const LEVEL_LABELS: Record<string, string> = {
  A: "実務において独力で機能実装からデプロイまで完遂できる",
  B: "実務において既存コードの改修ができる / 個人開発で一から構築・公開できる",
  C: "公式ドキュメント等を参考にしながら自律的に実装できる",
  D: "基本的な文法や操作を理解し、学習を進めている段階",
};

const LEVEL_COLORS: Record<string, string> = {
  A: "bg-blue-100 text-blue-800",
  B: "bg-green-100 text-green-800",
  C: "bg-yellow-100 text-yellow-800",
  D: "bg-gray-100 text-gray-700",
};

const CATEGORY_ORDER: SkillCategory[] = [
  "言語",
  "フロントエンド",
  "バックエンド",
  "データベース",
  "インフラ・クラウド",
  "BaaS",
  "モバイル",
  "その他ツール",
];

function groupByCategory(skills: Skill[]) {
  const grouped: Record<string, Skill[]> = {};
  for (const category of CATEGORY_ORDER) {
    grouped[category] = [];
  }
  for (const skill of skills) {
    const category = skill.category[0];
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(skill);
  }
  return grouped;
}

export default async function Page() {
  const { contents: skills } = await getSkills();
  const grouped = groupByCategory(skills);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Skills</h1>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left">
              <th className="px-4 py-3 font-semibold text-gray-700">レベル</th>
              <th className="px-4 py-3 font-semibold text-gray-700">説明</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(LEVEL_LABELS).map(([level, label]) => (
              <tr key={level} className="border-b border-gray-100">
                <td className="px-4 py-2">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${LEVEL_COLORS[level]}`}
                  >
                    {level}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-600">{label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 space-y-10">
        {CATEGORY_ORDER.map((category) => {
          const categorySkills = grouped[category];
          if (categorySkills.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="text-xl font-semibold text-gray-900">
                {category}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
                  >
                    {skill.icon ? (
                      <Image
                        src={skill.icon.url}
                        alt={skill.name}
                        width={32}
                        height={32}
                        className="shrink-0"
                      />
                    ) : (
                      <div className="h-8 w-8 shrink-0 rounded bg-gray-100" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-900">
                        {skill.name}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded px-2 py-0.5 text-xs font-bold ${LEVEL_COLORS[skill.level[0]]}`}
                    >
                      {skill.level[0]}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
