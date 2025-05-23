'use client';
import React, { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { CategoryOption, sortNamesMap } from '@/lib/filter';
import Link from 'next/link';

type DropdownProps = {
  dropdownOptions: string[];
  selectedOption: string;
  handleChange?: Dispatch<SetStateAction<string>>;
  isFeedbackFormField?: boolean;
  categoryFilterParam?: CategoryOption;
};

const Dropdown: React.FC<DropdownProps> = ({
  dropdownOptions,
  selectedOption,
  handleChange,
  isFeedbackFormField = false,
  categoryFilterParam,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectSorting = (optionName: string) => {
    setIsOpen(false);
    if (handleChange) {
      handleChange(optionName);
    }
  };

  //add keyboard navigation

  const fieldDefaultStyles =
    'outline-none rounded-md p-4 w-full border justify-between bg-light-200 md:text-[15px]';
  const fieldIsOpenBorderStyles = isOpen ? 'border-blue-300' : 'border-transparent';
  const defaultStyles = isOpen ? 'text-light-100/75' : 'text-light-100';
  const dropDownBaseStyles = isFeedbackFormField
    ? `${fieldDefaultStyles} ${fieldIsOpenBorderStyles}`
    : defaultStyles;
  const dropdownOptionsStyles = isFeedbackFormField
    ? 'w-full top-[calc(100%+16px)]'
    : 'w-fit top-[calc(100%+18px)]';
  const dropdownItemStyles =
    'flex w-full items-center justify-between px-6 py-3 text-base text-dark-200 hover:text-purple-200';

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-sm ${dropDownBaseStyles}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
      >
        {!isFeedbackFormField && 'Sort by'}
        <span className={`flex ${!isFeedbackFormField && 'font-bold'}`}>
          {isFeedbackFormField ? selectedOption : sortNamesMap[selectedOption]}
        </span>
        <span className={`pl-[6px] ${isFeedbackFormField && 'text-blue-300'}`}>
          {isOpen ? (
            <Icons.ArrowUp data-testid="arrow-up" width="8" height="4" />
          ) : (
            <Icons.ArrowDown data-testid="arrow-down" width="8" height="4" />
          )}
        </span>
      </button>
      {isOpen && (
        <ul
          className={`text absolute top-[calc(100%+18px)] z-30 flex min-w-[255px] flex-col rounded-lg bg-white shadow-dropShadow ${dropdownOptionsStyles}`}
          role="listbox"
        >
          {dropdownOptions &&
            dropdownOptions.map((option) => (
              <li key={option} className="border-b border-dark-400/15 last:border-b-0">
                {isFeedbackFormField ? (
                  <button
                    onClick={() => handleSelectSorting(option)}
                    className={dropdownItemStyles}
                    type="button"
                    role="option"
                    aria-selected={option === selectedOption}
                  >
                    {categoryFilterParam ? sortNamesMap[option] : option}
                    {option === selectedOption && <Icons.Check data-testid="check" />}
                  </button>
                ) : (
                  <Link
                    href={`/${categoryFilterParam}/${option}`}
                    className={dropdownItemStyles}
                    role="option"
                    aria-selected={option === selectedOption}
                  >
                    {categoryFilterParam ? sortNamesMap[option] : option}
                    {option === selectedOption && <Icons.Check data-testid="check" />}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
