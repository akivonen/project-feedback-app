export default function Home() {
  return (
    <div className="flex flex-col gap-x-[30px] p-4 text-white sm:gap-y-10 lg:flex-row">
      <div className="w-full bg-red-700 lg:max-w-[255px]">header</div>
      <div className="w-full bg-blue-500">feedbacks</div>
    </div>
  );
}
