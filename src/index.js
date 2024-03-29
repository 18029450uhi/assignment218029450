import React from 'react';
//import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import firebase from 'firebase/compat/app';

//import 'firebase/analytics';
//import { BrowserRouter } from 'react-router-dom';






// Initialize Firebase


//firebase.getanalytics(app);


const rootElement = 
document.getElementById('root');
const root = 
createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
