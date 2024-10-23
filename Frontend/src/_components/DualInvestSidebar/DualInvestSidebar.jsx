import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DualSwitch from "_components/DualInvestSidebar/DualSwitch";
import CryptoList from "./CryptoList";
import {
  fetchSpotPrice,
  fetchSpotBalances,
  updateAprToBuy,
  updateAprThreshold as updateAprToBuyTwo,
  updateCloserStrike,
  updateScaleBy,
  updateAutoDual,
} from "_store/duals.slice";
import CustomInput from "./CustomInput";
import PriceRangeList from "./PriceRangeList";

const DualInvestSidebar = ({ show, dark }) => {
  const { user: authUser } = useSelector((x) => x.auth);
  const selectedCrypto = useSelector((state) => state.duals.selectedCrypto);
  const balances = useSelector((state) => state.duals.balances);
  const dispatch = useDispatch();
  const aprToBuy = useSelector((state) => state.duals.aprToBuy);
  const aprToBuyTwo = useSelector((state) => state.duals.aprThreshold);
  const closerStrike = useSelector((state) => state.duals.closerStrike);
  const scaleBy = useSelector((state) => state.duals.scaleBy);

  useEffect(() => {
    if (selectedCrypto) {
      dispatch(fetchSpotPrice(selectedCrypto + "_USDT"));
      dispatch(
        fetchSpotBalances({
          subClientId: authUser[1].id,
          cryptoCurrency: selectedCrypto,
        })
      );
    }
  }, [selectedCrypto, dispatch, authUser]);

  useEffect(() => {
    dispatch(updateAutoDual({})); // Pass an empty object
  }, [aprToBuy, aprToBuyTwo, closerStrike, scaleBy, selectedCrypto, dispatch, authUser]);

  return (
    <div className="text-investment max-w-[1024px] rounded-[25px]">
      <div
        style={{
          height: "493px",
          width: "100%",
          minWidth: "650px",
          maxWidth: "1024px",
        }}
        className={`${
          show ? "right-0" : "hidden"
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
                      value={aprToBuy}
                      onChange={(e) => dispatch(updateAprToBuy(e.target.value))}
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
                      value={closerStrike}
                      onChange={(e) => dispatch(updateCloserStrike(e.target.value))}
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
                      value={aprToBuyTwo}
                      onChange={(e) => dispatch(updateAprToBuyTwo(e.target.value))}
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
                      value={scaleBy}
                      onChange={(e) => dispatch(updateScaleBy(e.target.value))}
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
