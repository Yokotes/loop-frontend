import React from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './containers/Dashboard/Dashboard';

function App() {
  return (
    <div id="app" data-testid="app-test">
      <Router>
        <Sidebar />

        <Switch>
          <Route path="dashboard" exact>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
