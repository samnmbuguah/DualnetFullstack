import React from 'react';
import power from "../_assets/logout-btn.png";

export function Header({ username, onLogout, dark }) {
  return (
    <div className="flex w-full justify-between text-2xl md:mb-4 md:whitespace-nowrap items-center font-syncopate-light px-1">
      <span className="lg:text-[35px] font-bold dark:text-neutral-400 ">
        {username}
      </span>

      <button
        className="text-right dark:text-stone-300 text-[15px] font-bold lg:flex items-center hidden mb-1"
        onClick={onLogout}
      >
        Logout
        <img width={30} src={power} alt="power" className="ml-1" />
      </button>
    </div>
  );
}