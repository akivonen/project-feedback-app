import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

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
      <body className={`${jost.className} bg-light-200`}>
        <div className="mx-auto min-h-svh max-w-[1440px]">{children}</div>
      </body>
    </html>
  );
}
