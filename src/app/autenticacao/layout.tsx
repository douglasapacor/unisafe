import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="absolute flex h-dvh w-dvw items-center justify-center">
      {children}
    </div>
  );
}
