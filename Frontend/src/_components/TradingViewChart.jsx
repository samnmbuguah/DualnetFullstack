import React, { useEffect, useRef, memo } from "react";

export const Chart = memo(({ dark }) => {
  const container = useRef();
  const darkMode = dark;

  useEffect(() => {
    if (!container.current) return;

    const colorTheme = darkMode ? "dark" : "light";
    const backgroundColor = darkMode ? "rgba(33, 36, 41, 0.02)" : "#fef6e6";

    const appendScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.innerHTML = `
{
         "symbols": [
            [
              "BINANCE:BTCUSDT|1D"
            ],
            [
              "BINANCE:ETHUSDT|1D"
            ],
            [
              "BINANCE:XRPUSDT|1D"
            ],
            [
              "BINANCE:ADAUSDT|1D"
            ]
          ],
  "chartOnly": false,
  "width": "100%",
  "height": "100%",
  "locale": "en-US",
  "colorTheme": "${colorTheme}",
  "autosize": true,
  "showVolume": false,
  "showMA": true,
  "hideDateRanges": false,
  "hideMarketStatus": false,
  "hideSymbolLogo": true,
  "scalePosition": "right",
  "scaleMode": "Logarithmic",
  "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
  "fontSize": "10",
  "noTimeScale": false,
  "valuesTracking": "1",
  "changeMode": "price-and-percent",
  "chartType": "area",
  "maLineColor": "#2962FF",
  "maLineWidth": 1,
  "maLength": 9,
  "backgroundColor": "${backgroundColor}",
  "lineWidth": 2,
  "lineType": 0,
  "dateRanges": [
    "1d|30",
    "1w|60",
    "1m|240",
    "12m|1W"
  ]
}`;
      container.current.innerHTML = "";
      container.current.appendChild(script);
    };

    // Delay the script execution to ensure the DOM is fully ready
    setTimeout(appendScript, 3000);
  }, [darkMode]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

export default Chart;