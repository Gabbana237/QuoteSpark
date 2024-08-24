// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faDownload, faSync, faAdjust } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faWhatsapp, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

library.add(faCopy, faDownload, faSync, faAdjust, faFacebookF, faTwitter, faWhatsapp, faLinkedinIn);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();