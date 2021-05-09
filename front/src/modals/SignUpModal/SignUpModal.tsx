import React from 'react';
import styles from './SignUpModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryTextInput from '../../components/PrimaryTextInput/PrimaryTextInput';
import { hideSignUpModal, setSignUpLoginValue, setSignUpPasswordValue, setSignUpValidPassValue } from '../../controllers/modalsController';
import { Modals } from '../../models/slices/modalsSlice';
import { RootState } from '../../models/store';
import Modal from '../Modal/Modal';
import PrimaryBtn from '../../components/PrimaryBtn/PrimaryBtn';
import { signUp } from '../../controllers/profileController';

const SignUpModal = () => {
  const modalState = useSelector((state: RootState) => state.modals.modals[Modals.SIGN_UP]);
  const dispatch = useDispatch();

  return (
    <Modal
      title="Create an account"
      isShow={modalState.isShow}
      hide={() => dispatch(hideSignUpModal())}
    >
      <Modal.Body>
        <div className={styles.bodyContent}>
          <PrimaryTextInput 
            htmlId="signup-login"
            label="Login:"
            className={styles.input}
            value={modalState.data.login}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => (
                dispatch(setSignUpLoginValue(e.currentTarget.value))
              )
            }
          />
          <PrimaryTextInput 
            htmlId="signup-pass"
            label="Password:"
            className={styles.input}
            value={modalState.data.password}
            isPassword={true}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => (
                dispatch(setSignUpPasswordValue(e.currentTarget.value))
              )
            }
          />
          <PrimaryTextInput 
            htmlId="signup-valid"
            label="Password again:"
            className={`${styles.input} ${styles.valid}`}
            value={modalState.data.validPassword}
            isPassword={true}
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) => (
                dispatch(
                  setSignUpValidPassValue(
                    e.currentTarget.value,
                    styles.valid,
                    styles.wrong
                  )
                )
              )
            }
          />

          <PrimaryBtn
            className={styles.btn}
            onClick={() => dispatch(signUp())}
          >
            Sign Up
          </PrimaryBtn>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal;