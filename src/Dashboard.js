import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Typography, Divider, Button, Dialog, DialogActions, 
    DialogContent, TextField, DialogTitle, IconButton, Box, Toolbar} from '@mui/material';
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
      const userno = localStorage.getItem('userno');
  
      axios.get(`http://localhost:8080/api/document/files/${userno}`)
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
      // Retrieve userno from localStorage
      const storedUserNo = localStorage.getItem('userno');
      console.log(storedUserNo); // Use this userno as needed
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
        const userno = localStorage.getItem('userno');

        // Check if the user has uploaded a profile picture
        axios.get(`http://localhost:8080/api/profile/getProfilePicture/${userno}`, { responseType: 'blob' }) // Specify responseType as 'blob'
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
    
  
    const convertToCSV = (data) => {
  
      if (!data || data.length === 0) {
        return '';
      }
  
      const csvRows = [];
      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(','));
    
      for (const row of data) {
        const values = headers.map(header => {
          const escaped = (''+row[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      }
    
      return csvRows.join('\n');
    };
    
    const csvData = convertToCSV(userData);
  
    const downloadLink = document.createElement('a');
    downloadLink.href = `data:text/csv;charset=utf-8,${encodeURI(csvData)}`;
    downloadLink.download = 'userData.csv';
  
    const handleDownload = () => {
      downloadLink.click();
    };
    
    return (
        <>
            <div
            style={{
              backgroundImage: `url('/crystalbackground.png')`,
              minHeight: '100vh',
              overflow: 'hidden',
            }}
          >
          <NavigationBar/>
            <div>
            <Toolbar style={{ position: "absolute", top: 0,  right: 0 }}>
        
                <div style={{ marginLeft: "1em"}}>
                  <div style={{ fontFamily: 'Roboto Condensed', fontWeight: 'bold', fontSize: '1em'}}>Welcome Back,</div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.8em'}}>{userName}!</div>
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
                          style={{
                            background: "#D0BF81",
                            borderRadius: "50%",
                            width: "45px",
                            height: "45px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                    <Box
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
                    </Box>
                  </Box>
                </Box>
              </Toolbar>

            </div>
            
            <div
              style={{
                width: "47.7em",
                height: "10em",
                backgroundColor: "#FFD234",
                position: "absolute",
                top: "10em",
                marginLeft: "43.1em",
                transform: "translate(-50%, -50%)",
                borderRadius: "7px",
                overflow: "hidden",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                marginTop: '20px'
              }}
            >
              <Typography
                variant="h4"
                style={{
                  textAlign: "center",
                  fontSize: "1.3em",
                  position: "absolute",
                  top: ".7em",
                  left: "10em",
                  fontWeight: "bold",
                }}
              >
                Recent Quiz Activity
              </Typography>

              <Box
                style={{
                  backgroundColor: "#FFFFFF",
                  width: "35em",
                  height: "6em",
                  borderRadius: ".5em",
                  position: "absolute",
                  top: "3em",
                  left: "1em",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Button
                  style={{
                    background: "#FFE793",
                    width: "12em",
                    height: "2.2em",
                    fontSize: "1em",
                    color: "#000000",
                    position: "absolute",
                    top: "3em",
                    marginLeft: "12em",
                    borderRadius: ".5em",
                  }}
                >
                  Target Score: 60%
                </Button>
                <Button
                  style={{
                    background: "#FFE793",
                    width: "8em",
                    height: "2.2em",
                    fontSize: "1em",
                    color: "#000000",
                    position: "absolute",
                    top: "3em",
                    marginLeft: "25em",
                    borderRadius: ".5em",
                  }}
                >
                  PASSED!
                </Button>
              </Box>
            </div>

            <div>
            <Typography variant="h4" style={{ border: 'black', textAlign: 'left', fontSize: '1.3em', position: 'absolute', top: '9em', left: '12em', fontSize: '2em'}}>Elevate your learning 
            </Typography>
            <Typography variant="h4" style={{ textAlign: 'center', fontSize: '1em', position: 'absolute', top:'21em', left: '24em' }}>subscribe today, unlocking a world of interactive study materials</Typography>
            <Box style={{backgroundColor: "#FFFFFF", width: '8em', height: '6.5em', borderRadius: '.5em', position: 'absolute', top: '17em', left: '54em', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
            </Box>
            </div>

            <div style={{
                    width: '45.5em',
                    height: '8.5em',
                    backgroundColor: 'white', 
                    position: 'absolute', 
                    top: '30.2em', 
                    marginLeft: '43.2em', 
                    transform: 'translate(-50%, -50%)', 
                    borderRadius: '7px', 
                    padding: '20px', 
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography variant="h4" style={{ textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', }}>Document Upload Status</Typography>
                    <div style={{background: '#FFE793', width: '40em', height: '6em', fontSize: '.5em', color: '#000000', 
                      position: 'absolute', top: '7em', marginLeft: '1em', borderRadius: '1em',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ position: 'relative', textAlign: 'center', marginLeft: 55, marginTop: 8}}>
                              <span style={{ color: 'black', position: 'absolute', top: '1em', left: '50%', transform: 'translateX(-50%)', fontSize: '1.8em', fontWeight: 'bold' }}>{documentCount}</span>
                              <img src="file.png" alt="file" style={{ width: '5em' }} />
                          </div>
                          <span style={{ marginLeft: '3em', fontSize: '.5em', fontWeight: 'bold', marginTop: 5}}>DOCUMENT UPLOADED</span>
                      </div>
                  </div>
                    <Button style={{background: '#FFE793', width: '40em', height: '6em', fontSize: '.5em', color: '#000000', 
                                position: 'absolute', top: '7em', marginLeft: '50em', borderRadius: '1em',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                            Documents uploaded
                    <img src="file.png" alt="file" style={{width:'5em', position: 'absolute', left: '7em' }} /> 
                    </Button>
                    <Button style={{background: '#FFE793', width: '40em', height: '6em', fontSize: '.5em', color: '#000000', 
                                position: 'absolute', top: '14em', marginLeft: '1em', borderRadius: '1em',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                            Documents uploaded
                    <img src="file.png" alt="file" style={{width:'5em', position: 'absolute', left: '7em' }} /> 
                    </Button>
                    <Button style={{background: '#FFE793', width: '40em', height: '6em', fontSize: '.5em', color: '#000000', 
                                position: 'absolute', top: '14em', marginLeft: '50em', borderRadius: '1em',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                            Documents uploaded
                    <img src="file.png" alt="file" style={{width:'5em', position: 'absolute', left: '7em' }} /> 
                    </Button>
                   
                </div>

                <div style={{
                     width: '45.5em',
                     height: '5em',
                     backgroundColor: 'white', 
                     borderColor: '#FAC712', 
                     borderStyle: 'solid', 
                     borderWidth: '3px', 
                     position: 'absolute', 
                     top: '40.5em', 
                     marginLeft: '43.2em', 
                     transform: 'translate(-50%, -50%)', 
                     borderRadius: '7px', 
                     padding: '20px', 
                     boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                     display: 'flex',
                     flexDirection: 'column',
                }}>
                    <img src="fire.png" alt="file" style={{width:'5em', position: 'absolute', left: '5em', top:'.5em' }} /> 
                    <Typography style={{position:'absolute', top:'2em', left:'11em', fontSize:'1.2em', color:'#989A9B'}} >CURRENT STREAK</Typography>
                    <Typography style={{position:'absolute', top:'2em', left:'7.5em', fontSize:'2em', fontWeight:'bold'}} >3 DAYS</Typography>
                    <Typography style={{position:'absolute', top:'2em', left:'25em', fontSize:'1.2em'}}>
                    M&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&nbsp;W&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;S
                    </Typography>

                </div>
              
                <div style={{
                    width: '20em',
                    height: '39.2em',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '24.7em',
                    left: '79em',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '7px',
                    padding: '10px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    marginTop: '20px'
                }}>
                 
                <Typography variant="h4" style={{ textAlign: 'center', fontSize: '1.3em', position: 'absolute', top:'1.3em' }}>Recent Flashcard Activity</Typography>

                 <Box style={{backgroundColor: "#FFE793", width: '17.8em', height: '10em', borderRadius: '.5em', position: 'absolute', top: '5em', 
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                            <Button style={{background: '#FFD234', width: '8em', height: '2.2em', fontSize: '1em', fontWeight: 'bold', color: '#FFFFFF', 
                                position: 'absolute', top: '7em', marginLeft: '5em', borderRadius: '.5em'}}>
                            cards
                            </Button>
                </Box>
                <Box style={{backgroundColor: "#FFE793", width: '17.8em', height: '10em', borderRadius: '.5em', position: 'absolute', top: '16em', 
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                            <Button style={{background: '#FFD234', width: '8em', height: '2.2em', fontSize: '1em', fontWeight: 'bold', color: '#FFFFFF', 
                                position: 'absolute', top: '7em', marginLeft: '5em', borderRadius: '.5em'}}>
                            cards
                            </Button>
                </Box>
                <Box style={{backgroundColor: "#FFE793", width: '17.8em', height: '10em', borderRadius: '.5em', position: 'absolute', top: '27em', 
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                            <Button style={{background: '#FFD234', width: '8em', height: '2.2em', fontSize: '1em', fontWeight: 'bold', color: '#FFFFFF', 
                                position: 'absolute', top: '7em', marginLeft: '5em', borderRadius: '.5em'}}>
                            cards
                            </Button>
                </Box>
       
                </div>

        </div>
      </>
    );

}


export default Dashboard;