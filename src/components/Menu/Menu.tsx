import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentMenuItem, setCurrentMenuItem } from '../../controllers/sidebarController';
import { RootState } from '../../models/store';
import styles from './Menu.module.css';
import MenuItem from './MenuItem';

const Menu = () => {
  const items = useSelector((state: RootState) => state.menu.items);
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(loadCurrentMenuItem());
  }, [dispatch]);

  return (
    <nav className={styles.menu}>
      {
        items.map((item) => (
          <MenuItem 
            key={item.id} 
            path={item.path} 
            icon={item.icon}
            isCurrent={item.isCurrent}
            onClick={() => dispatch(setCurrentMenuItem(item.id))}
          >
            {item.title}
          </MenuItem>
        ))
      }
    </nav>
  )
}

export default Menu;