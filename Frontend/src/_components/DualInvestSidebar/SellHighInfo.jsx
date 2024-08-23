import React from "react";

const SellHighInfo = () => {
  return (
    <div className="w-1/2 p-4 bg-[#fef6e6] dark:bg-[#454A57] rounded-md mb-4">
      <h2 className="text-[0.875rem] font-bold mb-2 text-[#1D886A]">
        Sell High
      </h2>
      <p className="text-[0.625rem] mb-4 text-[#D0D0D0]">
        Sell High means choosing a target price higher than the current price to
        sell high and earn extra USDT.
      </p>
      <div className="mb-2 text-[0.75rem] text-[#FFFFFF]">
        <span className="font-semibold">Available:</span> 0.0005987
      </div>
      <div className="text-[0.625rem] text-[#9A9A9A]">
        <span className="font-semibold">Position size for 100$ Range:</span>{" "}
        0.00001497
      </div>
    </div>
  );
};

export default SellHighInfo;