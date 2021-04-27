import React from 'react';
import { useDispatch } from 'react-redux';
import { showAddTaskModal } from '../../controllers/modalsController';
import { changeStatus, deleteTask } from '../../controllers/tasksController';
import { toggleShowed } from '../../models/slices/tasksPageSlice';
import Task, { TaskProps } from '../Task/Task';
import styles from './TasksContainer.module.css';

type TasksContainerProps = {
  id: string;
  groupTitle: string;
  tasks: TaskProps[];
  isShowed: boolean
}

const TasksContainer = ({ id, groupTitle, tasks, isShowed }: TasksContainerProps) => {
  const dispatch = useDispatch();

  const handleChangeStatus = (status: number, taskId: string) => {
    dispatch(changeStatus(status, taskId, id));
  }
  
  return (
    <div className={`${styles.container} ${isShowed ? styles.showed: ''}`}>
      <div className={styles.header}>
        <h3 className={styles.groupTitle}>
          { groupTitle }
        </h3>
        <div className={styles.btns}>
          <button 
            className={`${styles.btn} ${styles.showBtn}`}
            onClick={() => dispatch(toggleShowed(id))}
            title={isShowed ? 'Hide tasks': 'Show tasks'}
          >
            <img src={`img/buttons/show.svg`} alt={isShowed ? 'Hide': 'Show'}/>
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.tasks}>
          {
            tasks.map(
              (task) => (
                <Task 
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status}
                  onDelete={() => dispatch(deleteTask(task.id, id))}
                  changeStatus={handleChangeStatus}
                />
              )
            )
          }
          {
            <button 
              className={styles.addTaskBtn}
              onClick={() => dispatch(showAddTaskModal(id))}
            >
              <img src="img/buttons/add.svg" alt="+"/>
              <span>Add new task</span>
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default TasksContainer;