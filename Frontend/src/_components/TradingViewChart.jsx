import React, { useEffect, useRef, memo } from "react";

export const Chart = memo(({ dark }) => {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://widgets.coingecko.com/gecko-coin-price-chart-widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={container} className="w-full text-black min-w-[420px]">                                                               
      <gecko-coin-price-chart-widget 
        locale="en" 
        transparent-background="true" 
        coin-id="bitcoin" 
        initial-currency="usd"
        height="320"
        width='0'
        dark-mode={dark ? "true" : "false"}
      />
    </div>
  );
});

export default Chart;