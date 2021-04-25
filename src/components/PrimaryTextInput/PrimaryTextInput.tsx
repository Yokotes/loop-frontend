import React from 'react';
import styles from './PrimaryTextInput.module.css';

type PrimaryTextInputProps = {
  label: string;
  htmlId: string;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

const PrimaryTextInput = ({ label, htmlId, onChange }: PrimaryTextInputProps) => {
  return (
    <div className={styles.container}>
      <label 
        htmlFor={htmlId} 
        className={styles.label}
      >
        {label}
      </label>
      <input
        id={htmlId}
        type="text"
        className={styles.input}
        onChange={onChange}
      />
    </div>
  )
}

export default PrimaryTextInput;