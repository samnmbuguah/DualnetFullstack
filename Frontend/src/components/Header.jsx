import React from "react";
import power from "../_assets/logout-btn.png";

export function Header({ username, onLogout, dark }) {
  return (
    <div className="flex flex-row items-center px-8 pb-8 ">
      <div className={`flex-grow border-b-[0.3px] ${dark ? 'border-[#857F76]' : 'border-[#C3C3C3]'} mb-3`}>
        <span 
          className="text-[35px] font-[syncopate-bold] text-[#A3A2A2] block w-full flex-shrink-1"
        >
          <span style={{ textShadow: 'inset 0 4px 4px rgba(0,0,0,0.25)' }}>
            {username}
          </span>
        </span>
      </div>
      <button
        className="w-[36px] h-[40px] dark:text-stone-300 text-[15px] font-bold flex items-center mt-10 mx-10"
        onClick={onLogout}
      >
        <img src={power} alt="power" className="ml-1 w-fit h-fit" />
      </button>
    </div>
  );
}
