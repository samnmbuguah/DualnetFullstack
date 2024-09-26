import React from "react";
import CryptoItem from "./CryptoItem";

const CryptoList = ({ cryptos, selectedCrypto, onCryptoClick }) => {
  return (
    <div className="flex border-b border-stone-500 pt-4 w-full items-end">
      <div className="flex flex-row flex-wrap justify-around">
        {cryptos.map((crypto) => (
          <CryptoItem
            key={crypto.name}
            crypto={crypto}
            selectedCrypto={selectedCrypto}
            onClick={onCryptoClick}
          />
        ))}
      </div>
      <div className="text-sm text-white w-1/3 ml-auto mb-2">
        <span className="pr-10 pl-4">Strike</span>
        <span className="pr-10">Apr</span>
        <span className="pr-10">Term</span>
      </div>
    </div>
  );
};

export default CryptoList;