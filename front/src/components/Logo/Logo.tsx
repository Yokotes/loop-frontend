import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentMenuItem } from '../../controllers/sidebarController';
import styles from './Logo.module.css';

const Logo = () => {
  const dispatch = useDispatch();

  return (
    <Link 
      to="/" 
      className={styles.logo} 
      data-testid="logo"
      onClick={() => dispatch(setCurrentMenuItem(0))}
    >
      <img src="img/logo.svg" alt="Awesome logo"/>
      <h1 className={styles.title}>
        Loop Task Manager
      </h1>
    </Link>
  )
}

export default Logo