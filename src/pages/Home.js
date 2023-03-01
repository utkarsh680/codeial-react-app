import PropsType from "prop-types";
import styles from "../styles/home.module.css";

const Home = ({ posts }) => {
  return (
    <div className={styles.postsList}>
        {posts.map((posts) => (
            <div className={styles.postWrapper} key = {`post-${posts._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9742/9742442.png"
                  alt="user-pic"
                />
                <div>
                  <span className={styles.postAuthor}>{posts.user.name}</span>
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
                <div className={styles.postCommentsItem}>
                  <div className={styles.postCommentHeader}>
                    <span className={styles.postCommentAuthor}>Bill</span>
                    <span className={styles.postCommentTime}>a minute ago</span>
                    <span className={styles.postCommentLikes}>22</span>
                  </div>
    
                  <div className={styles.postCommentContent}>Random comment</div>
                </div>
              </div>
            </div>
          </div>

        ))}
      
    </div>
  );
};
Home.propTypes = {
  posts:PropsType.array.isRequired
};

export default Home;
