import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import App from './components/app';
import Search from './components/search';
import Projects from './components/projects';
import Lists from './components/lists';

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="search" component={Search}/>
      <Route path="projects" component={Projects}/>
      <Route path="lists" component={Lists}/>
    </Route>
  </Router>
), document.getElementById('main')); 