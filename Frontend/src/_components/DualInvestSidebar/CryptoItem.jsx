import React from "react";

const CryptoItem = ({ crypto, selectedCrypto, onClick }) => {
  return (
    <div
      key={crypto.name}
      className="flex flex-col items-center mb-2 mr-4 cursor-pointer"
      onClick={() => onClick(crypto.name)}
    >
      <img src={crypto.logo} alt={crypto.name} className="w-8 h-8 mb-2" />
      <span
        className={`${
          selectedCrypto === crypto.name ? "text-green-500" : "text-white"
        }`}
      >
        {crypto.name}
      </span>
    </div>
  );
};

export default CryptoItem;