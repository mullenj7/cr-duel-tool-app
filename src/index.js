import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Amplify } from 'aws-amplify';
import {clientpoolId, clientpoolClientId } from './params';



Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: clientpoolClientId,
      userPoolId: clientpoolId,
      region: 'eu-west-1',
    }
  }
});



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
