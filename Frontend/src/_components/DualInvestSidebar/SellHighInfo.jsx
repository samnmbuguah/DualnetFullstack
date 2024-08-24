import React from 'react';

function SellHighInfo({
  infoText = 'Sell High means choosing a target price higher than the current price to sell high and earn extra USDT.',
  availableAmount = 0.0005987,
  positionAmount = 100,
  positionRange = 0.00001497
}) {
  return (
    <section className="w-full max-w-[273px] p-4 mb-16"> 
      <h2 className="text-base font-bold text-orange-400">Sell High</h2>
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
  return <p className="text-sm font-bold text-white">Available {amount.toFixed(7)}</p>;
}

function PositionSize({ amount, range }) {
  return (
    <p className="text-xs text-neutral-400">Position size for {amount}$ Range ({range.toFixed(8)})</p>
  );
}

export default SellHighInfo;