import { RiErrorWarningLine } from "react-icons/ri";
import tokenImage from '../../_assets/token.png';

function Step2({ onNextStep }) {
  const address1 = '0x4AE7F7142A2bB06150738417DaF5c5286544C80a';
  const address2 = 'asdasE7F7142A2bB06150738417DaF5c5286544C80a';
    
    return (
      <div>
        <div className="flex justify-between items-center w-[320px] m-auto mt-[30px]">
          <span className="text-[white] text-[12px] font-arrial">Zu belastendes Konto</span>
          <span className="text-[12px] font-arrial text-[#f57b00] italic" >{address1.substring(0, 10)}.....{address1.substring(30, 42)}</span>
        </div>
        <div className="border-[0.3px] border-[#B8B8B8] rounded py-[15px] px-[20px] w-[350px] m-auto flex flex-col">
            <div className="flex border-b-[0.3px] pb-[14px] w-full gap-2">
              <div className="flex items-center">
                <img className="w-[16px]" src={tokenImage} alt="" />
              </div>
              <div className="flex justify-between w-full">
                <div className="text-[white] text-[10px] font-bold font-arrial">Tether USD</div>
                <div className="">
                  <span className="text-[white] text-[10px] font-bold	font-arrial">max</span>
                  <span className="text-[white] text-[10px] font-bold	font-arrial ml-[50px]">9.480,00</span>
                </div>
              </div>
            </div>
            <div className="flex pt-[14px] w-full">
              <div className="flex justify-between w-full">
                <div className="text-[white] text-[10px] font-bold font-arrial ml-[25px]">senden </div>
                <div className="">
                  <span className="text-[white] text-[10px] font-bold	font-arrial">4.650,00</span>
                  <span className="text-[white] text-[10px] font-bold	font-arrial ml-[50px]">USDT</span>
                </div>
              </div>
            </div>
        </div>
        <div className="flex justify-between px-[10px] w-[320px] bg-[#32271E] m-auto pt-[10px] pb-[20px] gap-3 rounded mt-[10px]">
            <div><RiErrorWarningLine className="text-[20px] text-[#ED9C25] mt-5" /></div>
            <div className="flex flex-col gap-3">
                <p className="text-left font-inter text-[13px] text-[#ED9C25]">
                    <span>Not enough Ethereum to pay the gas fee.</span>
                    <span>Buy Ethereum withe</span>
                    <span>10 USDT.</span>
                </p>
                <span className="text-left font-inter text-[13px] text-[#ED9C25] italic cursor-pointer">BUY NOW</span>
            </div>
        </div>
        <div>
          <div className="flex justify-between items-center w-[320px] m-auto mt-[10px]">
            <span className="text-[white] text-[12px] font-arrial">Adresse des Empfängers</span>
            <span className="text-[12px] font-arrial text-[#f57b00] italic">{address2.substring(0, 10)}.....{address2.substring(30, 42)}</span>
          </div>
          <div className="border-[0.3px] border-[#B8B8B8] rounded py-[15px] px-[20px] w-[350px] m-auto flex">
              <div className="flex w-full gap-2">
                <div className="flex items-center">
                  <img className="w-[16px]" src={tokenImage} alt="" />
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-[white] text-[10px] font-bold font-arrial">
                    Tether USD
                    <span className="text-[white] text-[10px] font-bold	font-arrial ml-[20px]">empfangen</span>
                  </div>
                  <div className="">
                    <span className="text-[white] text-[10px] font-bold	font-arrial">max</span>
                    <span className="text-[white] text-[10px] font-bold	font-arrial ml-[50px]">9.480,00</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="py-[15px] w-[350px] m-auto flex flex-row-reverse">
          <button onClick={onNextStep} className="text-[12px] bg-[#A66B31] font-sans font-bold w-[80px] h-[40px] text-center text-[white]">weiter</button>
        </div>
      </div>
    );
  }

  export { Step2 };
