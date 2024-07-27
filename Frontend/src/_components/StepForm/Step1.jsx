import { useState } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import Web3 from 'web3';
import ledger from '../../_assets/ledger.png';
import octafx from '../../_assets/octafx.png';
import tokenImage from '../../_assets/token.png';

function Step1({ onNextStep }) {
    const [showModal, setShowModal] = useState(false);
    const [showAddress1, setShowAddress1] = useState(true);
    const [address1, setAddress1] = useState('0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19');
    const [address2, setAddress2] = useState('asdasE7F7142A2bB06150738417DaF5c5286544C80a');
    
    const onChangeData = (addressToUpdate, e) => {
        const updatedAddress = e.target.value;
        if (addressToUpdate === 'address1') {
          setAddress1(updatedAddress);
        } else if (addressToUpdate === 'address2') {
          setAddress2(updatedAddress);
        }
    };

    const isValidAddress = (adr) => {
      try {
        const web3 = new Web3()
        web3.utils.toChecksumAddress(adr)
        return true
      } catch (e) {
        return false
      }
    }
    
    return (
      <div>
        <div className="flex justify-between items-center w-[320px] m-auto mt-[30px]">
          <span className="text-[white] text-[12px] font-arrial">Zu belastendes Konto</span>
          <span className="text-[12px] font-arrial text-[#f57b00] italic cursor-pointer" 
            onClick={() => {
                setShowAddress1(true)
                setShowModal(true);
            }}
          >{address1.substring(0, 10)}.....{address1.substring(30, 42)}</span>
        </div>
        <div className="border-[0.3px] border-[#B8B8B8] rounded py-[10px] px-[20px] w-[350px] m-auto flex flex-col">
            <div className="flex border-b-[0.3px] pb-[7px] w-full gap-2">
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
            <div className="flex pt-[7px] w-full">
              <div className="flex justify-between w-full">
                <div className="text-[white] text-[10px] font-bold font-arrial ml-[25px]">senden </div>
                <div className="">
                  <span className="text-[white] text-[10px] font-bold	font-arrial">4.650,00</span>
                  <span className="text-[white] text-[10px] font-bold	font-arrial ml-[50px]">USDT</span>
                </div>
              </div>
            </div>
        </div>
        <div className="w-[300px] m-auto mt-[20px] mb-[11px]">
          <img src={ledger} className="w-[100px]" alt="" />
        </div>
        <div className="flex justify-between items-center w-[300px] m-auto">
            <div className="border-height bg-[#aaa] w-full"></div>
            <div>
              <div className="rounded-full w-[28px] h-[28px] flex justify-center items-center text-base font-syn-regular border dark:border-[#fff] dark:text-[#fff]">
                <BsArrowDownRight />
              </div>
            </div>
            <div className="border-height bg-[#aaa] w-full"></div>
        </div>
        <div className="flex justify-end w-[300px] m-auto mt-[10px] text-right">
          <img src={octafx} className="w-[35px]" alt="" />
        </div>
        <div>
          <div className="flex justify-between items-center w-[320px] m-auto mt-[20px]">
            <span className="text-[white] text-[12px] font-arrial">Adresse des Empfängers</span>
            <span className="text-[12px] font-arrial text-[#f57b00] italic cursor-pointer"
                onClick={() => {
                    setShowAddress1(!showAddress1)
                    setShowModal(true);
                }}
            >{address2.substring(0, 10)}.....{address2.substring(30, 42)}</span>
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
        {showModal ? (
          <>
            <div
              className={`${showAddress1 ? "top-[104px]" : "top-[346px]"} justify-center items-center flex absolute right-[38px] z-50`}
            >
              <div className="relative my-6 mx-auto w-[380px]">
                {/*content*/}
                <div className="border rounded border-[#DADADA] relative flex flex-col w-full bg-[#333131] px-[15px] pb-[4px]">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-ibm text-[white] py-[4px]">Adresse des Empfängers</span>
                    <button onClick={() => setShowModal(false)}><RiCloseFill /></button>
                  </div>
                  {/*body*/}
                  <div className="flex text-left flex-col">
                        {showAddress1 && (
                          <>
                          <input
                            type="text"
                            id="address1"
                            className="w-full h-[31px] px-4 bg-[#333131] font-ibm border border-[#DADADA] rounded text-[12px] text-[white] focus:outline-none"
                            onChange={(e) => onChangeData('address1', e)}
                            defaultValue={address1}
                            />
                            {isValidAddress(address1) ? <p className="font-ibm text-green-500 text-[10px]"> <FaCheck className="float-left mt-[5px] mr-[5px]"/>Address is valid</p> : <p className="font-ibm text-red-500 text-[10px]"><FaExclamationTriangle className="float-left mt-[5px] mr-[5px]"/>Address is not valid</p>}
                          </>
                        )}

                        {!showAddress1 && (
                          <>
                            <input
                            type="text"
                            id="address2"
                            className="w-full h-[31px] px-4 bg-[#333131] font-ibm border border-[#DADADA] rounded text-[12px] text-[white] focus:outline-none"
                            onChange={(e) => onChangeData('address2', e)}
                            defaultValue={address2}
                            />
                            {isValidAddress(address2) ? <p className="font-ibm text-green-500 text-[10px]"> <FaCheck className="float-left mt-[5px] mr-[5px]"/>Address is valid</p> : <p className="font-ibm text-red-500 text-[10px]"><FaExclamationTriangle className="float-left mt-[5px] mr-[5px]"/>Address is not valid</p>}
                          </>
                        )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="py-[15px] w-[350px] m-auto flex flex-row-reverse">
          <button onClick={onNextStep} className="text-[12px] bg-[#A66B31] font-sans font-bold w-[80px] h-[40px] text-center text-[white]">weiter</button>
        </div>
      </div>
    );
  }

  export { Step1 };
