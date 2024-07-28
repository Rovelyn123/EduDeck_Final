// import './Profile.css';
// import NavigationBar from './NavigationBar';
// import { Typography, Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaSignOutAlt } from 'react-icons/fa';
// import { useLocation, useNavigate } from 'react-router-dom';

// const UserProfile = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [openDialog, setOpenDialog] = useState(false);
//   const [editDialogType, setEditDialogType] = useState('');
//   const [tempValue, setTempValue] = useState('');

//   const [profilePic, setProfilePic] = useState('');
//   const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
//   const [userName, setUserName] = useState(localStorage.getItem('username') || 'John Doe');
//   const [email, setEmail] = useState(localStorage.getItem('email') || 'john.doe@example.com');
//   const [mobileNumber, setMobileNumber] = useState('123-456-7890');
//   const [password, setPassword] = useState(localStorage.getItem('password') || 'password123');
//   const [accountCreated, setAccountCreated] = useState('2024-01-01');
//   const [subscriptionPlan, setSubscriptionPlan] = useState('Free Plan');

//   useEffect(() => {
//     fetchProfilePicture();
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const fetchProfilePicture = () => {
//     const userid = localStorage.getItem('userid');
//     fetch(`http://localhost:8080/api/profile/getProfilePicture/${userid}`)
//       .then((response) => response.blob())
//       .then((blob) => {
//         setProfilePic(URL.createObjectURL(blob));
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   const handleProfilePicChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       const userid = localStorage.getItem('userid');
//       formData.append("file", file);
//       formData.append("userid", userid);

//       fetch("http://localhost:8080/api/profile/uploadProfilePicture", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setProfilePic(URL.createObjectURL(file));
//         })
//         .catch((error) => console.error("Error:", error));
//     }
//   };

//   const handleEdit = (field) => {
//     setEditDialogType(field);
//     setTempValue(
//       field === 'bio' ? bio :
//       field === 'name' ? userName :
//       field === 'mobileNumber' ? mobileNumber :
//       field === 'password' ? password : ''
//     );
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleSave = async () => {
//     const userid = localStorage.getItem('userid');
//     let url = '';
//     let payload = {};

//     if (editDialogType === 'bio') {
//       setBio(tempValue);
//       url = `http://localhost:8080/user/updateBio/${userid}`;
//       payload = { bio: tempValue };
//     } else if (editDialogType === 'name') {
//       setUserName(tempValue);
//       localStorage.setItem('username', tempValue);
//       url = `http://localhost:8080/user/updateName/${userid}`;
//       payload = { username: tempValue };
//     } else if (editDialogType === 'mobileNumber') {
//       setMobileNumber(tempValue);
//       url = `http://localhost:8080/user/updateMobileNumber/${userid}`;
//       payload = { mobileNumber: tempValue };
//     } else if (editDialogType === 'password') {
//       setPassword(tempValue);
//       localStorage.setItem('password', tempValue);
//       url = `http://localhost:8080/user/changePassword/${userid}`;
//       payload = { password: tempValue };
//     }

//     try {
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to update ${editDialogType}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }

//     handleCloseDialog();
//   };
  

//   const renderDialogContent = () => {
//     if (editDialogType === 'bio') {
//       return (
//         <div>
//           <Typography variant="body1" style={{ marginBottom: '1em' }}>Edit Bio</Typography>
//           <TextField
//             fullWidth
//             value={tempValue}
//             onChange={(e) => setTempValue(e.target.value)}
//             multiline
//             rows={4}
//             sx={{ 
//               '& .MuiOutlinedInput-root': { borderRadius: '10px' },
//               '& .MuiInputLabel-root': { fontSize: '14px' },
//               '& .MuiOutlinedInput-input': { fontSize: '16px' }
//             }}
//           />
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <Typography variant="body1" style={{ marginBottom: '1em' }}>Edit {editDialogType.charAt(0).toUpperCase() + editDialogType.slice(1)}</Typography>
//           <TextField
//             fullWidth
//             value={tempValue}
//             onChange={(e) => setTempValue(e.target.value)}
//             sx={{ 
//               '& .MuiOutlinedInput-root': { borderRadius: '10px' },
//               '& .MuiInputLabel-root': { fontSize: '14px' },
//               '& .MuiOutlinedInput-input': { fontSize: '16px' }
//             }}
//           />
//         </div>
//       );
//     }
//   };

//   return (
//     <>
//       <div className="lsbody" style={{ width: '100%', margin: '0 auto' }}>
//         <NavigationBar />
//         <div className='containerbox'>
//           <div className="profile-picture">
//             <div className='profilepicturecontainer' onClick={() => document.getElementById('profile-pic-input').click()} style={{ backgroundImage: `url(${profilePic})` }}>
//               <input
//                 type="file"
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 id="profile-pic-input"
//                 onChange={handleProfilePicChange}
//               />
//             </div>
//             <div className="username-display">
//               {userName}
//             </div>
//             <div className='coverphotocontainer'></div>
//           </div>

//           <div className="bios">
//             <div className="bio-container">
//               <Typography variant="body1" className="bio-text">
//                 {bio}
//               </Typography>
//             </div>
//             <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
//               <Button onClick={() => handleEdit('bio')} className="bio-edit-button">
//                 Edit Bio
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="personal-info">
//           <Typography className="personal-info-title" variant="h5">Personal Information</Typography>
//           <div className="info-group">
//             <div className="info-field1">
//               <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Name</Typography>
//               <div className="info-item">
//                 <Typography variant="body2">{userName}</Typography>
//                 <button onClick={() => handleEdit('name')} className="edit-button"><FaEdit /></button>
//               </div>
//               <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Email</Typography>
//               <div className="info-item">
//                 <Typography variant="body3">{email}</Typography>
//               </div>
//               <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Mobile Number</Typography>
//               <div className="info-item">
//                 <Typography variant="body4">{mobileNumber}</Typography>
//                 <button onClick={() => handleEdit('mobileNumber')} className="edit-button"><FaEdit /></button>
//               </div>
//             </div>
//             <div className="info-field2">
//               <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Password</Typography>
//               <div className="info-item">
//                 <Typography variant="body5">{password}</Typography>
//                 <button onClick={() => handleEdit('password')} className="edit-button"><FaEdit /></button>
//               </div>
//               <div className="info-item1">
//                 <Typography variant="body1" sx={{ marginTop: '2.3em' }}>Account Created: {accountCreated}</Typography>
//               </div>
//               <div className="info-item1">
//                 <Typography variant="body1" sx={{ marginTop: '2.5em' }}>Subscription Plan: {subscriptionPlan}</Typography>
//               </div>
//             </div>
//           </div>
//           <button className="logout-button" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
//         </div>
//       </div>

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" PaperProps={{ style: { borderRadius: '10px' } }}>
//         <DialogTitle style={{textAlign: 'center', color: '#FFD234', backgroundColor: 'white'}}>Edit {editDialogType.charAt(0).toUpperCase() + editDialogType.slice(1)}</DialogTitle>
//         <DialogContent>
//           {renderDialogContent()}
//         </DialogContent>
//         <DialogActions style={{ backgroundColor: 'white', justifyContent: 'center'}}>
//           <Button onClick={handleSave} style={{width: '10em',  backgroundColor: '#FFD234', borderRadius: '5em', color: 'white'}}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default UserProfile;



// import './Profile.css';
// import NavigationBar from './NavigationBar';
// import { Typography, Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaSignOutAlt } from 'react-icons/fa';
// import { useLocation, useNavigate } from 'react-router-dom';

// const UserProfile = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [openDialog, setOpenDialog] = useState(false);
//   const [editDialogType, setEditDialogType] = useState('');
//   const [tempValue, setTempValue] = useState('');

//   const [profilePic, setProfilePic] = useState('');
//   const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
//   const [userName, setUserName] = useState(localStorage.getItem('username') || 'John Doe');
//   const [email, setEmail] = useState(localStorage.getItem('email') || 'john.doe@example.com');
//   const [mobileNumber, setMobileNumber] = useState('123-456-7890');
//   const [password, setPassword] = useState(localStorage.getItem('password') || 'password123');
//   const [accountCreated, setAccountCreated] = useState('2024-01-01');
//   const [subscriptionPlan, setSubscriptionPlan] = useState('Free Plan');
//   const [userDetails, setUserDetails] = useState({
//     email: '',
//     creationDate: '',
//     mobileNumber: '',
//     bio: '',
//   });
//   const userid = localStorage.getItem('userid');

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/user/getUserDetails/${userid}`);
//         if (response.ok) {
//           const data = await response.json();
//           setUserDetails({
//             email: data.email,
//             creationDate: data.creationDate,
//             mobileNumber: data.mobileNumber,
//             bio: data.bio,
//           });
//           if (data.profilePicture) {
//             setProfilePic(`data:image/jpeg;base64,${data.profilePicture}`);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     fetchUserDetails();
//   }, [userid]);
  
//   const fetchProfilePicture = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/user/getProfilePicture/${userid}`);
//       if (response.ok) {
//         const imageBlob = await response.blob();
//         setProfilePic(URL.createObjectURL(imageBlob));
//       }
//     } catch (error) {
//       console.error('Error fetching profile picture:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProfilePicture();
//   }, [location.pathname]);

