import React from "react";
import { useSelector } from "react-redux";

const BuyAPR = () => {

  const exerciseCurrencyList = useSelector(
    (state) => state.duals.dualInvestments?.exerciseCurrencyList || []
  );

  return (
    <div className="font-inter-medium bg-transparent text-white font-medium rounded-none w-auto h-auto text-[11px] mb-3">
      <div className="grid grid-cols-5 gap-2 mb-2">
        <span className="font-inter-medium text-xs text-[#1D886A] mr-1 flex items-center justify-center">
          Buy Low
        </span>
        <span className="font-inter flex items-center justify-center">
          lost
        </span>
        <span className="font-inter flex items-center justify-center">
          share
        </span>
        <span className="font-inter flex items-center justify-center">
          Strike
        </span>
        <span className="font-inter flex items-center justify-center">
          APR %
        </span>
      </div>
      {exerciseCurrencyList.slice(0, 4).map((item, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 mb-4">
          {item.buyLowCount > 0 && (
            <span
              className={`font-inter-extrabold mr-1 hover:border-[0.3px] hover:border-[#9A9898] hover:shadow-md w-[30px] h-[15px] rounded-[4px] flex items-center justify-center ${
                item.lostShareCount < 0 ? "bg-[#EA5F00]" : "bg-[#02855F]"
              }`}
            >
              {item.buyLowCount}
            </span>
          )}
          <span className="hover:border-[0.3px] hover:border-[#9A9898] hover:rounded-[3px] hover:shadow-md h-[15px] flex items-center justify-center">
            {item.lostShareCount !== 0 ? item.lostShareCount : ""}
          </span>
          <span
            className={`${
              item.buyLowCount > 0 &&
              item.lostShareCount >= 0 &&
              item.settled === true
                ? "text-[#01D497]"
                : ""
            } hover:border-[0.3px] hover:border-[#9A9898] hover:rounded-[3px] hover:shadow-md h-[15px] flex items-center justify-center`}
          >
            {item.shareCount}
          </span>
          <span
            className={`${
              item.buyLowCount > 0 &&
              item.lostShareCount >= 0 &&
              item.settled === true
                ? "text-[#01D497]"
                : ""
            } hover:border-[0.3px] hover:border-[#9A9898] hover:rounded-[3px] hover:shadow-md h-[15px] flex items-center justify-center`}
          >
            ${item.exercisePrice}
          </span>
          <span
            className={`${
              item.buyLowCount > 0 &&
              item.lostShareCount >= 0 &&
              item.settled === true
                ? "text-[#01D497]"
                : ""
            } hover:border-[0.3px] hover:border-[#9A9898] hover:rounded-[3px] hover:shadow-md h-[15px] flex items-center justify-center`}
          >
            {parseFloat(item.apyDisplay).toFixed(0)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BuyAPR;
