import React from "react";
import { Toolbar, Typography, Button, Box, IconButton, ThemeProvider, Grid} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from "react";
import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import { createTheme } from '@mui/material/styles';


function PricingScreen() {

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
    <div style={{ backgroundColor: "#F5D56E", position: "relative", width: "100vw", height: "110vh" }}>
        <div
          style={{
            backgroundImage: `url('/pricebg.png')`,
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >

            <Grid container spacing={0.5}>
                <Grid item xs={5} md={8}>
                    <Toolbar sx={{ mt: 2 }}>
                                    <img src="/logo.png" alt="App Logo" sx={{  width: 100, marginLeft: '45%', '@media (max-width: 600px)': { marginLeft: '30%',}, }} />
                                    <Typography variant="h3" sx={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: { xs: '25px', md: '40px' }, color: '#B18A00', marginRight: '117%' }}
                                    >EduDeck
                                    </Typography>
                    
                                    <Box sx={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                                        <Box sx={{ background: '#D0BF81', borderRadius: '50px', width: '45px', height: '45px' }}>
                                            <IconButton color="white" style={{ fontSize: '45px', padding: '0'}}>
                                                <AccountCircle sx={{ fontSize: '100%', width: '100%', color: 'white' }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box sx={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '40px', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                                        <Box sx={{ background: 'white', borderRadius: '50px', width: '45px', height: '45px' }}>
                                            <IconButton sx={{ fontSize: '45px', padding: '0'}}>
                                                <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                    </Toolbar>
                </Grid>
                </Grid>

              
        
                    <Box sx={{ width: '430px', height: '70px', position: 'absolute', top: '15%', left: '57%', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transform: 'translate(-60%, -50%)', 
                                backgroundColor: 'white'}} > 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '45px', marginRight: '12px'}}>EduDeck</Typography> 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#332D2D', fontSize: '45px'}}>Plus</Typography>
                    </Box>

                    <Box sx={{ width: 'auto', position: 'absolute', top: '23%', left: '52%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <Typography sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#332D2D', fontSize: { xs: '20px', md: '25px' }, flexGrow: 1,}}>Excel in your courses using our latest set of study resources.</Typography>
                    </Box>
        
       <Grid
        container justifyContent="center" spacing={6}
        sx={{
          position: 'absolute',top: { xs: '250px', md: '250px' },left: '53%', transform: 'translateX(-50%)', width: { xs: '90%', md: '70%' }, 
        }}
      >
        <Box
        sx={{
          backgroundColor: '#FAC712', padding: '10px', borderRadius: '15px', position: 'absolute', top: { xs: '35px', md: '35px' }, right: { xs: '350px', md: '940px' }, zIndex: 5, fontFamily: 'Inter', fontWeight: 'bold', width: '95px', textAlign: 'center',
        }}
      >
        BEST DEAL!
      </Box>

         <Grid item xs={12} md={5} sx={{ pr: { md: 5 } }}>
          <Box
            sx={{ width: '100%', height: '90%', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid black', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px',
            }}
          >
            <Typography
              sx={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: { xs: '30px', md: '40px' }, textAlign: 'left', marginBottom: '25px', marginTop: '20px',
              }}
            >
              Annual
            </Typography>
            <Typography
              sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '22px' }, textAlign: 'left',
              }}
            >
              Free 7-day trial then
            </Typography>
            <Typography
              sx={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: { xs: '28px', md: '32px' }, textAlign: 'left',
              }}
            >
              ₱300.00
            </Typography>
            <Typography
              sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '13px', md: '15px' }, textAlign: 'left',
              }}
            >
              Which is ₱25.00/ month
            </Typography>
            <Button
              sx={{ background: '#FAC712', fontFamily: 'Inter', fontSize: { xs: '18px', md: '20px' }, fontWeight: 'bold', color: '#555245', marginTop: '20px', textTransform: 'none', padding: '10px', borderRadius: '10px', width: '100%',
              }}
            >
              Start your free trial now
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={5} sx={{ pr: { md: 5 } }}>
          <Box
            sx={{ width: '100%', height: '90%', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1.5px solid black', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '20px',
            }}
          >
            <Typography
              sx={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: { xs: '30px', md: '40px' }, textAlign: 'left', marginBottom: '25px',
              }}
            >
              Monthly
            </Typography>
            <Typography
              sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '18px', md: '22px' }, textAlign: 'left',
              }}
            >
              Amount billed today
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography
                sx={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: { xs: '28px', md: '32px' }, textAlign: 'left', marginRight: '10px',
                }}
              >
                ₱30.00
              </Typography>
              <Typography
                sx={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: { xs: '13px', md: '15px' }, textAlign: 'left',
                }}
              >
                / month
              </Typography>
            </Box>
            <Button
              sx={{ background: '#332D2D', fontFamily: 'Inter', fontSize: { xs: '18px', md: '20px' }, fontWeight: 'bold', color: '#FAC712', marginTop: '20px', textTransform: 'none', padding: '10px', borderRadius: '10px', width: '100%',
              }}
            >
              Start your free trial now
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

export default PricingScreen;