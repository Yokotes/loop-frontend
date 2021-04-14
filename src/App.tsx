import React from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './containers/Dashboard/Dashboard';

function App() {
  return (
      <Router>
        <div id={styles.app} data-testid="app-test">
          <Header />
          <div className={styles.content}>
            <Sidebar />

            <Switch>
              <Route path="dashboard" exact>
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
