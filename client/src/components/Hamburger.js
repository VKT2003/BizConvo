import React, { useContext, useState } from 'react'
import styles from '../styles/Sidebar.module.css';
import { ThemeContext } from '../context/ThemeContext';
import { useOpenContext } from '../context/OpenContext';

export default function Hamburger() {
    const { theme, toggleTheme } = useContext(ThemeContext); // Use theme and toggleTheme from context
    const { isOpenHam, toggleOpenHam } = useOpenContext();

    return (
        <div className={`${styles.hamburger1} ${theme === 'light' ? styles.hamburger1Light : styles.hamburger1Dark} ${isOpenHam ? styles.ham1Open : styles.ham1Close}`} onClick={toggleOpenHam}>
            <div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </div>
    )
}
