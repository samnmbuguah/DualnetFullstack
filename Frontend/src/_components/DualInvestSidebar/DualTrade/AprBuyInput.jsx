import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAprToBuy } from "../../../_store/duals.slice";

const AprBuyInput = () => {
  const dispatch = useDispatch();
  const aprToBuy = useSelector((state) => state.duals.aprToBuy);
  const [isEditingApr, setIsEditingApr] = useState(false);
  const [localAprValue, setLocalAprValue] = useState(aprToBuy);

  useEffect(() => {
    setLocalAprValue(aprToBuy);
  }, [aprToBuy]);

  const handleAprClick = () => {
    setIsEditingApr(true);
  };

  const handleAprChange = (event) => {
    setLocalAprValue(event.target.value);
  };

  const handleAprBlur = () => {
    setIsEditingApr(false);
    dispatch(updateAprToBuy(Number(localAprValue)));
  };

  return (
    <div className="flex justify-between w-auto ml-4 mt-7">
      <span
        className="font-inter-semibold cursor-pointer text-xxs leading-normal text-[#01D497] shadow-inner"
        onClick={handleAprClick}
      >
        APR to open:{" "}
        {isEditingApr ? (
          <input
            type="number"
            value={localAprValue}
            onChange={handleAprChange}
            onBlur={handleAprBlur}
            className="bg-transparent border-b border-[#01D497] font-inter-semibold focus:outline-none w-[42px]"
            autoFocus
          />
        ) : (
          `${aprToBuy}%`
        )}
      </span>
    </div>
  );
};

export default AprBuyInput;
