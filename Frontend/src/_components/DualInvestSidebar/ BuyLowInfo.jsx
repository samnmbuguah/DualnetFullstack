import React from "react";

function BuyLowInfo({
  infoText = 'Buy Low means choosing a target price lower than the current price and buying more crypto at a lower price.',
  availableAmount = 489.36,
  positionAmount = 100,
  positionRange = 122.34
}) {
  return (
    <section className="w-full max-w-[273px] p-4 mt-14">
      <h2 className="text-base font-bold text-teal-700">Buy Low</h2>
      <InfoText text={infoText} />
      <AvailableAmount amount={availableAmount} />
      <PositionSize amount={positionAmount} range={positionRange} />
    </section>
  );
}

function InfoText({ text }) {
  return <p className="text-xs text-stone-300 mb-4">{text}</p>;
}

function AvailableAmount({ amount }) {
  return <p className="text-sm font-bold text-white">Available {amount.toFixed(2)}</p>;
}

function PositionSize({ amount, range }) {
  return (
    <p className="text-xs text-neutral-400">Position size for {amount}$ Range ({range.toFixed(2)}$)</p>
  );
}

export default BuyLowInfo;