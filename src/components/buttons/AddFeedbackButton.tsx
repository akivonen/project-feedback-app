import React from 'react';
import Link from 'next/link';

export default function AddFeedbackButton (){
  return (
    <Link
      href="/feedbacks/add"
      className="block rounded-lg bg-purple-200 px-4 py-[10px] text-[14px] font-bold text-light-100 md:px-6 md:py-3 md:text-[14px]"
    >
      + Add Feedback
    </Link>
  );
};
