import Link from "next/link";

export default function BackToProjectsLink() {
  return (
    <Link
      href="/projects"
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M17 10a.75.75 0 0 1-.75.75H5.56l3.97 3.97a.75.75 0 1 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 1.06L5.56 9.25h10.69A.75.75 0 0 1 17 10Z"
          clipRule="evenodd"
        />
      </svg>
      一覧に戻る
    </Link>
  );
}
