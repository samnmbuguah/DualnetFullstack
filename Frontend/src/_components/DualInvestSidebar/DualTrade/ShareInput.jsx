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

  const getBorderColor = () => {
    return dark ? "border-white" : "border-[#857F76]";
  };

  return (
    <div className={`flex items-center justify-between font-inter-medium text-sm leading-normal w-[136px] h-[29px] my-2 p-2 rounded-lg ${getBorderColor()} mr-4 shadow-[inset_0_0_0_1px_#454A57] drop-shadow-md ${getBackgroundColor()}`}>
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