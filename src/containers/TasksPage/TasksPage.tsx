import React from 'react';
import { useSelector } from 'react-redux';
import TasksContainer from '../../components/TasksContainer/TasksContainer';
import { RootState } from '../../models/store';
import styles from './TasksPage.module.css';

const TasksPage = () => {
  const projects = useSelector((state: RootState) => state.projectsList.projects);
  
  return (
    <div className={styles.container}>
      <div className={styles.tasksContainer}>
        { 
          projects.map(
            (project) => (
              <TasksContainer 
                key={project.id}
                id={project.id}
                projectTitle={project.title} 
                tasks={project.tasks}
                isShowed={project.isShowed}
              />
            )
          ) 
        }
      </div>
    </div>
  )
}

export default TasksPage;