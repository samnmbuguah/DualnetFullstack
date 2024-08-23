import React, { memo } from "react";

const BuyAPR = ({ items }) => {
  console.log("Buy APR items", items);
  return (
    <div className="w-full p-4 bg-[#fef6e6] dark:bg-[#454A57] rounded-md mb-4">
      <h2 className="text-[0.875rem] font-bold mb-2 text-[#1D886A]">Buy APR</h2>
      <ul className="mb-4">
        {items.slice(0, 6).map((item, index) => (
          <li key={index} className="mb-2">
            <div className="text-[0.75rem] text-[#FFFFFF]">
              <span className="font-semibold">Price:</span> {item.exercisePrice}
            </div>
            <div className="text-[0.75rem] text-green-500">
              <span className="font-semibold">APR:</span> {item.apyDisplay}
            </div>
            <div className="text-[0.75rem] text-[#FFFFFF]">
              <span className="font-semibold">Days:</span> {item.endTime}
            </div>
          </li>
        ))}
      </ul>
      <button className="w-full py-2 bg-[#1D886A] text-white rounded-md hover:border-red-500 border-2">
        Subscribe
      </button>
    </div>
  );
};

export default memo(BuyAPR);