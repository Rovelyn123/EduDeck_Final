// Profile.js
import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, TextField, TextareaAutosize, Toolbar, Typography, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import "./Profile.css";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GradingIcon from '@mui/icons-material/Grading';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SpaIcon from '@mui/icons-material/Spa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const ProfileSettings = () => {
  const location = useLocation();

  const [editingUsername, setEditingUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const [editingEmail, setEditingEmail] = useState(false);

  const [overviewClicked, setOverviewClicked] = useState(false);
  const [documentClicked, setDocumentClicked] = useState(false);
  const [dreamboardClicked, setDreamboardClicked] = useState(false);
  const [mentalHealthClicked, setMentalHealthClicked] = useState(false);
  const [pricingClicked, setPricingClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);
  const [contactUsClicked, setContactUsClicked] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const userno = localStorage.getItem('userno');
  const npassword = localStorage.getItem('password');
  const [newUsername, setNewUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("") // Use the entered password
  const [newEmail, setNewEmail] = useState("");

  // Add a new state for username
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if the current location is /dashboard and set the Overview button state accordingly
    setOverviewClicked(location.pathname === "/dashboard");
    setDocumentClicked(location.pathname === "/uploaddocument");
    setDreamboardClicked(location.pathname === "/dreamboard");
    setMentalHealthClicked(location.pathname === "/mentalhealth");
    setPricingClicked(location.pathname === "/pricing");
    setSettingClicked(location.pathname === "/profilesettings")
    setContactUsClicked(location.pathname === "/contactus");

    const newUsername = 'newUsername'; // Replace with the new username
    const newPassword = 'newPassword'; 
    const storedUserNo = localStorage.getItem('userno');
    console.log(storedUserNo); // Use this userno as needed

    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || "Guest");

    // Retrieve password from localStorage
    const storedPassword = localStorage.getItem('password');
    setPassword(storedPassword);
    console.log(storedPassword);

    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);
    console.log(storedEmail);

    fetchProfilePicture();
  }, [location.pathname]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Set the selected image for display
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  
  // Update both username and password
  const updateProfile = (newUsername, newPassword, newEmail) => {
  // Only update if the new values are not empty
  const updatedUsername = newUsername !== "" ? newUsername : username;
  const updatedPassword = newPassword !== "" ? newPassword : password;
  const updatedEmail = newEmail !== "" ? newEmail : email;

  fetch(`http://localhost:8080/api/user/update/${userno}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: updatedUsername,
      password: updatedPassword,
      email: updatedEmail,
      // Include other user details if necessary
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUsername(updatedUsername); // Update the username state
      setPassword(updatedPassword); // Update the password state
      setEmail(updatedEmail); // Update the email state
      localStorage.setItem('username', updatedUsername);
      localStorage.setItem('password', updatedPassword);
      localStorage.setItem('email', updatedEmail)
    })
    .catch((error) => console.error('Error:', error));
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    const fileInput = document.getElementById("fileInput");
    formData.append("file", fileInput.files[0]);
    formData.append("userno", userno);

    fetch("http://localhost:8080/api/profile/uploadProfilePicture", {
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        // Handle successful upload here. For example, you can set the selected image to the uploaded image.
        setSelectedImage(URL.createObjectURL(fileInput.files[0]));
    })
    .catch((error) => console.error("Error:", error));
  };

  const fetchProfilePicture = () => {
    fetch(`http://localhost:8080/api/profile/getProfilePicture/${userno}`)
        .then((response) => response.blob())
        .then((blob) => {
            // Set the selected image for display
            setSelectedImage(URL.createObjectURL(blob));
        })
        .catch((error) => console.error("Error:", error));
  };

  const deleteUser = () => {
    fetch(`http://localhost:8080/api/user/delete/${userno}`, {
      method: 'PUT', // Assuming your deleteUser endpoint uses a PUT request
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle successful delete here. For example, you can redirect the user to the login page.
        alert("Account has been deleted!");
      })
      .catch((error) => console.error('Error:', error));
  };


  const handleImageButtonClick = () => {
    // Programmatically trigger the hidden file input
    const fileInput = document.getElementById("fileInput");
    fileInput.click();

    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            handleFileUpload();
        }
    };
};

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };
  
  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };  

  const handleUpdateDialogOpen = () => {
    setOpenUpdateDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
  };

  const handleButtonClick = (button) => {
    switch (button) {
      case 'overview':
        setOverviewClicked(true);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'document':
        setOverviewClicked(false);
        setDocumentClicked(true);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'dreamboard':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(true);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'mentalHealth':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(true);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'pricing':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(true);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'setting':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(true);
        setContactUsClicked(false);
        break;
      case 'contactUs':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard">
      <div className="navcontainer">
        <div className="dashboardlogo">
          <Toolbar>
            <img
              src="logo.png"
              alt="AcadZen Logo"
              style={{ width: '80px' }}
            />
            <Typography style={{ fontWeight: 'bold', color: '#8C7111', fontSize: '40px' }}>AcadZen</Typography>
          </Toolbar>
        </div>
          <Toolbar>
          <Box display="flex" flexDirection="column" alignItems="center"justifyContent="flex-start" style={{ height: '50vh', marginTop:'50px' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button
                      type="submit"
                      variant={overviewClicked ? "contained" : "outlined"}
                      style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-start', 
                        fontSize: '20px',
                        paddingLeft: '10px', 
                        fontSize: '20px',
                        border:'none',
                        width: '250px',
                        borderRadius: '10px',
                        backgroundColor: overviewClicked ? 'white' : '#f7c81e',
                        color: overviewClicked ? '#8C7111' : 'black',
                        fontWeight: 'bold',
                        height: '40px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                      }}
                      onClick={() => handleButtonClick('overview')}
                    ><GradingIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Overview</Button>
                </Link>
                <Link to="/uploaddocument" style={{ textDecoration: 'none' }}>
                    <Button
                    type="submit"
                    variant={documentClicked ? "contained" : "outlined"}
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-start', 
                      fontSize: '20px',
                      paddingLeft: '10px',
                      fontSize: '20px',
                      border:'none',
                      width: '250px',
                      borderRadius: '10px',
                      backgroundColor: documentClicked ? 'white' : '#f7c81e',
                      color: documentClicked ? '#8C7111' : 'black',
                      fontWeight: 'bold',
                      height: '65px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                    }}
                    onClick={() => handleButtonClick('document')}
                  ><PictureAsPdfIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Document to Flashcards</Button>
                </Link>
                  <Button
                  type="submit"
                  variant={dreamboardClicked ? "contained" : "outlined"}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    fontSize: '20px',
                    paddingLeft: '10px', 
                    fontSize: '20px',
                    border:'none',
                    width: '250px',
                    borderRadius: '10px',
                    backgroundColor: dreamboardClicked ? 'white' : '#f7c81e',
                    color: dreamboardClicked ? '#8C7111' : 'black',
                    fontWeight: 'bold',
                    height: '40px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                  }}
                  onClick={() => handleButtonClick('dreamboard')}
                ><CloudQueueIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Dreamboard</Button>
                    <Button
                  type="submit"
                  variant={mentalHealthClicked ? "contained" : "outlined"}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    fontSize: '20px',
                    paddingLeft: '10px', 
                    fontSize: '20px',
                    border:'none',
                    width: '250px',
                    borderRadius: '10px',
                    backgroundColor: mentalHealthClicked ? 'white' : '#f7c81e',
                    color: mentalHealthClicked ? '#8C7111' : 'black',
                    fontWeight: 'bold',
                    height: '65px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                  }}
                  onClick={() => handleButtonClick('mentalHealth')}
                ><SpaIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Mental Health Support</Button>
                <Link to="/pricing" style={{ textDecoration: 'none' }}>
                  <Button
                  type="submit"
                  variant={pricingClicked? "contained" : "outlined"}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    fontSize: '20px',
                    paddingLeft: '10px', 
                    fontSize: '20px',
                    border:'none',
                    width: '250px',
                    borderRadius: '10px',
                    backgroundColor: pricingClicked ? 'white' : '#f7c81e',
                    color: pricingClicked ? '#8C7111' : 'black',
                    fontWeight: 'bold',
                    height: '40px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                  }}
                  onClick={() => handleButtonClick('price')}
                ><MonetizationOnIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Pricing</Button>
                </Link>
                  <Link to="/profilesettings" style={{ textDecoration: 'none' }}>
                  <Button
                  type="submit"
                  variant={settingClicked? "contained" : "outlined"}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    fontSize: '20px',
                    paddingLeft: '10px', 
                    fontSize: '20px',
                    border:'none',
                    width: '250px',
                    borderRadius: '10px',
                    backgroundColor: settingClicked ? 'white' : '#f7c81e',
                    color: settingClicked ? '#8C7111' : 'black',
                    fontWeight: 'bold',
                    height: '40px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                  }}
                  onClick={() => handleButtonClick('setting')}
                ><SettingsIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Setting</Button>
                </Link>
          </Box>
        </Toolbar>
        <div className="contactPanel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ marginBottom: '20px', width: '200px' }}>Encountering problems with our service? Reach out to our customer support team for assistance.</p>
        <Button
          color="inherit"
          type="submit"
          variant="contained"
          style={{ fontSize:'15px', width: '250px', borderRadius: '10px', backgroundColor: '#FAC712', color: 'black', fontWeight: 'bold', height:'40px' }}
        > Contact us</Button>
      </div>
      </div>
      <div className="namecontainer">
      <div className="logoutdiv" style={{display:'flex', justifyContent:'center', alignItems: 'flex-start'}}>
      <div style={{flexDirection:'column', alignItems:'center'}}>
      <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleImageButtonClick}
          style={{
            borderRadius: '50%', // Make the button circular
            width: '250px',
            height: '250px',
            padding: 0,
            marginTop:'20px',
            backgroundColor: 'white'
          }}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="User Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          ) : (
            // <Logout />
            <></>
          )}
        </Button>
        <div>
          <TextareaAutosize
            style={{ width: '90%', marginTop: '30px', height:'375px', padding:'10px' }}
            minRows={3} // You can adjust minRows as needed
            placeholder="Enter your text motto here"
            // onChange={(e) => handleTextareaChange(e.target.value)}
          />
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
          <Link to='/' style={{ textDecoration: 'none' }}>
          <Button 
            color="inherit"
            type="submit"
            variant='contained'
            style={{
              marginTop:'100px',
              fontSize: '15px',
              border:'none',
              width: '250px',
              borderRadius: '10px',
              backgroundColor: 'black',
              color: '#FAC712',
              fontWeight: 'bold',
              height: '40px',marginBottom: '30px'
            }}>
            <LogoutIcon style={{marginRight:'10px'}}/> Log out
          </Button></Link>
        </div>
      </div>
        <div className="profileContainer">
          <Typography variant="h3" style={{ fontWeight: 'bold' }}>
              User Profile
            </Typography>
            <div className="profileinfo">
              <Typography variant="h4" style={{ fontWeight: 'bold', marginTop: '15px' }}>
                Username : {username}{editingUsername ? (
                <TextField
                  label="New Username"
                  variant="outlined"
                  style={{marginLeft:"10px"}}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              ) : (
                <span></span>
              )}
              <Button style={{backgroundColor:'white', marginLeft:'25px', color:'#8C7111'}} onClick={() => setEditingUsername(!editingUsername)}>
                {editingUsername ? 'Cancel' : <EditIcon/>}
              </Button>
              {/* {editingUsername && (
                <Button style={{backgroundColor:'lightgreen', color:'#8C7111'}} onClick={() => updateUsername(newUsername)}>Update</Button>
              )} */}
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', marginTop: '25px' }}>
                Password : {showPassword ? password : '********'}
                
                {showPassword ? (
                  <TextField
                  label="New Password"
                  variant="outlined"
                  style={{marginLeft:"10px"}}
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                />
                ) : (
                  <span></span>
                  )}
                <Button
                  style={{ backgroundColor: 'white', marginLeft: '25px', color: '#8C7111' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                </Button>
                {/* {showPassword && (
                  <Button style={{backgroundColor:'lightgreen', color:'#8C7111'}} onClick={() => updatePassword(enteredPassword)}>Update</Button>
                )} */}
              
              </Typography>
              
              {/* // Save Profile button */}
              
            </div>
            <div className="accountinfo">
              <Typography variant="h4" style={{ fontWeight: 'bold', marginTop: '15px' }}>
                Email : {email}{editingEmail ? (
                <TextField
                  label="New Email"
                  variant="outlined"
                  style={{marginLeft:"10px"}}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              ) : (
                <span></span>
              )}
              <Button style={{backgroundColor:'#FAC712', marginLeft:'25px', color:'#8C7111'}} onClick={() => setEditingEmail(!editingEmail)}>
                {editingEmail ? 'Cancel' : <EditIcon/>}
              </Button>
              </Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', marginTop: '55px' }}>
                Subscription :
              </Typography>
              {/* // Add this button somewhere in your return statement */}
              <Button
                color="inherit"
                type="submit"
                variant='contained'
                style={{
                  marginTop:'25px',
                  marginLeft:'700px',
                  fontSize: '15px',
                  border:'none',
                  width: '300px',
                  borderRadius: '10px',
                  backgroundColor: 'black',
                  color: '#FAC712',
                  fontWeight: 'bold',
                  height: '40px', marginBottom: '30px'}}
                onClick={handleDeleteDialogOpen}
              >
                Delete Account
              </Button>
              <Dialog
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this account? This action cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteDialogClose} style={{backgroundColor:'pink', color:'black'}}>Cancel</Button>
                  <Link to='/' style={{ textDecoration: 'none' }}>
                  <Button onClick={() => { deleteUser(); handleDeleteDialogClose(); }} style={{backgroundColor:'lightgreen', color:'black'}} autoFocus>
                    Confirm
                  </Button>
                  </Link>
                </DialogActions>
              </Dialog>
            </div>
            <div className="updating">
              <Button
                style={{
                  // marginTop:'25px',
                  // marginLeft:'700px',
                  fontSize: '15px',
                  border:'none',
                  width: '300px',
                  borderRadius: '10px',
                  backgroundColor: '#FAC712',
                  color: 'black',
                  fontWeight: 'bold',
                  height: '40px', marginBottom: '30px'}}
                onClick={handleUpdateDialogOpen}
              >
                Save Changes
              </Button>
              <Dialog
                open={openUpdateDialog}
                onClose={handleUpdateDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to save these changes?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleUpdateDialogClose} style={{backgroundColor:'pink', color:'black'}}>Cancel</Button>
                  <Button onClick={() => { updateProfile(newUsername, enteredPassword, newEmail); handleUpdateDialogClose(); }} style={{backgroundColor:'lightgreen', color:'black'}} autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>

            </div>
        </div>
        
      </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
