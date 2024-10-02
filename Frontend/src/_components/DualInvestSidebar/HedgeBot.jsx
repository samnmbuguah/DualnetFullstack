import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStrikePrice, addShortBot, updateShortSize } from "_store/duals.slice";
import quantoMultipliers from "./quantoMultipliers.json"; 

function HedgeBot() {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector((state) => state.duals.selectedCrypto);
  const selectedStrikePrice = useSelector((state) => state.duals.selectedStrikePrice);
  const shortSize = useSelector((state) => state.duals.shortSize);
  const spotPrice = useSelector((state) => state.duals.spotPrice);

  const [multiples, setMultiples] = useState([]);

  useEffect(() => {
    const quantoMultiplier = quantoMultipliers[selectedCrypto];
    if (quantoMultiplier) {
      let generatedMultiples = Array.from({ length: 10 }, (_, i) => (i + 1) * quantoMultiplier);
      if (quantoMultiplier.toString().includes('.')) {
        generatedMultiples = generatedMultiples.map(multiple => parseFloat(multiple.toFixed(5)));
      }
      setMultiples(generatedMultiples);
    } else {
      setMultiples([]); 
    }
  }, [selectedCrypto]);

  const handleStrikePriceChange = (event) => {
    const newStrikePrice = event.target.value;
    dispatch(setStrikePrice(newStrikePrice));
  };

  const handleOpenHedgeBot = () => {
    dispatch(addShortBot());
  };

  const handleShortSizeChange = (event) => {
    const selectedIndex = (event.target.selectedIndex + 1)*-1;
    dispatch(updateShortSize(selectedIndex));
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
        <input
          type="number"
          value={selectedStrikePrice}
          onChange={handleStrikePriceChange}
          className="bg-[#25292f] text-[#868585] border border-stone-500 rounded w-20"
        />
      </div>
      <div className="pt-4 w-full">Increment on/off</div>
      <div className="flex justify-between w-full border-b border-stone-500 pb-4">
        <span>Increment</span>
        <span>500$</span>
      </div>
      <div className="flex justify-between w-full pt-4">
        <span>Short Size</span>
        <select
          onChange={handleShortSizeChange}
          className="bg-[#25292f] text-[#868585] border border-stone-500 rounded w-24"
          size={1}
        >
          {multiples.map((multiple, index) => (
            <option key={index} value={multiple}>
              {multiple}
            </option>
          ))}
        </select>
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