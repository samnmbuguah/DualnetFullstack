import React from 'react';

const BotSelectInput = ({ label, options, value, onChange }) => {
    return (
        <div className="relative flex items-center bg-[#E2DDD4] dark:bg-[#454A57] justify-between rounded-md p-2 mb-2">
            <label className="font-normal block font-[inter] text-[#7C7C7C] text-sm">{label}</label>
            <div className="relative">
                <select
                    className="font-normal pl-8 pr-2 py-1 bg-transparent font-[inter] text-[#7c7c7c] text-sm w-full text-right"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default BotSelectInput;
