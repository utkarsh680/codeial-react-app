
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';

import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Navbar, Loader } from '../components';
import { useAuth } from '../hooks';


function PrivateRoute({ children}){
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}
function App() {
  const auth = useAuth();
  console.log('auth', auth);
  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/user/:userId" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
