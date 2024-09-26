import React from "react";
import { useState, useEffect } from "react";
import { FaRegTimesCircle, FaPlus, FaMinus } from "react-icons/fa";
import data from "_store/Infor";

function InformationBar({ show, setShow, type, width }) {
  const [dataList, setDataList] = useState();
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };
  useEffect(() => {
    setDataList(data);
  }, []);
  return (
    <div
      className={`${
        show ? "right-0" : "hidden"
      } bg-[#fef6e6] border-[1.5px] w-[${width}px] rounded px-5 py-3 border-gray-300 z-30 transition-transform text-sm dark:bg-[transparent] dark:border-[#6D6D6D]`}
    >
      <div className="flex items-center mt-5">
        <span
          onClick={() => setShow(null)}
          className="float-left cursor-pointer ml-3"
        >
          <FaRegTimesCircle className="h-6 w-6 text-gray-300 dark:text-dark-text" />
        </span>
        <span className="text-xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text font-light whitespace-nowrap font-syncopate-light text-center mx-auto dark:text-dark-text dark:bg-none">
          {type === 1 ? "Business" : `FAQ'S`}
        </span>
      </div>
      <div className="h-[538px] overflow-y-auto">
        {type === 1 ? (
          <>
            <p className="text-[#555] max-w-xl mx-auto mt-8 text-sm font-syn-regular dark:text-dark-text">
              {dataList?.about &&
                dataList.about.split("\n").map((paragraph, paragraphIndex) => (
                  <React.Fragment key={paragraphIndex}>
                    {paragraph}
                    <br />
                  </React.Fragment>
                ))}
            </p>
          </>
        ) : (
          <>
            <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
              {dataList?.faqs.map((accordion, index) => (
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
                      <span className="ml-3 text-[#232323] font-bold font-syn-regular dark:text-dark-text">
                        {accordion.question}
                      </span>
                    </div>
                    {activeAccordion === index && (
                      <p className="text-sm mt-3 font-normal font-syn-regular text-[#232323] animate-fadeIn dark:text-dark-text">
                        {accordion.answer
                          .split("\n")
                          .map((paragraph, paragraphIndex) => (
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
          </>
        )}
      </div>
    </div>
  );
}

export { InformationBar };
