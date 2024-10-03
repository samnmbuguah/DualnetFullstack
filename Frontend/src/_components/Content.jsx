import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "_components";
import { Users, Home } from "pages";
import { Login, Signup } from "auth";
import lightLogo from "../_assets/logo light mode.png";
import darkLogo from "../_assets/logo_dark_mode.png";
import styles from "./Content.module.css";

export function Content({
  isDarkMode,
  infoType,
  isAuthRoute,
  screenWidth,
}) {
  const contentStyle = {
    boxShadow: isDarkMode
      ? "1px 4px 4px #2B3036 inset"
      : "1px 4px 4px #C3C3C3 inset",
    border: isDarkMode ? "1px #2B3036 solid" : "1px #C3C3C3 solid",
    background: isDarkMode ? "none" : "#FFF4E4",
    opacity: "0.8",
  };

  return (
    <div
      className={`${styles.contentContainer} ${
        isAuthRoute ? styles.authRoute : ""
      }`}
    >
      {isAuthRoute && (
        <img
          className={styles.authLogo}
          src={isDarkMode ? darkLogo : lightLogo}
          alt="logo"
        />
      )}
      <div className={styles.content} style={contentStyle}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home
                  dark={isDarkMode}
                  infoType={infoType}
                  currentView="chart"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <Home
                  dark={isDarkMode}
                  infoType={infoType}
                  currentView="clientSideBar"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/exchange"
            element={
              <PrivateRoute>
                <Home
                  dark={isDarkMode}
                  infoType={infoType}
                  currentView="exchangeSidebar"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <PrivateRoute>
                <Home
                  dark={isDarkMode}
                  infoType={infoType}
                  currentView="walletSidebar"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/bot"
            element={
              <PrivateRoute>
                <Home
                  dark={isDarkMode}
                  infoType={infoType}
                  currentView="botSideBar"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/chart"
            element={
              <PrivateRoute>
                <Home
                  dark={isDarkMode}
                  infoType={infoType}
                  currentView="chartSideBar"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/info"
            element={
              <PrivateRoute>
                <Home
                  dark={isDarkMode}
                  infoType={infoType}
                  currentView="infoSidebar"
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/dual-invest"
            element={
              <PrivateRoute>
                <Home
                  dark={isDarkMode}
                  infoType={infoType}
                  currentView="dualInvestSidebar"
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
  );
}