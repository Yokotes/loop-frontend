import React from 'react';
import styles from './Task.module.css';

export type TaskProps = {
  id: string,
  title: string,
  status: number,
  onDelete?(): void,
}

const Task = ({ id, title, status, onDelete }: TaskProps) => {
  return (
    <div className={styles.task}>
      <div className={styles.content}>
        <div className={styles.status}>
          <img src={`img/tasks/status_${status}.svg`} alt="Status"/>
        </div>
        <div className={styles.title}>
          {title}
        </div>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={onDelete}>
          <img 
            src="img/buttons/delete.svg" 
            alt="Delete"
            title="Mark as 'Delete'"
          />
        </button>
      </div>
    </div>
  )
}

export default Task;