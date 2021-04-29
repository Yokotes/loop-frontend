import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showProjectModal } from '../../controllers/modalsController';
import { setCurrentProject } from '../../models/slices/tasksPageSlice';
import styles from './Project.module.css';

type ProjectProps = {
  id: string,
  title: string,
  img: string,
}

const Project = ({ id, title, img }: ProjectProps) => {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(setCurrentProject({
      id,
      title
    }));
  }
  
  return (
    <div className={styles.item}>
      <Link 
        className={styles.imgContainer}
        to="/tasks"
        onClick={handleClick}
      >
        <img 
          src={img} 
          alt={title + " image"} 
          className={styles.img}
        />
      </Link>
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
              onClick={() => dispatch(showProjectModal())}
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