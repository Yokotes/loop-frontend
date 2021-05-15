import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Project from '../../components/Project/Project';
import { loadProjects } from '../../controllers/projectsController';
import { ProjectType } from '../../models/slices/projectsListSlice';
import { RootState } from '../../models/store';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const projects: ProjectType[] = useSelector((state: RootState) => state.projectsList.projects);
  const userId = useSelector((state: RootState) => state.profile.currentUser._id);

  useEffect(() => {
    if (userId) {
      dispatch(loadProjects());
    }
  }, [dispatch, userId]);

  return (
    <div className={styles.container}>
      {
        projects.length ? (
          projects.map(
            (item, index) => (
              <Project 
                key={index}
                id={item.id} 
                title={item.title} 
                img={item.img} 
              />
            )
          )
        ) : (
          <div className={styles.note}>There is no projects yet</div>
        )
      }
    </div>
  )
}

export default ProjectsPage;