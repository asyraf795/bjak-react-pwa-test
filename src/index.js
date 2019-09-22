import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Movie from './Movie';
import Notfound from './NotFound'
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
    <div className="jumbotron bg-secondary text-white">
    <div className="d-flex justify-content-center">
      <Link to="/" className="h1 text-center font-weight-bold text-monospace text-light font-italic">HOOQ</Link>
    </div>
    <div className="jumbotron container-fluid bg-dark text-danger">
    
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/movie/:id" component={Movie}/>
                <Route component={Notfound}/>
            </Switch>
        </div>
  
    </div>
    </div>
    </Router>
);


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
