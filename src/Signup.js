// import React, { useState } from "react";
// import { Button, Grid, TextField, Toolbar, Typography, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
// import Login from "./Login"; // Import Login component
// import "./login.css"; // Import your styles file
// import { Navigate } from "react-router-dom";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [isAccountCreated, setIsAccountCreated] = useState(false); // New state to track account creation status
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
  
//   const handleClose = () => {
//     setOpen(false);
//   };  

//   const handleSignup = async (event) => {
//     event.preventDefault();
  
//     // Password validation criteria
//     // Length, Letters, Digit, Special those are the in order
//     // const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
//     // lc, uc, no., special, uc, lc, no., special, min 8 characters [sample : yuYU123@As1!]
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

//   return (
//     <div className="welcome-back-page">
//       <div className="welcome-back-container">
//         <div className="applogo">
//           <Toolbar style={{ width: "500px" }}>
//             <img src="logo.png" alt="AcadZen Logo" />
//             <Typography variant="h4" className="homeacadzen">
//               AcadZen
//             </Typography>
//           </Toolbar>
//         </div>
//         <div style={{ color: "#FFFFFF", marginLeft: "80px" }}>
//           <h1 className="welcome-back-page__heading" style={{ fontSize: "50px", fontWeight: "bold" }}>
//             Create an Account
//           </h1>
//           <p className="welcome-back-page__description" style={{ fontSize: "20px", width: "350px" }}>
//             Elevating College Life for Holistic Success
//           </p>
//         </div>
//         <div style={{ marginLeft: "30px" }}>
//           <img src="studying.png" style={{ width: "500px" }} alt="Welcome Image" />
//         </div>
//       </div>
//       <div className="login-form-container">
//         <div className="login-container">
//           <form onSubmit={handleSignup} className="login-form">
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
//                   >
//                   Create Account
//                 </Button>
//                   <Dialog
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="alert-dialog-title"
//                     aria-describedby="alert-dialog-description"
//                     >
//                     <DialogContent>
//                       <DialogContentText id="alert-dialog-description">
//                         Are you sure you want to create this account?
//                       </DialogContentText>
//                     </DialogContent>
//                     <DialogActions>
//                       <Button onClick={handleClose} style={{backgroundColor:'pink', color:'black'}}>Cancel</Button>
//                       <Button onClick={(event) => { handleSignup(event); handleClose(); }} style={{backgroundColor:'lightgreen', color:'black'}} autoFocus>
//                         Confirm
//                       </Button>
//                     </DialogActions>
//                   </Dialog>
//                   </Grid>
//               </Grid>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Signup.css";
import { Typography, Divider} from '@mui/material';

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAccountCreated, setIsAccountCreated] = useState(false); // New state to track account creation status
  const [open, setOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };  

  const handleSignup = async (event) => {
    event.preventDefault();
  
    // Password validation criteria
    // Length, Letters, Digit, Special those are the in order
    // const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
    // lc, uc, no., special, uc, lc, no., special, min 8 characters [sample : yuYU123@As1!]
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

  return (
    <div className='lsbody'>
      <div className='logocontainer'>
        <img src="logo.png" alt="Logo" style={{ width: '25%', height: '15%', position: 'absolute', 
        top: '22.5%', left: '22%', transform: 'translate(-50%, -50%)' }} />
        <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '650', 
        fontSize: '50px', color: '#B18A00', position: 'absolute', top: '23%', left: '53%', 
        transform: 'translate(-50%, -50%)' }}>
          EduDeck</Typography>
        <Typography style={{ color: 'white', fontWeight: '650', fontSize: '30px', position: 'absolute', 
        top: '35%', left: '40.8%', transform: 'translate(-50%, -50%)' }}>Create an Account</Typography>
        <Typography style={{ color: 'white', fontSize: '15px', position: 'absolute', top: '41.5%', 
        left: '42%', transform: 'translate(-50%, -50%)' }}>Elevating College Life for Holistic 
        Success</Typography>
        <img src="studying.png" alt="Studying" style={{ width: '80%', height: '50%', 
        position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <div className='firstcontainer'>
        <div className='secondcontainer'>
          <form onSubmit={handleSignup}>
            <Typography style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '20px' }}>
              Signup</Typography>
            <Typography style={{ fontSize: '12px', fontWeight: 'light', marginLeft: '20px' }}>
              please fill your information below</Typography>
            <div>
              <div style={{ marginLeft:'.5em', marginBottom: '10px', position: 'relative' }}>
              <div style={{ marginLeft: '20px' }}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    marginTop: '15px',
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
              <div style={{ marginLeft:'.5em', marginBottom: '10px', position: 'relative' }}>
                <div style={{ marginLeft: '20px' }}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
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
              <div style={{ marginLeft:'.5em', marginBottom: '10px', position: 'relative' }}>
                <div style={{ marginLeft: '20px' }}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
              <div style={{ marginLeft:'.5em', marginBottom: '10px', position: 'relative' }}>
                <div style={{ marginLeft: '20px' }}>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
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

            <div className='buttoncontainer' style={{position: 'absolute', top: '90%', 
            left: '50%', transform: 'translate(-50%, -50%)'}}>
              <button type="submit" style={{ width: '100%',fontWeight: '600', color: 'white' }} onClick={handleClickOpen}>
                Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
