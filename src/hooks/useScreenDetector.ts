'use client';
import { useState, useEffect } from 'react';

const useScreenDetector = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const isMobile = width !== undefined && width < 768;

  return { isMobile };
};

export default useScreenDetector;
