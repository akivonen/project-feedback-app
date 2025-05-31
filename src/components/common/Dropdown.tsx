'use client';
import React, { Dispatch, SetStateAction, useState, useRef, useEffect, useCallback } from 'react';
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

export default function Dropdown({
  dropdownOptions,
  selectedOption,
  handleChange,
  isFeedbackFormField = false,
  categoryFilterParam,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focusedOption, setFocusedOption] = useState<string>(selectedOption);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const handleSelectSorting = useCallback(
    (optionName: string) => {
      if (handleChange) {
        handleChange(optionName);
      }
    },
    [handleChange]
  );

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
        return;
      }
      if (optionsRef.current && optionsRef.current.contains(event.target as HTMLElement)) {
        const target = event.target as HTMLElement;
        const optionElement = target.closest('button');
        if (optionElement) {
          const optionValue = optionElement.getAttribute('data-option');
          if (optionValue && isFeedbackFormField) {
            handleSelectSorting(optionValue);
            setIsOpen(false);
          }
        }
      }
    },
    [handleSelectSorting, isFeedbackFormField]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;
      const options = dropdownOptions;
      const currentIndex = options.indexOf(selectedOption);
      const optionsLength = options.length;
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = currentIndex < optionsLength - 1 ? currentIndex + 1 : 0;
          setFocusedOption(options[nextIndex]);
          if (isFeedbackFormField) handleSelectSorting(options[nextIndex]);
          break;
        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : optionsLength - 1;
          setFocusedOption(options[prevIndex]);
          if (isFeedbackFormField) handleSelectSorting(options[prevIndex]);
          break;
        case 'Enter':
          event.preventDefault();
          setIsOpen(false);
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedOption(selectedOption);
          break;
        default:
          return;
      }
    },
    [dropdownOptions, isOpen, handleSelectSorting, selectedOption, isFeedbackFormField]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedOption, dropdownOptions, handleSelectSorting, handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, dropdownOptions, handleSelectSorting, isFeedbackFormField, handleClick]);

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
      {isFeedbackFormField && (
        <label id="dropdown-label" className="sr-only">
          Select an option
        </label>
      )}
      <button
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-sm focus:border focus:border-blue-300 ${dropDownBaseStyles}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        type="button"
        aria-labelledby={isFeedbackFormField ? 'dropdown-label' : undefined}
        aria-label={isFeedbackFormField ? 'Select an option' : 'Sort options'}
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
          ref={optionsRef}
          aria-activedescendant={focusedOption ? `option-${focusedOption}` : undefined}
        >
          {dropdownOptions &&
            dropdownOptions.map((option) => (
              <li key={option} className="border-b border-dark-400/15 last:border-b-0">
                {isFeedbackFormField ? (
                  <button
                    onClick={() => handleSelectSorting(option)}
                    className={`${dropdownItemStyles} ${option === focusedOption ? 'text-purple-200' : ''}`}
                    type="button"
                    role="option"
                    aria-selected={option === selectedOption}
                    data-option={option}
                    id={`option-${option}`}
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
                    id={`option-${option}`}
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
}
