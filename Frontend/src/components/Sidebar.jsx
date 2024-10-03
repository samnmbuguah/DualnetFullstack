import React from 'react';
import DetailsSideBar from "../_components/Sidebars/DetailsSideBar";

export function Sidebar({ user, dark }) {
  return (
    <div className="hidden xl:block w-[458px] flex-shrink-0 mx-8">
      <div className="flex"></div>
      <div className="flex flex-col items-center pt-4 justify-between h-full">
        <DetailsSideBar user={user} dark={dark} />
      </div>
    </div>
  );
}