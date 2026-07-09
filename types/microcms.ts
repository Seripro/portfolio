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
  content: string;
  github_url?: string;
  app_url?: string;
  qiita_url?: string;
  duration?: string;
};
