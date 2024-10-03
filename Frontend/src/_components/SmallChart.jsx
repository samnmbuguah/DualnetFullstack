import React, { useEffect, useRef, memo } from "react";

export const SmallChart = memo(({ dark }) => {
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
    <div ref={container} className="text-black">
      <gecko-coin-price-chart-widget
        locale="de"
        transparent-background="true"
        coin-id="bitcoin"
        initial-currency="usd"
        dark-mode={dark ? "true" : "false"}
        width="480"
      />
    </div>
  );
});

export default SmallChart;