import { BotCell } from '_components/BotCell/Botcell';
import Divider from '_components/Divider/Divider';
import React from 'react';

const MarketSearchBox = ({ index, scan,onClick }) => {
//   console.log(scan,"scan")
    const handleScanClick = () => {
        onClick(scan); // Pass the clicked scan to the parent component
    };
    return (
        <div className="flex items-start" >
            <label className="text-[#454A57] dark:text-white text-sm font-normal font-[inter] mr-2 mt-1">{index + 1}.</label>
            <div className="w-full mb-1">
                <Divider />
                <div className='cursor-pointer' onClick={handleScanClick}>
                <BotCell
                    title={`${scan.matchingPairId}`}
                    titleStyle="text-[#454A57] dark:text-white text-sm"
                    value={`${scan.spotPrice} $`}
                    valueStyle="text-sm text-[#15FF00]"
                />
                </div>
                <Divider />
                <BotCell
                    title={`Future`}
                    titleStyle="text-[#454A57] dark:text-white text-xs"
                    value={`${scan.futuresPrice} $`}
                    valueStyle="text-xs text-[#D9CFBF]"
                />
                <BotCell
                    title={`Difference spot-future`}
                    titleStyle="text-[#454A57] dark:text-white text-xs italic"
                    value={`${scan.percentageDifference} %`}
                    valueStyle="text-xs italic text-[#454A57]"
                />
                <BotCell
                    title={`Funding Rate`}
                    titleStyle="text-[#454A57] dark:text-white text-xs italic"
                    value={`${scan.fundingRate}%`}
                    valueStyle="text-xs italic text-[#454A57]"
                />
            </div>
        </div>
    )
}

export default MarketSearchBox