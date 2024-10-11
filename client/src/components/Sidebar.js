import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import styles from '../styles/Sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { AccountContext } from '../context/AccountContext';
import { useOpenContext } from '../context/OpenContext';

const Sidebar = () => {
    const { isChatOpen, handleOpenChat, handleOpenConversation, isConversationOpen, isOpenHam, toggleOpenHam } = useOpenContext();

    const location = useLocation();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const { user, setChatPerson } = useContext(AccountContext);

    // Calculate the position of the active bar based on the route
    const calculateActiveBarPosition = () => {
        switch (location.pathname) {
            case '/':
                return '0'; // Default position
            case '/status':
                return '50px'; // Example: shift by 50px for 'status' page
            case '/calls':
                return '100px'; // Example: shift by 100px for 'calls' page
            default:
                return '0'; // Default case, fallback
        }
    };

    return (
        <div className={`${styles.sidebar} ${theme === 'light' ? styles.sidebarLight : styles.sidebarDark} ${isOpenHam ? styles.sidebarOpen : styles.sidebarClose} text-${theme === 'light' ? 'black' : 'white'}`}>
            <div className={styles.top}>
                <div className={`${styles.hamburger} ${theme === 'light' ? styles.hamburgerLight : styles.hamburgerDark} ${isOpenHam ? styles.hamOpen : styles.hamClose}`} onClick={toggleOpenHam}>
                    <div>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                    </div>
                    <p>Menu</p>
                </div>
                <div className={styles.profile}>
                    <img src={user ? user.picture : ''} loading='lazy' alt="profile" />
                    <i className="fa-solid fa-plus"></i>
                    <p>Profile</p>
                </div>
                <div className={styles.menu}>
                    <ul>
                        <Link to={'/'} onClick={(e) => {
                            handleOpenConversation();
                            setChatPerson('');
                            toggleOpenHam();
                        }}><img src="/chat.webp" loading='lazy' alt="" className={`${location.pathname === '/' && styles.activeLink}`} /><p>Chats</p></Link>
                        <Link to={'/status'}><img src="/status.webp" loading='lazy' alt="" className={`${location.pathname === '/status' && styles.activeLink}`} /><p>Status</p></Link>
                        <Link to={'/calls'}><img src="/telephone.webp" loading='lazy' alt="" className={`${location.pathname === '/calls' && styles.activeLink}`} /><p>Calls</p></Link>
                        <div className={styles.activeBar} style={{ transform: `translateY(${calculateActiveBarPosition()})` }}></div>
                    </ul>
                </div>
            </div>
            <div className={`${styles.bottom}`}>
                <div className={styles.themeButton}>
                    {/* Button for light theme */}
                    <div className={`${theme === 'light' ? styles.activeTheme : ''}`} onClick={toggleTheme}>
                        <img src="/sun.webp" loading='lazy' alt="Light Mode" />
                        <p>Light</p>
                    </div>
                    {/* Button for dark theme */}
                    <div className={`${theme === 'dark' ? styles.activeTheme : ''}`} onClick={toggleTheme}>
                        <img src="/moon.webp" loading='lazy' alt="Dark Mode" />
                        <p>Dark</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
