import styles from '../styles/settings.module.css';
import { Loader } from '../components';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserProfile ,addFriend, removeFriend} from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
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

    if (friends === undefined) {
        return false;
    }
    const friendsId = friends.map(friend => friend.to_user._id);
    const index = friendsId.indexOf(userId);


    if (index !== -1) {
        return true;
    }

    return false;

}
  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);
    const response = await removeFriend(userId);
    if(response.success){
      const frienship = auth.user.friends.filter(friend=> friend.to_user._id === userId);
      auth.updateUserFriends(false, frienship[0]);
      toast.success('Friend removed successfully');

    }else{
      toast.error(response.message);
    }
    setRequestInProgress(false);

  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);
    

    if(response.success){
      const {friendship} = response.data;

      auth.updateUserFriends(true, friendship);
      toast.success('Friend added successfully');

    }else{
      toast.error(response.message);
    }
    setRequestInProgress(false);

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
          <button className={`button ${styles.savebtn}`}
          onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? 'Removing...' : 'Remove Friend'}
          </button>
        ) : (
          <button className={`button ${styles.savebtn}` }
          onClick={handleAddFriendClick}
          disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding...' : 'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
