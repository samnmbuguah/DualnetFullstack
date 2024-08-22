import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import { useWindowDimensions } from "_components";
import { fetchWrapper } from "_helpers";
import styles from "./styles";
import ExchangeButton from "../ExchangeButton/ExchangeButton";
import exchanges from "./exchanges.json";
import investments from "./Investments.json";

const baseUrl = `${fetchWrapper.api_url}/api`;

const DualInvestSidebar = ({ show, setShow, dark }) => {
  const { user: authUser } = useSelector((x) => x.auth);
  const dispatch = useDispatch();
  const customStyles = dark ? styles.dark : styles.light;
  let screenWidth = useWindowDimensions().width;

  const [selectedScan, setSelectedScan] = useState(null);

  const environment = process.env.REACT_APP_ENVIRONMENT;
  const ws_url =
    environment === "production"
      ? "wss://dualnet-production.up.railway.app"
      : "ws://localhost:3042";
  if (!show) return null;

  return (
    <div
      style={customStyles}
      className={`${
        show ? "right-0" : "hidden"
      } bg-[#fef6e6] md:w-[${screenWidth}px] h-full px-5 py-3 z-30 transition-transform text-xs dark:bg-[transparent] dark:border-[#6D6D6D] bg-zinc-800 rounded-[25px]`}
    >
      <div className="border-b border-stone-500 w-3/5 flex flex-row justify-center">
        <div className="mb-2">
          {exchanges.map((exchange) => (
            <ExchangeButton
              key={exchange.name}
              name={exchange.name}
              active={exchange.active}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2 flex flex-row justify-center">
        <div className="mt-4">
          {investments.map((investment) => (
            <ExchangeButton
              key={investment.name}
              name={investment.name}
              active={investment.active}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DualInvestSidebar;
