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
    const { selectedCrypto, dualInvestments } = useSelector((state) => state.duals);
    const { user: authUser } = useSelector((x) => x.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        let intervalId;

        if (selectedCrypto) {
            // Set an interval to call fetchInvestmentsByCurrency every second
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(() => {
                dispatch(fetchInvestmentsByCurrency(selectedCrypto));
            }, 3000); // 1 second interval
        }

        // Cleanup interval on component unmount or when selectedCrypto changes
        return () => {
            if (intervalId) {
                // console.log('clear------------------')
                clearInterval(intervalId);
            }
        };
    }, [selectedCrypto, authUser]);

    console.log(dualInvestments, 'dualInvestments')
    return (
        <div className='flex jutify-end'>
            <div className="grid-container w-[284px]">
                <div className="grid-header w-[280px]">
                    <div className="flex justify-between w-[280px]">
                        <span className="!text-[#55A388] font-bold font-md">BuyLow</span>
                        <span className="!text-[#EA5F00] font-bold font-md">Sell order</span>
                    </div>
                </div>
                <div className="flex grid-row pt-3 pb-2">
                    <div className="grid-cell w-[50px] text-right">APR%</div>
                    <div className="grid-cell w-[80px] text-center">Strike</div>
                    <div className="grid-cell w-[48px] text-center">Share</div>
                    <div className="grid-cell w-[48px] text-center">Term</div>
                    <div className="grid-cell w-[48px] text-center">Order</div>
                </div>
                <div className='max-h-[400px] w-[284px] overflow-auto'>
                {dualInvestments.length && dualInvestments.map((ele, index) => (
                    <div className="flex grid-row" key={index}>
                        <div className="grid-cell w-[50px] text-right color-[#01D497]">{ele.apyDisplay.toFixed(0) || ''}</div>
                        {index === 15 ? <div className="grid-cell w-[80px] !text-[#1D8EFF] text-center font-medium text-md">{ele.exercisePrice || 0}</div> : <div className="grid-cell w-[80px] text-center font-medium text-md">{ele.exercisePrice || 0}</div>}
                        <div className="grid-cell w-[48px] text-center"><CustomInput dark={dark} color={'#01D497'} /></div>
                        <div className="grid-cell w-[48px] text-center">{ele.term || ''}</div>
                        <div className="grid-cell w-[48px] text-center"><CustomInput dark={dark} color={'#EA5F00'} /></div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default PriceRangeList;
