import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Drawer, useMediaQuery, useTheme, Divider, Button, IconButton, TextField, Paper, Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';

function AdminProfileUI() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [clicked, setClicked] = useState(null);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "admin@edudeck.com",
    role: "Administrator",
    bio: "This is a short bio about the admin.",
    profilePicture: "/profile-picture.jpg" // Example profile picture URL
  });
  const [editMode, setEditMode] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleButtonClick = (buttonName) => {
    setClicked(buttonName === clicked ? null : buttonName);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logged out");
  };

  const drawerContent = (
    <Box
      sx={{
        width: isMobile ? '50%' : 240,
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 0,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
        <img src="/logo.png" alt="logo" style={{ height: 50 }} />
        <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00', }}>
          EduDeck
        </Typography>   
      </Box>
      <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
      <Grid container spacing={1} sx={{ paddingTop: 2 }}>
        <Grid item xs={12}>
          <Button
            style={{
              backgroundColor: clicked === 'overview' ? '#FFEAA0' : 'transparent',
              width: '100%',
              boxShadow: clicked === 'overview' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            onClick={() => handleButtonClick('overview')}
          >
            <img src="/overview.png" alt="overview" style={{ height: 25, marginLeft: '1.2em' }} />
            <Typography style={{ color: 'black', fontFamily: 'Roboto', fontSize: '1.1em', textTransform: 'none', flexGrow: 1 }}>
              User Management
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{
              backgroundColor: clicked === 'document to flashcards' ? '#FFEAA0' : 'transparent',
              width: '100%',
              boxShadow: clicked === 'document to flashcards' ? '0px 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            onClick={() => handleButtonClick('document to flashcards')}
          >
            <img src="/convert.png" alt="convert icon" style={{ height: 20, marginLeft: '1.3em' }} />
            <Typography style={{ color: 'black', fontFamily: 'Roboto', fontSize: '1.1em', textTransform: 'none', flexGrow: 1 }}>
              Admin Profile
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }} />
      <Button
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        style={{ backgroundColor: 'white', color: 'black', borderRadius: '5em', width: '10em',
         boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', border: 'solid .5px #D9D9D9'}}
        sx={{ marginBottom: 2 }}
        >
        Logout
        </Button>

    </Box>
  );

  return (
    <>
      <div style={{ backgroundImage: 'url(/crystalbackground.png)', minHeight: '100vh', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {!isMobile && (
            <Box sx={{ width: 240, height: '100vh', backgroundColor: 'white', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              {drawerContent}
            </Box>
          )}
          {isMobile && (
            <IconButton onClick={toggleDrawer(true)} sx={{ zIndex: 100 }}>
              <MenuIcon />
            </IconButton>
          )}
          {isMobile && (
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
              transitionDuration={{ enter: 500, exit: 500 }}
              SlideProps={{ direction: "right" }}
              PaperProps={{ style: { backgroundColor: 'white', width: '50%', height: '100%' } }}
            >
              {drawerContent}
            </Drawer>
          )}
          <Box sx={{ flexGrow: 1, p: 3, maxWidth: '800px', margin: '0 auto' }}>
            {clicked === 'document to flashcards' && (
              <Paper sx={{ p: 2, maxHeight: '85vh', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="profile-picture-upload"
                    onChange={handleFileChange}
                  />
                  <Avatar
                    alt={profile.name}
                    src={profile.profilePicture}
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      mb: 2, 
                      cursor: 'pointer',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' // Added shadow here
                    }}
                    onClick={() => document.getElementById('profile-picture-upload').click()}
                  />
                </Box>
                <Typography variant="h5" gutterBottom align="center">
                  Admin Profile
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    label="Name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    margin="dense"
                    fullWidth
                    disabled={!editMode}
                    sx={{
                      '& .MuiInputBase-input': {
                        padding: '10px 12px',
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    margin="dense"
                    fullWidth
                    disabled={!editMode}
                    sx={{
                      '& .MuiInputBase-input': {
                        padding: '10px 12px',
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                  <TextField
                    label="Role"
                    name="role"
                    value={profile.role}
                    margin="dense"
                    fullWidth
                    disabled
                    sx={{
                      '& .MuiInputBase-input': {
                        padding: '10px 12px',
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                  <TextField
                    label="Bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    margin="dense"
                    fullWidth
                    multiline
                    rows={4}
                    disabled={!editMode}
                    sx={{
                        '& .MuiInputBase-input': {
                        padding: '10px 12px',
                        fontSize: '0.875rem',
                        },
                        height: '100px', // Adjust the height here as needed
                    }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={toggleEditMode}
                    sx={{ alignSelf: 'center' }}
                  >
                    {editMode ? 'Save' : 'Edit'}
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
      </div>
    </>
  );
}

export default AdminProfileUI;
