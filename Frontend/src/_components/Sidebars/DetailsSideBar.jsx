import Divider from "_components/Divider/Divider";
import { fetchWrapper } from "_helpers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SmallChart from "_components/SmallChart";
const baseUrl = `${fetchWrapper.api_url}/api`;

const DetailsSideBar = ({ user, dark }) => {
  const [balances, setBalances] = useState(["31.191.3800", "4,563,568.4207"]);
  const { user: authUser } = useSelector((x) => x.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWrapper.post(baseUrl + "/get-balances", {
          subClientId: authUser[1].id,
        });
        setBalances(
          response.map((balance) =>
            parseFloat(
              parseFloat(balance)
                .toFixed(2)
                .replace(/[.,]00$/, "")
            )
          )
        );
        if (response.status === 200) {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [authUser]);

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="text-[#D9CFBF] font-[syncopate-bold] text-xl shadow-inner">
            INVESTMENT
          </div>
          <div className="text-[#D7AD7D] font-[syncopate-regular] !font-bold text-lg">
            {`${user.investment} USDT`}
          </div>
        </div>
        <small
          className={`font-[inter-light] ${
            dark ? "text-[#FFFFFF]" : "text-[#777777]"
          } text-sm`}
        >
          Since: 21.10.2023
        </small>
        <Divider />
        <div className="flex justify-between items-center">
          <div className="text-[#D9CFBF] font-[syncopate-bold] text-xl shadow-inner">
            Assets USDT
            <span className="text-xs"> FUTURE</span>
          </div>
          <div
            className={`${
              dark ? "text-[#C6BDAF]" : "text-[#979191]"
            } !font-bold font-[syncopate-regular] text-lg`}
          >
            {balances[1]}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-[#D9CFBF] font-[syncopate-bold] text-xl shadow-inner">
            Assets USDT
            <span className="text-xs font-[inter-bold]"> Spot</span>
          </div>
          <div
            className={`${
              dark ? "text-[#C6BDAF]" : "text-[#979191]"
            } !font-bold font-[syncopate-regular] text-lg`}
          >
            {balances[0]}
          </div>
        </div>
        <Divider />
        <div className="text-[#D9CFBF] font-[syncopate-bold] text-xl block shadow-inner">
          Profit
        </div>
        <div className="flex justify-between items-center font-[syncopate-regular] text-sm">
          <div className="text-[#A3A2A2]">APM $6.420.20</div>
          <div
            className={`${
              dark ? "text-[#C6BDAF]" : "text-[#979191]"
            } !font-bold`}
          >
            7.25%
          </div>
        </div>
        <div className="flex justify-between items-center font-[syncopate-regular] text-sm">
          <div className="text-[#A3A2A2]">APR $310,209.16</div>
          <div
            className={`${
              dark ? "text-[#C6BDAF]" : "text-[#979191]"
            } !font-bold`}
          >
            125.66%
          </div>
        </div>
        <hr className="bg-[#98938A] border-0 h-[0.3px]" />
      </div>
      <SmallChart dark={dark} />
    </div>
  );
};

export default DetailsSideBar;
