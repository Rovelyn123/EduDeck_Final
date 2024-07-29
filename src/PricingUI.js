import React from "react";
import { Toolbar, Typography, Button, Box, IconButton, ThemeProvider, Grid} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from "react";
import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import { createTheme } from '@mui/material/styles';


function PricingUI() {
    function handleButtonClick1() {
        window.location.href = "https://buy.stripe.com/test_3cs2b92ML4IT8NO4gg";
    }

    function handleButtonClick2() {
        window.location.href = "https://buy.stripe.com/test_5kAaHFfzx3EP1lm7st";
    }
    const [settingClicked, setSettingClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Payment');
    };

    const handleButtonClick = (button) => {
        if (button === 'setting') {
            setSettingClicked(true);
        }
    }

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
    <>
    <ThemeProvider theme={theme}>
    <div style={{ backgroundColor: "#F5D56E", minHeight: "100vh", overflowY: "auto", position: "relative" }}>
        <div
          style={{
            backgroundImage: `url('/pricebg.png')`,
            // backgroundSize: "cover",
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
                        <img src="/logo.png" alt="App Logo" sx={{  width: 100, marginLeft: '45%', '@media (max-width: 600px)': { marginLeft: '30%',}, }} />
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
                                left: { xs: '85%', sm: '95%' }, // Adjust left position for mobile
                                background: '#D0BF81',
                                borderRadius: '50px',
                                width: { xs: '35px', sm: '35px' }, // Adjust width for mobile
                                height: { xs: '35px', sm: '35px' }, // Adjust height for mobile
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
              
                    <Box sx={{ width: {xs: '300px', md: '300px'}, height: {xs: '50px', md: '50px'}, position: 'relative', top: {xs: '5%', md: '1%'}, left: {xs: '57%', md: '55%'}, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transform: 'translate(-60%, -50%)', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                backgroundColor: 'white'}} > 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '35px', marginRight: '12px'}}>EduDeck</Typography> 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#332D2D', fontSize: '35px'}}>Plus</Typography>
                    </Box>
                    <Box sx={{ width: {xs: '70%', md: 'auto'}, position: 'relative', top: {xs: '6%', md: '2%'}, left: {xs: '50%', md: '54%'}, transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <Typography sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#332D2D', fontSize: { xs: '20px', md: '20px' }, flexGrow: 1,}}>Excel in your courses using our latest set of study resources.</Typography>
                    </Box>
        
                  <Grid
                    container justifyContent="center" spacing={6}
                    sx={{
                      position: 'absolute',top: { xs: '250px', md: '180px' },left: {xs: '51%', md: '53%'}, transform: 'translateX(-50%)', width: { xs: '90%', md: '70%' }, 
                    }}
                  >
                    <Box
                    sx={{
                      backgroundColor: '#FAC712', padding: '10px', borderRadius: '15px', position: 'absolute', top: { xs: '35px', md: '35px' }, right: { xs: '178px', md: '740px' }, zIndex: 5, fontFamily: 'Inter', fontWeight: 'bold', width: '95px', textAlign: 'center',
                    }}
                  >
                    BEST DEAL!
                  </Box>

                    <Grid item xs={12} md={6} sx={{ pr: { md: 5 } }}>
                      <Box
                        sx={{ width: '100%', height: '90%', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid black', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px', 
                        }}
                      >
                        <Typography
                          sx={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: { xs: '30px', md: '30px' }, textAlign: 'left', marginBottom: '25px', marginTop: '20px',
                          }}
                        >
                          Free Plan
                        </Typography>
                        <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Limited number of document uploads per month (5 documents).
                          </Typography>
                          <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Limited number of flashcards generation per month (100 flashcards).
                          </Typography>
                          <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Basic quiz generation with limited number of questions.
                          </Typography>
                          <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Basic progress analytics.
                          </Typography>

                        <Button
                          sx={{ background: '#FAC712', fontFamily: 'Inter', fontSize: { xs: '18px', md: '20px' }, fontWeight: 'bold', color: '#555245', marginTop: '35px', textTransform: 'none', padding: '10px', borderRadius: '10px', width: '100%', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                          }} onClick={handleButtonClick1}
                        >
                          Get Edudeck Plus
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ pr: { md: 5 } }}>
                      <Box
                        sx={{ width: '100%', height: '90%', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid black', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px',
                        }}
                      >
                        <Typography
                          sx={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: { xs: '30px', md: '30px' }, textAlign: 'left', marginBottom: '5px',
                          }}
                        >
                          EduDeck Plus 
                        <Typography
                          sx={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: { xs: '30px', md: '20px' }, textAlign: 'left', marginBottom: '25px',
                          }}
                        >
                          (₱30/month): 
                        </Typography>
                        </Typography>
                        
                        <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Unlimited document uploads.
                          </Typography>
                          <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Unlimited flashcard generation.
                          </Typography>
                          <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Advanced quiz generation with more questions.
                          </Typography>
                          <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Detailed progress and performance analytics.
                          </Typography>
                          <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Priority customer support.
                          </Typography>
                          <Typography
                            sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '15px' }, textAlign: 'left' }}
                          >
                            &bull; Early access to new features.
                          </Typography>
                        <Button
                          sx={{ background: '#332D2D', fontFamily: 'Inter', fontSize: { xs: '18px', md: '20px' }, fontWeight: 'bold', color: '#FAC712', marginTop: '20px', textTransform: 'none', padding: '10px', borderRadius: '10px', width: '100%', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                          }} onClick={handleButtonClick2}
                        >
                          Get Edudeck Plus
                        </Button>
                      </Box>
                    </Grid>

        </Grid> 
    </div>
    </div>
    </ThemeProvider>
    </>
  );
}

export default PricingUI;