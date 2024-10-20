import React, { useState } from 'react';
import "./LoginUI.css";
import { Typography, Divider } from '@mui/material';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BASE_URL from './config.js';

function LoginUI() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const userDetails = await response.json();
        localStorage.setItem('username', username);
        localStorage.setItem('userid', userDetails.userid);
        navigate("/dashboard", { state: { enteredUsername: username } });
      } else {
        const data = await response.json();
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("An error occurred during login");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className='lsbody'>
      <div className='logocontainer'>
        <img src="logo.png" alt="Logo" style={{ width: '25%', height: '15%', position: 'absolute', 
        top: '22.5%', left: '22%', transform: 'translate(-50%, -50%)' }} />
        <Typography variant="h3" style={{ fontFamily: 'lato', fontWeight: '650', fontSize: '50px', color: '#B18A00', position: 'absolute', top: '23%', left: '48%', transform: 'translate(-50%, -50%)' }}>
          EduDeck
        </Typography>
        <Typography style={{ color: 'white', fontWeight: '650', fontSize: '30px', position: 'absolute', top: '35%', left: '27%', transform: 'translate(-50%, -50%)' }}>
          Welcome!
        </Typography>
        <Typography style={{ color: 'white', fontSize: '15px', position: 'absolute', top: '41.5%', left: '40%', transform: 'translate(-50%, -50%)' }}>
          Elevating College Life for Holistic Success
        </Typography>
        <img src="studying.png" alt="Studying" style={{ width: '80%', height: '50%', position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <div className='firstcontainer'>
        <div className='secondcontainer'>
          <form onSubmit={handleLogin}>
            <Typography style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '20px' }}>
              Log in
            </Typography>
            <Typography style={{ fontSize: '12px', fontWeight: 'light', marginLeft: '20px' }}>
              please fill your information below
            </Typography>
            <div>
              <div style={{ marginBottom: '10px', position: 'relative' }}>
                <div style={{ marginLeft: '30px' }}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    style={{
                      marginTop: '30px',
                      width: '90%',
                      padding: '8px',
                      border: 'none',
                      borderBottom: '1px solid #B18A00',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '10px', position: 'relative' }}>
              <div style={{ marginLeft: '30px', position: 'relative' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{
                      marginTop: '10px',
                      width: '90%',
                      padding: '8px',
                      border: 'none',
                      borderBottom: '1px solid #B18A00',
                      outline: 'none',
                    }}
                  />
                  {password && (
                      <span 
                        onClick={togglePasswordVisibility} 
                        style={{
                          position: 'absolute',
                          right: '33px',
                          top: '63%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          color: '#B18A00'
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </span>
                    )}
                  </div>
                  <Typography
                    onClick={handleForgotPassword}
                    style={{ cursor: 'pointer', color: 'gray', display: 'block', marginTop: '10px', fontStyle: 'italic', fontWeight: '300', fontSize: '12px', textAlign: 'center', marginRight: '2.5em' }}
                  >
                    Forgot Password?
                  </Typography>

                  {error && <Typography style={{ color: 'red', textAlign: 'center'}}>{error}</Typography>}
                </div>
              </div>
            </div>
            <div className='buttoncontainer' style={{ position: 'absolute', top: '69%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <button type="submit" style={{ height: '2.3em', width: '14.2em', fontWeight: '600', color: 'white', borderRadius: '.2em', position: 'absolute', top: '71%', left: '49%', transform: 'translate(-50%, -50%)', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', }}>
                Login
              </button>
            </div>
            <Link to="/signup">
              <Typography
                style={{ cursor: 'pointer', color: '#FFD234', display: 'block', marginTop: '10px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center', position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                Create Account
              </Typography>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginUI;
