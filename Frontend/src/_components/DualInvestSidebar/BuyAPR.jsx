import React from "react";

const BuyAPR = ({ items }) => {
  const calculateRemainingTime = (unixTime) => {
    const now = Date.now();
    const timeDifference = unixTime * 1000 - now;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (days > 1) {
      return `${days} Days`;
    } else if (days === 1) {
      return `${days} Day`;
    } else {
      return `${hours} Hours`;
    }
  };

  return (
    <ul className="mb-4 bg-transparent text-white text-shadow-inner text-sm font-medium rounded-none">
      {items.slice(0, 6).map((item, index) => (
        <li key={index} className="mb-4 flex items-center justify-between">
          <span className="text-sm text-white mr-4">${item.exercisePrice}</span>
          <span className="text-sm text-[#01D497]">
            {parseFloat(item.apyDisplay).toFixed(2)}%
          </span>
          <span className="pl-4 text-sm text-white min-w-[84px]">
            {calculateRemainingTime(item.endTime)}
          </span>
          <button className="py-1 px-2 ml-4 bg-[#353638] text-sm text-white rounded-xl hover:border-red-500 border shadow-md self-end">
            Subscribe
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BuyAPR;
