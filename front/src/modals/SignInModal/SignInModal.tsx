import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import PrimaryTextInput from '../../components/PrimaryTextInput/PrimaryTextInput';
import { hideSignInModal, setSignInLoginValue, setSignInPasswordValue } from '../../controllers/modalsController';
import { signIn } from '../../controllers/profileController';
import { Modals } from '../../models/slices/modalsSlice';
import { RootState } from '../../models/store';
import Modal from '../Modal/Modal';
import styles from './SignInModal.module.css';

const SignInModal = () => {
  const modalState = useSelector((state: RootState) => state.modals.modals[Modals.SIGN_IN]);
  const dispatch = useDispatch();

  return (
    <Modal
      title="Sign in"
      isShow={modalState.isShow}
      hide={() => dispatch(hideSignInModal())}
    >
      <Modal.Body>
        <div className={styles.bodyContent}>
          <PrimaryTextInput 
            className={styles.input}
            htmlId="user-login"
            label="Login:"
            value={modalState.data.login}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => (
                dispatch(setSignInLoginValue(e.currentTarget.value))
              )
            }
          />
          <PrimaryTextInput 
            className={styles.input}
            htmlId="user-password"
            label="Password:"
            isPassword={true}
            value={modalState.data.password}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => (
                dispatch(setSignInPasswordValue(e.currentTarget.value))
              )
            }
          />
          <PrimaryBtn 
            className={styles.btn}
            onClick={() => dispatch(signIn())}
          >
            Sign In
          </PrimaryBtn>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SignInModal;