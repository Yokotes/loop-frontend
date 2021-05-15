import React from 'react';
import { useDispatch } from 'react-redux';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import { showSignInModal, showSignUpModal } from '../../controllers/modalsController';
import styles from './StartPage.module.css';

const StartPage = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.welcome}>
          Welcome to the LOOP Task Manager
        </h1>
        <p className={styles.msg}>
          You don't have an account yet?
        </p>
        <PrimaryBtn
          className={styles.btn}
          onClick={() => dispatch(showSignUpModal())}
        >
          Create an account
        </PrimaryBtn>
        <p className={styles.msg}>
          Or
        </p>
        <PrimaryBtn
          className={styles.btn}
          onClick={() => dispatch(showSignInModal())}
        >
          Sign in
        </PrimaryBtn>
      </div>
    </div>
  )
}

export default StartPage;