import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from "_components";
import styles from "./styles";
import Switch from "_components/Switch/Switch";
import cryptos from "./cryptos.json";
import CryptoList from "./CryptoList";
import DualInput from "./DualInput";
import Threshold from "./Threshold";
import BuyLowInfo from "./ BuyLowInfo.jsx";
import SellHighInfo from "./SellHighInfo";
import { fetchInvestmentsByCurrency } from "_store/bots.slice";
import BuyAPR from "./BuyAPR";
import SellAPR from "./SellAPR";

const DualInvestSidebar = ({ show, dark }) => {
  const { user: authUser } = useSelector((x) => x.auth);
  const exerciseCurrencyList = useSelector((state) => state.bots.dualInvestments?.exerciseCurrencyList || []);
  const investCurrencyList = useSelector((state) => state.bots.dualInvestments?.investCurrencyList || []);
  const dispatch = useDispatch();
  const customStyles = dark ? styles.dark : styles.light;
  let screenWidth = useWindowDimensions().width;

  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [tradeData, setTradeData] = useState({});
  const [amount, setAmount] = useState(100);

  useEffect(() => {
    if (selectedCrypto) {
      dispatch(fetchInvestmentsByCurrency(selectedCrypto));
    }
  }, [selectedCrypto, dispatch]); 

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
      } bg-[#fef6e6] md:w-[${screenWidth}px] min-h-full px-4 py-3 z-30 transition-transform text-xs dark:bg-[transparent] dark:border-[#6D6D6D] bg-zinc-800 rounded-[25px] font-inter text-white flex flex-col justify-between`}
    >
      <div>
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
      </div>
      <div className="flex flex-row">
        <div className="w-1/3 py-24">
          <div>
            <span className="px-8 text-[#868585]">1 share = 0.2575 USDT</span>
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
            <span className="px-8 text-[#868585]">1 share = 0.0001 ETH</span>
          </div>
        </div>
        <div className="flex flex-col">
          <BuyLowInfo />
          <SellHighInfo />
        </div>
        <div>
          <BuyAPR items={exerciseCurrencyList} />
          <SellAPR items={investCurrencyList} />
        </div>
      </div>
      <div className="w-3/5">
        <Threshold />
      </div>
    </div>
  );
};

export default DualInvestSidebar;
