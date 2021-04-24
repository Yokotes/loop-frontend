import React from 'react';
import { useDispatch } from 'react-redux';
import { showAddTaskModal } from '../../controllers/modalsController';
import { deleteTask, showTasks } from '../../controllers/tasksController';
import Task, { TaskProps } from '../Task/Task';
import styles from './TasksContainer.module.css';

type TasksContainerProps = {
  id: string;
  projectTitle: string;
  tasks: TaskProps[];
  isShowed: boolean;
}

const TasksContainer = ({ id, projectTitle, tasks, isShowed }: TasksContainerProps) => {
  const dispatch = useDispatch();
  
  return (
    <div className={`${styles.container} ${isShowed ? styles.showed: ''}`}>
      <div className={styles.header}>
        <h3 className={styles.projectTitle}>
          { projectTitle }
        </h3>
        <div className={styles.btns}>
          <button
            className={styles.btn}
            onClick={() => dispatch(showAddTaskModal(id))}
            title="Add task to project"
          >
            <img src="img/buttons/add.svg" alt="Add new task"/>
          </button>
          <button 
            className={`${styles.btn} ${styles.showBtn}`}
            onClick={() => dispatch(showTasks(id))}
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
                />
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default TasksContainer;