import React from "react";
import power from "../_assets/logout-btn.png";

export function Header({ username, onLogout }) {
  return (
    <div className="flex flex-row items-center">
      <div className="flex-grow border-b-[0.3px] border-[#857F76] mb-3">
        <span className="lg:text-[35px] font-bold dark:text-neutral-400 block w-full">
          {username}
        </span>
      </div>
      <button
        className="w-[36px] h-[40px] dark:text-stone-300 text-[15px] font-bold flex items-center mt-10 ml-4"
        onClick={onLogout}
      >
        <img width={30} src={power} alt="power" className="ml-1" />
      </button>
    </div>
  );
}
