import React from "react";
import { useSelector } from "react-redux";

const SellAPR = () => {
  const investCurrencyList = useSelector(
    (state) => state.duals.dualInvestments?.investCurrencyList || []
  );

  return (
    <div className="font-inter-medium bg-transparent text-white font-medium rounded-none w-auto h-auto text-[11px] mt-2">
      <div className="grid grid-cols-5 gap-2 mb-2">
        <span className="font-inter-medium text-xs text-[#EA5F00] mr-1 flex items-center justify-center">
          Sell High
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
      {investCurrencyList.slice(0, 4).map((item, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 mb-2">
          {item.sellHighCount > 0 && (
            <span
              className={`font-inter-extrabold mr-1 hover:border-[0.3px] hover:border-[#9A9898] hover:shadow-md w-[30px] h-[15px] rounded-[4px] flex items-center justify-center ${
                item.lostShareCount < 0 ? "bg-[#02855F]" : "bg-[#EA5F00]"
              }`}
            >
              {item.sellHighCount}
            </span>
          )}
          <span className="hover:border-[0.3px] hover:border-[#9A9898] hover:rounded-[3px] hover:shadow-md h-[15px] flex items-center justify-center">
            {item.lostShareCount !== 0 ? item.lostShareCount : ""}
          </span>
          <span
            className={`${
              item.sellHighCount > 0 &&
              item.lostShareCount >= 0 &&
              item.settled === true
                ? "text-[#EA5F00]"
                : ""
            } hover:border-[0.3px] hover:border-[#9A9898] hover:rounded-[3px] hover:shadow-md h-[15px] flex items-center justify-center`}
          >
            {item.shareCount}
          </span>
          <span
            className={`${
              item.sellHighCount > 0 &&
              item.lostShareCount >= 0 &&
              item.settled === true
                ? "text-[#EA5F00]"
                : ""
            } hover:border-[0.3px] hover:border-[#9A9898] hover:rounded-[3px] hover:shadow-md h-[15px] flex items-center justify-center`}
          >
            ${item.exercisePrice}
          </span>
          <span
            className={`${
              item.sellHighCount > 0 &&
              item.lostShareCount >= 0 &&
              item.settled === true
                ? "text-[#EA5F00]"
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

export default SellAPR;
