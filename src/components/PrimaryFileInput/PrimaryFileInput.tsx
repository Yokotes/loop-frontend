import React from 'react';
import styles from './PrimaryFileInput.module.css';

type PrimaryFileInputProps = {
  label: string,
  htmlId: string,
  className?: string,
  onChange?(): void,
}

const PrimaryFileInput = ({ label, className, htmlId, onChange }: PrimaryFileInputProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={htmlId} className={styles.label}>
        { label }
      </label>
      <div className={styles.inputContainer}>
        <span className={styles.falseInput}>
          Attach image
        </span>
        <input 
          type="file"
          className={styles.input}
          id={htmlId}
        />
      </div>
    </div>
  )
}

export default PrimaryFileInput;