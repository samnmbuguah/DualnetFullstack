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

  const innerShadowClass = "text-shadow-[0_4px_4px_rgba(0,0,0,0.25)]";

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className={`text-[#D5BEAB] font-[syncopate-bold] text-xl ${innerShadowClass}`}>
            INVESTMENT
          </div>
          <div className="text-[#D5BEAB] font-[syncopate-regular] !font-bold text-lg">
            {`${user.investment} USDT`}
          </div>
        </div>
        <small
          className={`font-[inter-light] ${
            dark ? "text-[#777070]" : "text-[#777777]"
          } text-sm`}
        >
          Since: 21.10.2023
        </small>
        <Divider dark={dark} />
        <div className="flex justify-between items-center">
          <div className={`text-[#D5BEAB] font-[syncopate-bold] text-xl ${innerShadowClass}`}>
            Assets USDT
            <span className="text-xs"> FUTURE</span>
          </div>
          <div
            className={`${
              dark ? "text-[#C6BDAF]" : "text-[#979191]"
            } !font-bold font-[syncopate-regular] text-lg`}
          >
          {balances[1] !== undefined && !isNaN(balances[1]) ? balances[1].toFixed(2) : 0}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className={`text-[#D5BEAB] font-[syncopate-bold] text-xl ${innerShadowClass}`}>
            Assets USDT
            <span className="text-xs font-[inter-bold]"> Spot</span>
          </div>
          <div
            className={`${
              dark ? "text-[#C6BDAF]" : "text-[#979191]"
            } !font-bold font-[syncopate-regular] text-lg`}
          >
          {balances[0] !== undefined && !isNaN(balances[0]) ? balances[0].toFixed(2) : 0}          </div>
        </div>
        <Divider dark={dark} />
        <div className={`text-[#D5BEAB] font-[syncopate-bold] text-xl block ${innerShadowClass}`}>
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
        <Divider dark={dark} />
      </div>
      <SmallChart dark={dark} />
    </div>
  );
};

export default DetailsSideBar;
