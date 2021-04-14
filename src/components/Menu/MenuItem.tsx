import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../models/store';
import styles from './Menu.module.css';

type MenuItemProps = {
  children: React.ReactChild;
  icon: string;
  path: string;
  isCurrent: boolean;
  onClick(): void;
}

const MenuItem = ({children, icon, path, isCurrent, onClick}: MenuItemProps) => {
  const isExpanded = useSelector((state: RootState) => state.sidebar.expanded)
  
  return (
    <Link 
      title={children.toString()}
      to={path} 
      className={`${styles.item} ${isExpanded ? styles.active : ''} ${isCurrent ? styles.current : ''}`}
      onClick={onClick}
    >
      <span className={styles.itemIcon}>
        <img src={icon} alt={children.toString()} />
      </span>

      <span className={styles.itemContent}>
        <span>
          {children}
        </span>
      </span>
    </Link>
  )
}

export default MenuItem;