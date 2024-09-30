import React from 'react';
import { Chart, ClientSideBar, ExchangeSideBar, WalletSideBar, InformationBar } from "_components";
import BotSideBar from "_components/BotSideBar/BotSideBar";
import { ChartSideBar } from "_components/ChartSideBar/ChartSideBar";
import DualInvestSidebar from "_components/DualInvestSidebar/DualInvestSidebar";
import { Footer } from "./Footer";

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
  const renderSidebar = () => {
    const sidebarProps = {
      dark,
      show: currentView === "chart" ? false : true,
      setShow: () => setCurrentView(currentView === "chart" ? currentView : "chart")
    };

    switch (currentView) {
      case "clientSideBar":
        return <ClientSideBar {...sidebarProps} loggedInUser={authUser} userList={users} onSelect={onSelectUser} selectedUserId={selectedUserId} allInfo={allInfo} />;
      case "exchangeSidebar":
        return <ExchangeSideBar {...sidebarProps} />;
      case "walletSidebar":
        return <WalletSideBar {...sidebarProps} />;
      case "botSideBar":
        return <BotSideBar {...sidebarProps} setChartShow={() => setCurrentView("chartSideBar")} />;
      case "chartSideBar":
        return <ChartSideBar {...sidebarProps} />;
      case "infoSidebar":
        return <InformationBar {...sidebarProps} type={infoType} />;
      case "dualInvestSidebar":
        return <DualInvestSidebar {...sidebarProps} />;
      default:
        return null;
    }
  };

  return (
    <div className={`xl:w-full lg:w-1/2 block`}>
      <div className="flex flex-col xs:bg-gray-50 w-full justify-start space-y-12 h-full">
        <div
          style={{
            width: "100%",
            height:
              currentView === "chart" && window.innerWidth > 1024
                ? "500px"
                : "100%",
          }}
        >
          {window.innerWidth > 1024 && currentView === "chart" && (
            <Chart dark={dark} />
          )}
          {renderSidebar()}
        </div>
        <Footer
          currentView={currentView}
          setCurrentView={setCurrentView}
          authUser={authUser}
          dark={dark}
        />
      </div>
    </div>
  );
}