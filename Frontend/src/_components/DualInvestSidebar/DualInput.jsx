import React from "react";

const DualInput = ({ label, value, onChange, required, onAllClick, labelColor }) => {
  return (
    <div className="relative flex items-center bg-[#E2DDD4] dark:bg-[#454A57] justify-between rounded-md p-2 mb-2">
      <label className={`font-bold block font-[inter] text-lg mr-4 ${labelColor}`}>
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type="text"
          className="font-normal pl-2 pr-2 py-1 bg-transparent font-[inter] text-[#7c7c7c] text-sm w-24 text-right"
          value={value}
          onChange={onChange}
          required={required}
        />
        <button
          className="ml-2 px-2 py-1 bg-[#7C7C7C] text-white text-sm rounded"
          onClick={onAllClick}
        >
          ALL
        </button>
      </div>
    </div>
  );
};

export default DualInput;