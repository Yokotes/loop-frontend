import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentMenuItem } from '../../controllers/sidebarController';
import { RootState } from '../../models/store';
import styles from './ProfileLink.module.css';

const ProfileLink = () => {
  const user = useSelector((state: RootState) => state.profile.currentUser);
  const dispatch = useDispatch();

  return (
    <div className={styles.profile}>
      <p className={styles.content}>
        <span className={styles.name}>
          {user.name}
        </span>
        <span className={styles.role}>
          {user.role}
        </span>
      </p>
      <Link 
        to="/profile" 
        className={styles.img}
        onClick={() => dispatch(setCurrentMenuItem(-1))}
        >
        <svg className={styles.circle}>
          <circle cx="25" cy="25" r="22"></circle>
        </svg>
        <img 
          src={user.img} 
          alt={user.name}
          className={styles.img}
        />
      </Link>
    </div>
  )
}

export default ProfileLink;