"use client";
import React, { useState } from "react";
import Image from "next/image";
import data from "../../../data/data.json";
import SuggestionsList from "./SuggestionsList";
import AddFeedbackButton from "../AddFeedbackButton";
import SuggestionsNoFeedback from "./SuggestionsNoFeedback";
import SuggestionsSorting from "./SuggestionsSorting";

const sortingOptions = [
  "Most upvotes",
  "Least upvotes",
  "Most comments",
  "Least comments",
];

const Suggestions = () => {
  const [selectedSorting, setSelectedSorting] = useState<string>(
    sortingOptions[0],
  );
  const { productRequests } = data;
  return (
    <section id="suggestions">
      <div className="flex items-center justify-between bg-dark-300 px-6 py-2 align-middle md:rounded-lg lg:w-full">
        <div id="sort-by" className="flex items-center">
          <div className="mr-[38px] hidden md:flex">
            <div>
              <Image
                width="23"
                height="24"
                src="./icons/icon-suggestions.svg"
                alt="icon-suggestions"
              />
            </div>
            <span className="ml-4 text-[18px] font-bold text-white">
              6 Suggestions
            </span>
          </div>
          <SuggestionsSorting
            sortingOptions={sortingOptions}
            selectedOption={selectedSorting}
            handleChange={setSelectedSorting}
          />
        </div>
        <AddFeedbackButton />
      </div>
      {productRequests ? (
        <SuggestionsList productRequests={productRequests} />
      ) : (
        <SuggestionsNoFeedback />
      )}
    </section>
  );
};

export default Suggestions;
