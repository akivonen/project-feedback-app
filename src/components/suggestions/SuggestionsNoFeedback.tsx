import React from 'react';
import Image from 'next/image';
import AddFeedbackButton from '../buttons/AddFeedbackButton';

const SuggestionsNoFeedback = () => {
  return (
    <div className="mx-6 mb-12 mt-8 rounded-lg bg-white md:mx-0 md:mb-[54px] md:mt-6">
      <div className="flex flex-col items-center px-6 py-[76px] md:px-[140px] md:py-[110px] xl:px-[200px]">
        <Image
          width="130"
          height="137"
          src="./icons/illustration-empty.svg"
          alt="No feedbacks yet"
          className="h-[108px] w-[102px] md:h-[137px] md:w-[130px]"
        />
        <h3 className="mt-10 text-lg font-bold text-dark-400 md:mt-[54px] md:text-2xl">
          There is no feedback yet.
        </h3>
        <p className="mt-3.5 text-center text-sm text-dark-200 md:mt-4 md:text-base">
          Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas
          to improve our app.
        </p>
        <div className="mt-6 md:mt-12">
          <AddFeedbackButton />
        </div>
      </div>
    </div>
  );
};

export default SuggestionsNoFeedback;
