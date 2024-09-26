import React from 'react';

const ExchangeButton = ({ name, active }) => {
  return (
    <button
      className={`mr-2 font-[inter] capitalize ${
        active ? 'border-b border-green-500 text-green-500' : 'text-stone-500 dark:text-white hover:border-b hover:border-green-500 hover:text-green-500'
      }`}
    >
      {name}
    </button>
  );
};

export default ExchangeButton;
