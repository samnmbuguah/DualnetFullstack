import React from 'react';
import { NavLink } from "react-router-dom";
import settingIcon from "../_assets/setting.png";

export function Footer({ currentView, setCurrentView, authUser, dark }) {
  return (
    <div className="flex gap-16 mb-4 mt-12 justify-between px-2">
      <div className="flex justify-between w-full items-center text-[11px]">
        <div className="flex space-x-4 cursor-pointer"></div>
        <div className="flex place-items-baseline justify-between space-x-4">
          <div className="p flex justify-center">
            {authUser.user_roles === "admin" || authUser.user_roles === "super_admin" ? (
              <>
                {authUser.user_roles === "super_admin" && (
                  <span>
                    <NavLink to="/admin" className="hidden lg:flex space-x-2 mr-4 text-sm dark:text-[#A3A2A2] text-center cursor-pointer items-center">
                      Admin
                    </NavLink>
                  </span>
                )}
                <span
                  onClick={() => setCurrentView(x => x === "dualInvestSidebar" ? "chart" : "dualInvestSidebar")}
                  className={`flex items-center mr-4 text-sm cursor-pointer ${currentView === "dualInvestSidebar" ? "text-[#15FF00]" : "dark:text-[#A3A2A2]"}`}
                >
                  DUAL-INVEST
                </span>
                <span
                  onClick={() => setCurrentView(x => x === "botSideBar" ? "chart" : "botSideBar")}
                  className={`flex items-center mr-4 text-sm cursor-pointer ${currentView === "botSideBar" ? "text-[#15FF00]" : "dark:text-[#A3A2A2]"}`}
                >
                  Bot
                </span>
                <span
                  onClick={() => setCurrentView(x => x === "clientSideBar" ? "chart" : "clientSideBar")}
                  className={`flex items-center mr-4 text-sm cursor-pointer ${currentView === "clientSideBar" ? "text-[#15FF00]" : "dark:text-[#A3A2A2]"}`}
                >
                  Sub-Clients
                </span>
              </>
            ) : null}
            <span
              onClick={() => setCurrentView(x => x === "exchangeSidebar" ? "chart" : "exchangeSidebar")}
              className="hidden lg:flex items-center mr-2 text-sm dark:text-[#A3A2A2] cursor-pointer"
            >
              Exchange
            </span>
            {authUser.user_roles === "client" && authUser.usertype === 4 && (
              <span
                onClick={() => window.open(`${process.env.REACT_APP_API_URL}/pdfs/user_${authUser.id}.pdf`, "_blank")}
                className="hidden lg:flex items-center mr-2 text-sm dark:text-[#A3A2A2] cursor-pointer"
              >
                <img width={26} className="cursor-pointer" src={settingIcon} alt="second logo" />
                Statement
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}