import React from 'react';
import styles from './PrimaryBtn.module.css';

type PrimaryBtnProps = {
  className?: string;
  children: React.ReactChild;
  onClick?(): void;
}

const PrimaryBtn = ({ children, className, onClick }: PrimaryBtnProps) => {
  return (
    <button
      className={`${styles.btn} ${className}`}
      onClick={onClick}
    >
      { children }
    </button>
  )
}

export default PrimaryBtn;