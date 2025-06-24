import RoadmapPageHeader from '@/components/roadmap/RoadmapPageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap page - Product Feedback App',
  description: 'Roadmap page description',
};

export default function RoadmapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-w-[1110px] flex-col md:mx-10 md:mb-[95px] md:mt-[56px] lg:mb-[180px] lg:mt-20 xl:mx-auto">
      <RoadmapPageHeader />
      <main>{children}</main>
    </div>
  );
}
