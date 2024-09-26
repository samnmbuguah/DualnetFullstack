import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from "_components";
import styles from "./styles";
import DualSwitch from "_components/DualInvestSidebar/DualSwitch";
import cryptos from "./cryptos.json";
import CryptoList from "./CryptoList";
import DualTrade from "./DualTrade";
import {
  fetchInvestmentsByCurrency,
  fetchSpotPrice,
  fetchSpotBalances,
  updateSelectedCrypto,
  fetchOpenedDuals,
} from "_store/duals.slice";
import BuyAPR from "./BuyAPR";
import SellAPR from "./SellAPR";
import backgroundImage from "../../_assets/chartCurve.svg";
import HedgeBot from "./HedgeBot";

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
  const selectedCrypto = useSelector((state) => state.duals.selectedCrypto);
  const buyLowAmount = useSelector((state) => state.duals.buyLowAmount);
  const sellHighAmount = useSelector((state) => state.duals.sellHighAmount);
  const aprToOpen = useSelector((state) => state.duals.aprToOpen);
  const buyLowPerShare = useSelector((state) => state.duals.buyLowPerShare);
  const sellHighPerShare = useSelector((state) => state.duals.sellHighPerShare);
  
  const dispatch = useDispatch();
  const customStyles = dark ? styles.dark : styles.light;
  let screenWidth = useWindowDimensions().width;

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
      dispatch(fetchOpenedDuals(selectedCrypto));
    }
  }, [selectedCrypto, dispatch, authUser]);

  const handleCryptoClick = (cryptoName) => {
    dispatch(updateSelectedCrypto(cryptoName));
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
          <DualSwitch />
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
          buyLowPerShare={buyLowPerShare}
          sellHighPerShare={sellHighPerShare}
          currentPrice={spotPrice}
          selectedCrypto={selectedCrypto}
          usdtBalance={usdtBalance}
          cryptoBalance={cryptoBalance}
          buyLowAmount={buyLowAmount}
          sellHighAmount={sellHighAmount}
          aprToOpen={aprToOpen}
        />
        <HedgeBot />
        <div className="flex flex-col justify-around w-1/3 ml-auto">
          <BuyAPR items={exerciseCurrencyList} />
          <SellAPR items={investCurrencyList} />
        </div>
      </div>
    </div>
  );
};

export default DualInvestSidebar;