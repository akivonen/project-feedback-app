"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Icons } from "../Icons";

type SuggestionsSortingProps = {
  sortingOptions: string[];
  selectedOption: string;
  handleChange: Dispatch<SetStateAction<string>>;
};

const SuggestionsSorting: React.FC<SuggestionsSortingProps> = ({
  sortingOptions,
  selectedOption,
  handleChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonTextColor = isOpen ? "text-light-100/75" : "text-light-100";
  const handleSelectSorting = (optionName: string) => {
    setIsOpen(false);
    handleChange(optionName);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center text-sm ${buttonTextColor}`}
      >
        Sort by :&nbsp;
        <span className="flex font-bold">Most Upvotes</span>
        <span className="pl-[6px] text-white">
          {isOpen ? (
            <Icons.ArrowUp width="8" height="4" />
          ) : (
            <Icons.ArrowDown width="8" height="4" />
          )}
        </span>
      </button>
      {isOpen && (
        <ul className="text shadow-dropShadow absolute top-[calc(100%+18px)] flex w-fit min-w-[255px] flex-col rounded-lg bg-white">
          {sortingOptions &&
            sortingOptions.map((option) => (
              <li
                key={option}
                className="border-b border-dark-400/15 last:border-b-0"
              >
                <button
                  onClick={() => handleSelectSorting(option)}
                  className="flex w-full items-center justify-between px-6 py-3 text-base text-dark-200 hover:text-purple-200"
                >
                  {option}
                  {option === selectedOption && <Icons.Check />}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionsSorting;
