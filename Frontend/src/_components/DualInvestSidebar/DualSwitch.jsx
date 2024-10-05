import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleChecked } from "_store/duals.slice";

const DualSwitch = ({ dark }) => {
  const isChecked = useSelector((state) => state.duals.isChecked);
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch(toggleChecked());
  };

  return (
    <div className="flex flex-col w-[420px] pt-2">
      <div className="relative">
        <h1 className="font-syn-bold text-3xl relative">
          <span className="relative z-10 text-[#A3A2A2]">DUAL-INVESTMENT</span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-[#000000] to-25% to-[#A3A2A2] text-transparent bg-clip-text" aria-hidden="true">DUAL-INVESTMENT</span>
          <span 
            className="absolute inset-0 z-20 text-transparent bg-clip-text" 
            style={{
              textShadow: 'inset 0 4px 4px rgba(0, 0, 0, 0.25)',
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.1)'
            }} 
            aria-hidden="true"
          >
            DUAL-INVESTMENT
          </span>
        </h1>
      </div>
      <div className="flex flex-row items-center w-full">
        <span
          className={`mr-4 font-inter-medium text-xxs ${
            dark ? "text-[#ffffff]" : "text-[#979191]"
          }`}
        >
          Dual-Invest auto on/off
        </span>
        <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
            style={{ width: "26px", height: "13.42px" }}
          />
          <span
            className={`slider flex h-[13.42px] w-[26px] items-center rounded-full duration-200 ${
              isChecked ? "bg-green-500" : "bg-[#50555F]"
            }`}
          >
            <span
              className={`dot h-[11.42px] w-[11.42px] rounded-full bg-white duration-200 ${
                isChecked ? "translate-x-[18px]" : ""
              }`}
            ></span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default DualSwitch;
