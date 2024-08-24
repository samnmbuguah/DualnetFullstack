import React from "react";

const Threshold = ({
  triggerPoint = 58500,
  openBots = 1,
  aprToOpen = 150,
  openDuals = 4
}) => {
  return (
    <div className="flex items-center justify-between p-8 mb-6">
      <span className="text-[#1D8EFF] font-semibold italic text-sm">
        Hedge-Bot
      </span>
      <div className="flex flex-col">
        <span>
          Triggerpoint = $<span>{triggerPoint}</span>
        </span>
        <span> Open bots <span>{openBots}</span> </span>
      </div>
      <span className="text-[#1D8EFF] font-semibold italic text-sm">
        Dual-Invest
      </span>
      <div className="flex flex-col">
        <span>
          APR to open &gt; <span>{aprToOpen}</span>%
        </span>
        <span> Open Duals <span>{openDuals}</span> </span>
      </div>
    </div>
  );
};

export default Threshold;