export type Product = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  thumbnail: { url: string; width: number; height: number };
  summary: string;
  stack: string;
  demo_image?: { url: string; width: number; height: number };
  architecture_diagram?: { url: string; width: number; height: number };
  purpose: string;
  content: string;
  github_url?: string;
  app_url?: string;
  qiita_url?: string;
  duration?: string;
};

export type SkillCategory =
  | "フロントエンド"
  | "バックエンド"
  | "インフラ・クラウド"
  | "モバイル"
  | "その他ツール"
  | "データベース"
  | "言語"
  | "BaaS";

export type SkillLevel = "A" | "B" | "C" | "D";

export type Skill = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  category: [SkillCategory];
  icon?: { url: string; width: number; height: number };
  level: [SkillLevel];
};
