import React, { useState } from "react";

const AprBuyInput = ({ aprToBuy, updateAprToBuy }) => {
  const [isEditingApr, setIsEditingApr] = useState(false);

  const handleAprClick = () => {
    setIsEditingApr(true);
  };

  const handleAprChange = (event) => {
    updateAprToBuy(Number(event.target.value));
  };

  const handleAprBlur = () => {
    setIsEditingApr(false);
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
            value={aprToBuy}
            onChange={handleAprChange}
            onBlur={handleAprBlur}
            className="bg-transparent border-b border-[#01D497] font-inter-semibold focus:outline-none"
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