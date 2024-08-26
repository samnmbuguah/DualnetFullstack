import React from "react";

const DualTrade = ({ buyLowPerShare, sellHighPerShare, currentPrice, aprToOpen}) => {
  return (
    <div className="flex flex-col items-start justify-center w-3/10">
      <span className="leading-normal">
        APR to open &gt; <span>{aprToOpen}</span>%
      </span>
      <BuyLow perShare={buyLowPerShare} />
      <PriceDisplay price={currentPrice} />
      <SellHigh perShare={sellHighPerShare} />
    </div>
  );
};

// Share information
function ShareInfo({ perShare }) {
  return (
    <p className="text-xs font-medium text-zinc-500 pt-2">1 share = {perShare}</p>
  );
}

function BuyLow({ perShare = "0.2575 USDT" }) {
  return (
    <div className="flex flex-col w-full">
      <ShareInfo perShare={perShare} />
      <div className="flex items-center justify-between rounded-md bg-custom-gray min-h-[26px] w-full">
        <label className="text-[#1D886A] text-base font-semibold bg-custom-gray p-1 pl-4 whitespace-nowrap truncate">
          Amount {perShare.split(" ")[1]}
        </label>
        <input
          type="number"
          defaultValue="100"
          className="text-base text-[#9A9A9A] bg-custom-gray h-8 text-right w-16"
        />
        <button className="text-sm text-[#0336EB] bg-custom-gray p-1 h-8">
          ALL
        </button>
      </div>
    </div>
  );
}

function PriceDisplay({ price = "58222" }) {
  return (
    <p className="text-sm font-medium text-white py-4 pl-10">Current Price: ${price}</p>
  );
}

function SellHigh({ perShare = "0.0001 ETH" }) {
  return (
    <div className="flex flex-col w-full pb-4">
      <div className="flex items-center justify-between rounded-md bg-custom-gray min-h-[26px] w-full">
        <label className="text-[#F09643] text-base font-semibold bg-custom-gray p-1 pl-4 whitespace-nowrap truncate">
          Amount {perShare.split(" ")[1]}
        </label>
        <input
          type="number"
          defaultValue="0.001"
          className="text-base text-[#9A9A9A] bg-custom-gray h-8 text-right w-16"
        />
        <button className="text-sm text-[#0336EB] bg-custom-gray p-1 h-8">
          ALL
        </button>
      </div>
      <ShareInfo perShare={perShare} />
    </div>
  );
}

export default DualTrade;