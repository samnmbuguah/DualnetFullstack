import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { history } from "_helpers";
import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from "_components";
import { authActions } from "_store";

import { Header } from "./_components/Header";
import { Content } from "./_components/Content";
import { useDarkMode } from "./_hooks/useDarkMode";

export function App() {
  const [currentView, setCurrentView] = useState("chart");
  const [infoType, setInfoType] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const { user: authUser } = useSelector((x) => x.auth);
  const { width: screenWidth } = useWindowDimensions();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  history.location = location;

  const logout = () => {
    dispatch(authActions.logout());
    setCurrentView("chart");
  };

  const showInfo = (type) => {
    setInfoType(type);
    setCurrentView("infoSidebar");
  };

  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div
      className={`flex flex-col w-full h-auto ${isDarkMode ? "dark" : "light"}`}
    >
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        showInfo={showInfo}
        logout={logout}
        isAuthRoute={isAuthRoute}
        screenWidth={screenWidth}
        authUser={authUser}
      />
      <Content
        isDarkMode={isDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
        infoType={infoType}
        isAuthRoute={isAuthRoute}
        screenWidth={screenWidth}
      />
    </div>
  );
}