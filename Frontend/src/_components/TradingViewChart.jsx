import React, { useEffect, useRef, memo } from "react";

export const Chart = memo((dark) => {
  const container = useRef();
  const darkMode = dark.dark;

  useEffect(() => {
    const colorTheme = darkMode ? "dark" : "light";
    const backgroundColor = darkMode ? "rgba(33, 36, 41, 0.02)" : "#fef6e6";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            [ 
              "OANDA:USDJPY|7D"
            ],
            [
              "OANDA:GBPJPY|7D"
            ],
            [
              "OANDA:USDMXN|7D"
            ],
            [
              "FX_IDC:EURMXN|7D"
            ],
            [
              "OANDA:USDCHF|7D"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "de_DE",
          "colorTheme": "${colorTheme}",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
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
  }, [darkMode]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});
