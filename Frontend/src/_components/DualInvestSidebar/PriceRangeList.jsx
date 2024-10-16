import React, { useState, useEffect } from 'react';
import CustomInput from "./CustomInput"

const PriceRangeList = ({
    dark
}) => {
    const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
    const [price, setPrice] = useState(null);
    const [fundingRate, setFundingRate] = useState(null);  // For APR%

    useEffect(() => {
        // Create WebSocket connection
        const ws = new WebSocket('wss://api.gateio.ws/ws/v4/');

        // Subscribe to multiple channels (Order Book and Funding Rate)
        ws.onopen = function () {
            const msg = JSON.stringify({
                "time": Math.floor(Date.now() / 1000),
                "channel": "spot.order_book",
                "event": "subscribe",
                "payload": ["BTC_USDT", "10", "1000ms"]
            });
            ws.send(msg);
        };
        
        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);
            console.log("APR:", data);
            // Hypothetical payload structure
            if (data.channel === "spot.order_book" && data.event === "update") {
                const investmentData = data.result;
        
                const apr = investmentData.apr;  // Hypothetical APR% key
                const strikePrice = investmentData.strike;  // Hypothetical Strike Price key
        
                console.log("APR:", apr);
                console.log("Strike Price:", strikePrice);
            }
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <>
        <table className="border-separate border-spacing-x-2 border-slate-400">
            <tbody>
                <tr>
                    <td colSpan={5} >
                        <div className="flex justify-between">
                            <span className="!text-[#55A388] font-bold text-md">BuyLow</span>
                            <span className="!text-[#EA5F00] font-bold text-md">Sell order</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="text-center">APR%</td>
                    <td className="text-center">Strike</td>
                    <td className="text-center">Share</td>
                    <td className="text-center">Term</td>
                    <td className="text-center">Order</td>
                </tr>
                {new Array(20).fill(0).map((ele, index) => {
                    return (<tr key={index}>
                        <td className="text-center"></td>
                        <td className="font-medium text-md">65.000</td>
                        <td className="text-center"><CustomInput dark={dark} color={'#01D497'} /></td>
                        <td className="text-center"></td>
                        <td className="text-center"><CustomInput dark={dark} color={'#EA5F00'} /></td>
                    </tr>)
                })}
            </tbody>
        </table>
       
        </>
    );
};

export default PriceRangeList;
