import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import data from "_store/Infor";

export function FAQ({ isDarkMode }) {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  return (
      <div className={`flex flex-col min-h-fit ${isDarkMode ? "text-dark-text" : "text-[#555]"} bg-transparent font-syn-regular`}>
        <div className="flex-grow p-8">
          <h1 className="text-xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text font-light whitespace-nowrap font-syncopate-light text-center mb-8">
            FAQ's
          </h1>
          <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto">
            {data.faqs.map((faq, index) => (
              <div key={index} className="py-3">
                <div
                  className={`group cursor-pointer`}
                  onClick={() => handleAccordionClick(index)}
                >
                  <div className="flex items-center">
                    <span className="transition transform group-open:rotate-180">
                      {activeAccordion === index ? (
                        <FaMinus className="h-3 w-3 text-[#3268FD]" />
                      ) : (
                        <FaPlus className="h-3 w-3 text-[#3268FD]" />
                      )}
                    </span>
                    <span className="ml-3 text-[#232323] font-bold font-syn-regular dark:text-dark-text text-sm">
                      {faq.question}
                    </span>
                  </div>
                  {activeAccordion === index && (
                    <p className="text-sm mt-3 font-normal font-syn-regular text-[#232323] animate-fadeIn dark:text-dark-text">
                      {faq.answer.split("\n").map((paragraph, paragraphIndex) => (
                        <React.Fragment key={paragraphIndex}>
                          {paragraph}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}