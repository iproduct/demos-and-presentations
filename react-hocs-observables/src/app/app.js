import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './app.css';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainNavigation from './containers/main-navigation';

import TodoApp from './components/todo-app';
import FindBookPage from './containers/find-book-page';
import ShowTheLocation from './components/show-location';

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
          <ul className="main-menu">
            {/*<li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/show-location">Show the Location</NavLink></li>
            <li><Link to="/intro">Intro</Link></li>
          <li><Link to="/repos">Repos</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <li><Link to="/show-location">Show the Location</Link></li>
          <li><Link to="/about">About</Link></li>
          <form className="navbar-form navbar-right" role="search" onSubmit={this.handleSerch}>
            <input type="text" placeholder="userName" className="form-control" /> / {' '}
            <input type="text" placeholder="repo" className="form-control" />{' '}
            <button type="submit" className="btn btn-default">Go</button>
          </form> */}
          </ul>
          <hr />
          <Route path="/collection" component={TodoApp} />
          <Route path="/search" component={FindBookPage} />
          <Route path="/preview/:bookId" component={FindBookPage} />
        {/*<Route path="/intro" render={() => <div>How to start using this app</div>} />
        <Route path="/repos" component={Repos} />
        <Route path="/topics" component={Topics} />
        <Route path="/about" component={About} />*/}
          <Route path="/show-location" component={ShowTheLocation} />
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
