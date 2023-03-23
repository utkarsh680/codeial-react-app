import styles from '../styles/settings.module.css';
import { Loader } from '../components';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setLoading(false);
        setUser(response.data.user);
      } else {
        toast.error('User not found');
        setLoading(false);
        return navigate('/');
      }
    };

    getUser();
  }, [userId, navigate]);

  if (loading) {
    return <Loader />;
  }
  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;

    if(friends === undefined){
      return false;
    }

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>
      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.savebtn}`}>Remove Friend</button>
        ) : (
          <button className={`button ${styles.savebtn}`}>Add Friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
