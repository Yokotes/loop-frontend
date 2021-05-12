import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showProjectModal, showSignInModal, showSignUpModal } from '../../controllers/modalsController';
import { setCurrentMenuItem } from '../../controllers/sidebarController';
import { setUserId, setUserImg, setUserName, setUserRole, setUserToken } from '../../models/slices/profileSlice';
import { RootState } from '../../models/store';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn';
import styles from './ProfileLink.module.css';

const ProfileLink = () => {
  const user = useSelector((state: RootState) => state.profile.currentUser);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setUserToken(token));
  }

  const toggleHiddenMenu = () => {
    const menu = document.querySelector(`.${styles.menu}`) as HTMLElement;
    const classList = menu.classList;

    if (classList.contains(styles.show))
      classList.remove(styles.show)
    else 
      classList.add(styles.show)
  }

  useEffect(() => {
    if (user.token) {
      const promise = axios.get(
        "http://localhost:5000/api/v1/user/auth",
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      promise.then((res) => {
        const resUser = res.data.user;

        if (resUser) {
          dispatch(setUserId(resUser._id));
          dispatch(setUserImg(resUser.img));
          dispatch(setUserName(resUser.name));
          dispatch(setUserRole(resUser.role));
        }
      })
    }
  }, [dispatch, user.token])

  return (
    user.name ?
    (
      <div className={styles.profile}>
        <div className={styles.btns}>
          <PrimaryBtn
            className={styles.projectBtn}
            onClick={() => dispatch(showProjectModal())}
          >
            Add project
          </PrimaryBtn>
        </div>
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
    ) : (
      <div className={styles.signIn}>
        <button 
          className={styles.linkBtn}
          onClick={() => dispatch(showSignInModal())}
        >
          Sign In
        </button>
        <span className={styles.line}>/</span>
        <button 
          className={styles.linkBtn}
          onClick={() => dispatch(showSignUpModal())}
        >
          Create an account
        </button>
      </div>
    )
  )
}

export default ProfileLink;