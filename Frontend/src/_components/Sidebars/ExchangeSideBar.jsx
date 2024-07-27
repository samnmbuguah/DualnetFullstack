import { useState, useEffect } from "react";

function ExchangeSideBar({ show, setShow, dark, width }) {
  const [isDarkMode, setIsDarkMode] = useState(dark.dark);
  const customDarkStyles = {
    boxShadow: "1px 4px 4px #151515 inset",
    border: "1px #2B3036 solid",
  };
  const customLightStyles = {
    background: "linear-gradient(0deg, #F0E7DB 0%, #F0E7DB 100%)",
    border: "1px #C9C5C5 solid",
  };
  useEffect(() => {
    setIsDarkMode(dark.dark);
  }, [dark.dark]);

  return (
    <div
      style={dark ? customDarkStyles : customLightStyles}
      className={`${
        show ? "right-0" : "hidden"
      } bg-[#fff] border-[1.5px] rounded-[25px] px-5 py-3 border-gray-300 z-30 transition-transform text-sm  text-center dark:bg-black dark:border-[#151617]`}
    >
      <div className="flex items-center mt-5">
        {/* <span
          onClick={() => setShow()}
          className="float-left cursor-pointer ml-3"
        >
          <FaRegTimesCircle className="h-6 w-6 text-gray-300 dark:text-dark-text" />
        </span>
        <span className="text-xl bg-gradient-to-r from-[#9327EB] to-30% to-[#3B93EB] text-transparent bg-clip-text font-light whitespace-nowrap font-syncopate-light text-center mx-auto dark:text-dark-text dark:bg-none">
          Exchange
        </span> */}
      </div>
      <div className={`w-[${width}px] h-[550px]`}>
        <iframe
          key={isDarkMode ? "dark" : "light"} // Update the key value based on isDarkMode
          allowtransparency="true"
          title="Exchange Widget"
          // scrolling="no"
          src={
            isDarkMode
              ? "https://widget.mtpelerin.com/?type=web&lang=en&tab=buy&bdc=USDT&ssc=USDT&sdc=CHF&mylogo=https://dualnet.ch/static/media/logo.78c163da5bd59f6d3565.png&primary=%23e3006f&success=%23e3006f&ctry=CH&chain=polygon_mainnet&mode=dark"
              : "https://widget.mtpelerin.com/?type=web&lang=en&tab=buy&bdc=USDT&ssc=USDT&sdc=CHF&mylogo=https://dualnet.ch/static/media/logo.78c163da5bd59f6d3565.png&primary=%239327eb&success=%239327eb&ctry=CH&chain=polygon_mainnet"
          }
          className={`w-full h-full m-auto`}
        ></iframe>
      </div>
    </div>
  );
}

export { ExchangeSideBar };
