import React from "react";

const AvailableBalance = ({ shareValue, balance, currency }) => {
  return (
    <div className="flex justify-between w-[251px] h-[12px] text-xxs mx-4 leading-normal font-inter-medium text-[#868585]">
      <span>1 share = {shareValue} {currency}</span>
      <span>Available {balance.toFixed(2)} {currency}</span>
    </div>
  );
};

export default AvailableBalance;