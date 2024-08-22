import React from "react";

const Threshold = () => {
  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-[#0336EB]">Hedge-Bot</span>
      <span>Open Trigger = $58500</span>
      <span className="text-[#0336EB]">Dual-Invest</span>
      <span>
        APR to open &gt; <span>350</span>%
      </span>
    </div>
  );
};

export default Threshold;