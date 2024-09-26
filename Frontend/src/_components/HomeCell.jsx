import React from "react";

function HomeCell({
  title,
  value,
  headingColor,
  active = false,
  ownstyle = "t-heading md:text-[11px] text-[16px]",
  ownstyle2 = "text-[18px]",
}) {
  return (
    <div>
      <p
        className={`${ownstyle} ${
          headingColor
            ? "bg-gradient-to-r from-[#777] to-[#31ED13] from-10% to-100% text-transparent bg-clip-text"
            : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-blue-700 to-opacity to-opacity-0"
        } dark:bg-clip-text]`}
      >
        {title}
      </p>
      <p
        className={`${
          active
            ? "text-[#E67406] md:text-[#3761f6] dark:text-[#E67406] dark:text-bold"
            : "text-[#6a6661] dark:text-white"
        } font-syn-regular ${ownstyle2} `}
      >
        {value}
      </p>
    </div>
  );
}

export { HomeCell };
