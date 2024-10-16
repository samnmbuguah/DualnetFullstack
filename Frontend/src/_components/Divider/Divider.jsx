import React from 'react';

const Divider = ({ className, dark }) => {
    return (
        <hr 
            className={`border-0 h-[0.3px] my-2 ${
                dark ? 'bg-[#484746]' : 'bg-[#C3C3C3]'
            } ${className}`}
        />
    );
};

export default Divider;
