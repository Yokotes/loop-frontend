import React from 'react';
import styles from './PrimaryFileInput.module.css';

type PrimaryFileInputProps = {
  label: string,
  htmlId: string,
  className?: string,
  onChange?(e: React.ChangeEvent): void,
}

const PrimaryFileInput = ({ label, className, htmlId, onChange }: PrimaryFileInputProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={htmlId} className={styles.label}>
        { label }
      </label>
      <div className={styles.inputContainer}>
        <span className={styles.falseInput}>
          <img src="img/buttons/attach.svg" alt="+"/>
          Attach image
        </span>
        <input 
          type="file"
          className={styles.input}
          id={htmlId}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default PrimaryFileInput;