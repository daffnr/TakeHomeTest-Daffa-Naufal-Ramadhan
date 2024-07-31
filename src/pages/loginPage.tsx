import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { AppDispatch, RootState } from '../store';
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    dispatch(login({ username, password }))
    .then((action) => {
      if (login.fulfilled.match(action)) { 
        navigate('/home');
      }
    });
  };

  return (
   <div className='body-login'>
     <div className='container-login'>
      <h1 className='header-login'>Login</h1>
      {authStatus === 'loading' && <p>Logging in...</p>}
      {authError && <p style={{ color: 'red' }}>{authError}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
   </div>
  );
};

export default LoginPage;

