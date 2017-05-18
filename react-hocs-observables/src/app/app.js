import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './app.css';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainNavigation from './containers/main-navigation';

import TodoApp from './components/todo-app';
import FindBookPage from './containers/find-book-page';
import BookDetail from './containers/book-detail';
import ShowTheLocation from './components/show-location';
import { Switch } from 'react-router-dom';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

@withRouter
@connect()
class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <MainNavigation />
          <Switch>
            <Route exact path="/">
              <Redirect to="/search" />
            </Route>
            <Route path="/todos" component={TodoApp} />
            <Route path="/search" component={FindBookPage} />
            <Route path="/book/:bookId" component={BookDetail} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }

  handleSerch = (event) => {
    event.preventDefault();
    const userName = event.target.elements[0].value;
    const repo = event.target.elements[1].value;
    const path = `/repos/${userName}/${repo}`;
    // this.context.router.history.push(path);
    // Now you can dispatch navigation actions from anywhere!
    this.props.dispatch(push(path));
  }

}

export default App;
