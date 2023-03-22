import React, { useState } from 'react';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Settings = () => {

  const auth = useAuth();
  const [ editMode, setEditMode ] = useState(false);
  const [ name, setName ] = useState(auth.user?.name ? auth.user.name : '');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ savingForm, setSavingForm ] = useState(false);


  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  
  };
  const updateProfile =async() =>{
  setSavingForm(true);
  let error = false;
  if(!name || !password || !confirmPassword)
  {
    toast.error('Please fill all the fields', {
      appearance: 'error',
      autoClose: 3000,
      autoDismiss: true,
    });
    error = true;
  }
  if (password !== confirmPassword) {
    toast.error('Make sure password and confirm password matches', {
      appearance: 'error',
      autoDismiss: true,
    });

    error = true;
  }
  if (error) {
    return setSavingForm(false);
  }
  const response = await auth.updateUser(
  auth.user._id, 
  name, 
  password, 
  confirmPassword
  );

if (response.success) {

setEditMode(false);
setSavingForm(false);
clearForm();
 return toast.success('User updated successfully', 
{
  appearance: 'success',
});

} else {
  toast.error(response.message, {
    appearance: 'error',
  });
  
}
  setSavingForm(false);
};


  
 
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
        <div className={styles.fieldValue}>{auth.user?.name }</div>
        )}
      </div>
      {
        editMode && (
          <>
          <div className={styles.field}>
        <div className={styles.fieldLabel}>Password</div>
        <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Confirm Password</div>
        <input type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
          </>
  )}

      

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
          <button className={`button ${styles.saveBtn}`}
          onClick ={updateProfile}
          disabled={savingForm}
          >
             {savingForm ? 'Saving profile...' : ' Save Profile'}
            </button>
            <button className={`button ${styles.cancelBtn}`}
              onClick={() => setEditMode(false)}
            >
            GO back </button>
          </>) : (
        <button className={`button ${styles.editBtn}`}
        onClick={() => setEditMode(true)}
        >
         Profile</button>
          )}
      </div>
    </div>
  );
};

export default Settings;


