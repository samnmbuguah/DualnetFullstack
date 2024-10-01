import React from "react";
import { MdInfo } from "react-icons/md";

const BotCell = ({
    title,
    titleStyle,
    ValueColor,
    value,
    subValue,
    valueStyle,
    showHelpIcon,
    onHelpIconClick
}) => {
    const renderTitle = () => {
        return (
            <div className={`flex items-center font-normal font-[inter] ${titleStyle}`}>
                {title}
                {showHelpIcon && (
                    <sup onClick={onHelpIconClick} style={{ cursor: 'pointer' }}>
                        <MdInfo className="text-sm ml-1"/>
                    </sup>
                )}
            </div>
        );
    };

    const renderValue = () => {
        return (
            <div className={`font-normal text-right ${ValueColor || 'dark:text-white'} font-[inter] ${valueStyle}`}>
                {value}
                {subValue && <sub className="bottom-0 ml-2">{subValue}%</sub>}
            </div>
        );
    };

    return (
        <div className="flex justify-between items-center">
            {renderTitle()}
            {renderValue()}
        </div>
    );
};

export { BotCell };
