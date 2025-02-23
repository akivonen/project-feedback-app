'use client';
import React, { createContext, useState } from 'react';
import { Category } from '@/types';

type FilterContextProps = {
  categories: Category[];
  currCategory: Category;
  setCurrCategory: React.Dispatch<React.SetStateAction<Category>>;
};

const categories: Category[] = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

export const FilterContext = createContext<FilterContextProps>({
  categories,
  currCategory: 'All',
  setCurrCategory: () => {},
});

const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currCategory, setCurrCategory] = useState<Category>('All');
  return (
    <FilterContext.Provider value={{ categories, currCategory, setCurrCategory }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
