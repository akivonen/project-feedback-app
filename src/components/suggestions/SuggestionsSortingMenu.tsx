"use client";
import React, { useState } from "react";
import { Icons } from "../Icons";

const SuggestionsSortingMenu = () => {
  const [isOpen, toggleSortingMenu] = useState(false);

  return (
    <button
      onClick={() => toggleSortingMenu(!isOpen)}
      className="flex items-center text-sm text-light-100"
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
  );
};

export default SuggestionsSortingMenu;
