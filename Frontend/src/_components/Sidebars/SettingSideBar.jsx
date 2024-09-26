import { FaBars } from "react-icons/fa";

function SettingSideBar({ show, setShow }) {
  return (
    <div className={`${ show ? "right-0" : "hidden" } sidebar bg-[#ffffffe6] border-[1.5px] rounded-l-3xl px-5 py-3 border-gray-300 z-30 transition-transform text-sm`}>
      <h1 className="text-xl mb-5 text-[rgb(143,143,143)] text-center">
        Settings
      </h1>
      <div className="grid grid-cols-1 w-auto h-auto">
        {/* first box */}
        <div className="font-syncopate-light grid grid-cols-2 gap-y-1 py-4 border-b-[1px] border-[rgb(177,177,177)]">
          Pip alert <span className="font-thin"> &lt; 120</span>
          spread alert <span className="font-thin"> &lt; 650</span>
          <label className="relative flex items-center cursor-pointer mt-2">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-8 h-3 ring-2 ring-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[15px] peer-checked:after:-left-[15px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[10px] after:w-4 after:transition-all peer-checked:bg-gradient-to-t peer-checked:from-[rgb(122,157,67)] peer-checked:to-[rgb(12,65,78)] bg-gradient-to-t from-[rgb(207,30,25)] to-[rgb(114,24,25)] before:content-['OFF'] before:text-[5px] before:font-sans before:absolute before:left-1 before:top-[3px] before:text-white peer-checked:before:content-['ON'] peer-checked:before:left-5 before:w-full"></div>
          </label>
        </div>

        {/* first box */}
        <div className="font-syncopate-light grid grid-cols-2 gap-y-1 py-4 border-b-[1px] border-[rgb(177,177,177)]">
          <div className="col-span-2">
            Open <span className="text-[rgb(235,59,41)]">one</span> Trade
          </div>
          spread <span className="font-thin"> &lt; 350</span>
          If free Pip <span className="font-thin"> &gt; 400</span>
          <label className="relative flex items-center cursor-pointer mt-2">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-8 h-3 ring-2 ring-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[15px] peer-checked:after:-left-[15px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[10px] after:w-4 after:transition-all peer-checked:bg-gradient-to-t peer-checked:from-[rgb(122,157,67)] peer-checked:to-[rgb(12,65,78)] bg-gradient-to-t from-[rgb(207,30,25)] to-[rgb(114,24,25)] before:content-['OFF'] before:text-[5px] before:font-sans before:absolute before:left-1 before:top-[3px] before:text-white peer-checked:before:content-['ON'] peer-checked:before:left-5 before:w-full"></div>
          </label>
        </div>

        {/* first box */}
        <div className="font-syncopate-light grid grid-cols-2 gap-y-1 py-4 border-b-[1px] border-[rgb(177,177,177)]">
          <div className="col-span-2">
            Open <span className="text-[rgb(89,182,62)]">auto</span> Trade
          </div>
          spread <span className="font-thin"> &lt; 350</span>
          If free Pip <span className="font-thin"> &gt; 400</span>
          <label className="relative flex items-center cursor-pointer mt-2">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-8 h-3 ring-2 ring-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[15px] peer-checked:after:-left-[15px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[10px] after:w-4 after:transition-all peer-checked:bg-gradient-to-t peer-checked:from-[rgb(122,157,67)] peer-checked:to-[rgb(12,65,78)] bg-gradient-to-t from-[rgb(207,30,25)] to-[rgb(114,24,25)] before:content-['OFF'] before:text-[5px] before:font-sans before:absolute before:left-1 before:top-[3px] before:text-white peer-checked:before:content-['ON'] peer-checked:before:left-5 before:w-full"></div>
          </label>
        </div>

        {/* first box */}
        <div className="font-syncopate-light grid grid-cols-2 gap-y-1 py-4">
          spread <span className="font-thin"> &lt; 350</span>
          free free Pip <span className="font-thin"> &lt; 60</span>
          <label className="relative flex items-center cursor-pointer mt-2">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-8 h-3 ring-2 ring-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[15px] peer-checked:after:-left-[15px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[10px] after:w-4 after:transition-all peer-checked:bg-gradient-to-t peer-checked:from-[rgb(122,157,67)] peer-checked:to-[rgb(12,65,78)] bg-gradient-to-t from-[rgb(207,30,25)] to-[rgb(114,24,25)] before:content-['OFF'] before:text-[5px] before:font-sans before:absolute before:left-1 before:top-[3px] before:text-white peer-checked:before:content-['ON'] peer-checked:before:left-5 before:w-full"></div>
          </label>
        </div>

        <hr/>
        <div className="menu mt-2 text-2xl w-full flex justify-end" onClick={()=> setShow()}>
          <span ><FaBars /></span>
        </div>
      </div>
    </div>
  );
};

export { SettingSideBar };
