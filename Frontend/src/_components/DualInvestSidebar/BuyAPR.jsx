import React, { memo } from "react";

const BuyAPR = ({ items }) => {
  console.log("Buy APR items", items);

  const calculateRemainingTime = (unixTime) => {
    const now = Date.now();
    const timeDifference = unixTime * 1000 - now; // Convert unixTime to milliseconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 1) {
      return `${days} Days`;
    } else if (days === 1) {
      return `${days} Day`;
    } else {
      return `${hours} Hours`;
    }
  };

  return (
    <div className="p-4 mb-4 bg-transparent text-white">
      <ul className="mb-4">
        {items
          .slice(0, 6)
          .map((item, index) => (
            <li key={index} className="mb-2 flex items-center justify-between">
              <div className="text-sm text-white">${item.exercisePrice}</div>
              <div className="text-sm text-[#01D497]">
                {parseFloat(item.apyDisplay).toFixed(2)}%
              </div>
              <div className="text-sm text-white">
                {calculateRemainingTime(item.endTime)}
              </div>
              <button className="py-1 px-2 bg-[#353638] text-white rounded-xl hover:border-red-500 border">
                Subscribe
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default memo(BuyAPR);