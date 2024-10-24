import React, { useState, useRef, useEffect } from "react";

const CustomInput = ({ dark, color, type, val, index, handleCustomInputVal, styleObj }) => {
  const [currentVal, setCurrentVal] = useState(0)

  const initStyle = {
    width: '48px'
  }

  const handleValFunc = (e) => {
    let val = e.target.value !== '' ? parseInt(e.target.value) : ''
    setCurrentVal(val)
    // console.log('handleValFunc')
    if (!!handleCustomInputVal) {
      handleCustomInputVal(val, index)
    }
  }

  useEffect(() => {
    if (val) setCurrentVal(val)
  }, [val])

  return (
    <span
      className={type === 1 ? `focus:border-[1px] focus:!border-[${color}] focus:rounded-[3px] focus:shadow-md flex items-center  h-[17px] justify-center` : `border-[1px] rounded-[3px] shadow-md h-[17px] flex items-center justify-center`}
      style={{ borderColor: color }}
    >
      <input
        type="number"
        value={currentVal}
        onChange={handleValFunc}
        style={styleObj ?? initStyle}
        className={`${type === 1 ? `focus:border-[1px] focus:border-[${color}] rounded-[3px]` : 'border-[transparent] border-[1px]'}   bg-transparent text-center outline-none p-0 px-1 m-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
      />
    </span>
  );
};

export default CustomInput;
