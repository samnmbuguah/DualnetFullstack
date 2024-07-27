import React from 'react';

const BotInput = ({ label, value, onChange,required }) => {
    return (
        <div className="relative flex items-center bg-[#E2DDD4] dark:bg-[#454A57] justify-between rounded-md p-2 mb-2">
            <label className="font-normal block font-[inter] text-[#7C7C7C] text-sm mr-4">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    className="font-normal pl-2 pr-6 py-1 bg-transparent font-[inter] text-[#7c7c7c] text-sm w-full text-right"
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            </div>
        </div>
    );
};

export default BotInput;
