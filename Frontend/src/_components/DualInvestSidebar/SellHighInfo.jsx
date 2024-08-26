import React from 'react';

function SellHighInfo({
  infoText = "Sell High means choosing a target price higher than the current price to sell high and earn extra USDT.",
  availableAmount = 0.0005987,
  openDuals = 0,
}) {
  return (
    <section className="w-full p-4 min-h-1/2">
      <h2 className="text-base font-bold text-orange-400">Sell High</h2>
      <InfoText text={infoText} />
      <AvailableAmount amount={availableAmount} />
      <OpenedDuals openDuals={openDuals} />
    </section>
  );
}

function InfoText({ text }) {
  return <p className="text-xs text-stone-300 mb-4">{text}</p>;
}

function AvailableAmount({ amount }) {
  return <p className="text-sm font-medium text-white">Available {amount.toFixed(2)}</p>;
}

function OpenedDuals({ openDuals }) {
  return (
    <p className="text-xs text-white font-normal">Opened Duals {openDuals}</p>
  );
}

export default SellHighInfo;