import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "./CustomInput"
import {
    fetchInvestmentsByCurrency,
    updateDualInvestments,
    updateAutoDual
} from "_store/duals.slice";
import TouchEveContainer from './TouchEveContainer'
import expandToggle from "_assets/expand.svg";

const PriceRangeTable = ({ dark }) => {
    const { selectedCrypto, dualInvestments } = useSelector((state) => state.duals);
    const { user: authUser } = useSelector((x) => x.auth);
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(false)
    const [isExpand, setIsExpand] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    };

    useEffect(() => {
        let intervalId;

        if (selectedCrypto) {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(() => {
                dispatch(fetchInvestmentsByCurrency(selectedCrypto));
            }, 3000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [selectedCrypto, authUser, dispatch]);

    const handleShareChange = (index, value) => {
        // Update the dualInvestments state directly
        const updatedInvestments = dualInvestments.map((investment, i) =>
            i === index ? { ...investment, shares: value } : investment
        );
        dispatch(updateDualInvestments(updatedInvestments)); // Dispatch an action to update dualInvestments
    };

    // New effect to update AutoDual when dualInvestments change
    useEffect(() => {
    }, [selectedCrypto, dispatch, authUser]);

    const toggleExpand = () => {
        console.log('fdsf')
    }

    return (
        <div className='flex jutify-end'>
            <div>
                <div className={isExpand ? 'bg-[#fbf2e2] dark:bg-[#252a30] expand-table' : ''}>
                    <div className="pl-[65px]  font-bold ">
                        <p className='flex justify-between  pb-1 border-b-[1px] border-[#484746]'>
                            <span className='text-[15px] !text-[#55A388]'>Buy low</span>
                            <div className="flex flex-row items-center">
                                <span className='cursor-pointer' onClick={() => setIsExpand(!isExpand)}>
                                    <img src={expandToggle} width={18} alt="expand-toggle" />
                                </span>
                            </div>
                        </p>
                    </div>
                    <TouchEveContainer
                        wid={isExpand ? '100%' : '350px'}
                        heg={isExpand ? '95%' : '200px'}>
                        <table>
                            <thead>
                                <tr className=''>
                                    <th className="sticky left-0 top-0 py-1 bg-[#fbf2e2] dark:bg-[#252a30] w-[55px] z-20">Day</th>
                                    <th className="sticky left-[65px] top-0 py-1 w-[48px] bg-[#fbf2e2] dark:bg-[#252a30] z-20">Invest</th>
                                    {new Array(31).fill(0).map((_, key) => (
                                        <th className='sticky top-0 py-1 bg-[#fbf2e2] dark:bg-[#252a30] z-10' key={key}>{key + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {new Array(20).fill(0).map((_, rowKey) => (
                                    <tr key={rowKey}>
                                        <td className="sticky left-0 bg-[#fbf2e2] dark:bg-[#252a30]">
                                            <div className="my-[3px] mx-1 w-[55px] text-center">
                                                {2700 - 25 * rowKey}
                                            </div>
                                        </td>
                                        <td className="sticky left-[65px] bg-[#fbf2e2] dark:bg-[#252a30]">
                                            <div className="my-[3px] mx-1 w-[48px] text-center">
                                                <CustomInput
                                                    dark={dark}
                                                    color={'#525458'}
                                                    value={0}
                                                    onChange={(e) => handleShareChange(11111, e.target.value)} // Update shares on change
                                                />
                                            </div>
                                        </td>
                                        {new Array(31).fill(0).map((_, colKey) => (
                                            <td key={colKey}><div className="my-[3px] mx-1 w-[48px] text-center">
                                                <CustomInput
                                                    dark={dark}
                                                    color={'#01D497'}
                                                    value={0}
                                                    onChange={(e) => handleShareChange(colKey, e.target.value)} // Update shares on change
                                                />
                                            </div></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </TouchEveContainer>
                </div>
                <div className='flex justify-end h-[100px]'>
                    <span className='my-auto text-[15px]'>Current Price 2560</span>
                </div>
                <div>
                    <div className="pl-[65px]  font-bold ">
                        <p className='flex justify-between  pb-1 border-b-[1px] border-[#484746]'>
                            <span className='text-[15px] !text-[#EA5F00]'>Sell order</span>
                            <div className="flex flex-row items-center">
                                <span
                                    className={`mr-4 ${dark ? "text-[#ffffff]" : "text-[#979191]"
                                        }`}
                                >
                                    Order-Set
                                </span>
                                <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        className="sr-only"
                                        style={{ width: "26px", height: "13.42px" }}
                                    />
                                    <span
                                        className={`slider flex h-[13.42px] w-[26px] p-[1px] items-center rounded-full duration-200 ${isChecked ? "bg-[#1D886A]" : "bg-[#50555F]"
                                            }`}
                                    >
                                        <span
                                            className={`dot h-[11.42px] w-[11.42px] rounded-full bg-white duration-200 ${isChecked ? "translate-x-[12px]" : ""
                                                }`}
                                        ></span>
                                    </span>
                                </label>
                            </div>
                        </p>
                    </div>
                    <TouchEveContainer
                        wid={'350px'}
                        heg={'100px'}>
                        <table>
                            <thead>
                                <tr className=''>
                                    <th className="sticky left-0 top-0 py-1 bg-[#fbf2e2] dark:bg-[#252a30] w-[55px] z-20">Day</th>
                                    {new Array(31).fill(0).map((_, key) => (
                                        <th className='sticky top-0 py-1 bg-[#fbf2e2] dark:bg-[#252a30] z-10' key={key}>{key + 1}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {new Array(5).fill(0).map((_, rowKey) => (
                                    <tr key={rowKey}>
                                        <td className="sticky left-0 bg-[#fbf2e2] dark:bg-[#252a30]">
                                            <div className="my-[3px] mx-1 w-[55px] text-center">
                                                {2700 - 25 * rowKey}
                                            </div>
                                        </td>
                                        {new Array(31).fill(0).map((_, colKey) => (
                                            <td key={colKey}><div className="my-[3px] mx-1 w-[48px] text-center">
                                                <CustomInput
                                                    dark={dark}
                                                    color={'#EA5F00'}
                                                    value={0}
                                                    onChange={(e) => handleShareChange(colKey, e.target.value)} // Update shares on change
                                                />
                                            </div></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </TouchEveContainer>
                </div>
            </div>
        </div>
    );
};

export default PriceRangeTable;
