import React from 'react';
import styles from './Sidebar.module.css'
import Burger from '../Burger/Burger';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/store';
import Menu from '../Menu/Menu';

const Sidebar = () => {
  const isExpanded = useSelector((state: RootState) => state.sidebar.expanded);

  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded: ''}`} data-testid="sidebar-test">
      <Burger />
      <Menu />
    </aside>
  )
}

export default Sidebar;