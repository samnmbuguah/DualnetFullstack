import tokenImage from '../../_assets/token.png';

function Step4({ onPreviousStep, onNextStep }) {
    const numbers = [1, 2, 3, 4, 5];


    return (
      <>
        <div className="mx-auto mt-[32px] mb-[32px]">
            <span className="text-[#A7A7A7] text-[14px] font-bold font-inter">Your USDT is on the way to your chosen broker</span>
        </div>
        <div className="flex flex-col w-[510px] mx-auto max-h-72 overflow-y-auto scroll-bar">
            <div className="flex bg-[#202123] text-[12px] text-[white] font-roboto font-bold px-[36px] py-[10px]">Letzte Aktionen</div>
            {numbers?.map((number, index) => (
                <>
                    <div className="flex bg-[#343434] text-[10px] text-[white] font-roboto px-[36px] py-[10px]">20.06.2023</div>
                    <div className="flex justify-between bg-[#202123] px-[36px] py-[5px] items-center">
                        <div className="flex flex-col" key={index}>
                            <span className="text-[10px] text-[white] font-roboto">Gesendet</span>
                            <span className="text-[10px] text-[white] font-roboto">10:23 AM</span>
                        </div>
                        <div className="flex justify-between gap-2">
                            <img src={tokenImage} className="w-[23px]" alt="" />
                            <span className="text-[10px] text-[white] font-roboto">Tether USD</span>
                            <span className="text-[10px] text-[white] font-roboto">0xa4slkjr4tkjwl2ktwtrkjkljkl563656465s4gsdx0</span>
                            <span className="text-[10px] text-[#F13645] font-roboto">-120.000 USDT</span>
                        </div>
                    </div>
                </>
            ))}
        </div>
        <div className="py-[15px] w-[350px] m-auto flex flex-row-reverse">
          <button onClick={onNextStep} className="text-[12px] bg-[#A66B31] font-sans font-bold w-[80px] h-[40px] text-center text-[white]">weiter</button>
        </div>
      </>
    );
}

export { Step4 };
