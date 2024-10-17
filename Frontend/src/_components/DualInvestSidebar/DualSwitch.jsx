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
          <span className="shadow-text">DUAL-INVESTMENT</span>
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
            className={`slider flex h-[13.42px] w-[26px] p-[1px] items-center rounded-full duration-200 ${
              isChecked ? "bg-[#1D886A]" : "bg-[#50555F]"
            }`}
          >
            <span
              className={`dot h-[11.42px] w-[11.42px] rounded-full bg-white duration-200 ${
                isChecked ? "translate-x-[12px]" : ""
              }`}
            ></span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default DualSwitch;
