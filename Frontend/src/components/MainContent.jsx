import React from 'react';
import { Chart } from "_components";
import { ClientSideBar } from "_components";
import { ExchangeSideBar } from "_components";
import { WalletSideBar } from "_components";
import BotSideBar from "_components/BotSideBar/BotSideBar";
import { ChartSideBar } from "_components/ChartSideBar/ChartSideBar";
import { InformationBar } from "_components";
import DualInvestSidebar from "_components/DualInvestSidebar/DualInvestSidebar";

export function MainContent({
  currentView,
  setCurrentView,
  dark,
  authUser,
  users,
  onSelectUser,
  selectedUserId,
  allInfo,
  infoType
}) {
  return (
    <div className={`xl:w-3/5 lg:w-1/2 block `}>
      <div className="flex flex-col xs:bg-gray-50 w-full justify-start space-y-12 h-full">
        <div style={{
          width: "100%",
          height: currentView === "chart" && window.innerWidth > 1024 ? "500px" : "100%",
        }}>
          {window.innerWidth > 1024 ? currentView === "chart" && <Chart dark={dark} /> : ""}

          <ClientSideBar
            show={currentView === "clientSideBar"}
            setShow={() => setCurrentView(x => x === "clientSideBar" ? "chart" : "clientSideBar")}
            dark={dark}
            loggedInUser={authUser}
            userList={users}
            onSelect={onSelectUser}
            selectedUserId={selectedUserId}
            allInfo={allInfo}
          />
          <ExchangeSideBar
            dark={dark}
            show={currentView === "exchangeSidebar"}
            setShow={() => setCurrentView(x => x === "exchangeSidebar" ? "chart" : "exchangeSidebar")}
          />
          <WalletSideBar
            dark={dark}
            show={currentView === "walletSidebar"}
            setShow={() => setCurrentView(x => x === "walletSidebar" ? "chart" : "walletSidebar")}
          />
          <BotSideBar
            dark={dark}
            show={currentView === "botSideBar"}
            setShow={() => setCurrentView(x => x === "botSideBar" ? "chart" : "botSideBar")}
            setChartShow={() => setCurrentView(x => x === "botSideBar" ? "chartSideBar" : "botSideBar")}
          />
          <ChartSideBar
            dark={dark}
            show={currentView === "chartSideBar"}
            setShow={() => setCurrentView(x => x === "botSideBar" ? "chartSideBar" : "botSideBar")}
          />
          <InformationBar
            show={currentView === "infoSidebar"}
            setShow={() => setCurrentView(x => x === "infoSidebar" ? "chart" : "infoSidebar")}
            type={infoType}
          />
          <DualInvestSidebar
            dark={dark}
            show={currentView === "dualInvestSidebar"}
            setShow={() => setCurrentView(x => x === "dualInvestSidebar" ? "chart" : "dualInvestSidebar")}
          />
        </div>
      </div>
    </div>
  );
}