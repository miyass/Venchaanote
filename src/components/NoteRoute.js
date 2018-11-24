import React from 'react';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Note from './Note/Note';
import Dashboard from './Dashboard/Dashboard';

export default class NoteRoute extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/note" component={Note} />
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </div>
      </Router>
    );
  }
}
