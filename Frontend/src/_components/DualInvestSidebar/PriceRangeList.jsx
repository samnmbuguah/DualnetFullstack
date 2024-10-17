import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "./CustomInput"
import {
    fetchInvestmentsByCurrency,
    // fetchSpotPrice,
    // fetchSpotBalances,
    // fetchOpenedDuals,
} from "_store/duals.slice";

const PriceRangeList = ({
    dark
}) => {
    const {selectedCrypto, dualInvestments} = useSelector((state) => state.duals);
    const { user: authUser } = useSelector((x) => x.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        let intervalId;

        if (selectedCrypto) {
            // Set an interval to call fetchInvestmentsByCurrency every second
            if(intervalId) clearInterval(intervalId);
            intervalId = setInterval(() => {
                dispatch(fetchInvestmentsByCurrency(selectedCrypto));
            }, 5000); // 1 second interval
        }

        // Cleanup interval on component unmount or when selectedCrypto changes
        return () => {
            if (intervalId) {
                console.log('clear------------------')
                clearInterval(intervalId);
            }
        };
    }, [selectedCrypto, authUser]);

    console.log(dualInvestments, 'dualInvestments')
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
                    {dualInvestments.length && dualInvestments.map((ele, index) => {
                        if (index > 3 && index < 25) return (<tr key={index}>
                                <td className="text-center">{ele.apyDisplay || ''}</td>
                                <td className="font-medium text-md">{ele.exercisePrice || 0}</td>
                                <td className="text-center"><CustomInput dark={dark} color={'#01D497'} /></td>
                                <td className="text-center">{ele.term || ''}</td>
                                <td className="text-center"><CustomInput dark={dark} color={'#EA5F00'} /></td>
                            </tr>)
                    })}
                </tbody>
            </table>

        </>
    );
};

export default PriceRangeList;
