import React from "react";

const ShareInput = ({ label, dark, labelType, textColor = "text-white", value, onChange }) => {
  const getLabelColor = () => {
    if (dark) {
      return labelType === "buy" ? "text-[#01D497]" : "text-[#EA5F00]";
    } else {
      return labelType === "buy" ? "text-[#009A6D]" : "text-[#EA5F00]";
    }
  };

  const getBackgroundColor = () => {
    if (dark) {
      return "bg-[#2C3036]";
    } else {
      return labelType === "buy" ? "bg-[#CCFFE6]" : "bg-[#FFE6CC]";
    }
  };

  const getStrokeColor = () => {
    return dark ? "#FFFFFF" : "#C3C3C3";
  };

  return (
    <div className={`
      flex items-center justify-between 
      font-inter-medium text-sm leading-normal 
      w-[136px] h-[29px] my-2 p-2 
      rounded-lg mr-4 
      ${getBackgroundColor()}
      shadow-[inset_0_0_0_1px_${getStrokeColor()}]
      drop-shadow-md
    `}>
      <span className={getLabelColor()}>{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-transparent ${textColor} text-right w-full`}
      />
    </div>
  );
};

export default ShareInput;