// import React, { useState } from "react";
// import { Button, Grid, TextField, Toolbar, Typography, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
// import Dashboard from "./Dashboard";
// import "./login.css";
// import { Link, Navigate, useNavigate } from "react-router-dom";

// const Login = () => {
//   // Replace useHistory with useNavigate
//   const navigate = useNavigate();
//   const [showLogin, setShowLogin] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [error, setError] = useState(""); // State to store error messages
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isAccountCreated, setIsAccountCreated] = useState(false); // New state to track account creation status
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(false);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
  
//   const loginUser = (username, password) => {
//     fetch(`http://localhost:8080/api/user/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.is_deleted === 1) {
//           // The user is deleted, so login fails
//           console.error('This account has been deleted.');
//         } else {
//           // The user is not deleted, so login succeeds
//           // Handle successful login here. For example, you can redirect the user to the dashboard.
//         }
//       })
//       .catch((error) => console.error('Error:', error));
//   };  

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     const username = event.target.elements.username.value;
//     const password = event.target.elements.password.value;

//     try {
//         const response = await fetch("http://localhost:8080/api/user/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//             // Login successful
//             setIsLoggedIn(true);

//             // Store username in localStorage
//             localStorage.setItem('username', username);
//             localStorage.setItem('password', password);

//             const userDetails = await response.json();
//             // Store userno in localStorage
//             localStorage.setItem('userno', userDetails.userno);
//             localStorage.setItem('email', userDetails.email);

//             // Pass username to Dashboard component using history
//             navigate("/dashboard", { state: { enteredUsername: username } });
//             // navigate("/profilesettings", { state: { enteredPassword : password}});
//         } else {
//             // Handle login error
//             const data = await response.json();
//             setError(data.message || "Login failed");
//         }
//     } catch (error) {
//         console.error("Error during login:", error);
//         setError("An error occurred during login");
        
//     }
//   };

//   const handleSignup = async (event) => {
//     event.preventDefault();

//     // Password validation criteria
//     // Length, Letters, Digit, Special those are the in order
//     // const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
//     // lc, uc, no., special, uc, lc, no., special, min 8 characters
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     console.log("Submitting:", { email, username, password });

//     if (!password.match(passwordRegex)) {
//       // Password doesn't meet the criteria
//       console.error("Password does not meet the requirements");

//       alert("Password does not meet the requirements. It must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");

//       // You can display an error message to the user or use a state to show a validation message
//       console.log("Password:", password);
//       console.log("Is valid password:", password.match(passwordRegex));

//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/api/user/insertUser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           username,
//           password,
//         }),
//       });

//       if (response.ok) {
//         // Signup successful, set isAccountCreated to true
//         setIsAccountCreated(true);
//         console.log("Signup successful");
//       } else {
//         // Handle signup error
//         console.error("Signup failed");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//     }
//   };

//   // Render Login component if isAccountCreated is true
//   if (isAccountCreated) {
//     return <Navigate to="/login" />;
//   }

//   const handleSignUpClick = () => {
//     setShowLogin(false);
//   };

//   if (isLoggedIn) {
//     return <Navigate to="/dashboard" />;
//   }

