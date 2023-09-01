import React from 'react'
import styles from './style.module.css';

const Navbar = () => {
  return (
    <div className={styles.Navbar1}>
        <nav className={styles.Nav}>
            <div className={styles.logo} >BannerBot</div>
            <ul className={styles.list}>
                <li>Home</li>
                <li>About</li>
                <li>Contact Us </li>
                <li>Services </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar