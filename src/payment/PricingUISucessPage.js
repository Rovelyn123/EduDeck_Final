import React, {useState, useEffect, useRef} from "react";
import { Toolbar, Typography, Button, Box, IconButton, ThemeProvider, Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from "@mui/icons-material";
import { createTheme } from '@mui/material/styles';
import '@fontsource/lato';
import axios from 'axios';

function PricingUISucessPage() {

    const handleClick = () => {
        navigate('/Payment');
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
            <div style={{
                backgroundColor: "#F5D56E",
                minHeight: "100vh",
                overflowY: "auto",
                position: "relative"
            }}>
                <div
                    style={{
                        backgroundImage: `url('/pricebg.png')`,
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        overflowY: "auto"
                    }}
                >
                    <Toolbar sx={{ mt: 2 }}>
                        <img src="/logo.png" alt="App Logo" style={{
                            width: 100,
                            marginLeft: '0%',
                            '@media (max-width: 600px)': { marginLeft: '25%' },
                        }} />
                        <Typography
                            variant="h3"
                            sx={{
                                fontFamily: 'Lato',
                                fontWeight: '900',
                                fontSize: { xs: '25px', md: '30px' },
                                color: '#B18A00',
                                flexGrow: 1
                            }}
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
                            <IconButton onClick={() => navigate("/profilesettings")} color="inherit"
                                        sx={{ fontSize: '35px', p: '0' }}>
                                <AccountCircle sx={{ fontSize: '100%', width: '100%', color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Toolbar>

                            <Box sx={{
                                width: {xs: '300px', md: '300px'},
                                height: {xs: '50px', md: '50px'},
                                position: 'relative',
                                top: {xs: '5%', md: '1%'},
                                left: '50%',
                                transform: 'translateX(-50%)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                backgroundColor: 'white'
                            }}>
                                <Typography style={{
                                    fontFamily: 'Lato',
                                    fontWeight: 'bolder',
                                    color: '#B18A00',
                                    fontSize: '35px',
                                    marginRight: '12px'
                                }}>EduDeck</Typography>
                                <Typography style={{
                                    fontFamily: 'Lato',
                                    fontWeight: 'bolder',
                                    color: '#332D2D',
                                    fontSize: '35px'
                                }}>Plus</Typography>
                            </Box>

                            <Box sx={{
                                width: {xs: '70%', md: 'auto'},
                                position: 'relative',
                                top: {xs: '6%', md: '2%'},
                                left: '50%',
                                transform: 'translateX(-50%)',
                                textAlign: 'center'
                            }}>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    fontWeight: 'bold',
                                    color: '#332D2D',
                                    fontSize: {xs: '20px', md: '20px'}
                                }}>
                                    Excel in your courses using our latest set of study resources.
                                </Typography>
                            </Box>

                            <Grid container justifyContent="center" spacing={5} sx={{
                                position: 'absolute',
                                top: {xs: '260px', md: '180px'},
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: {xs: '90%', md: '70%'},
                                marginTop:'5px'

                            }}>
                                <Grid item xs={12} md={6} sx={{pr: {md: 5}}}>
                                    <Box sx={{
                                        width: '100%',
                                        height: '90%',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        border: '1.5px solid black',
                                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        padding: '20px'
                                    }}>
                                        <Typography sx={{
                                            fontFamily: 'Lato',
                                            fontWeight: 'bolder',
                                            color: '#B18A00',
                                            fontSize: {xs: '30px', md: '30px'},
                                            marginBottom: '25px',
                                            marginTop: '20px'
                                        }}>
                                            Free Plan
                                        </Typography>
                                        <Typography sx={{
                                            fontFamily: 'Lato',
                                            color: '#9FA0A0',
                                            fontSize: {xs: '18px', md: '15px'}
                                        }}>
                                            &bull; Limited number of document uploads per month (5 documents).
                                        </Typography>
                                        <Typography sx={{
                                            fontFamily: 'Lato',
                                            color: '#9FA0A0',
                                            fontSize: {xs: '18px', md: '15px'}
                                        }}>
                                            &bull; Limited number of flashcards generation per month (100
                                            flashcards).
                                        </Typography>
                                        <Typography sx={{
                                            fontFamily: 'Lato',
                                            color: '#9FA0A0',
                                            fontSize: {xs: '18px', md: '15px'}
                                        }}>
                                            &bull; Basic quiz generation with limited number of questions.
                                        </Typography>
                                        <Typography sx={{
                                            fontFamily: 'Lato',
                                            color: '#9FA0A0',
                                            fontSize: {xs: '18px', md: '15px'}
                                        }}>
                                            &bull; Basic progress analytics.
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6} sx={{pr: {md: 5}}}>
                                    <Box sx={{
                                        width: '100%',
                                        height: '90%',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        border: '1.5px solid black',
                                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        padding: '20px'
                                    }}>
                                        <Typography sx={{
                                            fontFamily: 'Lato',
                                            fontWeight: 'bolder',
                                            color: '#B18A00',
                                            fontSize: {xs: '30px', md: '30px'},
                                            marginBottom: '5px'
                                        }}>
                                            EduDeck Plus
                                            <Typography sx={{
                                                fontFamily: 'Lato',
                                                fontWeight: 'bolder',
                                                color: '#B18A00',
                                                fontSize: {xs: '30px', md: '20px'},
                                                marginBottom: '25px'
                                            }}>
                                                (₱30/month):
                                            </Typography>
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Lato',
                                                color: '#9FA0A0',
                                                fontSize: {xs: '18px', md: '15px'},
                                                textAlign: 'left'
                                            }}
                                        >
                                            &bull; Unlimited document uploads.
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Lato',
                                                color: '#9FA0A0',
                                                fontSize: {xs: '18px', md: '15px'},
                                                textAlign: 'left'
                                            }}
                                        >
                                            &bull; Unlimited flashcard generation.
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Lato',
                                                color: '#9FA0A0',
                                                fontSize: {xs: '18px', md: '15px'},
                                                textAlign: 'left'
                                            }}
                                        >
                                            &bull; Advanced quiz generation with more questions.
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Lato',
                                                color: '#9FA0A0',
                                                fontSize: {xs: '18px', md: '15px'},
                                                textAlign: 'left'
                                            }}
                                        >
                                            &bull; Detailed progress and performance analytics.
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Lato',
                                                color: '#9FA0A0',
                                                fontSize: {xs: '18px', md: '15px'},
                                                textAlign: 'left'
                                            }}
                                        >
                                            &bull; Priority customer support.
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Lato',
                                                color: '#9FA0A0',
                                                fontSize: {xs: '18px', md: '15px'},
                                                textAlign: 'left'
                                            }}
                                        >
                                            &bull; Early access to new features.
                                        </Typography>

                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{pr: {md: 5}}}>
                                    <Box sx={{
                                        width: '100%',
                                        height: '65.5%',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        border: '1.5px solid black',
                                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        padding: '20px'
                                    }}>
                                        <Typography sx={{
                                            fontFamily: 'Lato',
                                            fontWeight: 'bolder',
                                            color: '#B18A00',
                                            fontSize: {xs: '20px', md: '20px'},
                                            marginBottom: '10px'
                                        }}>
                                            Current Subscription : {subscription}
                                        </Typography>


                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            gap: '10px'
                                        }}>
                                            {/* Disable the "Get EduDeck Plus" button if the user is already subscribed */}
                                            <Button
                                                sx={{
                                                    background: subscription === 'EduDeck Plus' ? '#DDDDDD' : '#FAC712', // Gray out if disabled
                                                    fontFamily: 'Lato',
                                                    fontSize: { xs: '18px', md: '20px' },
                                                    fontWeight: 'bold',
                                                    color: '#555245',
                                                    textTransform: 'none',
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    width: '48%',
                                                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                                }}
                                                onClick={handleStripeClick}
                                                disabled={subscription === 'EduDeck Plus'} // Disable if subscribed to EduDeck Plus
                                            >
                                                Get EduDeck Plus
                                            </Button>

                                            {/* Hidden Stripe button for linking */}
                                            <div ref={stripeButtonRef} style={{ display: 'none' }} />


                                            {/* Disable the "Manage Subscription" button if the user is NOT subscribed to EduDeck Plus */}
                                            <Button
                                                sx={{
                                                    background: subscription === 'EduDeck Plus' ? '#FAC712' : '#DDDDDD', // Gray out if disabled
                                                    fontFamily: 'Lato',
                                                    fontSize: {xs: '18px', md: '20px'},
                                                    fontWeight: 'bold',
                                                    color: '#555245',
                                                    textTransform: 'none',
                                                    padding: '10px',
                                                    borderRadius: '10px',
                                                    width: '48%',
                                                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                                }}
                                                onClick={manageSubscription}
                                                disabled={subscription !== 'EduDeck Plus'}  // Disable if NOT subscribed to EduDeck Plus
                                            >
                                                Manage Subscription
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default PricingUI;
