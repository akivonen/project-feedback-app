'use client';
import { useState, useEffect } from 'react';

const useScreenDetector = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const isMobile = width < 768;

  return { isMobile };
};

export default useScreenDetector;
