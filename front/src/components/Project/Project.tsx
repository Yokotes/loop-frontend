import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setProjectModalToEdit } from '../../controllers/modalsController';
import { removeProject, setCurrentProjectAndLoadTasks } from '../../controllers/projectsController';
import styles from './Project.module.css';

type ProjectProps = {
  id: string,
  title: string,
  img: string,
}

const Project = ({ id, title, img }: ProjectProps) => {
  const dispatch = useDispatch();
  
  return (
    <div className={styles.item}>
      <Link 
        className={styles.imgContainer}
        to="/tasks"
        onClick={() => dispatch(setCurrentProjectAndLoadTasks(id, title))}
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
              onClick={
                () => dispatch(setProjectModalToEdit(id))
              }
            />
          </button>
          <button className={styles.btn}>
            <img 
              src="img/buttons/delete.svg" 
              alt="Delete"
              title="Delete"
              onClick={() => dispatch(removeProject(id))}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Project;