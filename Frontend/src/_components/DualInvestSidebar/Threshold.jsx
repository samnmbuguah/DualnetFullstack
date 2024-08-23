import React from "react";

const Threshold = () => {
  return (
    <div className="flex items-center justify-between p-8 mb-6">
      <span className="text-[#1D8EFF] font-semibold italic text-sm">
        Hedge-Bot
      </span>
      <div className="flex flex-col"> 
      <span>
        Triggerpoint = $<span>58500</span>
      </span>
      <span> Open bots 1 </span>
      </div>
      <span className="text-[#1D8EFF] font-semibold italic text-sm">
        Dual-Invest
      </span>
      <span>
        APR to open &gt; <span>150</span>%
      </span>
    </div>
  );
};

export default Threshold;
