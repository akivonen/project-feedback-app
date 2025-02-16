import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Feedback App",
  description: "Frontmentor.io project implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} mx-auto flex min-h-svh max-w-[1440px] flex-col gap-x-[30px] bg-light-200 text-white md:gap-y-10 md:px-10 md:pt-[56px] lg:flex-row lg:px-[min(165px,8%)] xl:pt-[94px]`}
      >
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
