import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import loginReducer from './reducers/loginReducer.js';
import threadReducer from './reducers/threadReducer.js';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer.js';
import filterReducer from './reducers/filterReducer.js';
import imageReducer from './reducers/imageReducer.js';
import pageReducer from './reducers/pageReducer.js';
import queryReducer from './reducers/queryReducer.js';

//redux toolkit
const store = configureStore({
  reducer: {
    login: loginReducer,
    thread: threadReducer,
    user: userReducer,
    filter: filterReducer,
    images: imageReducer,
    page: pageReducer,
    query: queryReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
