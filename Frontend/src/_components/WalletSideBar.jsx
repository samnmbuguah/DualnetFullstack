import { useState, useEffect } from "react";

import { FaRegTimesCircle } from "react-icons/fa";
import { Step1, Step2, Step3, Step4 } from "_components";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

function WalletSideBar({ show, setShow, dark, width }) {
  const [isDarkMode, setIsDarkMode] = useState(dark.dark);
  const [currentStep, setCurrentStep] = useState(1);
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  useEffect(() => {
    setIsDarkMode(dark.dark);
  }, []);

  return (
    <div
      className={`${
        show ? "right-0" : "hidden"
      } w-[${width}px] h-full bg-[#fff] border-[1.5px] px-5 py-3 border-gray-300 z-30 transition-transform text-sm text-center dark:bg-[#25292F] dark:border-[#6D6D6D]`}
    >
      <div className="flex items-center mt-5">
        <span
          onClick={() => {
            setShow();
            setCurrentStep(1);
          }}
          className="float-left cursor-pointer ml-3"
        >
          <FaRegTimesCircle className="h-6 w-6 text-gray-300 dark:text-dark-text" />
        </span>
        <span className="text-xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text font-light whitespace-nowrap font-syncopate-light text-center mx-auto dark:text-dark-text dark:bg-none">
          Cold Wallet
        </span>
      </div>
      <div className="mt-[25px]">
        <p className="text-[14px] font-bold bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text mb-4 whitespace-nowrap font-syncopate-light">
          {currentStep === 3 ? "Status" : "Senden"}
        </p>
        {currentStep === 2 || currentStep === 3 || currentStep === 4 ? (
          <div
            className={`${
              currentStep === 3 ? "left-[251px] top-[84px]" : "left-[148px]"
            } absolute `}
          >
            <MdKeyboardDoubleArrowLeft
              className="text-[20px] text-[#727272] mr-3 cursor-pointer"
              onClick={() => handlePreviousStep()}
            />
          </div>
        ) : null}
        {currentStep !== 3 ? (
          <>
            <div className="flex justify-between items-center w-[280px] m-auto">
              <div>
                <div className="rounded-full w-[20px] h-[20px] flex justify-center items-center text-base font-syn-regular border dark:border-[#31ED13] dark:text-[#31ED13]">
                  1
                </div>
              </div>

              <div
                className={`${
                  currentStep === 2 || currentStep === 3
                    ? "bg-[#31ED13]"
                    : "bg-[white]"
                } border-height w-full`}
              ></div>
              <div>
                <div
                  className={`${
                    currentStep === 2 || currentStep === 3
                      ? "dark:border-[#31ED13] dark:text-[#31ED13]"
                      : "dark:border-[#fff] dark:text-[#fff]"
                  } rounded-full w-[20px] h-[20px] flex justify-center items-center text-base font-syn-regular border`}
                >
                  2
                </div>
              </div>
              <div
                className={`${
                  currentStep === 3 ? "bg-[#31ED13]" : "bg-[white]"
                } border-height w-full`}
              ></div>
              <div>
                <div
                  className={`${
                    currentStep === 3
                      ? "dark:border-[#31ED13] dark:text-[#31ED13]"
                      : "dark:border-[#fff] dark:text-[#fff]"
                  } rounded-full w-[20px] h-[20px] flex justify-center items-center text-base font-syn-regular border`}
                >
                  3
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center w-[300px] m-auto mt-[12px]">
              <span className="text-[white] text-[10px] font-sans">
                Empfänger
              </span>
              <span className="text-[white] text-[10px] font-sans">
                Zusammenfassung
              </span>
              <span className="text-[white] text-[10px] font-sans">Gerät</span>
            </div>
          </>
        ) : null}
        {currentStep === 1 && <Step1 onNextStep={handleNextStep} />}
        {currentStep === 2 && (
          <Step2
            onPreviousStep={handlePreviousStep}
            onNextStep={handleNextStep}
          />
        )}
        {currentStep === 3 && (
          <Step3
            onPreviousStep={handlePreviousStep}
            onNextStep={handleNextStep}
          />
        )}
        {currentStep === 4 && <Step4 onPreviousStep={handlePreviousStep} />}
      </div>
    </div>
  );
}

export { WalletSideBar };
