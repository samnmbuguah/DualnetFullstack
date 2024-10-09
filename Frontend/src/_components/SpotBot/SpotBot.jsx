import { BotCell } from "_components/BotCell/Botcell";
import BotInput from "_components/BotInput/BotInput";
import { BotInputCell } from "_components/BotInputCell/BotInputCell";
import BotSelectInput from "_components/BotSelect/BotSelect";
import Button from "_components/Button/Button";
import Divider from "_components/Divider/Divider";
import Switch from "_components/Switch/Switch";
import { common, fetchWrapper } from "_helpers";
import { trade } from "_store/bots.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const baseUrl = `${fetchWrapper.api_url}/api`;

const SpotBot = ({
  selectedScan,
  topScans,
  onScanChange,
  balances,
  bots,
  setShow,
}) => {
  const [scanData, setScanData] = useState({});
  const { user: authUser } = useSelector((x) => x.auth);

  const dispatch = useDispatch();
  const [amount, setAmount] = useState(5);
  const [leverage, setLeverage] = useState(1);
  const [botRunBy, setBotRunBy] = useState(1.00);
  const [botRunByFunding, setBotRunByFunding] = useState(0.10);
  const [closeByProfit, setCloseByProfit] = useState(5.0);
  const [closeByDeviation, setCloseByDeviation] = useState(100.0);

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchChange = (isChecked) => {
    setIsSwitchOn(isChecked);
  };

  const nextApply = common.convertUnixTimestampToTime(
    scanData.fundingNextApply
  );
  const userId = authUser[1].id;
  const tradeData = {
    pair: scanData.matchingPairId,
    amount: amount,
    lastPrice: scanData.futuresPrice,
    quantoMultiplier: scanData.quantoMultiplier,
    takerFeeRate: scanData.takerFeeRate,
    leverage: leverage,
    subClientId: userId,
    closeByProfit: closeByProfit,
    fundingRate: scanData.fundingRate,
    closeByDeviation: closeByDeviation,
    active: isSwitchOn,
  };

  useEffect(() => {
    if (selectedScan) {
      setScanData(selectedScan);
    } else if (topScans && topScans.length > 0) {
      setScanData(topScans[0]);
    } else {
      setScanData({});
    }
  }, [topScans, selectedScan]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleBotRunByChange = (event) => {
    setBotRunBy(event.target.value);
  };
  const handleBotRunByFunding = (event) => {
    setBotRunByFunding(event.target.value);
  };
  const handleCloseByDeviation = (event) => {
    setCloseByDeviation(event.target.value);
  };
  const handleCloseByProfitChange = async (event) => {
    const value = event.target.value;
    setCloseByProfit(value);
  };
  const handleScanChange = (value) => {
    const selectedScan = topScans.find((scan) => scan.matchingPairId === value);
    onScanChange(selectedScan);
  };

  const handleProfitChange = (event) => {
    setCloseByProfit(event.target.value);
  };

    const handleCreateTrade = () => {
    handleSetLeverage(leverage);
    if (!scanData.matchingPairId) {
      Swal.fire(`Trade is loading. Please wait`, "", "error");
      return false;
    }

    if (amount < 5) {
      Swal.fire(
        `Amount must be greater than $5 for trade to start`,
        "",
        "error"
      );
      return false;
    }
    if (scanData.fundingRate < botRunByFunding) {
      Swal.fire(
        `Scan Funding rate must be greater than ${botRunByFunding}`,
        "",
        "error"
      );
      return false;
    }
    if (scanData.percentageDifference < botRunBy) {
      Swal.fire(
        `Scan Difference must be greater than ${botRunBy} `,
        "",
        "error"
      );
      return false;
    }

    if (balances[0] < amount || balances[1] < amount) {
      Swal.fire(
        `Both balances must be greater than the trade amount`,
        "",
        "error"
      );
      return false;
    }

    const tradeData = {
      pair: scanData.matchingPairId,
      amount: amount,
      lastPrice: scanData.futuresPrice,
      quantoMultiplier: scanData.quantoMultiplier,
      takerFeeRate: scanData.takerFeeRate,
      leverage: leverage,
      subClientId: userId,
      closeByProfit: closeByProfit,
      fundingRate: scanData.fundingRate,
      closeByDeviation: closeByDeviation,
    };

    // Dispatch the trade action
    dispatch(trade(tradeData));
  };

  // Create scanOptions array and move selectedScan to the top
  let scanOptions = topScans.map((scan) => ({
    label: scan.matchingPairId,
    value: scan.matchingPairId,
  }));
  if (selectedScan) {
    const selectedOptionIndex = scanOptions.findIndex(
      (option) => option.value === selectedScan.matchingPairId
    );
    if (selectedOptionIndex !== -1) {
      const selectedOption = scanOptions.splice(selectedOptionIndex, 1)[0];
      scanOptions.unshift(selectedOption);
    }
  }

  let leverageOptions = [];
  if (scanData.leverageMin && scanData.leverageMax) {
    const min = parseInt(scanData.leverageMin);
    const max = parseInt(scanData.leverageMax);
    for (let i = min; i <= max; i++) {
      leverageOptions.push({ label: `${i}`, value: `${i}` });
    }
  }
  const handleSetLeverage = async (value) => {
    const settle = "usdt";
    const contract = scanData.matchingPairId;
    const leverage = value.toString();
    const subClientId = userId;

    const leverageData = {
      settle,
      leverage,
      contract,
      subClientId,
    };

    try {
      const result = await fetchWrapper.post(`${baseUrl}/set-leverage`, leverageData);
      setLeverage(result.crossLeverageLimit);
    } catch (error) {
      console.error('Error setting leverage:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs text-[#454A57] dark:text-white font-[inter]">
          Spot-Future Arbitrage Bot
        </h2>
        <Switch onChange={handleSwitchChange} tradeData={tradeData} />
      </div>
      <BotSelectInput
        label="Markets"
        options={scanOptions}
        value={scanData ? scanData.matchingPairId : ""}
        onChange={handleScanChange}
      />
      <BotSelectInput
        label="Leverage"
        options={leverageOptions}
        onChange={handleSetLeverage}
      />
      <BotInput
        label="Amount"
        onChange={handleAmountChange}
        value={amount}
        required={true}
      />
      <label className="text-[#454A57] dark:text-[#696969] font-[inter]">
        Not less than{" "}
        <span className="text-[#454A57] dark:text-white">
          5 USDT
        </span>
      </label>
      <Divider className="my-1" />
      <BotCell
        title={`Available future`}
        titleStyle="text-[#454A57] text-[#7C7C7C] dark:text-[#696969] text-xs"
        value={balances[1] + " USDT"}
        valueStyle="font-medium text-xs"
      />
      <BotCell
        title={`Available Spot`}
        titleStyle="text-[#7C7C7C] dark:text-[#696969] text-xs"
        value={balances[0] + " USDT"}
        valueStyle="font-medium text-xs"
      />
      <Divider className="my-1" />

      <BotCell
        title={`current deviation`}
        titleStyle="text-[#7C7C7C] dark:text-[#696969] text-xs"
        value={`${
          scanData.percentageDifference ? scanData.percentageDifference : ""
        } %`}
        valueStyle="font-medium text-xs"
      />
      <Divider className="my-1" />
      <label className="italic font-bold font-[inter] text-[#BDB4B4]">Bot open</label>
      <BotInputCell
        label={`bot run by Funding rate = >`}
        value={common.addZeroes(botRunByFunding)}
        onChange={handleBotRunByFunding}
        required={true}
        valueStyle="font-bold text-xs"
      />
      <BotInputCell
        label={`bot run by deviation = >`}
        value={common.addZeroes(botRunBy)}
        onChange={handleBotRunByChange}
        required={true}
        valueStyle="font-bold text-xs"
      />
      <Divider className="my-1" />
      <label className="italic font-bold font-[inter] text-[#BDB4B4]">Bot close</label>
      <BotInputCell
        label={`close by profit = >`}
        type="number"
        value={common.addZeroes(closeByProfit)}
        onChange={handleProfitChange}
        onBlur={handleCloseByProfitChange}
        required={true}
        valueStyle="font-bold text-xs"
      />
      <BotInputCell
        label={`close by deviation = >`}
        type="number"
        value={common.addZeroes(closeByDeviation)}
        onChange={handleCloseByDeviation}
        onBlur={handleCloseByDeviation}
        required={true}
        valueStyle="font-bold text-xs"
      />
      
      <Button
        label={isSwitchOn ? "A.I. active" : "Create"}
        className={`my-3 rounded p-2 font-[inter] text-white font-bold text-sm ${
          isSwitchOn
            ? "bg-[#405D7B] cursor-not-allowed"
            : "bg-[#0066CC] bg-gradient-to-r from-[#0066CC] to-transparent hover:bg-blue-500"
        }`}
        onClick={handleCreateTrade}
        disabled={isSwitchOn}
      />
    </div>
  );
};

export default SpotBot;
