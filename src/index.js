import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDIbnE4S_t_7VxhRkTm1FTa_V6hatrg9YU",
    authDomain: "stack-tag.firebaseapp.com",
    projectId: "stack-tag",
    storageBucket: "stack-tag.appspot.com",
    messagingSenderId: "447959570238",
    appId: "1:447959570238:web:de067430ac11f3c24cbe6f",
    measurementId: "G-DPT50JX8KX"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
