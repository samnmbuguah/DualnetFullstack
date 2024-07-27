import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { FaYinYang } from "react-icons/fa";
import lightLogo from "_assets/logo light mode.png";
import darkLogo from "_assets/logo_dark_mode.png";

import { history } from "_helpers";
import { PrivateRoute } from "_components";
import { Users, Home } from "pages";
import { Login, Signup } from "auth";
import power from "_assets/log-out.png";
import { authActions } from "_store";
import { useDispatch, useSelector } from "react-redux";
import { useWindowDimensions } from "_components";

export { App };

function App() {
  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  const customDarkStyles = {
    boxShadow: '1px 4px 4px #151515 inset',
    border: '1px #2B3036 solid'
  };
  const customLightStyles = {
    background: '#FEF6E6',
    border: "1px #C9C5C5 solid"
  };
  history.navigate = useNavigate();
  history.location = useLocation();
  const [currentRoute, setCurrentRoute] = useState('');
  const [infoType, setInfoType] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("chart");
  const screenWidth = useWindowDimensions().width;
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logout());
    setCurrentView("chart");
  };
  const { user: authUser } = useSelector((x) => x.auth);

  const showInfo = (type) => {
    setInfoType(type);
  };
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("isDarkMode");
    if (storedDarkMode !== null) {
      try {
        setIsDarkMode(JSON.parse(storedDarkMode));
      } catch (error) {
        // Handle invalid JSON value
        console.error("Error parsing dark mode value:", error);
      }
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    // Listen for route changes and update the currentRoute state
    setCurrentRoute(location.pathname);
  }, [location.pathname]);


  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("isDarkMode", JSON.stringify(newDarkMode));
  };

  return (
    <div
      className={`flex flex-col w-full ${
        isDarkMode ? "dark" : "light"
      } block md:grid max-w-[vw] overflow-hidden place-items-center ${
        screenWidth > 1500 && "md:pt-0"
      } min-h-screen py-0`}
    >
      <div
        className={`flex flex-col items-center  w-full h-full  ${
          screenWidth > 1900
            ? "px-[200px]"
            : "sm:px-32 lg:px-16 sm:pb-10 p-8 pt-0"
        }`}
      >
        <div
          className={`${currentRoute==="/login" || currentRoute ==="/signup" ? "hidden" :"flex"} justify-between w-full py-[12px] lg:px-12  2xl:px-32 items-end ${
            screenWidth < 768 ? "p-0" : "p-0"
          }`}
        >
          <div className="relative flex flex-col w-full items-start mb-0">
            <img
              width={172}
              className="w-[365px] mb-3"
              src={isDarkMode ? darkLogo : lightLogo}
              alt="logo"
            />
          </div>
          {screenWidth > 1024 ? (
            <div
              className="flex justify-end -mb-4s h-[25px]"
              style={{ marginBottom: "7px" }}
            >
              <span
                className={` mr-5 inline-flex items-center cursor-pointer`}
                onClick={toggleDarkMode}
              >
                <span
                  className={`mt-1 mr-2 inline-flex items-center cursor-pointer`}
                >
                  MODE
                </span>
                <FaYinYang color={isDarkMode ? "white" : "black"} />
              </span>
              <span
                className={`mr-5 inline-flex items-center cursor-pointer`}
                onClick={() => {
                  showInfo(1);
                  setCurrentView("infoSidebar");
                }}
              >
                <span className={`p-1 pt-2`}>WHITEPAPER</span>
              </span>
              <span
                className={`inline-flex items-center cursor-pointer`}
                onClick={() => {
                  showInfo(2);
                  setCurrentView("infoSidebar");
                }}
              >
                <span className={`p-1 pt-2`}>FAQ</span>
              </span>
              {/* <span className={`mr-5 inline-flex items-center `}>
                <FaGlobe />
                <select
                  className="bg-opacity-0 focus:outline-none bg-[#000] p-1"
                  name="lang"
                  id="langBar"
                >
                  <option className="text-[#333] p-2" value="en">
                    En
                  </option>
                  <option className="text-[#333] p-2" value="de">
                    De
                  </option>
                  <option className="text-[#333] p-2" value="fr">
                    Fr
                  </option>
                  <option className="text-[#333] p-2" value="it">
                    It
                  </option>
                </select>
              </span> */}
            </div>
          ) : (
            <button
              className={`${authUser ? "flex" : "hidden"}`}
              onClick={() => logout()}
            >
              <img width={60} src={power} alt="power" />
            </button>
          )}
        </div>
        {
          <div className={`${currentRoute === "/login" || currentRoute==="/signup" ? "h-full" : "w-full"} flex flex-col justify-center`}>
            {
              (currentRoute === "/login" || currentRoute==="/signup") &&
            <img
              width={172}
              className="w-[365px] mb-3"
              src={isDarkMode ? darkLogo : lightLogo}
              alt="logo"
            />}
            <div
              style={isDarkMode ? customDarkStyles : customLightStyles}
              className={
                screenWidth > 1024
                  ? ` bg-cover bg-50%_50% bg-blend-color-dodge bg-no-repeat ${
                      currentRoute === "/login" || currentRoute==="/signup" ? "" : "w-full"
                    }  overflow-y-auto lg:p-12 lg:pb-4 2xl:pt-16 2xl:pb-8 2xl:px-32 justify-center opacity-80  rounded-[25px] shadow-inner border border-gray-800 background-light dark:bg-[#25292F]`
                  : "flex stretch w-full w-inner-100 p-5 rounded-[25px]"
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home
                        dark={isDarkMode}
                        infoType={infoType}
                        currentView={currentView}
                        setCurrentView={setCurrentView}
                      />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                    <Users 
                    setCurrentView={setCurrentView}
                    />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
