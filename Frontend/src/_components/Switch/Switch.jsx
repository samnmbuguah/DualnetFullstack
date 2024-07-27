import React, { useState } from 'react';

const Switch = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange(newState);
  };

  return (
    <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
        className='sr-only'
      />
      <span
        className={`slider flex h-5 w-[40px] items-center rounded-full p-1 duration-200 ${
          isChecked ? 'bg-green-500' : 'bg-[#50555F]'
        }`}
      >
        <span
          className={`dot h-4 w-4 rounded-full bg-white duration-200 ${
            isChecked ? 'translate-x-[18px]' : ''
          }`}
        ></span>
      </span>
    </label>
  );
};

export default Switch;
