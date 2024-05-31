import React, { useState, useEffect } from 'react';
import './Admin CSS Files/AdminDashboard.css';
import { Typography, Divider, Button, Dialog, DialogActions, 
    DialogContent, TextField, DialogTitle, IconButton, Box} from '@mui/material';
import { AccountCircle, NotificationsNone } from "@mui/icons-material";


const AdminDashboard = ({onLogout}) => {


    useEffect(() => {
    // Get the canvas element
    const canvas = document.getElementById('lineGraphCanvas');
    const ctx = canvas.getContext('2d');

    // Data for the line graph
    const data = [20,50, 200, 35, 40, 150, 60, 100];


    // Set up constants for positioning and scaling
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const maxValue = Math.max(...data);
    const stepX = (width - 2 * padding) / (data.length - 1);
    const stepY = (height - 2 * padding) / maxValue;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the line graph
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(padding, height - padding - data[0] * stepY);
    for (let i = 1; i < data.length; i++) {
        ctx.lineTo(padding + i * stepX, height - padding - data[i] * stepY);
    }
    ctx.stroke(); }, []);
    const userName = "Admin0001"; // Example user name
    const [activeButton, setActiveButton] = useState('');
    const [bio, setBio] = useState('Add your bio now.');
    const [tempBio, setTempBio] = useState(''); // Temporary state for editing bio
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [mobileNumber, setMobileNumber] = useState('+1234567890');
    const [password, setPassword] = useState('*********');
    const [accountCreated, setAccountCreated] = useState('January 1, 2022'); // Define accountCreated state variable
    const [openDialog, setOpenDialog] = useState(false);
    const [profilePic, setProfilePic] = useState(null); // State for the profile picture
    const [coverPhoto, setCoverPhoto] = useState(null); // State for the cover photo
    // const [query, setQuery] = useState('');
    // const [data, onSearch] = useState('');

    // const handleChange = (event) => {
    //   const value = event.target.value;
    //   setQuery(value);
    //   onSearch(value);
    // };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const handleBioChange = (event) => {
        setTempBio(event.target.value); // Update temporary bio
    };

    const handleOpenDialog = () => {
        setTempBio(bio); // Initialize tempBio with current bio
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCancel = () => {
        setOpenDialog(false); // Close the dialog without saving changes
    };

    const handleSave = () => {
        setBio(tempBio); // Save changes from tempBio to bio
        setOpenDialog(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleProfilePicChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const reader = new FileReader();
    
          reader.onload = (e) => {
            setProfilePic(e.target.result);
          };
    
          reader.readAsDataURL(file);
        }
      };
    
      // Handler for changing the cover photo
      const handleCoverPhotoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const reader = new FileReader();
    
          reader.onload = (e) => {
            setCoverPhoto(e.target.result);
          };
    
          reader.readAsDataURL(file);
        }
      };
    
    return (
        <>
            <div className="lsbody">
                <div className="navigation" style={{
                    width: '16em', height: '43.5em', backgroundColor: '#FFD234',
                    margin: '15px', borderRadius: '.7em', boxShadow: '0px 4px 8px rgba(0.2, 0.2, 0.2, 0.2)'
                }}>
                    <div style={{width: '14.5em', height: '3em', padding: '.5em'}}>
                        <img src="logo.png" alt="Logo" style={{
                            width: '5.5%', height: '9%', position: 'absolute',
                            top: '8.5%', left: '4.5%', transform: 'translate(-50%, -50%)'
                        }}/>
                        <Typography variant="h3" style={{
                            fontFamily: 'Poppin, sans-serif', fontWeight: '650',
                            fontSize: '2em', color: '#B18A00', position: 'absolute', top: '8.5%', left: '11.5%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            EduDeck</Typography>
                        <Divider style={{
                            marginBottom: '2em',
                            backgroundColor: '#B18A00',
                            width: '12em',
                            position: 'absolute',
                            top: '15%',
                            left: '9em',
                            transform: 'translate(-50%, -50%)'
                        }}/>
                    </div>
                    <ul style={{listStyleType: 'none', padding: '2em', fontSize: '.3em'}}>
                        <li>
                            <button className={`nav-btn ${activeButton === 'Overview' ? 'btn-active' : ''}`}
                                    onClick={() => handleButtonClick('Overview')}>
                                <img src="adminoverview.png" alt="overview" style={{
                                    height: '2em',
                                    width: '2em',
                                    position: 'absolute',
                                    top: '10.5em',
                                    left: '6em',
                                    transform: 'translate(-50%, -50%)'
                                }}/>
                                <span style={{marginLeft: '5em'}}>Overview</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`nav-btn ${activeButton === 'Document to Flashcards' ? 'btn-active' : ''}`}
                                onClick={() => handleButtonClick('Document to Flashcards')}>
                                <img src="usermanage.png" alt="documenttoflashcard" style={{
                                    height: '2em',
                                    width: '2em',
                                    position: 'absolute',
                                    top: '15.5em',
                                    left: '6em',
                                    transform: 'translate(-50%, -50%)'
                                }}/>
                                <span style={{marginLeft: '5em'}}>User Management</span>
                            </button>
                        </li>
                        <li>
                            <button className={`nav-btn ${activeButton === 'Download' ? 'btn-active' : ''}`}
                                    onClick={() => handleButtonClick('Download')}>
                                <img src="contmoderate.png" alt="download" style={{
                                    height: '2em',
                                    width: '2em',
                                    position: 'absolute',
                                    top: '20.5em',
                                    left: '6em',
                                    transform: 'translate(-50%, -50%)'
                                }}/>
                                <span style={{marginLeft: '5em'}}>Content Moderation</span>
                            </button>
                        </li>
                        <li>
                            <button className={`nav-btn ${activeButton === 'Quiz' ? 'btn-active' : ''}`}
                                    onClick={() => handleButtonClick('Quiz')}>
                                <img src="sysconfig.png" alt="quiz" style={{
                                    height: '2em',
                                    width: '2em',
                                    position: 'absolute',
                                    top: '25.5em',
                                    left: '6em',
                                    transform: 'translate(-50%, -50%)'
                                }}/>
                                <span style={{marginLeft: '5em'}}>System Configuration</span>
                            </button>
                        </li>
                        <li>
                            <button className={`nav-btn ${activeButton === 'Pricing' ? 'btn-active' : ''}`}
                                    onClick={() => handleButtonClick('Pricing')}>
                                <img src="analytics.png" alt="pricing" style={{
                                    height: '2em',
                                    width: '2em',
                                    position: 'absolute',
                                    top: '30.5em',
                                    left: '6em',
                                    transform: 'translate(-50%, -50%)'
                                }}/>
                                <span style={{marginLeft: '5em'}}>Analytics</span>
                            </button>
                        </li>
                        <li>
                            <button className={`nav-btn ${activeButton === 'Settings' ? 'btn-active' : ''}`}
                                    onClick={() => handleButtonClick('Settings')}>
                                <img src="adminsecurity.png" alt="settings" style={{
                                    height: '2em',
                                    width: '2em',
                                    position: 'absolute',
                                    top: '35.5em',
                                    left: '6em',
                                    transform: 'translate(-50%, -50%)'
                                }}/>
                                <span style={{marginLeft: '5em'}}>Security</span>
                            </button>
                        </li>
                    </ul>
                    <Divider style={{
                        marginBottom: '2em',
                        backgroundColor: '#B18A00',
                        width: '12em',
                        position: 'absolute',
                        top: '69%',
                        left: '9em',
                        transform: 'translate(-50%, -50%)'
                    }}/>
                    <div className='contactus' style={{
                        width: '13em', height: '20%', backgroundColor: 'white',
                        position: 'absolute', top: '38.2em', left: '9em', transform: 'translate(-50%, -50%)',
                        borderRadius: '.5em', boxShadow: '0px 2px 8px rgba(0.2, 0.2, 0.2, 0.2)'
                    }}>
                        <p style={{
                            fontSize: '.8em',
                            textAlign: 'center',
                            paddingLeft: '.5em',
                            paddingRight: '.5em'
                        }}>Encountering problems with our service? Reach out to our customer support team for
                            assistance.</p>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '6vh'}}>
                            <button style={{
                                height: '2.5em',
                                width: '13em',
                                borderRadius: '.5em',
                                backgroundColor: '#FFD234',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'center',
                                boxShadow: '0px 2px 8px rgba(0.2, 0.2, 0.2, 0.2)'
                            }}>
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>


                <div>
                    <input style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        borderRadius: '.6em',
                        width: '57em',
                        height: '3em',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        position: 'absolute',
                        top: '1.2em',
                        marginLeft: '23em'
                    }}
                           type="text"
                           id="searchInput"
                           placeholder="Search..."
                        //value={query}
                        //onChange={handleChange}
                    /> <img src="/searchico.png" alt="Search Icon"
                            style={{position: 'absolute', top: '1.6em', marginLeft: '64.5em'}}/>

                </div>


                <div style={{
                    width: '24em',
                    height: '10em',
                    backgroundColor: '#FFD234',
                    position: 'absolute',
                    top: '9.8em',
                    marginLeft: '31.1em',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '7px',
                    overflow: 'hidden',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                }}>
                    <Typography variant="h4" style={{
                        textAlign: 'left',
                        fontSize: '1.3em',
                        position: 'absolute',
                        top: '.7em',
                        left: '1em',
                        fontWeight: 'bold',
                    }}>24k</Typography>
                    <Typography variant="h1" style={{
                        textAlign: 'left',
                        fontSize: '1em',
                        position: 'absolute',
                        top: '2.3em',
                        left: '1.3em',
                        fontWeight: 'bold',
                    }}>Flashcards</Typography>
                    <canvas id="lineGraphCanvas" width="350" height="140" style={{
                        position: 'absolute',
                        top: '0.6em',
                        left: '1em',
                    }}></canvas>

                </div>

                <div style={{
                    width: '24em',
                    height: '10em',
                    backgroundColor: '#FFD234',
                    position: 'absolute',
                    top: '9.8em',
                    marginLeft: '55.8em',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '7px',
                    overflow: 'hidden',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                }}>
                    <Typography variant="h4" style={{
                        textAlign: 'left',
                        fontSize: '1.3em',
                        position: 'absolute',
                        top: '.7em',
                        left: '1em',
                        fontWeight: 'bold',
                    }}>2000k</Typography>
                    <Typography variant="h1" style={{
                        textAlign: 'left',
                        fontSize: '1em',
                        position: 'absolute',
                        top: '2.3em',
                        left: '1.3em',
                        fontWeight: 'bold',
                    }}>Subscriber</Typography>
                    <canvas id="lineGraphCanvas" width="350" height="140" style={{
                        position: 'absolute',
                        top: '0.6em',
                        left: '1em',
                        border: '1px solid black',
                    }}></canvas>

                </div>

                <div style={{
                    width: '24em',
                    height: '10em',
                    backgroundColor: '#FFD234',
                    position: 'absolute',
                    top: '9.8em',
                    marginLeft: '80.5em',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '7px',
                    overflow: 'hidden',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                }}>
                    <Typography variant="h4" style={{
                        textAlign: 'left',
                        fontSize: '1.3em',
                        position: 'absolute',
                        top: '.7em',
                        left: '1em',
                        fontWeight: 'bold',
                    }}>2.000</Typography>
                    <Typography variant="h1" style={{
                        textAlign: 'left',
                        fontSize: '1em',
                        position: 'absolute',
                        top: '2.3em',
                        left: '1.3em',
                        fontWeight: 'bold',
                    }}>Income</Typography>
                    <canvas id="lineGraphCanvas" width="350" height="140" style={{
                        position: 'absolute',
                        top: '0.6em',
                        left: '1em',
                        border: '1px solid black',
                    }}></canvas>

                </div>


                <div style={{
                    width: '46em',
                    height: '26em',
                    backgroundColor: 'white',
                    borderColor: '#FAC712',
                    borderStyle: 'solid',
                    borderWidth: '3px',
                    position: 'absolute',
                    top: '30em',
                    marginLeft: '43.5em',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '7px',
                    padding: '20px',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography variant="h4" style={{
                        textAlign: 'left',
                        fontSize: '1.3em',
                        position: 'absolute',
                        top: '.7em',
                        left: '1em',
                        fontWeight: 'bold',
                    }}>3500k</Typography>
                    <Typography variant="h1" style={{
                        textAlign: 'left',
                        fontSize: '1em',
                        position: 'absolute',
                        top: '2.3em',
                        left: '1.3em',
                        fontWeight: 'bold',
                    }}>Users</Typography>

                </div>

                <Typography variant="h4"
                            style={{textAlign: 'left', fontSize: '1em', position: 'absolute', top: '2%', left: '78%',}}>Welcome
                    Back,</Typography>
                <div style={{
                    position: 'absolute',
                    top: '6%',
                    left: '78.6%',
                    transform: 'translate(-50%, -50%)',
                    fontWeight: 'bold',
                    marginLeft: '20px', // Add some space between the picture and the name
                    fontSize: '2em', // Make the font size larger
                }}>
                    {userName}
                </div>
                {/* <div style={{position: 'absolute', top: '2%', left: '90%',  boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)'}}> */}
                <Box style={{
                    position: 'absolute',
                    top: '2%',
                    left: '90%',
                    background: '#D0BF81',
                    borderRadius: '50px',
                    width: '45px',
                    height: '45px'
                }}>
                    <IconButton color="white" style={{fontSize: '45px', padding: '0'}}>
                        <AccountCircle style={{fontSize: '100%', width: '100%', color: 'white'}}/>
                    </IconButton>
                </Box>
                <Box style={{
                    position: 'absolute',
                    top: '2%',
                    left: '94%',
                    background: 'white',
                    borderRadius: '50px',
                    width: '45px',
                    height: '45px'
                }}>
                    <IconButton style={{fontSize: '45px', padding: '0'}}>
                        <NotificationsNone style={{fontSize: '100%', width: '100%', color: 'black'}}/>
                    </IconButton>
                </Box>
                {/* </div> */}
                <div style={{
                    width: '24em',
                    height: '28.6em',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '30em',
                    left: '80.5em',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '7px',
                    padding: '10px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                }}>

                    <Typography variant="h4"
                                style={{textAlign: 'center', fontSize: '1.3em', position: 'absolute', top: '1.1em'}}>System
                        Monitor</Typography>

                    <Box style={{
                        backgroundColor: "#FFE793",
                        width: '17.8em',
                        height: '11em',
                        borderRadius: '.5em',
                        position: 'absolute',
                        top: '4.5em',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                    }}>
                    </Box>
                    <Box style={{
                        backgroundColor: "#FFE793",
                        width: '17.8em',
                        height: '11em',
                        borderRadius: '.5em',
                        position: 'absolute',
                        top: '16.4em',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                    }}>
                    </Box>
                </div>
            </div>


        </>
    );
};

export default AdminDashboard;
