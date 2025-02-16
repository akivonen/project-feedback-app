import React from "react";
import { Icons } from "../Icons";
import { Feedback } from "@/types";

type SuggestionsListItemProps = {
  feedback: Feedback;
};

const SuggestionsListItem: React.FC<SuggestionsListItemProps> = ({
  feedback,
}) => {
  const { title, category, upvotes, description, comments } = feedback;

  return (
    <li className="flex w-full flex-wrap justify-between gap-y-4 rounded-lg bg-white p-6 md:flex-nowrap md:px-8 md:py-7">
      <div className="w-full gap-y-2 md:ml-10 md:mr-6">
        <h3 className="text-sm font-bold text-dark-400 md:text-lg">{title}</h3>
        <p className="mt-2 text-sm text-dark-200 md:mt-1 md:text-base">
          {description}
        </p>
        <span className="mt-2 block w-fit rounded-lg bg-light-200 px-4 py-1.5 text-sm font-semibold text-blue-300 md:mt-3">
          {`${category[0].toUpperCase()}${category.slice(1)}`}
        </span>
      </div>
      <button className="hover:bg-light-400 bg-light-300 w-fit rounded-lg px-4 py-1.5 font-semibold text-blue-300 md:order-first md:h-fit md:max-w-10 md:pb-2 md:pt-3">
        <span className="flex items-center gap-x-2.5 gap-y-2 md:flex-col">
          <Icons.ArrowUp />
          <strong className="text-sm text-dark-400 md:ml-0">{upvotes}</strong>
        </span>
      </button>
      <span className="flex items-center gap-x-1">
        <Icons.Comments />
        <strong className="text-sm text-dark-400">
          {comments?.length || <span className="text-light-500">0</span>}
        </strong>
      </span>
    </li>
  );
};

export default SuggestionsListItem;
