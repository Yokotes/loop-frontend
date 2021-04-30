import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentMenuItem } from '../../controllers/sidebarController';
import { RootState } from '../../models/store';
import styles from './ProfileLink.module.css';

const ProfileLink = () => {
  const user = useSelector((state: RootState) => state.profile.currentUser);
  const dispatch = useDispatch();

  const toggleHiddenMenu = () => {
    const menu = document.querySelector(`.${styles.menu}`) as HTMLElement;
    const classList = menu.classList;

    if (classList.contains(styles.show))
      classList.remove(styles.show)
    else 
      classList.add(styles.show)
  }

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
      <button 
        className={styles.img}
        onClick={toggleHiddenMenu}
        >
        <img 
          src={user.img} 
          alt={user.name}
          className={styles.img}
        />
      </button>
      <nav 
        className={styles.menu}
        onClick={toggleHiddenMenu}
      >
        <Link 
          to="/profile"
          className={styles.link}   
          onClick={() => dispatch(setCurrentMenuItem(-1))}     
        >
          Profile
        </Link>
        <Link 
          to="/start"
          className={`${styles.link} ${styles.logout}`}
        >
          Sign out
        </Link>
      </nav>
    </div>
  )
}

export default ProfileLink;