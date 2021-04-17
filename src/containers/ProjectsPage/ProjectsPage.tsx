import React from 'react';
import { useSelector } from 'react-redux';
import Project from '../../components/Project/Project';
import { RootState } from '../../models/store';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
  const projects = useSelector((state: RootState) => state.projectsList.projects);

  return (
    <div className={styles.container}>
      {
        projects.map(
          (item) => (
            <Project 
              key={item.id}
              id={item.id} 
              title={item.title} 
              img={item.img} 
            />
          )
        )
      }
    </div>
  )
}

export default ProjectsPage;