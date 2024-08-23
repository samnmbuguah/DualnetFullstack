import React from "react";

const DualTrade = ({ buyLowPerShare, sellHighPerShare, currentPrice }) => {
  return (
    <div className="flex flex-col items-start justify-center w-1/3 p-8">
      <BuyLow perShare={buyLowPerShare} />
      <PriceDisplay price={currentPrice} />
      <SellHigh perShare={sellHighPerShare} />
    </div>
  );
};

// Share information
function ShareInfo({ perShare }) {
  return (
    <p className="text-xs font-medium text-zinc-500">1 share = {perShare}</p>
  );
}

function BuyLow({ perShare }) {
  return (
    <div className="flex flex-col w-full">
      <ShareInfo perShare={perShare} />
      <div className="flex items-center justify-between rounded bg-custom-gray w-full min-h-[26px]">
        <label className="text-[#1D886A] text-base font-semibold bg-custom-gray p-1 pl-4 whitespace-nowrap">
          Amount {perShare.split(" ")[1]}
        </label>
        <input
          type="number"
          defaultValue="100"
          className="text-base text-[#9A9A9A] bg-custom-gray w-16 h-8 text-right"
        />
        <button className="text-sm text-[#0336EB] bg-custom-gray p-1 h-8">
          ALL
        </button>
      </div>
    </div>
  );
}

// Set default props
BuyLow.defaultProps = {
  perShare: "0.2575 USDT",
};

function PriceDisplay({ price }) {
  return (
    <p className="text-sm font-medium text-white p-4">Current Price: ${price}</p>
  );
}
PriceDisplay.defaultProps = {
  price: "58222",
};

function SellHigh({ perShare }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between rounded bg-custom-gray w-full min-h-[26px]">
        <label className="text-[#1D886A] text-base font-semibold bg-custom-gray p-1 pl-4 whitespace-nowrap">
          Amount {perShare.split(" ")[1]}
        </label>
        <input
          type="number"
          defaultValue="0.001"
          className="text-base text-[#9A9A9A] bg-custom-gray w-16 h-8 text-right"
        />
        <button className="text-sm text-[#0336EB] bg-custom-gray p-1 h-8">
          ALL
        </button>
      </div>
      <ShareInfo perShare={perShare} />
    </div>
  );
}

SellHigh.defaultProps = {
  perShare: "0.0001 ETH",
};

export default DualTrade;