import type { OpenGraphData } from "./og";

// Verified from this course's og:* tags on 2026-11-04. Refresh when the
// course changes. This is an explicit snapshot, not guessed metadata.
const course = {
  title: "【React18対応】モダンJavaScriptの基礎から始める挫折しないためのReact入門",
  description:
    "【フルリニューアルしました！】Reactの習得に苦戦する理由は「JavaScript」への理解不足です。このコースではスムーズにReact開発のスタート地点に立てるように、モダンJavaScriptの動作の仕組みや概念、機能から解説します。",
  image: "https://img-c.udemycdn.com/course/480x270/3452848_0c2e.jpg",
  domain: "udemy.com",
};

export function getOpenGraphFallback(value: string): OpenGraphData | null {
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      !["www.udemy.com", "udemy.com"].includes(url.hostname) ||
      url.port || url.username || url.password ||
      !/^\/course\/modern_javascipt_react_beginner\/?$/.test(url.pathname)
    ) return null;

    // Keep the author's coupon parameters and destination intact.
    return { ...course, url: url.href };
  } catch {
    return null;
  }
}
