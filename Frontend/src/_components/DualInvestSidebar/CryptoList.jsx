import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedCrypto } from "../../_store/duals.slice";

const CryptoList = ({ dark }) => {
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
    <div className={`inline-flex flex-wrap w-[389px] pt-1 justify-between items-center bg-transparent font-inter-medium border-b ${dark ? 'border-[#484746]' : 'border-[#C3C3C3]'} rounded-sm`}>
      {cryptoList.map((crypto, index) => (
        <button
          key={crypto}
          onClick={() => handleCryptoClick(crypto)}
          className={`text-xxs font-inter-medium rounded transition-colors ${
            selectedCrypto === crypto
              ? "!text-[#30B58B]"
              : dark
              ? "!text-[#FFFFFF] hover:text-[#30B58B]"
              : "!text-[#979191] hover:text-[#30B58B]"
          } ${index !== 0 && index !== cryptoList.length - 1 ? "mx-2" : ""}`}
          style={{
            textShadow: dark
              ? "inset 0px 0px 0.3px rgba(255, 255, 255, 0.5)"
              : "inset 0px 0px 0.3px rgba(0, 0, 0, 0.5)",
          }}
        >
          {crypto}
        </button>
      ))}
    </div>
  );
};

export default CryptoList;
