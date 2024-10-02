import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "_components";
import { Users, Home } from "pages";
import { Login, Signup } from "auth";
import lightLogo from "../_assets/logo light mode.png";
import darkLogo from "../_assets/logo_dark_mode.png";
import styles from "./Content.module.css";

export function Content({ isDarkMode, currentView, setCurrentView, infoType, isAuthRoute, screenWidth }) {
  const contentStyle = {
    boxShadow: isDarkMode ? '1px 4px 4px #151515 inset' : 'none',
    border: isDarkMode ? '1px #2B3036 solid' : '1px #C9C5C5 solid',
    background: isDarkMode ? 'none' : '#FEF6E6',
  };

  return (
    <div className={`${styles.contentContainer} ${isAuthRoute ? styles.authRoute : ''}`}>
      {isAuthRoute && <img className={styles.authLogo} src={isDarkMode ? darkLogo : lightLogo} alt="logo" />}
      <div className={styles.content} style={contentStyle}>
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
}