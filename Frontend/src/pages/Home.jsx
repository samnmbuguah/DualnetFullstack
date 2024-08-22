import {
  Chart,
  ClientSideBar,
  ExchangeSideBar,
  InformationBar,
  WalletSideBar,
} from "_components";
import { fetchWrapper } from "_helpers";
import { authActions, userActions } from "_store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import io from "socket.io-client";

import { useWindowDimensions } from "_components";
import BotSideBar from "_components/BotSideBar/BotSideBar";
import DetailsSideBar from "_components/Sidebars/DetailsSideBar";
import power from "../_assets/logout-btn.png";
import settingIcon from "../_assets/setting.png";
import { ChartSideBar } from "_components/ChartSideBar/ChartSideBar";
import DualInvestSidebar from "_components/DualInvestSidebar/DualInvestSidebar";

let socket;

function Home({ dark, infoType, currentView, setCurrentView }) {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((x) => x.auth);
  const { users } = useSelector((x) => x?.users);
  const logout = () => {
    dispatch(authActions.logout());
    setCurrentView("chart");
  };
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [reward, setReward] = useState("");
  const [hedge, setHedge] = useState("");
  const [seluserid, setSelUserid] = useState(authUser[1]?.id || 0);
  const [allInfo, setAllInfo] = useState({});
  const isAdmin = useRef(authUser[1]?.usertype || 0);
  const [loggedInUser, setLoggedInUser] = useState({});

  const selectedUser = useRef({
    username: authUser[1]?.username || "",
    wallet: authUser[1]?.wallet || 0,
    investment: authUser[1]?.investment || 0,
    beginDate: authUser[1]?.begin_date || "Not Set",
    fee: authUser[1]?.fee || 0,
    Net_client_share_in_percent: authUser[1]?.Net_client_share_in_percent || 0,
    usertype: authUser[1]?.usertype || 0,
    user_role: authUser[1]?.user_roles || null,
    profit_now: authUser[1]?.profit_now || 0,
  });

  //get meta-api data of selected user on menu
  const onSelectUser = (user_id) => {
    if (user_id !== 0 && seluserid !== user_id) {
      setSelUserid(user_id);
      const userOne = getUser(users.rows, user_id);
      console.log(userOne, "user one");
      selectedUser.current = {
        username: userOne.username,
        wallet: userOne.wallet,
        investment: userOne.investment,
        beginDate: userOne.begin_date,
        fee: userOne.fee,
        Net_client_share_in_percent: userOne.Net_client_share_in_percent,
        profit_now: userOne.profit_now,
        usertype: userOne.usertype || 0,
        Admin_id: userOne.Admin_id || null,
        user_role: userOne.user_roles || null,
      };

      // if(isAdmin.current !== 1)
      if (selectedUser.current.user_role === "client") {
        socket.emit("oneInfo", selectedUser.current.Admin_id);
      } else {
        console.log("emmiting in else");
        dispatch(userActions.adminCommission(user_id));
        socket.emit("oneInfo", user_id);
      }

      socket.emit("oneInfo", user_id);

      setReward({});
      setHedge({});
    }
  };

  // get user informatino from userlist
  const getUser = (arr, id) => arr.find((item) => item.id == id);

  // update metatrade data of selected user in realtime
  const updateUserData = (data) => {
    // console.log(selectedUser.current,"selected");
    let percentage_value = selectedUser.current.Admin_id !== null ? 100 : 100;
    if (data[0] && data[0] != null) {
      data[0]["balance"] = data[0]["balance"] * (percentage_value / 100);
      data[0]["equity"] =
        (data[0]["equity"] - data[0]["credit"]) * (percentage_value / 100);
      data[0]["freeMargin"] =
        data[0]["freeMargin"] -
        data[0]["credit"] +
        (data[0]["margin"] * (100 - selectedUser.current.rewardStopout)) / 100;
      //for adding percentage sharwe to freeMargin value
      data[0]["freeMargin"] = data[0]["freeMargin"] * (percentage_value / 100);
      data[0]["freepip"] =
        data[0]["sumlot"] === 0
          ? 0
          : data[0]["freeMargin"] / (data[0]["sumlot"] * 10);
      data[0]["freepip"] = data[0]["freepip"] * (percentage_value / 100);
    }
    if (data[1]) {
      data[0]["balance"] = data[0]["balance"] * (percentage_value / 100);
      data[1]["equity"] =
        (data[1]["equity"] - data[1]["credit"]) * (percentage_value / 100);
      data[1]["freeMargin"] =
        data[1]["freeMargin"] -
        data[1]["credit"] +
        (data[1]["margin"] * (100 - selectedUser.current.hedgeStopout)) / 100;
      data[0]["freeMargin"] = data[0]["freeMargin"] * (percentage_value / 100);

      data[1]["freepip"] =
        data[1]["sumlot"] === 0
          ? 0
          : data[1]["freeMargin"] / (data[1]["sumlot"] * 10);
      data[0]["freepip"] = data[0]["freepip"] * (percentage_value / 100);
    }
    setReward(data[0] || {}); // reward account information
    setHedge(data[1] || {}); // hadge  account information
  };

  useEffect(() => {
    dispatch(userActions.getAll());
    dispatch(userActions.adminCommission(authUser[1].id));

    const socketInitializer = async () => {
      let api_url = fetchWrapper.api_url;
      socket = io(`${api_url}`, {
        // transports: ['websocket'],
        reconnection: true, // enable automatic reconnection
        reconnectionAttempts: 100, // maximum number of reconnection attempts
        reconnectionDelay: 5000, // delay between reconnection attempts (in milliseconds)
      });

      socket.on("connect", () => {
        console.log("connected");
        reqSocket();
      });

      socket.on("update-information", (res) => {
        let data = JSON.parse(res);
        // console.log("data: " + JSON.stringify(data));
        updateUserData(data);
      });

      socket.on("disconnect", () => {
        console.log("disconnected");
      });

      socket.on("reconnect", (attemptNumber) => {
        console.log(`reconnected after ${attemptNumber} attempts`);
      });

      socket.on("reconnect_failed", () => {
        console.log("failed to reconnect");
      });
    };

    const reqSocket = () => {
      if (isAdmin.current === 1) {
        socket.emit("allInfo", 1);
      }
      socket.emit("oneInfo", seluserid);
    };

    socketInitializer();
    setLoggedInUser(JSON.parse(localStorage.getItem("user"))[1]);
    setIsSuperAdmin(loggedInUser.user_roles === "super_admin");
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [authUser, dispatch, loggedInUser.user_roles, seluserid, isSuperAdmin]);

  useEffect(() => {
    // update metatrade data of all users in real time
    const updateAllUserData = (data) => {
      let userList = users.rows || [];
      if (userList && userList.length > 0) {
        let keys = Object.keys(data);
        let subClientData = {};
        keys.map((uid) => {
          const userOne = getUser(userList, uid);
          let metaData = data[uid] ?? [];
          if (metaData[0] && metaData[0] != null) {
            metaData[0]["equity"] =
              metaData[0]["equity"] - metaData[0]["credit"];
            metaData[0]["freeMargin"] =
              metaData[0]["freeMargin"] -
              metaData[0]["credit"] +
              (metaData[0]["margin"] * (100 - userOne.reward_stopout)) / 100;
            metaData[0]["freepip"] =
              metaData[0]["sumlot"] === 0
                ? 0
                : metaData[0]["freeMargin"] / (metaData[0]["sumlot"] * 10);
          }
          if (metaData[1]) {
            metaData[1]["equity"] =
              metaData[1]["equity"] - metaData[1]["credit"];
            metaData[1]["freeMargin"] =
              metaData[1]["freeMargin"] -
              metaData[1]["credit"] +
              (metaData[1]["margin"] * (100 - userOne.hedge_stopout)) / 100;
            metaData[1]["freepip"] =
              metaData[1]["sumlot"] === 0
                ? 0
                : metaData[1]["freeMargin"] / (metaData[1]["sumlot"] * 10);
          }
          subClientData[uid] =
            metaData.length > 0
              ? {
                  rewardPip: metaData[0]?.freepip || 0,
                  hedgePip: metaData[1]?.freepip || 0,
                  assets:
                    (metaData[0]?.equity || 0) +
                    (metaData[1]?.equity || 0) +
                    userOne.wallet,
                }
              : {};
        });
        setAllInfo(subClientData);
      }
    };

    socket.on("update-users-information", (res) => {
      let data = JSON.parse(res);
      updateAllUserData(data);
    });

    // Cleanup the socket event listener when the component unmounts
    return () => {
      socket.off("update-users-information");
    };
  }, [dispatch, setAllInfo, users]);

  // Width

  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(elementRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const renderHTML = (htmlString) => ({ __html: htmlString });

  let profit = 0;
  let total =
    (reward.equity ?? 0) + (hedge.equity ?? 0) + selectedUser.current.wallet;

  profit =
    ((total - selectedUser.current.investment) *
      selectedUser.current.Net_client_share_in_percent) /
    100;
  // profit = calculateProfit();
  let profit_rate =
    profit > 0 && selectedUser.current.investment > 0
      ? (100 * profit) / selectedUser.current.investment
      : 0;
  let screenWidth = useWindowDimensions().width;
   return (
     <div ref={elementRef}>
       {screenWidth > 0 ? ( //pc version
         <div
           className="flex flex-col align-items-stretch"
           style={{ paddingBottom: "10px" }}
         >
           <div className="flex w-full justify-between text-2xl md:mb-4 md:whitespace-nowrap items-center font-syncopate-light px-1">
             <span className="lg:text-[35px] font-bold dark:text-neutral-400 ">
               {selectedUser.current.username}
             </span>

             <button
               className="text-right dark:text-stone-300 text-[15px] font-bold lg:flex items-center hidden mb-1"
               onClick={() => logout()}
             >
               Logout
               <img width={30} src={power} alt="power" className="ml-1" />
             </button>
           </div>
           <div className="flex flex-col">
             <div className="w-[100%] mx-auto md:w-full flex justify-between items-start lg:items-start md:p-2">
               <div className="flex h-auto w-full md:gap-10 lg:gap-10 flex-col lg:flex-row">
                 <div className="xl:w-2/5 lg:w-1/2 w-full">
                   <div className="flex space-y-12"></div>

                   {/* pc version details */}
                   <div className="min-[700px]:cols-span-10 min-[100px]-col-span-10 flex items-center lg:items-start flex-col overflow-hidden col-span-8 lg:col-span-3 pt-4 justify-between h-full">
                     <DetailsSideBar user={selectedUser.current} dark={dark} />
                   </div>
                 </div>
                 <div className={`xl:w-3/5 lg:w-1/2 block `}>
                   <div className="flex flex-col xs:bg-gray-50 w-full justify-start space-y-12 h-full">
                     {/* treadingView widget */}
                     <div
                       style={{
                         width: "100%",
                         height:
                           currentView === "chart" && width > 1024
                             ? "500px"
                             : "100%",
                       }}
                     >
                       {/* <Chart dark={dark} /> */}
                       {window.screen.width > 1024
                         ? currentView === "chart" && <Chart dark={dark} />
                         : ""}

                       <ClientSideBar
                         show={currentView === "clientSideBar"}
                         setShow={() =>
                           setCurrentView((x) =>
                             x === "clientSideBar" ? "chart" : "clientSideBar"
                           )
                         }
                         dark={dark}
                         loggedInUser={authUser[1]}
                         userList={users.rows ?? []}
                         onSelect={onSelectUser}
                         selectedUserId={seluserid}
                         allInfo={allInfo}
                         // width={width < 600 ? 0 : width / 2 + 30}
                       />
                       <ExchangeSideBar
                         dark={dark}
                         show={currentView === "exchangeSidebar"}
                         setShow={() =>
                           setCurrentView((x) =>
                             x === "exchangeSidebar"
                               ? "chart"
                               : "exchangeSidebar"
                           )
                         }
                         // width={width < 600 ? 0 : width / 2 + 30}
                       />
                       <WalletSideBar
                         dark={dark}
                         show={currentView === "walletSidebar"}
                         setShow={() =>
                           setCurrentView((x) =>
                             x === "walletSidebar" ? "chart" : "walletSidebar"
                           )
                         }
                         // width={width < 600 ? 0 : width / 2 + 30}
                       />
                       <BotSideBar
                         dark={dark}
                         show={currentView === "botSideBar"}
                         setShow={(x) =>
                           setCurrentView((x) => {
                             console.log("Setting", x);
                             return x === "botSideBar" ? "chart" : "botSideBar";
                           })
                         }
                         setChartShow={(x) =>
                           setCurrentView((x) => {
                             return x === "botSideBar"
                               ? "chartSideBar"
                               : "botSideBar";
                           })
                         }
                         // width={width < 600 ? 0 : width / 2 + 30}
                       />
                       <ChartSideBar
                         dark={dark}
                         show={currentView === "chartSideBar"}
                         setShow={() =>
                           setCurrentView((x) => {
                             console.log(x);
                             return x === "botSideBar"
                               ? "chartSideBar"
                               : "botSideBar";
                           })
                         }
                         // width={width < 600 ? 0 : width / 2 + 30}
                       />

                       <InformationBar
                         show={currentView === "infoSidebar"}
                         setShow={() =>
                           setCurrentView((x) =>
                             x === "infoSidebar" ? "chart" : "infoSidebar"
                           )
                         }
                         type={infoType}
                       />
                       <DualInvestSidebar
                         dark={dark}
                         show={currentView === "dualInvestSidebar"}
                         setShow={() =>
                           setCurrentView((x) =>
                             x === "dualInvestSidebar"
                               ? "chart"
                               : "dualInvestSidebar"
                           )
                         }
                       />
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div className="flex gap-16 mb-4 mt-12 justify-between px-2">
               <div
                 style={{ width: "100%" }}
                 className={`flex ${
                   isAdmin.current === 1 ? "justify-between" : "justify-between"
                 } w-full items-center text-[11px]`}
               >
                 <div className="flex space-x-4 cursor-pointer"></div>

                 <div className="flex place-items-baseline justify-between space-x-4">
                   <div className="p flex justify-center">
                     {authUser[1].user_roles === "admin" ||
                     authUser[1].user_roles === "super_admin" ? (
                       <>
                         {authUser[1].user_roles === "super_admin" && (
                           <span>
                             {" "}
                             <NavLink
                               to="/admin"
                               className="hidden lg:flex space-x-2 mr-4 text-sm dark:text-[#A3A2A2] text-center cursor-pointer items-center"
                             >
                               Admin{" "}
                             </NavLink>
                           </span>
                         )}
                         <span
                           onClick={() => {
                             setCurrentView((x) =>
                               x === "dualInvestSidebar"
                                 ? "chart"
                                 : "dualInvestSidebar"
                             );
                           }}
                           className={`flex items-center mr-4 text-sm cursor-pointer ${
                             currentView === "dualInvestSidebar"
                               ? "text-[#15FF00]"
                               : "dark:text-[#A3A2A2] "
                           }`}
                         >
                           DUAL-INVEST
                         </span>
                         <span
                           onClick={() => {
                             setCurrentView((x) =>
                               x === "botSideBar" ? "chart" : "botSideBar"
                             );
                           }}
                           className={`flex items-center mr-4 text-sm cursor-pointer ${
                             currentView === "botSideBar"
                               ? "text-[#15FF00]"
                               : "dark:text-[#A3A2A2] "
                           }`}
                         >
                           Bot
                         </span>
                         <span
                           onClick={() => {
                             setCurrentView((x) =>
                               x === "clientSideBar" ? "chart" : "clientSideBar"
                             );
                           }}
                           className={`flex items-center mr-4 text-sm cursor-pointer ${
                             currentView === "clientSideBar"
                               ? "text-[#15FF00]"
                               : "dark:text-[#A3A2A2] "
                           }`}
                         >
                           Sub-Clients
                         </span>
                       </>
                     ) : null}
                     <span
                       onClick={() => {
                         setCurrentView((x) =>
                           x === "exchangeSidebar" ? "chart" : "exchangeSidebar"
                         );
                       }}
                       className="hidden lg:flex items-center mr-2 text-sm dark:text-[#A3A2A2] cursor-pointer"
                     >
                       Exchange
                     </span>
                     {authUser[1].user_roles === "client" &&
                       authUser[1].usertype === 4 && (
                         <span
                           onClick={() =>
                             window.open(
                               `${fetchWrapper.api_url}/pdfs/user_${authUser[1].id}.pdf`,
                               "_blank"
                             )
                           }
                           className="hidden lg:flex items-center mr-2 text-sm dark:text-[#A3A2A2] cursor-pointer"
                         >
                           <img
                             width={26}
                             className="cursor-pointer"
                             src={settingIcon}
                             alt="second logo"
                           />
                           Statement
                         </span>
                       )}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       ) : (
         // mobile version
         <></>
       )}
     </div>
   );
  }
  
  export { Home };