import React from "react";
import lightLogo from "_assets/logo light mode.png";
import darkLogo from "_assets/logo_dark_mode.png";
import styles from "./Header.module.css";
import modeToggle from "_assets/newLogo.svg";

export function Header({ isDarkMode, toggleDarkMode, showInfo, logout, isAuthRoute, screenWidth, authUser }) {
  if (isAuthRoute) return null;

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={isDarkMode ? darkLogo : lightLogo} alt="logo" />
      <div className={`${styles.headerNav}`}>
        <span className={styles.modeToggle} onClick={toggleDarkMode}>
          <span className={styles.headerText}>MODE</span>
          <img src={modeToggle} alt="mode-toggle" className={styles.toggleButton} />
        </span>
        <span className={styles.headerLink} onClick={() => showInfo(1)}>
          <span className={styles.headerText}>WHITEPAPER</span>
        </span>
        <span className={styles.faq} onClick={() => showInfo(2)}>
          <span className={styles.headerText}>FAQ</span>
        </span>
      </div>
    </header>
  );
}