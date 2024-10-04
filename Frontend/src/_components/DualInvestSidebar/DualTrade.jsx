import React from "react";
import { useDispatch } from "react-redux";
import {
  updateBuyLowAmount,
  updateSellHighAmount,
  updateAprToBuy,
  updateAprToSell,
} from "_store/duals.slice";
import AprBuyInput from "./DualTrade/AprBuyInput";
import ShareInput from "./DualTrade/ShareInput";
import AvailableBalance from "./DualTrade/AvailableBalance";
import AprSellInput from "./DualTrade/AprSellInput";

const DualTrade = ({
  dark,
  buyLowPerShare = 156,
  sellHighPerShare = 156,
  selectedCrypto = "BTC",
  usdtBalance = 22.589,
  cryptoBalance = 0.0,
  buyLowAmount = 100,
  sellHighAmount = 0.00156,
  aprToBuy = 400,
  aprToSell = 400,
}) => {
  const dispatch = useDispatch();
  const textColor = dark ? "text-[#01D497]" : "text-[#857F76]";
  const textColor2 = dark ? "text-[#FFFFFF]" : "text-[#857F76]";
  const textColor3 = dark ? "text-[#EA5F00]" : "text-[#857F76]";
  const textColor4 = dark ? "text-[#FFFFFF]" : "text-[#857F76]";

  return (
    <div className="flex flex-col items-start justify-center w-auto h-auto bg-transparent rounded-lg">
      <AprBuyInput
        aprToBuy={aprToBuy}
        updateAprToBuy={(value) => dispatch(updateAprToBuy(value))}
      />

      <AvailableBalance
        shareValue={buyLowPerShare}
        balance={usdtBalance}
        currency="USDT"
      />

      <div className="flex justify-between w-full">
        <ShareInput
          label="share"
          dark={dark}
          labelType="buy"
          textColor={textColor}
          value={buyLowPerShare}
          onChange={(value) =>
            dispatch(updateBuyLowAmount(value * buyLowPerShare))
          }
        />
        <ShareInput
          label="$"
          dark={dark}
          labelType="buy"
          textColor={textColor2}
          value={buyLowAmount}
          onChange={(value) => dispatch(updateBuyLowAmount(Number(value)))}
        />
      </div>

      <div className="flex justify-between w-full">
        <ShareInput
          label="share"
          dark={dark}
          labelType="sell"
          textColor={textColor3}
          value={sellHighPerShare}
          onChange={(value) =>
            dispatch(updateSellHighAmount(value * sellHighPerShare))
          }
        />
        <ShareInput
          label={selectedCrypto}
          dark={dark}
          labelType="sell"
          textColor={textColor4}
          value={sellHighAmount}
          onChange={(value) => dispatch(updateSellHighAmount(Number(value)))}
        />
      </div>

      <AvailableBalance
        shareValue={sellHighPerShare}
        balance={cryptoBalance}
        currency={selectedCrypto}
      />

      <AprSellInput
        aprToSell={aprToSell}
        updateAprToSell={(value) => dispatch(updateAprToSell(value))}
      />
    </div>
  );
};

export default DualTrade;
