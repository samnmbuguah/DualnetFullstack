import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedCrypto } from "../../_store/duals.slice";

const CryptoList = () => {
  const selectedCrypto = useSelector((state) => state.duals.selectedCrypto);
  const dispatch = useDispatch();

  const cryptoList = [
    "ETH",
    "BTC",
    "DOGS",
    "DOGE",
    "GMX",
    "APT",
    "ARB",
    "SOL",
    "PEPE",
  ];

  const handleCryptoClick = (crypto) => {
    dispatch(updateSelectedCrypto(crypto));
  };
  return (
    <div className="inline-flex flex-wrap w-[487px] justify-between items-center py-2 bg-[#24282E] font-inter-medium border-b border-[#857F76] rounded-sm">
      {cryptoList.map((crypto, index) => (
        <button
          key={crypto}
          onClick={() => handleCryptoClick(crypto)}
          className={`text-xxs font-inter-medium rounded transition-colors ${
            selectedCrypto === crypto
              ? "text-[#15FF00]"
              : "text-[#FFFFFF] hover:text-[#15FF00]"
          } ${index !== 0 && index !== cryptoList.length - 1 ? "mx-2" : ""}`}
        >
          {crypto}
        </button>
      ))}
    </div>
  );
};

export default CryptoList;
