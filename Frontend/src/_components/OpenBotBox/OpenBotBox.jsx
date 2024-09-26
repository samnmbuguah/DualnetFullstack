import { BotCell } from "_components/BotCell/Botcell";
import { fetchWrapper } from "_helpers";
import { removeBot } from "_store/bots.slice";
import React from "react";
import { RiShutDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const baseUrl = `${fetchWrapper.api_url}/api`;

const OpenBotBox = ({ bot }) => {
  const { user: authUser } = useSelector((x) => x.auth);
  const dispatch = useDispatch();

  const handleCloseTrade = async (
    userId,
    matchingPairId,
    futuresSize,
    spotSize,
    positionId,
    multiplier
  ) => {
    const result = await fetchWrapper.post(baseUrl + "/close-trade", {
      pair: matchingPairId,
      subClientId: userId,
      futuresSize: futuresSize,
      spotSize: spotSize,
      positionId: positionId,
      multiplier: multiplier,
    });
    if (result.status === 200) {
      dispatch(removeBot({ userId, positionId }));
      Swal.fire(result.message, "", "success");
    } else {
      Swal.fire(result.message, "", "error");
    }
  };

  const formatNumber = (number) => {
    return Number(number).toFixed(2);
  };

  return (
    <div id="out-div" className="mb-6">
      <div id="inner-div" className="flex justify-between items-center">
        <div className="w-full mr-2 pr-2 border-r border-[#666562] h-full">
          <BotCell
            title={`${bot.matchingPairId}`}
            titleStyle="text-[#7c7c7c] dark:text-[#606060] text-sm"
            value={`${bot.leverage}X`}
            valueStyle="text-sm text-[#6C6C6C]"
          />
          <BotCell
            title={`Invest`}
            titleStyle="text-[#7c7c7c] dark:text-[#606060] text-sm"
            value={`${formatNumber(bot.amountIncurred)} $`}
            valueStyle="text-sm text-[#6C6C6C]"
          />
          <BotCell
            title={`Futures open`}
            titleStyle="text-[#7c7c7c] dark:text-[#606060] text-sm"
            value={`${bot.futuresEntryPrice} $`}
            valueStyle="text-sm text-[#6C6C6C]"
          />
          <BotCell
            title={`Spot open`}
            titleStyle="text-[#7c7c7c] dark:text-[#606060] text-sm"
            value={`${bot.spotEntryPrice} $`}
            valueStyle="text-sm text-[#6C6C6C]"
          />
          <BotCell
            title={`Diff by opening`}
            titleStyle="text-[#7c7c7c] dark:text-[#606060] text-sm"
            value={`${bot.openingDifference.toFixed(4)} %`}
            valueStyle="text-sm text-[#6C6C6C]"
          />
          <BotCell
            title={`Diff now`}
            titleStyle="text-blue-500 dark:text-blue-500 text-sm"
            value={`${bot.currentDifference.toFixed(4)} %`}
            valueStyle="text-sm text-blue-500"
          />
          <BotCell
            title={`PnL $`}
            titleStyle="text-blue-500 dark:text-blue-500 text-sm"
            value={`${bot.pnlValue.toFixed(4)} $`}
            valueStyle="text-sm text-blue-500"
          />
          <BotCell
            title={`PnL %`}
            titleStyle="text-blue-500 dark:text-blue-500 text-sm"
            value={`${bot.percentagePnl.toFixed(4)} %`}
            valueStyle="text-sm text-blue-500"
          />
          <BotCell
            title={`Close By Profit`}
            titleStyle="text-red-500 dark:text-red-500 text-sm"
            value={`${formatNumber(bot.closeByProfit)} %`}
            valueStyle="text-sm text-red-500"
          />
          <BotCell
            title={`Close By Deviation`}
            titleStyle="text-red-500 dark:text-red-500 text-sm"
            value={`${formatNumber(bot.closeByDeviation)} %`}
            valueStyle="text-sm text-red-500"
          />
          <BotCell
            title={`highest profit`}
            titleStyle="text-[#7c7c7c] dark:text-[#606060] text-sm"
            value={`${bot.highestProfit.toFixed(4)} %`}
            valueStyle="text-sm text-[#525458]"
          />
          <BotCell
            title={`ADL`}
            titleStyle="text-blue-500 dark:text-blue-500 text-xs"
            value={`${bot.adl}`}
            valueStyle="text-xs text-blue-500 my-0"
          />
          <BotCell
            title={`Date`}
            titleStyle="dark:text-blue-500 text-xs italic mt-2"
            value={`${new Date(
              bot.createdAt
            ).toLocaleDateString()} - ${new Date(
              bot.createdAt
            ).toLocaleTimeString()}`}
            valueStyle="text-xs text-blue-500 my-0"
          />
        </div>

        <RiShutDownLine
          color="red"
          style={{ fontSize: "16", fontWeight: "700" }}
          onClick={() =>
            handleCloseTrade(
              authUser[1].id,
              bot.matchingPairId,
              bot.futuresSize,
              bot.spotSize,
              bot.positionId,
              bot.quantoMultiplier
            )
          }
        />
      </div>
    </div>
  );
};

export default OpenBotBox;