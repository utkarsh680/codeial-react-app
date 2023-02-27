import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home } from '../pages';
import Loader from '././Loader'



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
  if(isLoading) {
    return <Loader />
  }
  

  return (
    <div className="App">
      <Home posts={posts} />
    </div>
  );
}

export default App;
