import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <div>
      <Router>
        <Route exact path='/register'>
          <Register />
        </Route>
        {/* redorect for entering */}
        <Route exact path='/'>
          <Redirect to='/register' />
        </Route>
      </Router>
    </div>
  );
}

export default App;
