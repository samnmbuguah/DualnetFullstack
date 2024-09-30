import React from 'react';
import DetailsSideBar from "../_components/Sidebars/DetailsSideBar";

export function Sidebar({ user, dark }) {
  return (
    <div className="w-[458px] flex-shrink-0"> {/* Updated this line */}
      <div className="flex space-y-12"></div>
      <div className="min-[700px]:cols-span-10 min-[100px]-col-span-10 flex items-center lg:items-start flex-col overflow-hidden col-span-8 lg:col-span-3 pt-4 justify-between h-full">
        <DetailsSideBar user={user} dark={dark} />
      </div>
    </div>
  );
}