import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Providers/AuthProvider';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
     <App />
    </AuthProvider>
    <ToastContainer/>    
  </React.StrictMode>
);

