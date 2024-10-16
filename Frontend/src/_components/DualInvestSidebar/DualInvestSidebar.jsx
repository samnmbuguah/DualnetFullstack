import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import DualSwitch from "_components/DualInvestSidebar/DualSwitch";
import CryptoList from "./CryptoList";
// import DualTrade from "./DualTrade";
import {
  fetchInvestmentsByCurrency,
  fetchSpotPrice,
  fetchSpotBalances,
  fetchOpenedDuals,
} from "_store/duals.slice";
// import BuyAPR from "./BuyAPR";
// import SellAPR from "./SellAPR";
// import Curve from "../../_assets/Group454.svg";
import CustomInput from "./CustomInput"
import PriceRangeList from "./PriceRangeList"

const DualInvestSidebar = ({ show, dark }) => {
  const { user: authUser } = useSelector((x) => x.auth);
  // const spotPrice = useSelector((state) => state.duals.spotPrice);
  // const usdtBalance = useSelector((state) => state.duals.usdtBalance);
  // const cryptoBalance = useSelector((state) => state.duals.cryptoBalance);
  const selectedCrypto = useSelector((state) => state.duals.selectedCrypto);
  // const buyLowAmount = useSelector((state) => state.duals.buyLowAmount);
  // const sellHighAmount = useSelector((state) => state.duals.sellHighAmount);
  // const aprToOpen = useSelector((state) => state.duals.aprToOpen);
  // const buyLowPerShare = useSelector((state) => state.duals.buyLowPerShare);
  // const sellHighPerShare = useSelector((state) => state.duals.sellHighPerShare);

  const dispatch = useDispatch();
  const customStyles = dark ? styles.dark : styles.light;

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
    <div className="text-investment max-w-[1024px] rounded-[25px]">
      <div
        style={{
          height: "493px",
          width: "100%",
          minWidth: "650px",
          maxWidth: "1024px",
        }}
        className={`${show ? "right-0" : "hidden"
          } text-xs font-inter text-white flex`}
      >
        <div className="">
          <div>
            <CryptoList dark={dark} />
            <DualSwitch dark={dark} />
          </div>
          <div className="flex h-[400px]">
            <div className="my-auto">
              <div>
                <div className="!text-[#55A388] font-bold xl:text-lg lg:text-md">Buy low</div>
                <div>Spot account 19.520 USDT</div>
                <div className="flex items-center">Investment&nbsp;<CustomInput dark={dark} color={'#01D497'} styleObj={{ width: '50px' }} type={1} /> USDT</div>
              </div>
              <div className="mt-4">
                <div className="!text-[#55A388] font-bold xl:text-lg lg:text-md">Open</div>
                <div className="flex items-center">{`APR >`} <CustomInput dark={dark} color={'#01D497'} styleObj={{ width: '33px' }} type={1} />%</div>
                <div className="flex items-center">Closer strike <CustomInput dark={dark} color={'#01D497'} styleObj={{ width: '33px' }} type={1} />S</div>
                <div className="flex items-center">{`but APR >`} <CustomInput dark={dark} color={'#01D497'} styleObj={{ width: '33px' }} type={1} />%</div>
                <div className="flex items-center">Scale by + <CustomInput dark={dark} color={'#01D497'} styleObj={{ width: '33px' }} type={1} />%</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex flex-row w-full items-center justify-end min-h-full`}>
          <PriceRangeList />
        </div>
      </div>
    </div>
  );
};

export default DualInvestSidebar;
