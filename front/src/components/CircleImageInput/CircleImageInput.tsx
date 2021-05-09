import React from 'react';
import styles from './CircleImageInput.module.css';

type CircleImageInputProps = {
  defaultImg: string;
  imgAlt: string;
  className?: string;
  onChange?(e: React.ChangeEvent): void;
}

const CircleImageInput = ({ 
  className, 
  defaultImg,
  imgAlt,
  onChange
}: CircleImageInputProps) => {
  return (
    <div 
      className={`${styles.container} ${className ? className: ''}`}
    >
      <img 
        className={styles.img}
        src={defaultImg} 
        alt={imgAlt}
      />
      <input 
        type="file"
        className={styles.input}
        onChange={onChange}
      />
    </div>
  )
}

export default CircleImageInput;