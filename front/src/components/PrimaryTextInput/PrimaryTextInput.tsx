import React from 'react';
import styles from './PrimaryTextInput.module.css';

type PrimaryTextInputProps = {
  className?: string;
  label: string;
  htmlId: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  isPassword?: boolean;
  value?: string;
}

const PrimaryTextInput = ({ 
  className, 
  label, 
  htmlId, 
  onChange, 
  isPassword=false,
  value=""
}: PrimaryTextInputProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label 
        htmlFor={htmlId} 
        className={styles.label}
      >
        {label}
      </label>
      <input
        id={htmlId}
        type={isPassword ? "password": "text" }
        className={styles.input}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default PrimaryTextInput;