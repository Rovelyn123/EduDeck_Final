import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Drawer, useMediaQuery, useTheme, Divider, Button, IconButton, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import '@fontsource/lato';

function UserManagementUI() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [clicked, setClicked] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@gmail.com', mobile: '+123456789', accountCreated: 'January 1, 2024' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@gmail.com', mobile: '+987654321', accountCreated: 'February 1, 2024' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@gmail.com', mobile: '+192837465', accountCreated: 'March 1, 2024' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@gmail.com', mobile: '+564738291', accountCreated: 'April 1, 2024' },
    { id: 5, name: 'Charlie Black', email: 'charlie.black@gmail.com', mobile: '+102938475', accountCreated: 'May 1, 2024' },
    { id: 6, name: 'Dave White', email: 'dave.white@gmail.com', mobile: '+019283746', accountCreated: 'June 1, 2024' },
    { id: 7, name: 'Eve Green', email: 'eve.green@gmail.com', mobile: '+384756291', accountCreated: 'July 1, 2024' },
    { id: 8, name: 'Frank Blue', email: 'frank.blue@gmail.com', mobile: '+948573615', accountCreated: 'August 1, 2024' },
    { id: 9, name: 'Grace Pink', email: 'grace.pink@gmail.com', mobile: '+293847561', accountCreated: 'September 1, 2024' },
    { id: 10, name: 'Hank Red', email: 'hank.red@gmail.com', mobile: '+564738290', accountCreated: 'October 1, 2024' },
    // Add more users as needed
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleButtonClick = (buttonName) => {
    setClicked(buttonName === clicked ? null : buttonName);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setIsDialogOpen(false);
  };

  const handleOpenDialog = (user) => {
    setUserToDelete(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setUserToDelete(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Typography variant="h3" style={{ fontFamily: 'Lato', fontWeight: '900', fontSize: '2em', color: '#B18A00', }}>
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
            <Typography style={{ color: 'black', fontFamily: 'Lato', fontSize: '1.1em', textTransform: 'none', flexGrow: 1 }}>
              User Management
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{
              backgroundColor: clicked === 'document to flashcards' ? '#FFEAA0' : 'transparent',
              width: '100%',
              boxShadow: clicked === 'document to flashcards' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            onClick={() => handleButtonClick('document to flashcards')}
          >
            <img src="/convert.png" alt="convert icon" style={{ height: 20, marginLeft: '1.3em' }} />
            <Typography style={{ color: 'black', fontFamily: 'Lato', fontSize: '1.1em', textTransform: 'none', flexGrow: 1 }}>
              Admin Profile
            </Typography>
          </Button>
        </Grid>
      </Grid>   
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
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography style={{fontFamily: 'Lato'}} variant="h4" gutterBottom>Users</Typography>
            <TextField 
              fullWidth 
              variant="outlined" 
              placeholder="Search users" 
              value={searchTerm}
              onChange={handleSearch}
              sx={{ 
                mb: 2, 
                bgcolor: 'white', 
                borderRadius: 40, 
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                '& .MuiOutlinedInput-root': {
                  height: '36px',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }} 
            />
            <TableContainer component={Paper} sx={{ 
                borderRadius: '10px', 
                maxHeight: '75vh', 
                overflowY: 'auto', 
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                '&::-webkit-scrollbar': {
                    width: '4px', // Adjust the width here
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#D9D9D9',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                },
                }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#FFFACD' }}>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Lato' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Lato' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Lato' }}>Mobile number</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Lato' }}>Account Created</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontFamily: 'Lato' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell style={{fontFamily: 'Lato'}}>{user.name}</TableCell>
                      <TableCell style={{fontFamily: 'Lato'}}>{user.email}</TableCell>
                      <TableCell style={{fontFamily: 'Lato'}}>{user.mobile}</TableCell>
                      <TableCell style={{fontFamily: 'Lato'}}>{user.accountCreated}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDialog(user)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </div>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user {userToDelete?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={() => handleDelete(userToDelete?.id)} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserManagementUI;