//   const handleProfilePicChange = async (event) => {
//     const userid = localStorage.getItem('userid');
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch(`http://localhost:8080/user/uploadProfilePicture/${userid}`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText);
//       }

//       const responseData = await response.json();
//       console.log(responseData.message); // Log the success message
//       setProfilePic(URL.createObjectURL(file)); // Update the profile picture immediately
//     } catch (error) {
//       console.error('Error uploading image:', error.message);
//     }
//   };

//   const handleProfilePicDelete = async () => {
//     const userid = localStorage.getItem('userid');
//     try {
//       const response = await fetch(`http://localhost:8080/user/deleteProfilePicture/${userid}`, {
//         method: 'DELETE',
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText);
//       }
  
//       const responseText = await response.text();
//       console.log(responseText); // Log the success message
//       setProfilePic(''); // Update state to reflect the deletion
//     } catch (error) {
//       console.error('Error deleting image:', error.message);
//     }
//   };
  

//   const handleEdit = (field) => {
//     setEditDialogType(field);
//     setTempValue(
//       field === 'bio' ? bio :
//       field === 'name' ? userName :
//       field === 'mobileNumber' ? mobileNumber :
//       field === 'password' ? password : ''
//     );
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleSave = async () => {
//     const userid = localStorage.getItem('userid');
//     let url = '';
//     let payload = {};

//     if (editDialogType === 'bio') {
//       setBio(tempValue);
//       url = `http://localhost:8080/user/updateBio/${userid}`;
//       payload = { bio: tempValue };
//     } else if (editDialogType === 'name') {
//       setUserName(tempValue);
//       localStorage.setItem('username', tempValue);
//       url = `http://localhost:8080/user/updateName/${userid}`;
//       payload = { username: tempValue };
//     } else if (editDialogType === 'mobileNumber') {
//       setMobileNumber(tempValue);
//       url = `http://localhost:8080/user/updateMobileNumber/${userid}`;
//       payload = { mobileNumber: tempValue };
//     } else if (editDialogType === 'password') {
//       setPassword(tempValue);
//       localStorage.setItem('password', tempValue);
//       url = `http://localhost:8080/user/changePassword/${userid}`;
//       payload = { password: tempValue };
//     }

//     try {
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) {
//         throw new Error(`Failed to update ${editDialogType}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }

//     handleCloseDialog();
//   };
  

//   const renderDialogContent = () => {
//     if (editDialogType === 'bio') {
//       return (
//         <div>
//           <Typography variant="body1" style={{ marginBottom: '1em' }}>Edit Bio</Typography>
//           <TextField
//             fullWidth
//             value={tempValue}
//             onChange={(e) => setTempValue(e.target.value)}
//             multiline
//             rows={4}
//             sx={{ 
//               '& .MuiOutlinedInput-root': { borderRadius: '10px' },
//               '& .MuiInputLabel-root': { fontSize: '14px' },
//               '& .MuiOutlinedInput-input': { fontSize: '16px' }
//             }}
//           />
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <Typography variant="body1" style={{ marginBottom: '1em' }}>Edit {editDialogType.charAt(0).toUpperCase() + editDialogType.slice(1)}</Typography>
//           <TextField
//             fullWidth
//             value={tempValue}
//             onChange={(e) => setTempValue(e.target.value)}
//             sx={{ 
//               '& .MuiOutlinedInput-root': { borderRadius: '10px' },
//               '& .MuiInputLabel-root': { fontSize: '14px' },
//               '& .MuiOutlinedInput-input': { fontSize: '16px' }
//             }}
//           />
//         </div>
//       );
//     }
//   };

//   return (
//     <>
//       <div className="lsbody" style={{ width: '100%', margin: '0 auto' }}>
//         <NavigationBar />
//         <div className='containerbox'>
//         <div className="profile-picture">
//   <div className='profilepicturecontainer' onClick={() => document.getElementById('profile-pic-input').click()} style={{ backgroundImage: `url(${profilePic})` }}>
//     <input
//       type="file"
//       accept="image/*"
//       style={{ display: 'none' }}
//       id="profile-pic-input"
//       onChange={handleProfilePicChange}
//     />
//   </div>
//   <div className="username-display">
//     {userName}
//   </div>
//   <div className='coverphotocontainer'></div>
//   <button className="delete-button" onClick={handleProfilePicDelete}>Delete Profile Picture</button>
// </div>

//           <div className="bios">
//             <div className="bio-container">
//               <Typography variant="body1" className="bio-text">
//                 {bio}
//               </Typography>
//             </div>
//             <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
//               <Button onClick={() => handleEdit('bio')} className="bio-edit-button">
//                 Edit Bio
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="personal-info">
//           <Typography className="personal-info-title" variant="h5">Personal Information</Typography>
//           <div className="info-group">
//             <div className="info-field1">
//               <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Name</Typography>
//               <div className="info-item">
//                 <Typography variant="body2">{userName}</Typography>
//                 <button onClick={() => handleEdit('name')} className="edit-button"><FaEdit /></button>
//               </div>
//               <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Email</Typography>
//               <div className="info-item">
//                 <Typography variant="body3">{userDetails.email}</Typography>
//               </div>
//               <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Mobile Number</Typography>
//               <div className="info-item">
//                 <Typography variant="body4">{userDetails.mobileNumber}</Typography>
//                 <button onClick={() => handleEdit('mobileNumber')} className="edit-button"><FaEdit /></button>
//               </div>
//             </div>
//             <div className="info-field2">
//               <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Password</Typography>
//               <div className="info-item">
//                 <Typography variant="body5">{password}</Typography>
//                 <button onClick={() => handleEdit('password')} className="edit-button"><FaEdit /></button>
//               </div>
//               <div className="info-item1">
//                 <Typography variant="body1" sx={{ marginTop: '2.3em' }}>Account Created: {userDetails.creationDate}</Typography>
//               </div>
//               <div className="info-item1">
//                 <Typography variant="body1" sx={{ marginTop: '2.5em' }}>Subscription Plan: {subscriptionPlan}</Typography>
//               </div>
//             </div>
//           </div>
//           <button className="logout-button" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
//         </div>
//       </div>

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" PaperProps={{ style: { borderRadius: '10px' } }}>
//         <DialogTitle style={{textAlign: 'center', color: '#FFD234', backgroundColor: 'white'}}>Edit {editDialogType.charAt(0).toUpperCase() + editDialogType.slice(1)}</DialogTitle>
//         <DialogContent>
//           {renderDialogContent()}
//         </DialogContent>
//         <DialogActions style={{ backgroundColor: 'white', justifyContent: 'center'}}>
//           <Button onClick={handleSave} style={{width: '10em',  backgroundColor: '#FFD234', borderRadius: '5em', color: 'white'}}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default UserProfile;



import './Profile.css';
import NavigationBar from './NavigationBar';
import { Typography, Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogType, setEditDialogType] = useState('');
  const [tempValue, setTempValue] = useState('');

  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState('');
  const [userName, setUserName] = useState(localStorage.getItem('username') || 'John Doe');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'john.doe@example.com');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState(localStorage.getItem('password') || 'password123');
  const [accountCreated, setAccountCreated] = useState('2024-01-01');
  const [subscriptionPlan, setSubscriptionPlan] = useState('Free Plan');
  const [userDetails, setUserDetails] = useState({
    email: '',
    creationDate: '',
    mobileNumber: '',
    bio: '',
  });
  const userid = localStorage.getItem('userid');

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/getUserDetails/${userid}`);
        if (response.ok) {
          const data = await response.json();
          setUserDetails({
            email: data.email,
            creationDate: data.creationDate,
            mobileNumber: data.mobileNumber || '123-456-7890', // Default value
            bio: data.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', // Default value
          });
          setEmail(data.email);
          setAccountCreated(data.creationDate);
          setMobileNumber(data.mobileNumber || '123-456-7890');
          setBio(data.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
          if (data.profilePicture) {
            setProfilePic(`data:image/jpeg;base64,${data.profilePicture}`);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userid]);

  const fetchProfilePicture = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/getProfilePicture/${userid}`);
      if (response.ok) {
        const imageBlob = await response.blob();
        setProfilePic(URL.createObjectURL(imageBlob));
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
    }
  };

  useEffect(() => {
    fetchProfilePicture();
  }, [location.pathname]);

  const handleProfilePicChange = async (event) => {
    const userid = localStorage.getItem('userid');
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:8080/user/uploadProfilePicture/${userid}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const responseData = await response.json();
      console.log(responseData.message); // Log the success message
      setProfilePic(URL.createObjectURL(file)); // Update the profile picture immediately
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  const handleProfilePicDelete = async () => {
    const userid = localStorage.getItem('userid');
    try {
      const response = await fetch(`http://localhost:8080/user/deleteProfilePicture/${userid}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const responseText = await response.text();
      console.log(responseText); // Log the success message
      setProfilePic(''); // Update state to reflect the deletion
    } catch (error) {
      console.error('Error deleting image:', error.message);
    }
  };

  const handleEdit = (field) => {
    setEditDialogType(field);
    setTempValue(
      field === 'bio' ? bio :
      field === 'name' ? userName :
      field === 'mobileNumber' ? mobileNumber :
      field === 'password' ? password : ''
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    const userid = localStorage.getItem('userid');
    let url = '';
    let payload = {};

    if (editDialogType === 'bio') {
      setBio(tempValue);
      url = `http://localhost:8080/user/updateBio/${userid}`;
      payload = { bio: tempValue };
    } else if (editDialogType === 'name') {
      setUserName(tempValue);
      localStorage.setItem('username', tempValue);
      url = `http://localhost:8080/user/updateName/${userid}`;
      payload = { username: tempValue };
    } else if (editDialogType === 'mobileNumber') {
      setMobileNumber(tempValue);
      url = `http://localhost:8080/user/updateMobileNumber/${userid}`;
      payload = { mobileNumber: tempValue };
    } else if (editDialogType === 'password') {
      setPassword(tempValue);
      localStorage.setItem('password', tempValue);
      url = `http://localhost:8080/user/changePassword/${userid}`;
      payload = { password: tempValue };
    }

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${editDialogType}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    handleCloseDialog();
  };

  const renderDialogContent = () => {
    if (editDialogType === 'bio') {
      return (
        <div>
          <Typography variant="body1" style={{ marginBottom: '1em' }}>Edit Bio</Typography>
          <TextField
            fullWidth
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            multiline
            rows={4}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: '10px' },
              '& .MuiInputLabel-root': { fontSize: '14px' },
              '& .MuiOutlinedInput-input': { fontSize: '16px' }
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="body1" style={{ marginBottom: '1em' }}>Edit {editDialogType.charAt(0).toUpperCase() + editDialogType.slice(1)}</Typography>
          <TextField
            fullWidth
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: '10px' },
              '& .MuiInputLabel-root': { fontSize: '14px' },
              '& .MuiOutlinedInput-input': { fontSize: '16px' }
            }}
          />
        </div>
      );
    }
  };

  return (
    <>
      <div className="lsbody" style={{ width: '100%', margin: '0 auto' }}>
        <NavigationBar />
        <div className='containerbox'>
          <div className="profile-picture">
            <div className='profilepicturecontainer' onClick={() => document.getElementById('profile-pic-input').click()} style={{ backgroundImage: `url(${profilePic})` }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-pic-input"
                onChange={handleProfilePicChange}
              />
            </div>
            <div className="username-display">
              {userName}
            </div>
            <div className='coverphotocontainer'></div>
            {/* <button className="delete-button" onClick={handleProfilePicDelete}>Delete Profile Picture</button> */}
          </div>

          <div className="bios">
            <div className="bio-container">
              <Typography variant="body1" className="bio-text">
                {bio}
              </Typography>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => handleEdit('bio')} className="bio-edit-button">
                Edit Bio
              </Button>
            </div>
          </div>
        </div>

        <div className="personal-info">
          <Typography className="personal-info-title" variant="h5">Personal Information</Typography>
          <div className="info-group">
            <div className="info-field1">
              <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Name</Typography>
              <div className="info-item">
                <Typography variant="body2">{userName}</Typography>
                <button onClick={() => handleEdit('name')} className="edit-button"><FaEdit /></button>
              </div>
              <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Email</Typography>
              <div className="info-item" style={{height: '1.5em'}}>
                <Typography variant="body3">{userDetails.email}</Typography>
              </div>
              <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Mobile Number</Typography>
              <div className="info-item">
                <Typography variant="body4">{mobileNumber}</Typography>
                <button onClick={() => handleEdit('mobileNumber')} className="edit-button"><FaEdit /></button>
              </div>
            </div>
            <div className="info-field2">
              <Typography variant="subtitle1" sx={{ fontSize: '12px' }}>Password</Typography>
              <div className="info-item">
                <Typography variant="body5">{password}</Typography>
                <button onClick={() => handleEdit('password')} className="edit-button"><FaEdit /></button>
              </div>
              <div className="info-item1">
                <Typography variant="body1" sx={{ marginTop: '2.3em' }}>Account Created: {accountCreated}</Typography>
              </div>
              <div className="info-item1">
                <Typography variant="body1" sx={{ marginTop: '2.5em' }}>Subscription Plan: {subscriptionPlan}</Typography>
              </div>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" PaperProps={{ style: { borderRadius: '10px' } }}>
        <DialogTitle style={{ textAlign: 'center', color: '#FFD234', backgroundColor: 'white' }}>Edit {editDialogType.charAt(0).toUpperCase() + editDialogType.slice(1)}</DialogTitle>
        <DialogContent>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions style={{ backgroundColor: 'white', justifyContent: 'center' }}>
          <Button onClick={handleSave} style={{ width: '10em', backgroundColor: '#FFD234', borderRadius: '5em', color: 'white' }}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfile;