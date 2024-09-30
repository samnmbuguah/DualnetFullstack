import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from "_components";
import styles from "./styles";
import DualSwitch from "_components/DualInvestSidebar/DualSwitch";
import CryptoList from "./CryptoList";
import DualTrade from "./DualTrade";
import {
  fetchInvestmentsByCurrency,
  fetchSpotPrice,
  fetchSpotBalances,
  fetchOpenedDuals,
} from "_store/duals.slice";
import BuyAPR from "./BuyAPR";
import SellAPR from "./SellAPR";
import Curve from "../../_assets/Group454.svg";

const DualInvestSidebar = ({ show, dark }) => {
  const { user: authUser } = useSelector((x) => x.auth);
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

  return (
    <div
      style={{
        ...customStyles,
        height: "493px",
        width: "100%", // Set width to 100%
      }}
      className={`${
        show ? "right-0" : "hidden"
      } bg-[#fef6e6] px-5 py-4 text-xs dark:bg-[transparent] dark:border-[#6D6D6D] rounded-[25px] font-inter text-white flex flex-col justify-between bg-[url('/_assets/Line 207.svg')] bg-no-repeat bg-center`}
    >
      <div>
        <CryptoList />
        <DualSwitch />
      </div>
      <div className="flex flex-row w-full items-center justify-between bg-line207">
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
        <img src={Curve} alt="Curve illustration" />
        <div className="flex flex-col ml-auto h-full justify-between">
          <BuyAPR />
          <span className="font-inter-semibold text-xxs self-end">
            BTC Last Price:
          </span>
          <SellAPR />
        </div>
      </div>
    </div>
  );
};

export default DualInvestSidebar;
