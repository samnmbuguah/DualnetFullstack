import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateInvestCurrencyShare } from "../../_store/duals.slice";

const SellAPR = ({ dark }) => {
  const dispatch = useDispatch();
  const investCurrencyList = useSelector(
    (state) => state.duals.dualInvestments?.investCurrencyList || []
  );

  const handleShareChange = (index, value) => {
    dispatch(updateInvestCurrencyShare({ index, value }));
  };

  return (
    <div className={`font-inter-medium bg-transparent font-medium rounded-none w-auto h-auto text-[11px] mt-3 ${dark ? 'text-white' : 'text-[#979191]'}`}>
      <div className={`grid grid-cols-5 gap-1 pb-1 mb-4 ${dark ? 'border-b border-[#E2E2E2]' : 'border-b border-[#857F76]'} border-opacity-30`}>
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
        <div key={index} className="grid grid-cols-5 gap-2 mb-4">
          {item.sellHighCount > 0 && (
            <span
              className={`font-inter-extrabold text-white mr-1 hover:border-[0.3px] hover:border-[#9A9898] hover:shadow-md w-[30px] h-[15px] rounded-[4px] flex items-center justify-center ${
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
            <input
              type="number"
              value={item.shareCount}
              onChange={(e) => handleShareChange(index, e.target.value)}
              className="bg-transparent w-[35px] text-center outline-none p-0 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
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
