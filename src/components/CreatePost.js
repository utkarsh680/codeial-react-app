import styles from '../styles/home.module.css';
import { useState } from 'react';
const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);

  const handleAddPostClick = async () => {
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
