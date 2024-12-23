import { ReactNode } from "react";
import Link from "next/link";

export default function NavigationButton({
  children,
  href,
  path,
}: {
  children: ReactNode;
  href: string;
  path: string;
}) {
  return (
    <Link
      href={href}
      className={`w-full p-3 rounded-xl transition-all flex items-center justify-center ring-2  ${path === href ? "bg-sky-900 ring-sky-900 text-white" : "ring-sky-800 text-sky-800"}`}
    >
      {children}
    </Link>
  );
}
