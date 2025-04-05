'use client';
import { MoonLoader } from 'react-spinners';

export default function LoadingSpinner() {
  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
      <MoonLoader color="#ad1fea" size={20} />
    </div>
  );
}
