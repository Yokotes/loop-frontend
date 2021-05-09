import React from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import ProjectsPage from './containers/ProjectsPage/ProjectsPage';
import StartPage from './containers/StartPage/StartPage';
import TasksPage from './containers/TasksPage/TasksPage';
import AddTaskModal from './modals/AddTaskModal/AddTaskModal';
import ProjectModal from './modals/ProjectModal/ProjectModal';
import SignInModal from './modals/SignInModal/SignInModal';
import SignUpModal from './modals/SignUpModal/SignUpModal';

function App() {
  return (
      <Router>
        <div id={styles.app} data-testid="app-test">
          {/* Header */}
          <Header />

          {/* Sidebar & Content */}
          <div className={styles.content}>
            <Sidebar />

            <div className={styles.pageContent}>
              <Switch>
                <Route path="/" exact>
                  <ProjectsPage />
                </Route>
                <Route path="/projects">
                  <ProjectsPage />
                </Route>
                <Route path="/tasks">
                  <TasksPage />
                </Route>
                <Route path="/start">
                  <StartPage />
                </Route>
                <Route path="/profile">
                  <ProfilePage />
                </Route>
              </Switch>
            </div>
          </div>
        
          {/* Modals */}
          <AddTaskModal />
          <ProjectModal />
          <SignInModal />
          <SignUpModal />
        </div>
      </Router>
  );
}

export default App;
