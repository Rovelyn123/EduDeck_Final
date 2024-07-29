import React, { useRef } from "react";
import "./Admin CSS Files/AdminSystemConfig.css";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import { AccountCircle, NotificationsNone} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AdminSystemConfigUI() {

    return (
        <>
            <div className="lsbody">

                <Toolbar style={{marginTop: '25px'}}>
                    <img src="/logo.png" alt="App Logo" style={{ width: 150, marginLeft: '1px' }} />
                        <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '40px', color: '#B18A00' }}
                        >EduDeck
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '28px', marginRight: '15px' }}>
                            <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '910px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                                <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px', color: '#332D2D', justifyContent: 'center', marginTop: '3px' }}
                                >System Configuration
                                </Typography>
                            </div>
                        </div>
                    <Box style={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                        <Box style={{ background: 'red', borderRadius: '50px', width: '45px', height: '45px' }}>
                            <IconButton style={{ fontSize: '45px', padding: '0'}} onClick={() => window.history.back()}>
                                <ArrowBackIcon style={{ fontSize: '100%', width: '100%', color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Box>
                        <Box style={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '13px', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                            <Box style={{ background: '#D0BF81', borderRadius: '50px', width: '45px', height: '45px' }}>
                                <IconButton color="white" style={{ fontSize: '45px', padding: '0'}}>
                                    <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box style={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '30px', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                            <Box style={{ background: 'white', borderRadius: '50px', width: '45px', height: '45px' }}>
                                <IconButton style={{ fontSize: '45px', padding: '0'}}>
                                    <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>

                <div className="center-content">
                    <div className="center-panel">

                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSystemConfigUI;
