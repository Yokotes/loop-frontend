import React from 'react';
import styles from './Project.module.css';

type ProjectProps = {
  id: string,
  title: string,
  img: string,
}

const Project = ({ id, title, img }: ProjectProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.imgContainer}>
        <img src={img} alt={title + " image"} className={styles.img}/>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>
          {title}
        </h3>
        <div className={styles.panel}>
          <button className={styles.btn}>
            <img 
              src="img/buttons/edit.svg" 
              alt="Edit"
              title="Edit"
            />
          </button>
          <button className={styles.btn}>
            <img 
              src="img/buttons/delete.svg" 
              alt="Delete"
              title="Delete"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Project;