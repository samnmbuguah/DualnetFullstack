import React from "react";
import { Link } from "react-router-dom";
import data from "_store/Infor";
import closeBtn from "_assets/close.svg";

export function Whitepaper({ isDarkMode }) {
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "text-dark-text" : "text-[#555]"} bg-transparent font-syn-regular`}>
      <div className="max-w-2xl mx-auto pt-8 relative">
        <h1 className="text-2xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text font-light whitespace-nowrap font-syncopate-light text-center mb-8">
          Whitepaper
        </h1>
        <Link to="/" className="absolute right-0 top-10" >
          <span className={''}><img src={closeBtn} alt="close-btn" className={'w-[30px] text-[#b9b1a3]'} /></span>
        </Link>
        <div className="">
          {data.about.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-6 text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}