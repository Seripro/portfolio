import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Portfolio
        </Link>
        <ul className="flex gap-6 text-sm font-medium text-gray-600">
          <li>
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Works
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
