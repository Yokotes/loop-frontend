import React from 'react';
import styles from './Modal.module.css'

type ModalProps = {
  title: string,
  children: React.ReactChild,
  hide(): void,
  isShow: boolean
}

type ModalBodyProps = {
  children: React.ReactChild,
}

const Modal = ({ title, children, hide, isShow }: ModalProps) => {
  return (
    <div 
      className={`${styles.bg} ${isShow ? styles.show : styles.hide}`}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>
            { title }
          </div>
          <div className={styles.btns}>
            <button 
              className={`${styles.btn} ${styles.closeBtn}`}
              title="Close"
              onClick={hide}
            >
              <img src="img/buttons/close.svg" alt="X"/>
            </button>
          </div>
        </div>
        <div className={styles.body}>
          { children }
        </div>
      </div>
    </div>
  )
}

Modal.Body = ({ children }: ModalBodyProps) => {
  return (
    <>
      { children }
    </>
  )
}

export default Modal