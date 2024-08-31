import React from "react";

const SellAPR = ({ items }) => {
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
    <ul className="min-h-1/2 bg-transparent text-white text-shadow-inner text-sm font-medium rounded-none">
      {items.slice(0, 6).map((item, index) => (
        <li key={index} className="mb-4 flex items-center">
          <span className="text-sm text-white pr-6">${item.exercisePrice}</span>
          <span className="text-sm text-[#EA5F00] pr-6">
            {parseFloat(item.apyDisplay).toFixed(2)}%
          </span>
          <span className="text-sm text-white pr-6">
            {calculateRemainingTime(item.deliveryTime)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default SellAPR;
