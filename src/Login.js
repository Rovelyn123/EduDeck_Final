import React, { useState } from 'react';
import { Typography, Divider, Button} from '@mui/material';
import "./login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userDetails = await response.json();
        localStorage.setItem('username', username);
        // localStorage.setItem('password', password);
        localStorage.setItem('userid', userDetails.userid);
        // localStorage.setItem('email', userDetails.email);
        navigate("/dashboard", { state: { enteredUsername: username } });
      } else {
        const data = await response.json();
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className='lsbody'>
      <div className='logocontainer'>
        <img src="logo.png" alt="Logo" style={{ width: '25%', height: '17%', position: 'absolute', top: '22%', left: '22%', transform: 'translate(-50%, -50%)' }} />
        <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '650', fontSize: '50px', color: '#B18A00', position: 'absolute', top: '23%', left: '53%', transform: 'translate(-50%, -50%)' }}>
          EduDeck</Typography>
        <Typography style={{ color: 'white', fontWeight: '650', fontSize: '30px', position: 'absolute', top: '35%', left: '28%', transform: 'translate(-50%, -50%)' }}>Welcome!</Typography>
        <Typography style={{ color: 'white', fontSize: '15px', position: 'absolute', top: '41.5%', left: '42%', transform: 'translate(-50%, -50%)' }}>Elevating College Life for Holistic 
        Success</Typography>
        <img src="studying.png" alt="Studying" style={{ width: '80%', height: '50%', position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <div className='firstcontainer' >
        <div className='secondcontainer'>
          <form onSubmit={handleLogin}>
            <Typography style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '20px' }}>
              Log in</Typography>
            <Typography style={{ fontSize: '12px', fontWeight: 'light', marginLeft: '20px' }}>
              please fill your information below</Typography>
            <div>
              <div style={{ marginBottom: '10px', position: 'relative' }}>
                <div style={{ marginLeft: '30px' }}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <div style={{ marginLeft: '30px' }}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      marginTop: '10px',
                      width: '90%',
                      padding: '8px',
                      border: 'none',
                      borderBottom: '1px solid #B18A00',
                      outline: 'none',
                    }}
                  />
                  <Typography
                    style={{ cursor: 'pointer', color: 'gray', display: 'block', marginTop: '10px' , 
                    fontStyle: 'italic', fontWeight: '300', fontSize: '12px', textAlign: 'center', marginRight: '17px'}} >Forgot Password?
                  </Typography>
                </div>
              </div>
            </div>
            <div>
                <Divider style={{ marginBottom: '16px', backgroundColor: '#C8C8C8', width: '20%' , position: 'absolute', top: '64%', left: '37%',transform: 'translate(-50%, -50%)' , color: '#B18A00'}} />
                <Typography style={{ fontSize: '10px', position: 'absolute', top: '64%', left: '50%', transform: 'translate(-50%, -50%)' , color: '#B18A00'}}>or</Typography>
                <Divider style={{ marginBottom: '16px', backgroundColor: '#C8C8C8', width: '20%' , position: 'absolute', top: '64%', left: '63%', transform: 'translate(-50%, -50%)' , color: '#B18A00'}} />
            </div>
              <Typography style={{ fontSize: '12px', color: 'gray', position: 'absolute', top: '69%', left: '50%', transform: 'translate(-50%, -50%)'}}>Social Media Login</Typography>
              <img src="InstaLogo.png" alt="InstagramLogo" style={{ width: '6%', height: '8%', position: 'absolute', top: '77%', left: '40%', transform: 'translate(-50%, -50%)'  }} />
              <img src="GmailLogo.svg.png" alt="GmailLogo" style={{ width: '5.5%', height: '7%', position: 'absolute', top: '77%', left: '50%', transform: 'translate(-50%, -50%)'  }} />
              <img src="FacebookLogo.png" alt="FbLogo" style={{ width: '10%', height: '8%', position: 'absolute', top: '77%', left: '60%', transform: 'translate(-50%, -50%)'  }} />
              <div className='buttoncontainer' style={{position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <Button
                type="submit"
                variant="contained"
                style={{ marginRight: '20px', fontWeight: '600', color: 'white' }}
              >
                Log In
              </Button>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  style={{ fontWeight: '600', color: '#FFD234', backgroundColor: 'white', border: '1px solid #FFD234'}}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
            {/* <div className='buttoncontainer' style={{position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)'}}>
             <button type="submit" style={{ marginRight: '20px', fontWeight: '600', color: 'white' }}>Login</button>
            <button type="submit" style={{ fontWeight: '600', color: '#FFD234', backgroundColor: 'white', border: '1px solid #FFD234' }}>Sign up</button> 
             </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
