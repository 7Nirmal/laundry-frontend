import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { AppProvider } from './context/Context';
import { SnackbarProvider } from 'notistack';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
  <React.StrictMode>
      <AppProvider>
      <SnackbarProvider maxSnack={3}>
    <App />
    </SnackbarProvider>
    </AppProvider>
  </React.StrictMode>
  </BrowserRouter>
);


