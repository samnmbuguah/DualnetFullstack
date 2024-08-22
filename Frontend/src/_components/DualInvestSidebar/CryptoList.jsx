import React from "react";
import CryptoItem from "./CryptoItem";

const CryptoList = ({ cryptos, selectedCrypto, onCryptoClick }) => {
  return (
    <div className="border-b border-stone-500 flex flex-row flex-wrap justify-around px-4 w-3/5">
      {cryptos.map((crypto) => (
        <CryptoItem
          key={crypto.name}
          crypto={crypto}
          selectedCrypto={selectedCrypto}
          onClick={onCryptoClick}
        />
      ))}
    </div>
  );
};

export default CryptoList;