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
  buyLowPerShare = 0.63785,
  sellHighPerShare = 0.0001,
  currentPrice = "58222",
  selectedCrypto = "BTC",
  usdtBalance = 22.589,
  cryptoBalance = 0.0,
  buyLowAmount,
  sellHighAmount,
  aprToBuy = 400,
  aprToSell = 400,
}) => {
  const dispatch = useDispatch();

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
          labelColor="text-[#01D497]"
          value={buyLowAmount / buyLowPerShare}
          onChange={(value) =>
            dispatch(updateBuyLowAmount(value * buyLowPerShare))
          }
        />
        <ShareInput
          label="$"
          labelColor="text-[#01D497]"
          value={buyLowAmount}
          onChange={(value) => dispatch(updateBuyLowAmount(Number(value)))}
        />
      </div>

      <div className="flex justify-between w-full">
        <ShareInput
          label="share"
          labelColor="text-[#EA5F00]"
          value={sellHighAmount / sellHighPerShare}
          onChange={(value) =>
            dispatch(updateSellHighAmount(value * sellHighPerShare))
          }
        />
        <ShareInput
          label={selectedCrypto}
          labelColor="text-[#EA5F00]"
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