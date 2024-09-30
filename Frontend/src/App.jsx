import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { FaYinYang } from "react-icons/fa";
import { history, fetchWrapper } from "_helpers";
import { PrivateRoute } from "_components";
import { Users, Home } from "pages";
import { Login, Signup } from "auth";
import { authActions } from "_store";
import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from "_components";

import lightLogo from "_assets/logo light mode.png";
import darkLogo from "_assets/logo_dark_mode.png";
import power from "_assets/log-out.png";

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("chart");
  const [infoType, setInfoType] = useState(null);
  const [currentRoute, setCurrentRoute] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser } = useSelector((x) => x.auth);
  const screenWidth = useWindowDimensions().width;

  history.navigate = navigate;
  history.location = location;

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode !== null) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("isDarkMode", JSON.stringify(newDarkMode));
  };

  const logout = () => {
    dispatch(authActions.logout());
    setCurrentView("chart");
  };

  const showInfo = (type) => {
    setInfoType(type);
    setCurrentView("infoSidebar");
  };

  const renderHeader = () => (
    <div className={`${currentRoute === "/login" || currentRoute === "/signup" ? "hidden" : "flex"} justify-between w-full py-[12px] lg:px-12 2xl:px-32 items-end ${screenWidth < 768 ? "p-0" : "p-0"}`}>
      <img width={172} className="w-[365px] mb-3" src={isDarkMode ? darkLogo : lightLogo} alt="logo" />
      {screenWidth > 1024 ? (
        <div className="flex justify-end -mb-4s h-[25px]" style={{ marginBottom: "7px" }}>
          <span className="mr-5 inline-flex items-center cursor-pointer" onClick={toggleDarkMode}>
            <span className="mt-1 mr-2 inline-flex items-center cursor-pointer">MODE</span>
            <FaYinYang color={isDarkMode ? "white" : "black"} />
          </span>
          <span className="mr-5 inline-flex items-center cursor-pointer" onClick={() => showInfo(1)}>
            <span className="p-1 pt-2">WHITEPAPER</span>
          </span>
          <span className="inline-flex items-center cursor-pointer" onClick={() => showInfo(2)}>
            <span className="p-1 pt-2">FAQ</span>
          </span>
        </div>
      ) : (
        <button className={`${authUser ? "flex" : "hidden"}`} onClick={logout}>
          <img width={60} src={power} alt="power" />
        </button>
      )}
    </div>
  );

  const renderContent = () => (
    <div className={`${currentRoute === "/login" || currentRoute === "/signup" ? "h-full" : "w-full"} flex flex-col justify-center`}>
      {(currentRoute === "/login" || currentRoute === "/signup") && (
        <img width={172} className="w-[365px] mb-3" src={isDarkMode ? darkLogo : lightLogo} alt="logo" />
      )}
      <div
        style={isDarkMode ? { boxShadow: '1px 4px 4px #151515 inset', border: '1px #2B3036 solid' } : { background: '#FEF6E6', border: "1px #C9C5C5 solid" }}
        className={screenWidth > 1024
          ? `bg-cover bg-50%_50% bg-blend-color-dodge bg-no-repeat ${currentRoute === "/login" || currentRoute === "/signup" ? "" : "w-full"} overflow-y-auto lg:p-12 lg:pb-4 2xl:pt-16 2xl:pb-8 2xl:px-32 justify-center opacity-80 rounded-[25px] shadow-inner border border-[#2B3036] background-light dark:bg-[#25292F]`
          : "flex stretch w-full w-inner-100 p-5 rounded-[25px]"
        }
      >
        <Routes>
          <Route path="/" element={<PrivateRoute><Home dark={isDarkMode} infoType={infoType} currentView={currentView} setCurrentView={setCurrentView} /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><Users setCurrentView={setCurrentView} /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col w-full ${isDarkMode ? "dark" : "light"} block md:grid max-w-[vw] overflow-hidden place-items-center ${screenWidth > 1500 && "md:pt-0"} min-h-screen py-0`}>
      <div className={`flex flex-col items-center w-full h-full ${screenWidth > 1900 ? "px-[100px]" : "sm:px-32 lg:px-16 sm:pb-10 p-8 pt-0"}`}>
        {renderHeader()}
        {renderContent()}
      </div>
    </div>
  );
}