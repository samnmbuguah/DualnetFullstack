import { BotCell } from "_components/BotCell/Botcell";
import Divider from "_components/Divider/Divider";
import { fetchWrapper } from "_helpers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SmallChart from "_components/SmallChart";
const baseUrl = `${fetchWrapper.api_url}/api`;

const DetailsSideBar = ({ user, dark }) => {
  const [balances, setBalances] = useState([]);
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
        <BotCell
          title={`INVESTMENT`}
          titleStyle="text-[#D7AD7D] dark:text-[#D9CFBF] font-[syncopate-bold] text-xl"
          value={`${user.investment} USDT`}
          valueStyle="font-[syncopate-light] !font-bold  text-lg"
          ValueColor="text-[#D7AD7D]"
        />
        <small className="font-[inter] text-[#6C6A66] dark:text-white m-0">
          Since: 21.10.2023
        </small>
        <BotCell
          title={`Assets USDT`}
          titleStyle="text-[#D7AD7D] dark:text-[#D9CFBF] font-[syncopate-bold] text-xl"
          value={balances[1]}
          valueStyle="font-[syncopate-light] !font-bold text-lg"
          ValueColor="text-[#D7AD7D]"
        />
        <BotCell
          title={`Assets Total`}
          titleStyle="text-[#D7AD7D] dark:text-[#D9CFBF] font-[syncopate-bold] text-xl"
          value={balances[0]}
          valueStyle="font-[syncopate-light] !font-bold text-lg"
          ValueColor="text-[#D7AD7D]"
        />
        <Divider />
        <label className="text-[#D7AD7D] dark:text-[#D9CFBF] font-[syncopate-bold] text-xl block">
          Profit
        </label>
      </div>
      <SmallChart dark={dark} />
    </div>
  );
};

export default DetailsSideBar;
