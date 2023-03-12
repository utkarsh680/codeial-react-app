import { useEffect, useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { getPosts } from '../api';
import { Home ,Login } from '../pages';
import { Navbar, Loader } from '../components';
import styles from '../styles/navbar.module.css'

const About = () => {
  return <div>About</div>;
};

const UserInfo = () => {
  return <div>
    <ul className={styles.ul}>
      <li>name: hello</li>
      <li>age: 18</li>
      <li>add:parasnath</li>

    </ul>
  </div>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
      if (response.success) {
        setPosts(response.data.posts);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      
       <Router>
       <Navbar />
        <Routes>
          <Route   path="/" element={<Home posts={posts} />} />
          <Route   path="/about" element={<About />} />
          <Route   path="/user/hello" element={<UserInfo />} />
          <Route   path="/login" element={<Login />} />
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
       </Router>

    </div>
  
    
  );
}

export default App;
