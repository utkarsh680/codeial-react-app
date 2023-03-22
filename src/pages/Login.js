import styles from '../styles/login.module.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState  } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  console.log(auth);
  
//   const notify = () => toast('Wow so easy !');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    if (!email || !password) {
     return  toast.error('Please fill in all fields', {
        appearance: 'error',
        autoClose: 3000,
        autodismiss: true,
        
      });
    }
    const response = await auth.login(email, password);
    if (response.success) {
        toast.success('Logged in successfully', {
            appearance: 'success',
            autoClose: 3000,
            autodismiss: true,

        });
    } else {
        toast.error('invalid username and passwordgh', {
            appearance: 'error',
            autoClose: 3000,
            autodismiss: true,
        });
        }
        setLoggingIn(false);
  };
  if(auth.user){
    return <Navigate to="/" />
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field} >
        <button disabled={loggingIn}>{loggingIn ? 'Logging in...' : 'Log In'} </button>
      </div>
    </form>
  );
};

export default Login;
