import React from "react";

const BuyLowInfo = () => {
  return (
    <div className="w-1/2 p-4 bg-[#fef6e6] dark:bg-[#454A57] rounded-md mb-4">
      <h2 className="text-[0.875rem] font-bold mb-2 text-[#1D886A]">Buy Low</h2>
      <p className="text-[0.625rem] mb-4 text-[#D0D0D0]">
        Buy Low means choosing a target price lower than the current price and buying more crypto at a lower price.
      </p>
      <div className="mb-2 text-[0.75rem] text-[#FFFFFF]">
        <span className="font-semibold">Available:</span> 489.36
      </div>
      <div className="text-[0.625rem] text-[#9A9A9A]">
        <span className="font-semibold">Position size for 100$ Range:</span> 122.34$
      </div>
    </div>
  );
};

export default BuyLowInfo;