import { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
