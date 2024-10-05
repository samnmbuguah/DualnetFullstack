import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAprToSell } from "../../../_store/duals.slice";

const AprSellInput = () => {
  const dispatch = useDispatch();
  const aprToSell = useSelector((state) => state.duals.aprToSell);
  const [isEditingApr, setIsEditingApr] = useState(false);
  const [localAprValue, setLocalAprValue] = useState(aprToSell);

  useEffect(() => {
    setLocalAprValue(aprToSell);
  }, [aprToSell]);

  const handleAprClick = () => {
    setIsEditingApr(true);
  };

  const handleAprChange = (event) => {
    setLocalAprValue(event.target.value);
  };

  const handleAprBlur = () => {
    setIsEditingApr(false);
    dispatch(updateAprToSell(Number(localAprValue)));
  };

  return (
    <>
      <div className="flex justify-between w-auto ml-4 mt-1">
        <span
          className="font-inter-semibold cursor-pointer text-xxs leading-normal text-[#EA5F00] shadow-inner"
          onClick={handleAprClick}
        >
          APR to sell:{" "}
          {isEditingApr ? (
            <input
              type="number"
              value={localAprValue}
              onChange={handleAprChange}
              onBlur={handleAprBlur}
              className="bg-transparent border-b border-[#EA5F00] font-inter-semibold focus:outline-none w-[42px]"
              autoFocus
            />
          ) : (
            `${aprToSell}%`
          )}
        </span>
      </div>
      <span className="font-inter-medium text-xxs ml-4 mb-2 leading-normal text-[#868585]">
        Sell High shift: +1
      </span>
    </>
  );
};

export default AprSellInput;
