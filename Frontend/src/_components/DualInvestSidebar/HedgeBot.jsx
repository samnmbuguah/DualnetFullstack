import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStrikePrice, openHedgeBot, updateShortSize } from "_store/duals.slice";

function HedgeBot() {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector((state) => state.duals.selectedCrypto);
  const strikePrices = useSelector((state) => state.duals.strikePrices);
  const selectedStrikePrice = useSelector((state) => state.duals.selectedStrikePrice);
  const shortSize = useSelector((state) => state.duals.shortSize);

  const handleStrikePriceChange = (event) => {
    const newStrikePrice = event.target.value;
    dispatch(setStrikePrice(newStrikePrice));
  };

  const handleOpenHedgeBot = () => {
    dispatch(openHedgeBot());
  };

  const handleShortSizeChange = (event) => {
    dispatch(updateShortSize(event.target.value));
  };

  return (
    <section className="flex flex-col items-center justify-center w-1/3 ml-auto bg-[#25292f] p-8 text-sm text-[#868585]">
      <h4 className="text-sm text-[#1D8EFF] pb-4">Settings Hedge-Bot</h4>
      <div className="flex justify-between w-full">
        <span>Crypto Pair</span>
        <span>{selectedCrypto}_USDT</span>
      </div>
      <div className="flex justify-between w-full border-b border-stone-500 pb-4">
        <span>Triggerprice</span>
        <select
          value={selectedStrikePrice}
          onChange={handleStrikePriceChange}
          className="bg-[#25292f] text-[#868585] border border-stone-500 rounded"
        >
          {strikePrices.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-4 w-full">Increment on/off</div>
      <div className="flex justify-between w-full border-b border-stone-500 pb-4">
        <span>Increment</span>
        <span>500$</span>
      </div>
      <div className="flex justify-between w-full pt-4">
        <span>Short Size</span>
        $<input
          type="number"
          value={shortSize}
          onChange={handleShortSizeChange}
          className="bg-[#25292f] text-[#868585] border border-stone-500 rounded w-16"
        />
      </div>
      <div className="flex justify-between w-full">
        <span>Leverage</span>
        <span>1x</span>
      </div>
      <button
        className="self-center mt-4 px-6 py-2 max-w-full text-white bg-[#FF1D1D] rounded w-auto"
        onClick={handleOpenHedgeBot}
      >
        Hedge-Bot-Open
      </button>
    </section>
  );
}

export default HedgeBot;