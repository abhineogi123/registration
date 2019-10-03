import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import DashBoard from './components/dashboard';
import Login from './components/loginDetails';
import Registration from './components/registration';
import UserList from './components/userList';

function App() {
  return (
    <div className="App">
      <div className="form-container">
        <header className="App-header">
          Registration
      </header>
        <div className="Nav">
          <div className="Nav-div">
            <Link to="/DashBoard">DashBoard</Link>
          </div>
          <div className="Nav-div">
            <Link to="/Login">SignUp</Link>
          </div>
          <div className="Nav-div">
            <Link to="/UserList">UserList</Link>
          </div>
        </div>

        <Switch>
        <Route
            exact path={"/"}
            render={props => <DashBoard {...props} />}
          />
          <Route
            path={"/DashBoard"}
            render={props => <DashBoard {...props} />}
          />
          <Route
            path={"/Login"}
            render={props => <Login {...props} />}
          />
          <Route
            path={"/Registration"}
            render={props => <Registration {...props} />}
          />
          <Route
            path={"/UserList"}
            render={props => <UserList {...props} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
