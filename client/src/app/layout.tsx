import NavigationMenu from "@/components/NavigationMenu";
import classnames from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("inter.className", inter.className);

  return (
    <html lang="en">
      <body
        className={classnames(inter.className, "flex", "flex-row", "gap-4")}
      >
        <aside className="">
          <NavigationMenu />
        </aside>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
