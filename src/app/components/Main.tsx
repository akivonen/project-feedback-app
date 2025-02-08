import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "./Icons";
const Main = () => {
  return (
    <main className="flex-grow">
      <div className="flex items-center justify-between bg-dark-300 px-6 py-2 align-middle md:rounded-lg lg:w-full">
        <div id="sort-by" className="flex">
          <div className="mr-[38px] hidden md:flex">
            <div>
              <Image
                width="23"
                height="24"
                src="../../icons/icon-suggestions.svg"
                alt="icon-suggestions"
              />
            </div>
            <span className="ml-4 text-[18px] font-bold text-white">
              6 Suggestions
            </span>
          </div>
          <button className="flex items-center text-[13px] text-light-100">
            Sort by :&nbsp;<span className="flex font-bold">Most Upvotes</span>
            <span className="pl-[6px] text-white">
              <Icons.ArrowDown width="8" height="4" />
            </span>
          </button>
        </div>
        <Link
          href="/add"
          className="rounded-lg bg-purple-200 px-4 py-[10px] text-[13px] font-bold text-light-100"
        >
          + Add Feedback
        </Link>
      </div>
    </main>
  );
};

export default Main;
