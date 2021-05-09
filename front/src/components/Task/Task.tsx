import React from 'react';
import styles from './Task.module.css';

export type TaskProps = {
  id: string,
  title: string,
  status: number,
  onDelete?(): void,
  changeStatus?(status: number, taskId: string): void
}

const Task = (
    { 
      id, 
      title, 
      status, 
      onDelete, 
      changeStatus=() => {} 
    }: TaskProps
  ) => {
  const handleStatusClick = (e: React.MouseEvent) => {
    const selectStatus = document.querySelector(`#s${id}`);
    const statusImg = e.currentTarget;
    selectStatus?.classList.add(styles.show);
    statusImg.classList.add(styles.hide);
  }

  const handleSelectStatus = (e: React.FormEvent<HTMLSelectElement>) => {
    const status = parseInt(e.currentTarget.value);
    changeStatus(status, id);
    const parent = e.currentTarget.parentElement;
    const statusImg = parent?.querySelector('img')?.parentElement;
    statusImg?.classList.remove(styles.hide);
    e.currentTarget.classList.remove(styles.show);
  }
  
  return (
    <div className={styles.task}>
      <div className={styles.content}>
        <select 
          className={styles.selectStatus} 
          id={`s${id}`}
          onChange={handleSelectStatus}
          defaultValue={status}
          size={4}
        >
          <option value="1">
            New
          </option>
          <option value="2">
            In work
          </option>
          <option value="3">
            Completed
          </option>
          <option value="4">
            Canceled
          </option>
        </select>
        <div 
          className={styles.status}
          onClick={handleStatusClick}
        >
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