import React from "react";

const ShareInput = ({ label, labelColor = "", value, onChange }) => {
  return (
    <div className="flex items-center justify-between bg-[#2C3036] font-inter-medium text-sm leading-normal w-[136px] h-[29px] my-2 p-2 rounded-lg border border-white mr-4 shadow-[inset_0_0_0_1px_#454A57] drop-shadow-md">
      <span className={`${labelColor}`}>{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-white text-right w-full"
      />
    </div>
  );
};

export default ShareInput;