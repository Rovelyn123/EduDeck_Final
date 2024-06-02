import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Typography, Divider, Button, Dialog, DialogActions, 
    DialogContent, TextField, DialogTitle, IconButton, Box, Toolbar, Grid} from '@mui/material';
import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import NavigationBar from './NavigationBar';
import { Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const Dashboard = ({onLogout}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState([]);
    const [enteredUsername, setEnteredUsername] = useState(""); // Use the entered username
    const [userName, setUserName] = useState(""); // Set a default value
    const [documentCount, setDocumentCount] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
      const userid = localStorage.getItem('userid');
  
      axios.get(`http://localhost:8080/api/document/files/${userid}`)
          .then(response => {
              setUserData(response.data);
              setDocumentCount(response.data.length);
          })
          .catch(error => {
              console.error('Error retrieving documents!', error);
          });
  
      // Extract entered username from location state
      const newEnteredUsername = location.state?.enteredUsername || "";
      setEnteredUsername(newEnteredUsername);
      // Retrieve userid from localStorage
      const storeduserid = localStorage.getItem('userid');
      console.log(storeduserid); // Use this userid as needed
      // Retrieve username from localStorage
      const storedUsername = localStorage.getItem('username');
      setUserName(storedUsername || "Guest");
      console.log(storedUsername);
      // setUserName(newEnteredUsername || "Guest");
  
      axios.get('http://localhost:8080/user/getAllUsers')
          .then(response => {
              setUserData(response.data);
          })
          .catch(error => {
              console.error('There was an error retrieving the user data!', error);
          });
  
  }, [location.pathname, location.state?.enteredUsername]);

    useEffect(() => {
    const fetchProfilePicture = () => {
        // Retrieve the user number
        const userid = localStorage.getItem('userid');

        // Check if the user has uploaded a profile picture
        axios.get(`http://localhost:8080/api/profile/getProfilePicture/${userid}`, { responseType: 'blob' }) // Specify responseType as 'blob'
            .then((response) => {
                // If the response is successful and contains data, set the selected image
                if (response.data && response.data.size > 0) {
                    const imageURL = URL.createObjectURL(response.data);
                    setSelectedImage(imageURL);
                } else {
                    // If no picture is found or the response is empty, set the selected image to null to display the default AccountCircle icon
                    setSelectedImage(null);
                }
            })
            .catch((error) => {
                // If there's an error (e.g., no profile picture found), set the selected image to null to display the default AccountCircle icon
                console.log("Error fetching profile picture:", error);
                setSelectedImage(null);
            });
    };

    fetchProfilePicture();
}, [location.pathname, location.state?.enteredUsername]);
        
    return (
        <>
            <Box
            sx={{
              backgroundImage: `url('/crystalbackground.png')`,
              backgroundSize: 'cover',
              minHeight: { xs: '150vh', md: '110vh', },
              overflow: { xs: 'scroll', md: 'hidden' },
            }}
          >
          <NavigationBar/>
            <div>
            <Toolbar style={{ position: "absolute", top: 0,  right: 0 }}>
        
                <div style={{ marginLeft: "1em"}}>
                  <Typography variant="h4" sx={{textAlign: { xs: 'center', md: 'left' },
                                        fontSize: { xs: '.8em', md: '1em' },
                                        fontFamily: 'Roboto Condensed', fontWeight: 'bold',
                                        position: 'absolute',
                                        top: { xs: '5%', md: '10%' },
                                        left: { xs: '10%', md: '-70%' },
                                        transform: { xs: 'translateX(-50%)', md: 'none' },
                                    }} > Welcome Back,
                  </Typography>
                  
                  <Box
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1.8em',
                        marginRight: { xs: 'auto', md: 'auto' }, 
                        position: 'absolute', 
                        top: { xs: '25%', md: '40%' }, 
                        left: { xs: '1%', md: '-45%' }, 
                        transform: { xs: 'translateX(-50%)', md: 'translateX(-50%)' }, 
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    {userName}!
                </Box>                
                </div>

                <Box
                  style={{
                    background: "transparent",
                    borderRadius: "45px",
                    padding: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "6px",
                    marginLeft: "20px",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      style={{
                        background: "white",
                        borderRadius: "100%",
                        padding: "5px",
                        marginRight: "15px",
                        boxShadow: "inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)",
                      }}
                    >
                      {selectedImage === null ? (
                        <Box
                        sx={{
                          top: { xs: '1.3%', md: '2.5%' },
                          marginLeft: { xs: '50%', md: '2%' },
                          transform: { xs: 'translateX(-50%)', md: 'none' },
                          background: '#D0BF81', borderRadius: '50px', width: '39px', height: '39px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    }}
                        >
                          <IconButton
                            style={{ padding: "0" }}
                            onClick={() => navigate("/profilesettings")}
                          >
                            <AccountCircle
                              style={{
                                fontSize: "45px",
                                color: "white",
                                marginLeft: "1px",
                              }}
                            />
                          </IconButton>
                        </Box>
                      ) : (
                        // <Link to="/profilesettings">
                          <Button
                          component={Link}
                          to="/profilesettings"
                            variant="contained"
                            color="primary"
                            style={{
                              background: "white",
                              borderRadius: "50%",
                              width: "20%",
                              height: "45px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                              margin: 0,
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="User Avatar"
                              style={{
                                width: "80%",
                                height: "100%",
                                objectFit: "fill",
                                borderRadius: "100%",
                              }}
                            />
                          </Button>
                        // </Link>
                      )}
                    </Box>
                    {/* <Box
                      style={{
                        background: "white",
                        borderRadius: "100%",
                        padding: "5px",
                        marginRight: "40px",
                        boxShadow: "inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)",
                      }}
                    >
                      <Box
                        style={{
                          background: "white",
                          borderRadius: "100%",
                          width: "45px",
                          height: "45px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton style={{ padding: "0" }}>
                          <NotificationsNone
                            style={{
                              fontSize: "45px",
                              color: "black",
                              marginLeft: "1px",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </Box> */}
                  </Box>
                </Box>
              </Toolbar>

            </div>
            
            <Box sx={{
                width: {xs: '19em', md:'45.5em'},
                height: {xs: '14em', md:'10em'},
                backgroundColor: '#FFD234', position: 'absolute',
                top: {xs: '11em', md: '110px'},
                marginLeft: {xs: '12em', md: '625px'},
                transform: 'translate(-50%, -50%)',
                borderRadius: '7px', overflow: 'hidden',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                }}>

            <Typography variant="h4" sx={{ 
                textAlign: 'center', fontSize: '1.3em', position: 'absolute',fontWeight: 'bold', 
                top:{xs: '.5em', md: '.7em'}, 
                left: {xs: '3em', md: '10em'},
                }}>Recent Quiz Activity
            </Typography>

            <Box sx={{
                backgroundColor: "#FFFFFF", borderRadius: '.5em', position: 'absolute', p: 2, boxSizing: 'border-box',
                width: { xs: '17em', md: '35em' },
                height: { xs: '9.5em', md: '6em' },
                top: { xs: '3em', md: '3em' },
                left: { xs: '1em', md: '1em' },
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
            }}>
                <Typography sx={{ position: 'absolute', top: { xs: '1em', md: '1em' }, left: { xs: '1em', md: '1em' }, fontSize: '1em', fontWeight: 'bold' }}>
                Rizal's Lovers
                </Typography>
                <Typography sx={{ position: 'absolute', top: '3em', left: '3em', fontSize: '.8em', fontWeight: 'bold' }}>
                Total Questions:
                </Typography>
                <Typography sx={{ position: 'absolute', top: '4.5em', left: '3.1em', fontSize: '.8em', fontWeight: 'bold' }}>
                Score:
                </Typography>

                <Box sx={{
                    display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', position: 'absolute', bottom: 0, right: 0, p: 2, width: '100%', boxSizing: 'border-box'
                }}>
                <Button style={{
                    background: '#FFE793', width: '12em', height: '2.2em', fontSize: '.75em', color: '#000000', position: 'relative', borderRadius: '.5em', marginBottom: '.1em', marginRight: '1em'
                }}
                sx={{
                    '@media (max-width: 600px)': { width: '17em', height: '3em', fontSize: '.75em' }
                }}> Target Score: 60%
                </Button>

                <Button style={{
                    background: '#FFE793', width: '8em', height: '2.2em', fontSize: '.75em', color: '#000000', position: 'relative', borderRadius: '.5em', marginBottom: '.1em'
                }}
                sx={{
                    '@media (max-width: 600px)': { width: '17em', height: '3em', fontSize: '.75em' }
                }}> PASSED!
                </Button>
                </Box>
            </Box>
    </Box>

    <Box>
                <Typography variant="h4"
                sx={{
                    textAlign: 'left', position: 'absolute', fontWeight: 'bold',
                    top: { xs: '16em', md: '8em' },
                    left: { xs: '2.3em', md: '11em' },
                    fontSize: { xs: '1.2em', md: '1.7em' },
                }}> Elevate your learning
                </Typography>

                <Typography
                variant="h4" sx={{
                    textAlign: 'center', position: 'absolute',
                    top: { xs: '21em', md: '16em' },
                    left: { xs: '2.5em', md: '18.7em' },
                    fontSize: { xs: '1em', md: '1em' },
                    width: { xs: '50%', md: 'auto' } 
                }}> subscribe today, unlocking a world of interactive study materials
                </Typography>

                <Box sx={{
                    backgroundColor: "#FFFFFF",
                    width: { xs: '6em', md: '6.5em' },
                    height: { xs: '5em', md: '5.5em' },
                    borderRadius: '.5em', position: 'absolute',
                    top: { xs: '19em', md: '12.5em' },
                    left: { xs: '15em', md: '50em' },
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                <img src="dart.png" style={{ width: '80%', height: '80%' }}/>
                </Box>
            </Box>

            <Box sx={{
                    width: { xs: '78%', md: '43em' },
                    height: { xs: 'auto', md: '150px' }, backgroundColor: 'white', position: 'absolute',
                    top: { xs: '26em', md: '300px' },
                    left: { xs: '50%', md: '630px' },
                    transform: 'translateX(-50%)',
                    borderRadius: '7px', padding: '20px',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center'
                }}>
                <Typography variant="h4" sx={{
                        textAlign: 'center',
                        fontSize: { xs: '1.2em', md: '1.5em' },
                        fontWeight: 'bold', mb: 2
                }}> Document Upload Status
                </Typography>
                <Grid container spacing={2} sx={{ width: '100%' }}>
                   {/* <div style={{background: '#FFE793', width: '40em', height: '6em', fontSize: '.5em', color: '#000000', 
                      position: 'absolute', top: '7em', marginLeft: '1em', borderRadius: '1em',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ position: 'relative', textAlign: 'center', marginLeft: 55, marginTop: 8}}>
                              <span style={{ color: 'black', position: 'absolute', top: '1em', left: '50%', transform: 'translateX(-50%)', fontSize: '1.8em', fontWeight: 'bold' }}>{documentCount}</span>
                              <img src="file.png" alt="file" style={{ width: '5em' }} />
                          </div>
                          <span style={{ marginLeft: '3em', fontSize: '.5em', fontWeight: 'bold', marginTop: 5}}>DOCUMENT UPLOADED</span>
                      </div>
                  </div> */}
               
                <Grid item xs={12} md={6}>
                    <Button sx={{
                        background: '#FFE793', width: '100%', height: '6em', fontSize: '.5em', color: '#000000', borderRadius: '1em', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', position: 'relative'
                    }}> Documents uploaded
                    <img src="file.png" alt="file"
                        style={{ width: '5em', position: 'absolute', left: '1em', top: '50%', transform: 'translateY(-50%)'}}/>
                     <span style={{ color: 'black', position: 'absolute', top: '1em', left: '10%', transform: 'translateX(-50%)', fontSize: '1.8em', fontWeight: 'bold' }}>{documentCount}</span>
                    </Button>

                </Grid>
                  <Grid item xs={12} md={6}>
                        <Button
                        sx={{
                            background: '#FFE793', width: '100%', height: '6em', fontSize: '.5em', color: '#000000', borderRadius: '1em', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', position: 'relative'
                            }}> Documents uploaded
                        <img src="file.png" alt="file"
                        style={{ width: '5em', position: 'absolute', left: '1em', top: '50%', transform: 'translateY(-50%)'}}/>
                        <span style={{ color: 'black', position: 'absolute', top: '1em', left: '10%', transform: 'translateX(-50%)', fontSize: '1.8em', fontWeight: 'bold' }}>{documentCount}</span>
                        </Button>
                  </Grid>

                <Grid item xs={12} md={6}>
                  <Button sx={{
                        background: '#FFE793', width: '100%', height: '6em', fontSize: '.5em', color: '#000000', borderRadius: '1em', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', position: 'relative'
                    }}> Documents uploaded
                    <img src="file.png" alt="file"
                        style={{ width: '5em', position: 'absolute', left: '1em', top: '50%', transform: 'translateY(-50%)'}}/>
                    <span style={{ color: 'black', position: 'absolute', top: '1em', left: '10%', transform: 'translateX(-50%)', fontSize: '1.8em', fontWeight: 'bold' }}>{documentCount}</span>
                  </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button
                        sx={{
                            background: '#FFE793', width: '100%', height: '6em', fontSize: '.5em', color: '#000000', borderRadius: '1em', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', position: 'relative'
                            }}> Documents uploaded
                        <img src="file.png" alt="file"
                        style={{ width: '5em', position: 'absolute', left: '1em', top: '50%', transform: 'translateY(-50%)'}}/>
                        <span style={{ color: 'black', position: 'absolute', top: '1em', left: '10%', transform: 'translateX(-50%)', fontSize: '1.8em', fontWeight: 'bold' }}>{documentCount}</span>
                    </Button>
                </Grid>
                   </Grid>
                </Box>

                <Box sx={{
                width: { xs: '70%', md: '43em' },
                height: 'auto', backgroundColor: 'white', borderColor: '#FAC712', borderStyle: 'solid', borderWidth: '3px',
                position: 'absolute',
                top: { xs: '48em', md: '32em' },
                left: { xs: '50%', md: '630px' },
                transform: 'translateX(-50%)', borderRadius: '7px', padding: '10px 20px',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'space-between' },
                }}>
                   <img src="fire.png" alt="file" style={{ width: '4em', marginRight: '1em', marginBottom: { xs: '1em', md: 0 } }}/>
            <Box
            sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'baseline' }, }}>

            <Typography sx={{
                    fontSize: { xs: '1em', md: '1.5em' },
                    fontWeight: 'bold',
                    marginBottom: { xs: '0.5em', md: 0 },
                    marginRight: { xs: 0, md: '1em' },
                    }}> 3 DAYS
            </Typography>

            <Typography sx={{fontSize: { xs: '0.8em', md: '1em' }, color: '#989A9B', }}> CURRENT STREAK </Typography>

            </Box>
            <Typography sx={{
                fontSize: { xs: '1em', md: '1.2em' },
                textAlign: 'center',
                marginTop: { xs: '1em', md: 0 }
            }}> M&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&nbsp;W&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;S
            </Typography>

                </Box>
              
                <Box sx={{
                      width: { xs: '85%', md: '18em' },
                      height: { xs: '15em', md: '34em' },
                      backgroundColor: 'white', position: 'absolute',
                      top: { xs: '63em', md: '21.5em' },
                      left: { xs: '50%', md: '72.5em' },
                      transform: { xs: 'translateX(-50%)', md: 'translate(-50%, -50%)' },
                      borderRadius: '7px', padding: '10px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                      }}>
                 
                 <Typography variant="h4" sx={{
                        textAlign: 'center',
                        fontSize: { xs: '1.2em', md: '1.3em' },
                        position: 'absolute',
                        top: { xs: '1em', md: '1.3em' },
                    }}> Recent Flashcard Activity
                </Typography>
                <Box sx={{
                backgroundColor: '#FFE793',
                width: { xs: '90%', md: '16em' },
                height: '9em',borderRadius: '.5em', position: 'absolute',
                top: { xs: '4em', md: '4em' },
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}>

            <Button sx={{ background: '#FFD234', width: '8em', height: '2em', fontSize: '1em', fontWeight: 'bold', 
                        color: '#FFFFFF', borderRadius: '.5em', position: 'absolute', bottom: '1em', }}>cards
            </Button>
            </Box>
       
                </Box>

        </Box>
      </>
    );

}


export default Dashboard;