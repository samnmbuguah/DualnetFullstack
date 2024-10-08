import React from "react";
import data from "_store/Infor";

export function Whitepaper({ isDarkMode }) {
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "text-dark-text" : "text-[#555]"} bg-transparent font-syn-regular`}>
      <div className="flex-grow p-8">
        <h1 className="text-2xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text font-light whitespace-nowrap font-syncopate-light text-center mb-8">
          Whitepaper
        </h1>
        <div className="max-w-2xl mx-auto">
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