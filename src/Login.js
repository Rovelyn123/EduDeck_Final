import React, { useState } from "react";
import { Button, Grid, TextField, Toolbar, Typography, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import Dashboard from "./Dashboard";
import "./login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  // Replace useHistory with useNavigate
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(""); // State to store error messages
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false); // New state to track account creation status
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const loginUser = (username, password) => {
    fetch(`http://localhost:8080/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.is_deleted === 1) {
          // The user is deleted, so login fails
          console.error('This account has been deleted.');
        } else {
          // The user is not deleted, so login succeeds
          // Handle successful login here. For example, you can redirect the user to the dashboard.
        }
      })
      .catch((error) => console.error('Error:', error));
  };  

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
        const response = await fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Login successful
            setIsLoggedIn(true);

            // Store username in localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            const userDetails = await response.json();
            // Store userno in localStorage
            localStorage.setItem('userno', userDetails.userno);
            localStorage.setItem('email', userDetails.email);

            // Pass username to Dashboard component using history
            navigate("/dashboard", { state: { enteredUsername: username } });
            // navigate("/profilesettings", { state: { enteredPassword : password}});
        } else {
            // Handle login error
            const data = await response.json();
            setError(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        setError("An error occurred during login");
        
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    // Password validation criteria
    // Length, Letters, Digit, Special those are the in order
    // const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
    // lc, uc, no., special, uc, lc, no., special, min 8 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    console.log("Submitting:", { email, username, password });

    if (!password.match(passwordRegex)) {
      // Password doesn't meet the criteria
      console.error("Password does not meet the requirements");

      alert("Password does not meet the requirements. It must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");

      // You can display an error message to the user or use a state to show a validation message
      console.log("Password:", password);
      console.log("Is valid password:", password.match(passwordRegex));

      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/user/insertUser", {
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
        // Signup successful, set isAccountCreated to true
        setIsAccountCreated(true);
        console.log("Signup successful");
      } else {
        // Handle signup error
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  // Render Login component if isAccountCreated is true
  if (isAccountCreated) {
    return <Navigate to="/login" />;
  }

  const handleSignUpClick = () => {
    setShowLogin(false);
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="welcome-back-page">
      <div className="welcome-back-container">
        <div className="applogo">
          <Toolbar style={{ width: '500px' }}>
            <img
              src="logo.png"
              alt="AcadZen Logo"
            />
            <Typography variant="h4" className='homeacadzen'>
              AcadZen
            </Typography>
          </Toolbar>
        </div>
        <div style={{ color: '#FFFFFF', marginLeft: '80px' }}>
          <h1 className="welcome-back-page__heading" style={{ fontSize: '50px', fontWeight: 'bold' }}>
            {showLogin ? 'Welcome back!' : 'Create an Account'}
          </h1>
          <p className="welcome-back-page__description" style={{ fontSize: '20px', width: '350px' }}>
            Elevating College Life for Holistic Success
          </p>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <img src="studying.png" style={{ width: '500px' }} alt="Welcome Image" />
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-container">
        {showLogin ? (
            <form onSubmit={handleLogin} className="login-form">
              <div style={{ marginBottom: '50px' }}>
                <h1>Log in</h1>
                <p>please fill your information below</p>
              </div>
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="standard"
                style={{ marginBottom: '20px', color:'#FAC712' }}
                required
                className="login-form__input"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="standard"
                style={{ marginBottom: '20px' }}
                required
                className="login-form__input"
              />
              <div className="button-container">
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      style={{ width: "150px", borderRadius: "10px", backgroundColor: "#FAC712", color: "black", fontWeight: "bold" }}
                    >
                      Log In
                    </Button>
                  </Grid>
                  <Grid item xs={5}>
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                      <Button
                        fullWidth
                        variant="contained"
                        style={{ width: "150px", borderRadius: "10px", backgroundColor: "#FAC712", color: "black", fontWeight: "bold" }}
                        onClick={handleSignUpClick}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
              {error && (
              <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                {error}
              </div>
            )}
            </form>
          ) : (
            <form onSubmit={handleSignup} className="login-form">
            <div style={{ marginBottom: "50px" }}>
              <h1>Sign Up</h1>
              <p>please fill your information below</p>
            </div>
            <div style={{ width: "400px" }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="standard"
                style={{ marginBottom: "20px" }}
                required
                className="login-form__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="standard"
                style={{ marginBottom: "20px" }}
                required
                className="login-form__input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="standard"
                style={{ marginBottom: "20px" }}
                required
                className="login-form__input"
                inputProps={{
                  pattern: "{8,}"
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button-container">
              <Grid container spacing={0} justifyContent="center">
                <Grid item xs={6}>
                <Button
                  fullWidth
                  
                  variant="contained"
                  style={{
                    width: "250px",
                    borderRadius: "10px",
                    backgroundColor: "#FAC712",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onClick={handleClickOpen}
                >
                  Create Account
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to create this account?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} style={{backgroundColor:'pink', color:'black'}}>Cancel</Button>
                    <Button onClick={(event) => { handleSignup(event); handleClose(); }} style={{backgroundColor:'lightgreen', color:'black'}} autoFocus>
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
                </Grid>
              </Grid>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
