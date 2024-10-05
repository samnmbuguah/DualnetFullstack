import React from "react";
import power from "../_assets/logout-btn.png";

export function Header({ username, onLogout, dark }) {
  return (
    <div className="flex flex-row items-center px-8 pb-8 ">
      <div
        className={`flex-grow border-b-[0.3px] ${
          dark ? "border-[#857F76]" : "border-[#C3C3C3]"
        } mb-3`}
      >
        <span className="relative text-[35px] font-[syncopate-bold] block w-full flex-shrink-1 whitespace-nowrap">
          <span className="relative z-10 text-[#A3A2A2]">{username}</span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#000000] to-25% to-[#A3A2A2] text-transparent bg-clip-text" aria-hidden="true">{username}</span>
          <span className="absolute inset-0 z-20 text-transparent bg-clip-text" style={{
            textShadow: 'inset 0 4px 4px rgba(0, 0, 0, 0.25)',
            WebkitTextStroke: '1px rgba(0, 0, 0, 0.1)'
          }} aria-hidden="true">{username}</span>
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
