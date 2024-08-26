import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from "_components";
import styles from "./styles";
import Switch from "_components/Switch/Switch";
import cryptos from "./cryptos.json";
import CryptoList from "./CryptoList";
import DualTrade from "./DualTrade";
import BuyLowInfo from "./ BuyLowInfo.jsx";
import SellHighInfo from "./SellHighInfo";
import {
  fetchInvestmentsByCurrency,
  fetchSpotPrice,
  fetchSpotBalances,
} from "_store/duals.slice";
import BuyAPR from "./BuyAPR";
import SellAPR from "./SellAPR";
import backgroundImage from "../../_assets/chartCurve.svg";

const DualInvestSidebar = ({ show, dark }) => {
  const { user: authUser } = useSelector((x) => x.auth);
  const exerciseCurrencyList = useSelector(
    (state) => state.duals.dualInvestments?.exerciseCurrencyList || []
  );
  const investCurrencyList = useSelector(
    (state) => state.duals.dualInvestments?.investCurrencyList || []
  );
  const spotPrice = useSelector((state) => state.duals.spotPrice);
  const usdtBalance = useSelector((state) => state.duals.usdtBalance);
  const cryptoBalance = useSelector((state) => state.duals.cryptoBalance);
  
  console.log('USDT Balance:', usdtBalance);
  console.log('Crypto Balance:', cryptoBalance);
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
      dispatch(fetchSpotPrice(selectedCrypto + "_USDT"));
      dispatch(
        fetchSpotBalances({
          subClientId: authUser[1].id,
          cryptoCurrency: selectedCrypto,
        })
      );
    }
  }, [selectedCrypto, dispatch, authUser.id]);

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
      style={{
        ...customStyles,
      }}
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
        <div className="w-1/2 flex flex-row items-center px-8 py-4">
          <span className="mr-4">Dual-Invest auto on/off</span>
          <Switch onChange={handleSwitchChange} tradeData={tradeData} />
        </div>
      </div>
      <div
        className="flex flex-row ml-8"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          height: "50vh",
        }}
      >
        <DualTrade
          buyLowPerShare={exerciseCurrencyList[0].perValue}
          sellHighPerShare={investCurrencyList[0].perValue}
          currentPrice={spotPrice}
        />
        <div className="flex flex-col justify-around w-1/3 ml-auto">
          <BuyLowInfo availableAmount={usdtBalance} />
          <SellHighInfo availableAmount={cryptoBalance}/>
        </div>
        <div className="flex flex-col justify-around w-1/3 ml-auto">
          <BuyAPR items={exerciseCurrencyList} />
          <SellAPR items={investCurrencyList} />
        </div>
      </div>
    </div>
  );
};

export default DualInvestSidebar;
