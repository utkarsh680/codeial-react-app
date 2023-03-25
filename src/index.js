import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, PostsProvider} from './Providers';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
      <App />
      </PostsProvider>
    </AuthProvider>
    <ToastContainer/>    
  </React.StrictMode>
);

