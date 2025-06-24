import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import ClientSessionProvider from './providers/ClientSessionProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import FeedbacksContextProvider from './providers/FeedbacksContextProvider';
import { getAllFeedbacks } from '@/db/queries/feedbacks';

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
  const feedbacksPromise = getAllFeedbacks();

  return (
    <html lang="en">
      <body
        className={`${jost.className} mx-auto min-h-svh max-w-[1440px] bg-light-200 text-white`}
      >
        <ClientSessionProvider>
          <FeedbacksContextProvider feedbacksPromise={feedbacksPromise}>
            {children}
            <ToastContainer position="top-right" />
          </FeedbacksContextProvider>
        </ClientSessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
