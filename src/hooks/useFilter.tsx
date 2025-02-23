'use client';
import { FilterContext } from '@/contexts/FilterContext';
import { useContext } from 'react';

const useFilter = () => useContext(FilterContext);

export default useFilter;
