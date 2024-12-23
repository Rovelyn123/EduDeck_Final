import React, { useState } from 'react';
import "./LoginUI.css";
import { Typography, Snackbar, Alert, Box } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BASE_URL from './config.js';

function LoginUI() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // State for Snackbar

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    if (!username || !password) {
      setError("Please fill in both username and password fields.");
      setOpen(true); // Open Snackbar if error
      return; // Stop further execution if fields are empty
    }

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
        setError(data.message || "Login failed"); // Set error from server response
        setOpen(true); // Open Snackbar if error
      }
    } catch (error) {
      setError("An error occurred during login");
      setOpen(true); // Open Snackbar if error
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className='lsbody'>
      {/* Error message at the top using Snackbar */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}> 
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Logo and Welcome Content */}
      <div className='logocontainer'>
        <img
          src="logo.png"
          alt="Logo"
          style={{ width: '25%', height: '15%', position: 'absolute', top: '22.5%', left: '22%', transform: 'translate(-50%, -50%)' }}
        />
        <Typography
          variant="h3"
          style={{ fontFamily: 'lato', fontWeight: '650', fontSize: '50px', color: '#B18A00', position: 'absolute', top: '23%', left: '48%', transform: 'translate(-50%, -50%)' }}
        >
          EduDeck
        </Typography>
        <Typography
          style={{ color: 'white', fontWeight: '650', fontSize: '30px', position: 'absolute', top: '35%', left: '27%', transform: 'translate(-50%, -50%)' }}
        >
          Welcome!
        </Typography>
        <Typography
          style={{ color: 'white', fontSize: '15px', position: 'absolute', top: '41.5%', left: '40%', transform: 'translate(-50%, -50%)' }}
        >
          Elevating College Life for Holistic Success
        </Typography>
        <img
          src="studying.png"
          alt="Studying"
          style={{ width: '80%', height: '50%', position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* First Container (Hidden on Mobile) */}
      <div className='firstcontainer'>
        {/* Content for first container */}
      </div>

      {/* Second Container (Login Form) */}
      <div className="secondcontainer"
        style={{
          position: 'absolute',
          top: '38%',
          right: '6%',
          transform: 'translateY(-50%)',
          width: '77%',
          maxWidth: '450px',
        }}
      >
        <form onSubmit={handleLogin}>
          <Typography sx={{
            fontSize: { xs: '24px', sm: '30px' },
            fontWeight: 'bold',
            marginLeft: '20px',
            marginTop: { xs: '5%', sm: '7%' }
          }}>
            Log in
          </Typography>

          <Typography sx={{
            fontSize: { xs: '10px', sm: '12px' },
            fontWeight: 'light',
            marginLeft: '20px'
          }}>
            Please fill your information below
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
                    marginTop: '40px',
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
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </span>
                  )}
                </div>
                <Typography
                  onClick={handleForgotPassword}
                  style={{
                    cursor: 'pointer',
                    color: 'gray',
                    display: 'block',
                    marginTop: '10px',
                    fontStyle: 'italic',
                    fontWeight: '300',
                    fontSize: '12px',
                    textAlign: 'center',
                    marginRight: '2.5em'
                  }}
                >
                  Forgot Password?
                </Typography>
              </div>
            </div>
          </div>
          <div className='buttoncontainer' style={{ textAlign: 'center', marginTop: '20px' }}>
            <button type="submit" style={{
              height: '2.3em',
              width: '14.2em',
              fontWeight: '600',
              color: 'white',
              borderRadius: '.2em',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#FFD234',
              border: 'none'
            }}>
              Login
            </button>
          </div>
          <Link to="/signup">
            <Typography
              style={{
                cursor: 'pointer',
                color: 'gray',
                display: 'block',
                marginTop: '20px',
                fontSize: '12px',
                textAlign: 'center'
              }}
            >
              Create Account
            </Typography>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginUI;