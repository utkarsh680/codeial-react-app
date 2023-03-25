import PropsType from "prop-types";
import styles from "../styles/home.module.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { getPosts } from "../api";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { FriendsList, CreatePost } from "../components";
import { useAuth } from "../hooks";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
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
    <div className={styles.home}>
    <div className={styles.postsList}>
    <CreatePost />
        {posts.map((post) => (
            <div className={styles.postWrapper} key = {`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9742/9742442.png"
                  alt="user-pic"
                />
                <div>
                  <Link to={{
                    pathname:`/user/${post.user._id}`,
                 
                  }}state={{user: post.user}}

                  className={styles.postAuthor
                  }>{post.user.name}
                  </Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{posts.content}</div>
    
              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/889/889140.png"
                    alt="likes-icon"
                  />
                  <span>5</span>
                </div>
    
                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/9815/9815431.png"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>
    
              <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                  <Comment comment = {comment} key = {`comment-${comment._id}`} />
                  ))}
               
              </div>
            </div>
          </div>

        ))}
      
    </div>
    {auth.user && <FriendsList />}
    </div>
  );
};
Home.propTypes = {
  post:PropsType.array.isRequired
};

export default Home;
