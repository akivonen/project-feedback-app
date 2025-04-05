export default function FeedbackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      id="feedback"
      className="mx-6 mb-[88px] mt-14 flex flex-col gap-y-6 md:mx-10 md:mb-[120px] md:mt-14 lg:mx-auto lg:mb-[130px] lg:mt-20 lg:max-w-[730px]"
    >
      {children}
    </div>
  );
}
