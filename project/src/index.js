import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import './index.css';
import App from './App/App';
import reducer from './reducers/reducer';
import * as serviceWorker from './serviceWorker';

const composeEnhacers = window.__REDUX_DEFTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhacers(
  applyMiddleware(ReduxThunk)
));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
