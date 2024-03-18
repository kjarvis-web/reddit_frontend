import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import loginReducer from './reducers/loginReducer.js';
import { combineReducers, createStore } from 'redux';
import threadReducer from './reducers/threadReducer.js';
import { configureStore } from '@reduxjs/toolkit';

// const reducer = combineReducers({
//   login: loginReducer,
//   thread: threadReducer,
// });

// const store = createStore(reducer);

//redux toolkit
const store = configureStore({
  reducer: {
    login: loginReducer,
    thread: threadReducer,
  },
});

console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
