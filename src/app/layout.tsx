import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product Feedback App',
  description: 'Frontmentor.io project implementation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${jost.className} mx-auto min-h-svh max-w-[1440px] bg-light-200 text-white`}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
