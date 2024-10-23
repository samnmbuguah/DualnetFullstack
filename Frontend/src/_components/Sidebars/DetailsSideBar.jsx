import Divider from "_components/Divider/Divider";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SmallChart from "_components/SmallChart";
import { fetchBalances } from "_store/duals.slice";

const DetailsSideBar = ({ user, dark }) => {
  const { user: authUser } = useSelector((x) => x.auth);
  const dispatch = useDispatch();
  const balances = useSelector((state) => state.duals.balances);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch the thunk to fetch balances
        await dispatch(fetchBalances(authUser[1].id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [authUser, dispatch]);

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
          {balances && balances[1] !== undefined && !isNaN(parseFloat(balances[1])) ? parseFloat(balances[1]).toFixed(2) : 0}
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
          {balances && balances[0] !== undefined && !isNaN(parseFloat(balances[0])) ? parseFloat(balances[0]).toFixed(2) : 0}          
          </div>
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
