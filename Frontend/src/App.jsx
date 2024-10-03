import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { user: authUser } = useSelector((x) => x.auth);
  const { width: screenWidth } = useWindowDimensions();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const logout = () => {
    dispatch(authActions.logout());
    setCurrentView("chart");
    navigate("/login");
  };

  const showInfo = (type) => {
    setInfoType(type);
    setCurrentView("infoSidebar");
  };

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div
      className={`flex flex-col w-full px-10 ${
        isDarkMode ? "dark-appContainer" : "light-appContainer"
      }`}
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
