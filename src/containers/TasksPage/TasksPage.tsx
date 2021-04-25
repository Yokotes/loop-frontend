import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TasksContainer from '../../components/TasksContainer/TasksContainer';
import { RootState } from '../../models/store';
import styles from './TasksPage.module.css';

const TasksPage = () => {
  const taskPageState = useSelector((state: RootState) => state.taskPage);

  return (
    taskPageState.currentProject !== '' ?
      <div className={styles.container}>
        <div className={styles.projectTitle}>
          <img 
            src="img/tasks/bread.svg" 
            alt=">"
            className={styles.arrow}
          />
          <Link to="/projects" className={styles.title}>
            { taskPageState.currentProject }
          </Link>
        </div>
        <div className={styles.tasksContainer}>
          {
            taskPageState.groups.map(
              (group) => (
                <TasksContainer
                  key={group.id}
                  id={group.id}
                  groupTitle={group.title}
                  tasks={group.tasks}
                  isShowed={group.isShowed} 
                />
              )
            )
          }
        </div>
      </div>
    : <div>Select project</div>
  )
}

export default TasksPage;