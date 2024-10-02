import React from "react";
import { FaYinYang } from "react-icons/fa";
import lightLogo from "_assets/logo light mode.png";
import darkLogo from "_assets/logo_dark_mode.png";
import power from "_assets/log-out.png";
import styles from "./Header.module.css";

export function Header({ isDarkMode, toggleDarkMode, showInfo, logout, isAuthRoute, screenWidth, authUser }) {
  if (isAuthRoute) return null;

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={isDarkMode ? darkLogo : lightLogo} alt="logo" />
      {screenWidth > 1024 ? (
        <div className={styles.headerControls}>
          <span className={styles.modeToggle} onClick={toggleDarkMode}>
            <span>MODE</span>
            <FaYinYang color={isDarkMode ? "white" : "black"} />
          </span>
          <span className={styles.headerLink} onClick={() => showInfo(1)}>
            WHITEPAPER
          </span>
          <span className={styles.headerLink} onClick={() => showInfo(2)}>
            FAQ
          </span>
        </div>
      ) : (
        authUser && (
          <button className={styles.logoutButton} onClick={logout}>
            <img src={power} alt="power" />
          </button>
        )
      )}
    </header>
  );
}