//   return (
//     <div className="welcome-back-page">
//       <div className="welcome-back-container">
//         <div className="applogo">
//           <Toolbar style={{ width: '500px' }}>
//             <img
//               src="logo.png"
//               alt="AcadZen Logo"
//             />
//             <Typography variant="h4" className='homeacadzen'>
//               AcadZen
//             </Typography>
//           </Toolbar>
//         </div>
//         <div style={{ color: '#FFFFFF', marginLeft: '80px' }}>
//           <h1 className="welcome-back-page__heading" style={{ fontSize: '50px', fontWeight: 'bold' }}>
//             {showLogin ? 'Welcome back!' : 'Create an Account'}
//           </h1>
//           <p className="welcome-back-page__description" style={{ fontSize: '20px', width: '350px' }}>
//             Elevating College Life for Holistic Success
//           </p>
//         </div>
//         <div style={{ marginLeft: '30px' }}>
//           <img src="studying.png" style={{ width: '500px' }} alt="Welcome Image" />
//         </div>
//       </div>
//       <div className="login-form-container">
//         <div className="login-container">
//         {showLogin ? (
//             <form onSubmit={handleLogin} className="login-form">
//               <div style={{ marginBottom: '50px' }}>
//                 <h1>Log in</h1>
//                 <p>please fill your information below</p>
//               </div>
//               <TextField
//                 fullWidth
//                 label="Username"
//                 name="username"
//                 variant="standard"
//                 style={{ marginBottom: '20px', color:'#FAC712' }}
//                 required
//                 className="login-form__input"
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type="password"
//                 variant="standard"
//                 style={{ marginBottom: '20px' }}
//                 required
//                 className="login-form__input"
//               />
//               <div className="button-container">
//                 <Grid container spacing={2} justifyContent="center">
//                   <Grid item xs={6}>
//                     <Button
//                       fullWidth
//                       type="submit"
//                       variant="contained"
//                       style={{ width: "150px", borderRadius: "10px", backgroundColor: "#FAC712", color: "black", fontWeight: "bold" }}
//                     >
//                       Log In
//                     </Button>
//                   </Grid>
//                   <Grid item xs={5}>
//                     <Link to="/signup" style={{ textDecoration: "none" }}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         style={{ width: "150px", borderRadius: "10px", backgroundColor: "#FAC712", color: "black", fontWeight: "bold" }}
//                         onClick={handleSignUpClick}
//                       >
//                         Sign Up
//                       </Button>
//                     </Link>
//                   </Grid>
//                 </Grid>
//               </div>
//               {error && (
//               <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
//                 {error}
//               </div>
//             )}
//             </form>
//           ) : (
//             <form onSubmit={handleSignup} className="login-form">
//             <div style={{ marginBottom: "50px" }}>
//               <h1>Sign Up</h1>
//               <p>please fill your information below</p>
//             </div>
//             <div style={{ width: "400px" }}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 variant="standard"
//                 style={{ marginBottom: "20px" }}
//                 required
//                 className="login-form__input"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <TextField
//                 fullWidth
//                 label="Username"
//                 name="username"
//                 variant="standard"
//                 style={{ marginBottom: "20px" }}
//                 required
//                 className="login-form__input"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type="password"
//                 variant="standard"
//                 style={{ marginBottom: "20px" }}
//                 required
//                 className="login-form__input"
//                 inputProps={{
//                   pattern: "{8,}"
//                 }}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="button-container">
//               <Grid container spacing={0} justifyContent="center">
//                 <Grid item xs={6}>
//                 <Button
//                   fullWidth
                  
//                   variant="contained"
//                   style={{
//                     width: "250px",
//                     borderRadius: "10px",
//                     backgroundColor: "#FAC712",
//                     color: "black",
//                     fontWeight: "bold",
//                   }}
//                   onClick={handleClickOpen}
//                 >
//                   Create Account
//                 </Button>
//                 <Dialog
//                   open={open}
//                   onClose={handleClose}
//                   aria-labelledby="alert-dialog-title"
//                   aria-describedby="alert-dialog-description"
//                 >
//                   <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                       Are you sure you want to create this account?
//                     </DialogContentText>
//                   </DialogContent>
//                   <DialogActions>
//                     <Button onClick={handleClose} style={{backgroundColor:'pink', color:'black'}}>Cancel</Button>
//                     <Button onClick={(event) => { handleSignup(event); handleClose(); }} style={{backgroundColor:'lightgreen', color:'black'}} autoFocus>
//                       Confirm
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//                 </Grid>
//               </Grid>
//             </div>
//           </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



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
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userDetails = await response.json();
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('userno', userDetails.userno);
        localStorage.setItem('email', userDetails.email);
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

  const handleSignup = async (event) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    console.log("Submitting:", { email, username, password });

    if (!password.match(passwordRegex)) {
      console.error("Password does not meet the requirements");

      alert("Password does not meet the requirements. It must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.");

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
        setIsAccountCreated(true);
        console.log("Signup successful");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

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
