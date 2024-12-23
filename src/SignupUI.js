import React, { useState } from 'react';
import { Typography, Tooltip, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import "./SignupUI.css";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import BASE_URL from './config.js';

function SignupUI({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(''); // Added email error state
  const [passwordRequirements, setPasswordRequirements] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Validate password and set requirements message
    const requirements = {
      length: newPassword.length >= 8,
      upper: /[A-Z]/.test(newPassword),
      lower: /[a-z]/.test(newPassword),
      digit: /[0-9]/.test(newPassword),
    };

    setPasswordRequirements(requirements);
    setShowTooltip(true);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError(''); // Clear error if valid
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check if email is valid before submitting
    if (emailError) {
      alert("Please provide a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='lsbody'>
      <div className='logocontainer'>
        <img src="logo.png" alt="Logo" style={{ width: '25%', height: '15%', position: 'absolute', 
        top: '22.5%', left: '22%', transform: 'translate(-50%, -50%)' }} />
        <Typography variant="h3" style={{ fontFamily: 'lato', fontWeight: '650', 
        fontSize: '50px', color: '#B18A00', position: 'absolute', top: '23%', left: '48%', 
        transform: 'translate(-50%, -50%)' }}>
          EduDeck</Typography>
        <Typography style={{ color: 'white', fontWeight: '650', fontSize: '30px', position: 'absolute', 
        top: '35%', left: '37%', transform: 'translate(-50%, -50%)' }}>Create an Account</Typography>
        <Typography style={{ color: 'white', fontSize: '15px', position: 'absolute', top: '41.5%', 
        left: '40%', transform: 'translate(-50%, -50%)' }}>Elevating College Life for Holistic 
        Success</Typography>
        <img src="studying.png" alt="Studying" style={{ width: '80%', height: '50%', 
        position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <div className='firstcontainer'></div>
      <div className="secondcontainer"
          style={{
            position: 'absolute',
            top: '38%',
            right: '6%',
            transform: 'translateY(-50%)', // Center vertically
            width: '77%',
            maxWidth: '450px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '20px' }}>
              Signup</Typography>
            <Typography style={{ fontSize: '12px', fontWeight: 'light', marginLeft: '20px' }}>
              please fill your information below</Typography>
            <div>
            <div style={{ marginLeft: '.5em', marginBottom: '10px', position: 'relative' }}>
                <div style={{ marginLeft: '20px' }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    style={{
                      marginTop: '15px',
                      width: '90%',
                      padding: '8px',
                      border: 'none',
                      borderBottom: '1px solid #B18A00',
                      outline: 'none',
                    }}
                  />
                  {emailError && <p style={{ color: 'red', marginTop: '5px', fontSize: '10px'}}>{emailError}</p>} {/* Updated to use emailError */}
                </div>
              </div>
            </div>

            <div>
              <div style={{ marginLeft:'.5em', marginBottom: '10px', position: 'relative' }}>
                <div style={{ marginLeft: '20px' }}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    style={{
                      marginTop: '10px',
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
              <div style={{ marginLeft: '.5em', marginBottom: '10px', position: 'relative' }}>
                <div style={{ marginLeft: '20px' }}>
                  <Tooltip
                    title={
                      <div className="custom-tooltip">
                        <ul>
                          {[
                            { text: "Password must be at least 8 characters long.", valid: passwordRequirements.length },
                            { text: "Password must contain at least one uppercase letter.", valid: passwordRequirements.upper },
                            { text: "Password must contain at least one lowercase letter.", valid: passwordRequirements.lower },
                            { text: "Password must contain at least one digit.", valid: passwordRequirements.digit }
                          ].map((req, index) => (
                            <li key={index} style={{ color: req.valid ? 'green' : 'red' }}>
                              {req.text}
                              {req.valid ? <CheckIcon fontSize="small" className="tooltip-icon" /> : <CloseIcon fontSize="small" className="tooltip-icon" />}
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                    open={showTooltip}
                    disableHoverListener
                    placement="bottom"
                  >
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={() => setShowTooltip(true)}
                        onBlur={() => setShowTooltip(false)}
                        style={{
                          marginTop: '10px',
                          width: '90%',
                          padding: '8px',
                          border: 'none',
                          borderBottom: '1px solid #B18A00',
                          outline: 'none',
                          position: 'relative',
                          zIndex: 2 // Increase z-index
                        }}
                      />
                      {password && (
                        <span 
                          onClick={togglePasswordVisibility} 
                          style={{
                            position: 'absolute',
                            right: '8%',
                            top: '63%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: '#B18A00',
                            zIndex: 3 // Make sure the eye icon is on top
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </span>
                      )}
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div>
              <div style={{ marginLeft:'.5em', marginBottom: '10px', position: 'relative' }}>
                <div style={{ marginLeft: '20px' }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    style={{
                      marginTop: '10px',
                      width: '90%',
                      padding: '8px',
                      border: 'none',
                      borderBottom: '1px solid #B18A00',
                      outline: 'none',
                    }}
                  />
                  {confirmPassword && (
                    <span 
                      onClick={toggleConfirmPasswordVisibility} 
                      style={{
                        position: 'absolute',
                        right: '7.8%',
                        top: '63%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#B18A00',
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className='buttoncontainer' style={{position: 'absolute', top: '85%', 
            left: '50%', transform: 'translate(-50%, -50%)'}}>
              <button type="submit" style={{ width: '100%',fontWeight: '600', color: 'white', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', }}>
                Create Account
              </button>
            </div>
            <div style={{
              position: 'absolute', 
              top: '94%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '0 10px', // Optional padding for smaller screens
            }}>
              <Typography variant="body2" style={{fontSize: '12px', color: 'gray', textAlign: 'center'}}>
                Already have an account?{' '}
                <Link href="/login" underline="hover" color="inherit" style={{color:'gold', fontWeight: 'bold'}}>
                  Login here
                </Link>
              </Typography>
            </div>
          </form>
        </div>
    </div>
  );
}

export default SignupUI;
