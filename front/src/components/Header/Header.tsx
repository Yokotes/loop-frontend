import React from 'react';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import ProfileLink from '../ProfileLink/ProfileLink';

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <ProfileLink />
    </header>
  )
}

export default Header;