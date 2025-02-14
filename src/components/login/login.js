
import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AlertBox from '../alertbox/alertbox'
import styles from './login.module.css'
import api from '../../api'


const validateEmail=(email)=> {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}


const Login = ({ isLoggedIn,setIsLoggedIn,setuserInfo }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginFailed, setLoginFailed] = useState(false);
  const [error, setError] = useState(null);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [emailError,setemailError] =useState(false);



// At successful login
  const showAlert = () => {
    setAlertVisible(true);
  };
  const closeAlert = () => {
    setAlertVisible(false);
    navigate('/');// Navigate to the home page
  };

  
  // Navigate to the signup page
  const handleSignupNavigation = () => {
    navigate('/signup');
  };

  // at failed login
  const showLoginFailedAlert = () => setLoginFailed(true);
  const closeLoginFailedAlert = () => setLoginFailed(false);


  useEffect(()=>{
    if(!validateEmail(email)&&email.length>0){
      setError("Invalid email")
      setemailError(true)
    }
    else{
      setError(null)
      setemailError(false)
    }

  },[email])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      console.log(response.data); // Handle the login success response here
      setIsLoggedIn(true);
      setuserInfo(response.data)
      showAlert();
    } catch (err) { 
      showLoginFailedAlert();
  };
  };
  if(isLoggedIn && !isAlertVisible){ // Already logged in but alert not showing => when browse to login page throu url
    return(
      <div>
    <h2>You have already logged in</h2>
      </div>
  )
  }
  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroupRow}>
          <label>Email:</label>
          <div className={styles.formGroupRow}>
          <input 
            type="email"
            value={email}
            onChange={(mail) => setEmail(mail.target.value)}
            required
          />
          </div>
        </div>
        <div className={styles.formGroupRow}>
          <label>Password:</label>
          <div className={styles.formGroupRow}>
          <input 
            type="password"
            value={password}
            onChange={(pwd) => setPassword(pwd.target.value)}
            required
          />
        </div>
        </div>
        {error && <div className={styles.errorText}>{error}</div>}
        <button disabled={emailError} type="submit">Login</button>
      </form>
      <div className={styles.signUpLink}>
        <p>Don't have an account?       
          <button className={styles.signupButton} onClick={handleSignupNavigation}>Sign Up</button>
        </p>
      </div>
      
    <AlertBox isOpen = {isAlertVisible} onClose={closeAlert} message="You have logged in!" />
    <AlertBox isOpen = {isLoginFailed} onClose={closeLoginFailedAlert} message="Log in failed!" />
    </div>


  );
};

export default Login;