import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateBuyLowAmount,
  updateSellHighAmount,
  updateAprToOpen,
} from "_store/duals.slice";
import { BotInputCell } from "_components/BotInputCell/BotInputCell";

const DualTrade = ({
  buyLowPerShare = 0.2575,
  sellHighPerShare = 0.0001,
  currentPrice = "58222",
  selectedCrypto = "BTC",
  usdtBalance,
  cryptoBalance,
  buyLowAmount,
  sellHighAmount,
  aprToOpen,
}) => {
  const dispatch = useDispatch();

  const [isEditingApr, setIsEditingApr] = useState(false);

  const handleBuyLowChange = (event) => {
    const value = Number(event.target.value);
    dispatch(updateBuyLowAmount(value));
  };
  
  const handleSellHighChange = (event) => {
    const value = Number(event.target.value);
    dispatch(updateSellHighAmount(value));
  };
  
  const handleBuyLowAllClick = () => {
    dispatch(updateBuyLowAmount(usdtBalance));
  };

  const handleSellHighAllClick = () => {
    dispatch(updateSellHighAmount(cryptoBalance));
  };

  const handleAprClick = () => {
    setIsEditingApr(true);
  };

  const handleAprChange = (event) => {
    const value = event.target.value;
    dispatch(updateAprToOpen(Number(value)));
  };

  const handleAprBlur = () => {
    setIsEditingApr(false);
  };

  return (
    <div className="flex flex-col items-start justify-center w-3/10">
      <span className="leading-normal">
        APR to open &gt;{" "}
        {isEditingApr ? (
          <BotInputCell
            type="number"
            value={aprToOpen}
            onChange={handleAprChange}
            onBlur={handleAprBlur}
            autoFocus
          />
        ) : (
          <span onClick={handleAprClick}>{aprToOpen}</span>
        )}
        %
      </span>
      <BuyLow
        perShare={buyLowPerShare}
        onChange={handleBuyLowChange}
        onAllClick={handleBuyLowAllClick}
        value={buyLowAmount}
      />
      <PriceDisplay price={currentPrice} />
      <SellHigh
        perShare={sellHighPerShare}
        onChange={handleSellHighChange}
        onAllClick={handleSellHighAllClick}
        value={sellHighAmount}
        currency={selectedCrypto}
      />
    </div>
  );
};

function ShareInfo({ perShare, currency }) {
  return (
    <p className="text-xs font-medium text-zinc-500 pt-2">
      1 share = {perShare} {currency}
    </p>
  );
}

function BuyLow({ perShare, onChange, onAllClick, value }) {
  return (
    <div className="flex flex-col w-full">
      <ShareInfo perShare={perShare} currency="USDT" />
      <div className="flex items-center justify-between rounded-md bg-custom-gray min-h-[26px] w-full">
        <label className="text-[#1D886A] text-base font-semibold bg-custom-gray p-1 pl-4 whitespace-nowrap truncate">
          Amount USDT
        </label>
        <input
          type="number"
          placeholder={100}
          className="text-base text-[#9A9A9A] bg-custom-gray h-8 text-right w-16"
          onChange={onChange}
          value={value}
        />
        <button
          className="text-sm text-[#0336EB] bg-custom-gray p-1 h-8"
          onClick={onAllClick}
        >
          ALL
        </button>
      </div>
    </div>
  );
}

function PriceDisplay({ price = "58222" }) {
  return (
    <p className="text-sm font-medium text-white py-4 pl-10">
      Current Price: ${price}
    </p>
  );
}

function SellHigh({ perShare, onChange, onAllClick, value, currency }) {
  return (
    <div className="flex flex-col w-full pb-4">
      <div className="flex items-center justify-between rounded-md bg-custom-gray min-h-[26px] w-full">
        <label className="text-[#F09643] text-base font-semibold bg-custom-gray p-1 pl-4 whitespace-nowrap truncate">
          Amount {currency}
        </label>
        <input
          type="number"
          placeholder={0.001}
          className="text-base text-[#9A9A9A] bg-custom-gray h-8 text-right w-16"
          onChange={onChange}
          value={value}
        />
        <button
          className="text-sm text-[#0336EB] bg-custom-gray p-1 h-8"
          onClick={onAllClick}
        >
          ALL
        </button>
      </div>
      <ShareInfo perShare={perShare} currency={currency} />
    </div>
  );
}

export default DualTrade;