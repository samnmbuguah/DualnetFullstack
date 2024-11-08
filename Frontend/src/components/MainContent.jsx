import React from 'react';
import { Chart, ClientSideBar, ExchangeSideBar, WalletSideBar, InformationBar } from "_components";
import BotSideBar from "../_components/BotSideBar/BotSideBar";
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
    <div className="flex flex-col w-full h-full">
      <div className='ml-14 max-w-[1024px]'>
        <div>
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