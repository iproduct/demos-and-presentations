import './assets/css/main.css';
import './assets/css/material-icons.css';
import './assets/css/animation.css';
// import './assets/images/react-redux.png';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import thunk from 'redux-thunk';

import reducers from './reducers';
import epics from './epics';
import App from './app';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
console.log(history);


const epicMiddleware = createEpicMiddleware(combineEpics(...epics));
console.log(epicMiddleware);

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [routerMiddleware(history), epicMiddleware];

// Enable Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/repos/react/redux'));


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        { /* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// HMR
if (module.hot) {
  module.hot.accept('./app', () => { 
    const NextApp = require('./app').default; // eslint-disable-line global-require
    render(NextApp); 
  });
}



