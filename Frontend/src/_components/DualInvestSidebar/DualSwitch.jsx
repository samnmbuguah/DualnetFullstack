import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleChecked } from "_store/duals.slice";

const DualSwitch = () => {
  const isChecked = useSelector((state) => state.duals.isChecked);
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    dispatch(toggleChecked());
  };

  return (
    <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <span
        className={`slider flex h-5 w-[40px] items-center rounded-full p-1 duration-200 ${
          isChecked ? "bg-green-500" : "bg-[#50555F]"
        }`}
      >
        <span
          className={`dot h-4 w-4 rounded-full bg-white duration-200 ${
            isChecked ? "translate-x-[18px]" : ""
          }`}
        ></span>
      </span>
    </label>
  );
};

export default DualSwitch;