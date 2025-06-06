import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import './style/App.css';
import './style/header.css';
import './style/footer.css';
import './style/home.css';
import './style/signUp.css';
import './style/login.css';
import './style/userDash.css';
import './style/courierList.css';
import './style/staticPages.css';
import './style/quotation.css';

import App from './comp/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
