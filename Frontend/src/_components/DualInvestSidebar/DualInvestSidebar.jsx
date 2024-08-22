import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import { useWindowDimensions } from "_components";
import { fetchWrapper } from "_helpers";
import styles from "./styles";
import Switch from "_components/Switch/Switch";
import cryptos from "./cryptos.json";
import CryptoList from "./CryptoList";
import DualInput from "./DualInput";


const baseUrl = `${fetchWrapper.api_url}/api`;

const DualInvestSidebar = ({ show, setShow, dark }) => {
  const { user: authUser } = useSelector((x) => x.auth);
  const dispatch = useDispatch();
  const customStyles = dark ? styles.dark : styles.light;
  let screenWidth = useWindowDimensions().width;

  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [tradeData, setTradeData] = useState({});
  const [amount, setAmount] = useState(100);


  const environment = process.env.REACT_APP_ENVIRONMENT;
  const ws_url =
    environment === "production"
      ? "wss://dualnet-production.up.railway.app"
      : "ws://localhost:3042";

  const handleSwitchChange = (isChecked) => {
    setIsSwitchOn(isChecked);
  };

  const handleCryptoClick = (cryptoName) => {
    setSelectedCrypto(cryptoName);
  };

    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };

  return (
    <div
      style={customStyles}
      className={`${
        show ? "right-0" : "hidden"
      } bg-[#fef6e6] md:w-[${screenWidth}px] h-full px-5 py-3 z-30 transition-transform text-xs dark:bg-[transparent] dark:border-[#6D6D6D] bg-zinc-800 rounded-[25px] font-inter text-white`}
    >
      <CryptoList
        cryptos={cryptos}
        selectedCrypto={selectedCrypto}
        onCryptoClick={handleCryptoClick}
      />
      <div className="w-1/2 flex flex-row px-8">
        <div className="mt-2">
          <span className="mr-4 ">Dual-Invest auto on/off</span>
          <Switch onChange={handleSwitchChange} tradeData={tradeData} />
        </div>
      </div>
      <div className="w-1/3">
        <div>
          <span className="px-8">1 share = 0.2575 USDT</span>
          <DualInput
            label="Amount USDT"
            onChange={handleAmountChange}
            value={amount}
            required={false}
            labelColor="text-[#1D886A]"
          />
        </div>
        <div>
          <span className="px-8">Current Price: $58222</span>
        </div>
        <div>
          <DualInput
            label="Amount BTC"
            onChange={handleAmountChange}
            value={amount}
            required={false}
            labelColor="text-[#F09643]"
          />
          <span className="px-8">1 share = 0.0001 ETH</span>
        </div>
      </div>
    </div>
  );
};

export default DualInvestSidebar;