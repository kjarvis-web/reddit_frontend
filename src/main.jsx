import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import loginReducer from './reducers/loginReducer.js';
import { combineReducers, createStore } from 'redux';
import threadReducer from './reducers/threadReducer.js';

const reducer = combineReducers({
  login: loginReducer,
  thread: threadReducer,
});

const store = createStore(reducer);

console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
