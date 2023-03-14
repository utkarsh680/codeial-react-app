
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Login } from '../pages';
import { Navbar, Loader } from '../components';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';

const About = () => {
  return <div>About</div>;
};

const UserInfo = () => {
  return (
    <div>
      <ul className={styles.ul}>
        <li>name: hello</li>
        <li>age: 18</li>
        <li>add:parasnath</li>
      </ul>
    </div>
  );
};

function App() {
  const auth = useAuth();


  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/hello" element={<UserInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
