import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import ExpOrComp from './components/ExpOrComp';
import Todo from './components/Todo';

function App() {
  return (
    <div>
      <Router>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/todo'>
          <ExpOrComp >
            <Todo />
          </ExpOrComp>
        </Route>
        {/* redirect entering / */}
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
      </Router>
    </div>
  );
}

export default App;
