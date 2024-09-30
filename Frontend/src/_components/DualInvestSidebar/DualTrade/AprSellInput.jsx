import React, { useState } from "react";

const AprSellInput = ({ aprToSell, updateAprToSell }) => {
  const [isEditingApr, setIsEditingApr] = useState(false);

  const handleAprClick = () => {
    setIsEditingApr(true);
  };

  const handleAprChange = (event) => {
    updateAprToSell(Number(event.target.value));
  };

  const handleAprBlur = () => {
    setIsEditingApr(false);
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
                value={aprToSell}
                onChange={handleAprChange}
                onBlur={handleAprBlur}
                className="bg-transparent border-b border-[#EA5F00] font-inter-semibold focus:outline-none"
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
