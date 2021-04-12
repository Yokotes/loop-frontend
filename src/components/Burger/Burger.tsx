import React from 'react';

import styles from './Burger.module.css';
import { toggleSidebar } from '../../controllers/sidebarController';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../models/store';

const Burger = () => {
  const dispatch = useDispatch();
  const isSidebarExpanded = useSelector((state: RootState) => state.sidebar.expanded)

  const handleClick  = () => {
    dispatch(toggleSidebar())
  }

  return (
    <button className={`${styles.burger} ${isSidebarExpanded ? styles.active: ''}`} 
      data-testid="burger-test" 
      onClick={handleClick}
    >
      <span className={styles.icon}>
        <span></span>
        <span></span>
        <span></span>
      </span>

      <span className={styles.content}>
        <span>
          Menu
        </span>
      </span>
    </button>
  )
}
export default Burger;