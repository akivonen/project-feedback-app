import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import ClientSessionWrapper from './ClientSessionWrapper';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product Feedback App',
  description: 'Frontmentor.io project implementation',
  icons: {
    icon: '/favicon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} mx-auto min-h-svh max-w-[1440px] bg-light-200 text-white`}
      >
        <ClientSessionWrapper>
          {children}
          <ToastContainer position="top-right" />
        </ClientSessionWrapper>
      </body>
    </html>
  );
}
