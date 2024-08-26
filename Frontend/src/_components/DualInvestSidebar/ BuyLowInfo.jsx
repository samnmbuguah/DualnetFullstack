import React from "react";

function BuyLowInfo({
  infoText = 'Buy Low means choosing a target price lower than the current price and buying more crypto at a lower price.',
  availableAmount = 489.36,
  openDuals = 0
}) {
  return (
    <section className="w-full p-4 min-h-1/2">
      <h2 className="text-base font-bold text-teal-700">Buy Low</h2>
      <InfoText text={infoText} />
      <AvailableAmount amount={availableAmount} />
      <OpenedDuals openDuals={openDuals} />
    </section>
  );
}

function InfoText({ text }) {
  return <p className="text-xs text-stone-300 mb-4 font-normal">{text}</p>;
}

function AvailableAmount({ amount }) {
  return <p className="text-sm font-medium text-white">Available {amount.toFixed(2)}</p>;
}

function OpenedDuals({ openDuals }) {
  return (
    <p className="text-xs text-white font-normal">Opened Duals {openDuals}</p>
  );
}

export default BuyLowInfo;