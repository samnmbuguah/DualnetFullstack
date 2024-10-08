import React from "react";
import { Link } from "react-router-dom";
import lightLogo from "_assets/logo light mode.png";
import darkLogo from "_assets/logo_dark_mode.png";
import styles from "./Header.module.css";
import modeToggle from "_assets/newLogo.svg";

export function Header({ isDarkMode, toggleDarkMode, isAuthRoute, screenWidth, authUser }) {
  if (isAuthRoute) return null;

  const headerTextClass = `${styles.headerText} ${isDarkMode ? styles.darkModeText : styles.lightModeText}`;

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={isDarkMode ? darkLogo : lightLogo} alt="logo"/>
      <div className={`${styles.headerNav}`}>
        <span className={styles.modeToggle} onClick={toggleDarkMode}>
          <span className={headerTextClass}>MODE</span>
          <img src={modeToggle} alt="mode-toggle" className={styles.toggleButton} />
        </span>
        <Link to="/whitepaper" className={styles.headerLink}>
          <span className={headerTextClass}>WHITEPAPER</span>
        </Link>
        <Link to="/faq" className={styles.faq}>
          <span className={headerTextClass}>FAQ</span>
        </Link>
      </div>
    </header>
  );
}