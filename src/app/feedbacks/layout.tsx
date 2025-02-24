import FeedbackHeader from '../../components/FeedbackHeader';

export default function FeedbackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-10 mb-[120px] mt-14 flex flex-col gap-x-[30px] gap-y-6 md:px-10 md:pt-[56px] lg:px-[min(165px,8%)] xl:pt-[94px]">
      <FeedbackHeader />
      {children}
    </div>
  );
}
