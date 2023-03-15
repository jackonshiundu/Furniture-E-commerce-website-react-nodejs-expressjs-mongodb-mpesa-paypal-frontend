import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider, useDispatch, useSelector } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import Store from './Features/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { getOrder } from './Features/slices/placeOrder';
const root = ReactDOM.createRoot(document.getElementById('root'));
let persistore = persistStore(Store);

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate persistor={persistore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
