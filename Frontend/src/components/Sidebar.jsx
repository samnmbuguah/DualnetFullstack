import React from 'react';
import DetailsSideBar from "../_components/Sidebars/DetailsSideBar";

export function Sidebar({ user, dark }) {
  return (
    <div className="hidden xl:block flex-col items-center justify-around h-full w-[458px] flex-shrink-0 ">
      <DetailsSideBar user={user} dark={dark} />
    </div>
  );
}