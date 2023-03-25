import styles from '../styles/home.module.css';
import { useState } from 'react';
import {addPost} from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);
    const response = await addPost(post);
    if (response.success) {
      posts.addPostToState(response.data.post);
      toast.success('Post added successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
      setPost('');
    } else {
      toast.error(response.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    setAddingPost(false);
  }
  return (
  <div className={styles.createPost}>
    <textarea className={styles.addPost} 
    onChange={(e) => setPost(e.target.value)}
    />
    <div>
      <button 
      className={styles.addPostBtn}
      value ={post} 
      onClick= {handleAddPostClick} 
      disabled ={addingPost}
      >
        {addingPost ? 'Adding Post...' : 'Add Post'}
        
      </button>
    </div>
  </div>
  );
};

export default CreatePost;
