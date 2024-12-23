import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <div className={"fixed top-0 left-0 w-screen p-4 bg-neutral-50"}>
      <h1 className={"text-xl font-bold"}>{children}</h1>
    </div>
  );
}
