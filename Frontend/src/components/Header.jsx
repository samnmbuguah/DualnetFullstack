import React from "react";
import power from "../_assets/logout-btn.png";

export function Header({ username, onLogout, dark }) {
  return (
    <div className="flex flex-row items-center px-8 pb-8 ">
      <div
        
      >
        <span className="relative text-[35px] font-[syncopate-bold] block w-full flex-shrink-1 whitespace-nowrap">
          <span className="shadow-text">{username}</span>
        </span>
      </div>
      <hr className={`flex-grow mb-0 ml-6 border-b-[0.3px] ${
          dark ? "border-[#857F76]" : "border-[#C3C3C3]"
        } `}></hr>
      <button
        className="w-[36px] h-[40px] dark:text-stone-300 text-[15px] font-bold flex items-center mx-10"
        onClick={onLogout}
      >
        <img src={power} alt="power" className="ml-1 w-fit h-fit" />
      </button>
    </div>
  );
}
