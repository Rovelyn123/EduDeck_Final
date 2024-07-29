import React, { useState } from "react";
import { Toolbar, Typography, Button, Box, IconButton, ThemeProvider, Grid } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { createTheme } from '@mui/material/styles';
import ThankyouPopup from './ThankyouPopupUI'; // Ensure the correct import path
import { useNavigate } from "react-router-dom";

function SummaryScreen() {
    const navigate = useNavigate();
    const [showThankyouPopup, setShowThankyouPopup] = useState(false);

    const handlePurchaseClick = () => {
        setShowThankyouPopup(true);
    };

    const handleClosePopup = () => {
        setShowThankyouPopup(false);
    };

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920,
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", overflowY: "auto", position: "relative" }}>
                <div style={{
                    backgroundImage: `url('/pricebg.png')`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    overflowY: "auto"
                }}>
                    <Toolbar sx={{ mt: 2 }}>
                        <img src="/logo.png" alt="App Logo" sx={{ width: 90, marginLeft: '45px' }} />
                        <Typography
                            variant="h3"
                            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: { xs: '25px', md: '30px' }, color: '#B18A00', flexGrow: 1 }}
                        >
                            EduDeck
                        </Typography>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: { xs: '10%', sm: '5%' },
                                left: { xs: '85%', sm: '95%' },
                                background: '#D0BF81',
                                borderRadius: '50px',
                                width: { xs: '35px', sm: '35px' },
                                height: { xs: '35px', sm: '35px' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <IconButton onClick={() => navigate("/profilesettings")} color="inherit" sx={{ fontSize: '35px', p: '0' }}>
                                <AccountCircle sx={{ fontSize: '100%', width: '100%', color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Toolbar>

                    <Box sx={{ width: { xs: '300px', md: '300px' }, height: { xs: '50px', md: '50px' }, position: 'relative', top: { xs: '5%', md: '1%' }, left: { xs: '57%', md: '55%' }, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transform: 'translate(-60%, -50%)', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'white' }}
                    >
                        <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '35px', marginRight: '12px' }}>EduDeck</Typography>
                        <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#332D2D', fontSize: '35px' }}>Plus</Typography>
                    </Box>
                    <Box sx={{ width: { xs: '70%', md: 'auto' }, position: 'relative', top: { xs: '6%', md: '2%' }, left: { xs: '50%', md: '54%' }, transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <Typography sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#332D2D', fontSize: { xs: '20px', md: '20px' }, flexGrow: 1 }}>Excel in your courses using our latest set of study resources.</Typography>
                    </Box>

                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={11} md={8}>
                            <Box
                                sx={{
                                    backgroundColor: "#FFFFFF",
                                    height: { xs: '170%', md: '150%' },
                                    width: { xs: '85%', md: '70%' },
                                    marginTop: { xs: '12%', md: '2%' },
                                    marginLeft: { xs: '2%', md: '17%' },
                                    borderRadius: '1em',
                                    padding: '1em',
                                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <Typography sx={{ color: '#000000', fontSize: { xs: '25px', md: '25px' }, fontWeight: 'bold', marginBottom: '.5em', textAlign: 'center' }}>
                                    Order Summary
                                </Typography>
                                <Box sx={{ backgroundColor: "#FFD234", width: '100%', height: '85%', borderRadius: '1em', padding: '2em', boxSizing: 'border-box', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' }}>
                                    <Button
                                        sx={{
                                            background: '#FFD234', width: { xs: '70%', md: '30%' }, fontSize: '1em', fontWeight: 'bold',
                                            color: '#000000', position: 'relative', top: { xs: '90%', md: '90%' },
                                            left: { xs: '17%', md: '36%' }, borderRadius: '10px', textAlign: 'center',
                                        }}
                                        onClick={handlePurchaseClick}
                                    >
                                        PURCHASE NOW
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <ThankyouPopup open={showThankyouPopup} handleClose={handleClosePopup} />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default SummaryScreen;
