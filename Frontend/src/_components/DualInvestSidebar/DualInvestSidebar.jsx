import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DualSwitch from "_components/DualInvestSidebar/DualSwitch";
import CryptoList from "./CryptoList";
import {
  fetchSpotPrice,
  fetchSpotBalances,
  updateAutoDual,
  fetchAutoDual
} from "_store/duals.slice";
import CustomInput from "./CustomInput";
import PriceRangeList from "./PriceRangeList";

const DualInvestSidebar = ({ show, dark }) => {
  const { user: authUser } = useSelector((x) => x.auth);
  const { selectedCrypto, balances, dualInfo } = useSelector((state) => state.duals);
  const dualInfoRef = useRef({}) 

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCrypto) {
      dispatch(fetchSpotPrice(selectedCrypto + "_USDT"));
      dispatch(
        fetchSpotBalances({
          subClientId: authUser[1].id,
          cryptoCurrency: selectedCrypto,
        })
      );
      dispatch(fetchAutoDual({
        subClientId: authUser[1].id,
        currency: selectedCrypto
      }));
    }
  }, [selectedCrypto, authUser]);

  useEffect(() => {
    dualInfoRef.current = {
      aprToBuy: dualInfo.threshold || 0,
      aprToBuyTwo: dualInfo.aprThreshold || 0, // New state variable for APR >
      closerStrike: dualInfo.closerStrike || 0,  // New state variable for Closer strike
      scaleBy: dualInfo.scaleBy || 0,   
    }
  }, [dualInfo])

  const handleCustomInputVal = (val, key) => {
    switch (key) {
      case 1:
        dualInfoRef.current = {...dualInfoRef.current, aprToBuy: val}
        break;
      case 2:
        dualInfoRef.current = {...dualInfoRef.current, closerStrike: val}
        break;
      case 3:
        dualInfoRef.current = {...dualInfoRef.current, aprToBuyTwo: val}
        break;
      case 4:
        dualInfoRef.current = {...dualInfoRef.current, scaleBy: val}
        break;
      default:
        break;
    }
    console.log(dualInfoRef.current, 'handleCustomInputVal');
    dispatch(updateAutoDual(dualInfoRef.current))
  }

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
                <div className="!text-[#55A388] font-bold xl:text-lg lg:text-md">
                  Buy low
                </div>
                <div className="flex justify-between">
                  Spot account:&nbsp;&nbsp; <span>{balances && balances[0] !== undefined && !isNaN(parseFloat(balances[0])) ? parseFloat(balances[0]).toFixed(2) : 0} USDT</span>
                </div>
                <div className="flex items-center justify-between">
                  Investment&nbsp;
                  <span className="flex items-center">
                    <CustomInput
                      dark={dark}
                      color={"#01D497"}
                      styleObj={{ width: "50px" }}
                      type={1}
                      value={0} // Assuming this is a controlled input, set a default value
                    />{" "}
                    USDT
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="!text-[#55A388] font-bold xl:text-lg lg:text-md">
                  Open
                </div>
                <div className="flex items-center justify-between">
                  {`APR >`}{" "}
                  <span className="flex items-center">
                    <CustomInput
                      dark={dark}
                      color={"#01D497"}
                      styleObj={{ width: "50px" }}
                      type={1}
                      val={dualInfo.threshold || 0} // Fallback to 0 if undefined
                      handleCustomInputVal={handleCustomInputVal}
                      index={1}
                    />
                    %
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  Closer strike{" "}
                  <span className="flex items-center">
                    <CustomInput
                      dark={dark}
                      color={"#01D497"}
                      styleObj={{ width: "50px" }}
                      type={1}
                      val={dualInfo.closerStrike || 0}
                      handleCustomInputVal={handleCustomInputVal}
                      index={2}
                    />
                    &nbsp;$
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  {`but APR >`}{" "}
                  <span className="flex items-center">
                    <CustomInput
                      dark={dark}
                      color={"#01D497"}
                      styleObj={{ width: "50px" }}
                      type={1}
                      val={dualInfo.aprThreshold || 0}
                      handleCustomInputVal={handleCustomInputVal}
                      index={3}
                    />
                    %
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  Scale by +{" "}
                  <span className="flex items-center">
                    <CustomInput
                      dark={dark}
                      color={"#01D497"}
                      styleObj={{ width: "50px" }}
                      type={1}
                      val={dualInfo.scaleBy || 0}
                      handleCustomInputVal={handleCustomInputVal}
                      index={4}
                    />
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-row w-full items-center justify-end min-h-full`}
        >
          <PriceRangeList />
        </div>
      </div>
    </div>
  );
};

export default DualInvestSidebar;
