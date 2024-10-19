import { FaRegTimesCircle } from "react-icons/fa";
import { common } from "_helpers";
import { useWindowDimensions } from "_components";
import './styles.css';

function ClientSideBar({
  show,
  setShow,
  dark,
  loggedInUser,
  selectedUserId,
  userList,
  allInfo,
  onSelect,
  width,
}) {
  const customDarkStyles = {
    // boxShadow: '1px 4px 4px #151515 inset',
    border: '1px #484746 solid'
  };
  const customLightStyles = {
    // background: '#FEF6E6',
    border: "1px #C9C5C5 solid"
  };

  // const userList = mockUSers;
  // const allInfo = mockAllInfo;
  let screenWidth = useWindowDimensions().width;

  const dataArray = Object.entries(allInfo);
  const hedgeFilteredData = dataArray.filter(
    ([key, value]) => value.hedgePip !== 0
  );
  const rewardFilteredData = dataArray.filter(
    ([key, value]) => value.rewardPip !== 0
  );

  const minHedgePip = hedgeFilteredData.reduce(
    (min, [key, value]) => (value.hedgePip < min ? value.hedgePip : min),
    Infinity
  );

  const minRewardPip = rewardFilteredData.reduce(
    (min, [key, value]) => (value.rewardPip < min ? value.rewardPip : min),
    Infinity
  );
  //
  if (loggedInUser.user_roles !== 'super_admin') {
    userList = userList.filter(user => user.Admin_id === loggedInUser.id.toString()|| user.id === loggedInUser.id);
  }

  // Sort the userList array by account_no
  const sortedUserList = Array.from(userList).sort((a, b) => {
    const accountNoA = Number(a.account_no);
    const accountNoB = Number(b.account_no);
    return accountNoA - accountNoB;
  });

  return (
    <div
      style={dark ? customDarkStyles : customLightStyles}
      className={`${show ? "right-0" : "hidden"
        } md:w-[${width}px] h-full  px-5 py-3 z-30 transition-transform text-xs dark:bg-[transparent] dark:border-[#6D6D6D] rounded-[25px]`}
    >
      <div
        className="h-[40px] md:h-auto menu mt-2 text-2xl w-full flex justify-start"
        onClick={() => setShow()}
      >
        <span className="block md:hidden">
          <FaRegTimesCircle className="text-stone-300 text-xs font-bold" />
        </span>
      </div>
      {/* <div
        className="h-[40px] md:h-auto menu mt-0 text-2xl w-full flex justify-start"
        onClick={() => setShow()}
      >
        <span className="hidden md:block">
          <FaRegTimesCircle className="text-stone-300 text-xs font-bold" />
        </span>
      </div> */}

      <div
      style={{ gridTemplateRows: 'auto 1fr' }}
        className={`hide-scroll lg:pr-[40px] md:pr-0 grid ${screenWidth < 1677 ? "md:grid-cols-2" : "lg:grid-cols-3"
          } w-auto h-[464px] md:h-[500px] overflow-y-auto`}
      >
        {sortedUserList &&
          sortedUserList.map((item, key) => {
            let addClassName =
              selectedUserId && selectedUserId === item.id
                ? "border-t-[1px] border-[red]"
                : "border-t-[1px] border-[rgb(177,177,177)]";
            return (
              <div
                key={key}
                className={`md:w-[180px] md:h-[150px] grid grid-cols-2 md:gap-y-1 md:p-4 p-2 md:m-2 mx-2 `}
              >
                <div
                  onClick={() => {
                    onSelect(item.id);
                    if (screenWidth < 1000) setShow();
                  }}
                  className="col-span-2 text-neutral-800 dark:text-red-400 text-base font-bold md:text-xs"
                >
                  {item.username ?? "nobody"}
                </div>
                <span className="md:text-xs dark:text-stone-300 text-xs font-bold">
                  {" "}
                  investment
                </span>
                <span
                  className={`text-xs md:text-xs ml-4 text-end ${allInfo[item.id] &&
                      allInfo[item.id].rewardPip === minRewardPip &&
                      minRewardPip < minHedgePip
                      ? "text-[red]"
                      : "text-orange-400 font-normal text-xs"
                    }  `}
                >
                  {" "}
                  {allInfo[item.id] && allInfo[item.id].rewardPip
                    ? common.numberFormat(allInfo[item.id].rewardPip)
                    : 0}
                </span>
                <span className="md:text-xs dark:text-stone-300 text-xs font-bold">
                  {" "}
                  profit{" "}
                </span>
                <span
                  className={`text-xs md:text-xs ml-4 text-end ${allInfo[item.id] &&
                      allInfo[item.id].hedgePip === minHedgePip &&
                      minHedgePip < minRewardPip
                      ? "text-[red]"
                      : "text-orange-400 font-normal text-xs"
                    }  `}
                >
                  {allInfo[item.id] && allInfo[item.id].hedgePip
                    ? common.numberFormat(allInfo[item.id].hedgePip)
                    : 0}
                </span>
                <div className={`grid grid-cols-2 pt-2 md:w-[148px] ${addClassName}`}>
                  <span className="hidden md:block font-syn-bold dark:text-stone-300 text-xs font-bold">
                    Assets
                  </span>
                  <span className="hidden md:block font-syn-bold text-orange-400 text-xs font-bold ml-4 text-end">
                    {allInfo[item.id] && allInfo[item.id].assets
                      ? common.numberFormat(allInfo[item.id].assets)
                      : 0}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <hr className="hidden md:block dark:hidden" />
    </div>
  );
}

export { ClientSideBar };
