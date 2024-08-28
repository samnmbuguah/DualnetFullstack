import React from "react";

function BotInputCell(
    { label, value, onChange, onBlur, valueStyle, required }
) {
   return (
       <div className="relative flex items-center justify-between rounded-md">
           <label className="font-normal block font-[inter] text-[#7C7C7C] dark:text-[#696969] text-xs mr-4 w-3/4">{label}</label>
           <div className="relative flex justify-end w-1/4 text-[#D7AD7D]">
               <input
                   type="text" // Change input type to text
                   className={`font-normal bg-transparent font-[inter] text-[#D7AD7D] text-sm w-full text-right ${valueStyle}`}
                   value={value || 0.00}
                   onChange={onChange} // Call handleInputChange function
                   onBlur={onBlur} // Call handleBlur function
                   required={required}
               />
           </div>
       </div>
   );
};

export { BotInputCell };
