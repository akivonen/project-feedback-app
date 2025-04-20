import Image from 'next/image';
import { Button } from '@/components/buttons';

export default function NotFoundPage() {
  return (
    <div className="mx-6 mb-12 mt-[100px] max-w-[800px] rounded-lg bg-white sm:mx-20 md:mx-auto md:mb-[54px]">
      <div className="flex flex-col items-center px-6 py-[76px] md:px-[140px] md:py-[110px] xl:px-[200px]">
        <Image
          width="130"
          height="137"
          src="/icons/illustration-empty.svg"
          alt="No feedbacks yet"
          className="h-[108px] w-[102px] md:h-[137px] md:w-[130px]"
        />
        <h1 className="mt-10 text-lg font-bold text-dark-400 md:mt-[54px] md:text-2xl">
          Page not found!
        </h1>
        <p className="mt-3.5 text-center text-sm text-dark-200 md:mt-4 md:text-base">
          Unfortunately, we could not find the requested page.
        </p>
        <div className="mt-6 md:mt-12">
          <Button size="lg" variant="purple" href="/">
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
