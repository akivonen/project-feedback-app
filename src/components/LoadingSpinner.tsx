'use client';
import { MoonLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <MoonLoader color="#ad1fea" size={40} />
    </div>
  );
};

export default LoadingSpinner;
