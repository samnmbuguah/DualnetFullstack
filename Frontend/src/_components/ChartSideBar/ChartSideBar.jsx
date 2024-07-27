import { useWindowDimensions } from "_components";
import { api_url, fetchWrapper } from "_helpers";
import { fetchBotsByUser } from "_store/bots.slice";
import useTopScansWebSocket from "_store/websocket/TopScans";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";

const baseUrl = `${fetchWrapper.api_url}/api`;


function ChartSideBar({ show, setShow, dark, width }) {
  const { user: authUser } = useSelector((x) => x.auth);
  const dispatch = useDispatch();
  const customStyles = dark ? styles.dark : styles.light;
  let screenWidth = useWindowDimensions().width;

  return (
    <div
      style={customStyles}
      className={`${show ? "right-0" : "hidden"
        } bg-[#fef6e6] md:w-[${width}px] h-full  px-5 py-3 z-30 transition-transform text-xs dark:bg-[transparent] dark:border-[#6D6D6D] bg-zinc-800 rounded-[25px]`}
    >
      <div>Chart sidebar</div>
    </div>
  );
}

export { ChartSideBar };
