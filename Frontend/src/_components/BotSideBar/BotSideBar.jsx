import { useWindowDimensions } from "_components";
import { fetchBotsByUser } from "_store/bots.slice";
import useTopScansWebSocket from "_store/websocket/TopScans";
import { useEffect, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import OpenBots from "../OpenBots/OpenBots";
import SpotBot from "../SpotBot/SpotBot";
import SpotMarketSearch from "../SpotMarketSearch/SpotMarketSearch";
import styles from "./styles";
import { fetchWrapper } from "_helpers";

const baseUrl = `${fetchWrapper.api_url}/api`;

function BotSideBar({ show, setShow, dark, width, setChartShow }) {
  const { user: authUser } = useSelector((x) => x.auth);
  const dispatch = useDispatch();
  const customStyles = dark ? styles.dark : styles.light;
  let screenWidth = useWindowDimensions().width;

  const [selectedScan, setSelectedScan] = useState(null);

  const bots = useSelector((state) => state.bots.botsByUser[authUser[1].id]);
  const ws_url = "ws://dualnet.ch";

  const { topScans, updateTopScans, updatedBotData } =
    useTopScansWebSocket(ws_url);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWrapper.post(baseUrl + "/get-balances", {
          subClientId: authUser[1].id,
        });

        if (response) {
          const data = response.map((balance) =>
            parseFloat(parseFloat(balance).toFixed(2))
          );
          setBalances(data);
          console.log("Balances:", data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedScan, authUser]);

  useEffect(() => {
    if (!bots) {
      dispatch(fetchBotsByUser(authUser[1].id));
    }
  }, [dispatch, bots, authUser]);

  const handleScanClick = (scan) => {
    setSelectedScan(scan);
  };

  return (
    <div
      style={customStyles}
      className={`${
        show ? "right-0" : "hidden"
      } bg-[#fef6e6] md:w-[${width}px] h-full  px-5 py-3 z-30 transition-transform text-xs dark:bg-[transparent] dark:border-[#6D6D6D] bg-zinc-800 rounded-[25px]`}
    >
      <div className="border-b border-stone-500 px-4">
        <div className="mb-2">
          <button className="mr-2 font-[inter] text-stone-500 dark:text-white capitalize hover:border-b hover:border-green-500 hover:text-green-500">
            KuCoin
          </button>
          <button className="mr-2 font-[inter] capitalize border-b border-green-500 text-green-500">
            Gate.io
          </button>
          <button className="mr-2 font-[inter] text-stone-500 dark:text-white capitalize hover:border-b hover:border-green-500 hover:text-green-500">
            ByBit
          </button>
          <button className="mr-2 font-[inter] text-stone-500 dark:text-white capitalize hover:border-b hover:border-green-500 hover:text-green-500">
            Binance
          </button>
        </div>
      </div>

      <div
        className="h-[40px] md:h-auto menu mt-2 text-2xl w-full flex justify-start"
        onClick={() => setShow()}
      >
        <span className="block md:hidden">
          <FaRegTimesCircle className="text-stone-300 text-xs font-bold" />
        </span>
      </div>

      <div
        className={`hide-scroll md:pt-7 grid ${
          screenWidth < 1677 ? "md:grid-cols-2" : "lg:grid-cols-3"
        } w-auto h-[464px] md:h-[500px] overflow-y-auto`}
      >
        <div className="flex flex-col px-4">
          <div className="flex-1">
            <SpotBot
              balances={balances}
              topScans={topScans}
              selectedScan={selectedScan}
              bots={bots}
              onScanChange={handleScanClick}
              setShow={setChartShow}
            />
          </div>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex-1">
            {topScans && (
              <div className="flex-1">
                <SpotMarketSearch
                  topScans={topScans}
                  updateTopScans={updateTopScans}
                  onSelectScan={handleScanClick}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex-1">
            <OpenBots bots={bots} updatedBotData={updatedBotData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotSideBar;
