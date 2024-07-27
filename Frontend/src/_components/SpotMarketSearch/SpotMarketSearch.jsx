import { Spinner } from "_components";
import MarketSearchBox from "_components/MarketSearchbox/MarketSearchBox";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
// import "./SpotMarketSearch.css";

const SpotMarketSearch = ({ topScans, updateTopScans, onSelectScan }) => {
  const isLoading = topScans.length === 0;

  const handleScanClick = (scan) => {
    onSelectScan(scan);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center pb-2">
        <label className="text-[10px] font-[inter] text-[#1D8EFF] font-medium ml-4">
          {" "}
          Funding{" "}
        </label>
        <div className="flex flex-row space-x-0" style={{ width: "40px" }}>
          <IoMdArrowDropup
            className="mx-[-5]"
            style={{ fontSize: "20px", color: "7C7C7C" }}
            onClick={() => updateTopScans("fundingRate", "asc")}
          />
          <IoMdArrowDropdown
            className="mx-[-5]"
            style={{ fontSize: "20px", color: "7C7C7C" }}
            onClick={() => updateTopScans("fundingRate", "desc")}
          />
        </div>
        <label className="text-[10px] font-[inter] text-[#1D8EFF] font-medium pl-4">
          {" "}
          Difference{" "}
        </label>
        <div className="flex flex-row space-x-0" style={{ width: "40px" }}>
          <IoMdArrowDropup
            className="mx-[-5]"
            style={{ fontSize: "20px", color: "7C7C7C" }}
            onClick={() => updateTopScans("percentageDifference", "asc")}
          />
          <IoMdArrowDropdown
            className="mx-[-5]"
            style={{ fontSize: "20px", color: "7C7C7C" }}
            onClick={() => updateTopScans("percentageDifference", "desc")}
          />
        </div>
      </div>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        topScans.map((scan, index) => (
          <MarketSearchBox
            key={index}
            scan={scan}
            index={index}
            onClick={handleScanClick}
          />
        ))
      )}
    </div>
  );
};
export default SpotMarketSearch;
