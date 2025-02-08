import Header from "./components/Header";
import Main from "./components/Main";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-x-[30px] text-white md:gap-y-10 md:px-10 md:pt-[56px] lg:flex-row lg:px-[min(165px,10%)] xl:pt-[94px]">
        <Header />
        <Main />
      </div>
    </>
  );
}
