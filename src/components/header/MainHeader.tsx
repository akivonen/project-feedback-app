import React from 'react';

type MainHeaderProps = {
  children: React.ReactNode;
};

const MainHeader: React.FC<MainHeaderProps> = ({ children }) => {
  return (
    <header className="relative">
      <div className="gap-x-[10px] gap-y-6 md:flex lg:max-w-[255px] lg:flex-col xl:max-w-[255]">
        {children}
      </div>
    </header>
  );
};
export default MainHeader;
