import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/ModalContext';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <SnackbarProvider autoHideDuration={3000} preventDuplicate>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </SnackbarProvider>
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
