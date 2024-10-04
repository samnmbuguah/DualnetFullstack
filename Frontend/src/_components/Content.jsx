import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "_components";
import { Users, Home } from "pages";
import { Login, Signup } from "auth";
import styles from "./Content.module.css";

export function Content({
  isDarkMode,
  infoType,
  isAuthRoute,
}) {
  const contentClasses = `${styles.contentContainer} ${
    isDarkMode ? styles.contentDark : styles.contentLight
  }`;

  return (
    <div className={contentClasses}>
      <Routes>
        <Route
          path="/chart"
          element={
            <PrivateRoute>
              <Home dark={isDarkMode} infoType={infoType} currentView="chart" />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Users isDarkMode={isDarkMode} />
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
          path="/"
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
  );
}
