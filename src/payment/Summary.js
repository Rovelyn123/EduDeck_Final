import React from "react";
import { Toolbar, Typography, Button, Box, IconButton, ThemeProvider, Grid} from "@mui/material";
import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { useState } from "react";
import ThankyouPopup from "./ThankyouPopup";


function SummaryScreen() {

    // const [showOrderSummary, setShowOrderSummary] = useState(false);

    const navigate = useNavigate();

    const [openThankyouPopup, setOpenThankyouPopup] = useState(false);

    const handleOpenThankyou = () => setOpenThankyouPopup(true);
    const handleCloseThankyou = () => setOpenThankyouPopup(false);
    
    // const handleStartTrial = () => {
    //   setShowOrderSummary(true);
    // };

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
    <div style={{ backgroundColor: "#FFFFFF", position: "relative", width: "100vw", height: "100vh" }}>
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

    <Box style={{ width: '430px', height: '70px', position: 'absolute', top: '15%', left: '55%', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: 'translate(-60%, -50%)', 
                  backgroundColor: 'white'}} > 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '45px', marginRight: '12px'}}>EduDeck</Typography> 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#332D2D', fontSize: '45px'}}>Plus</Typography>
        </Box>
        <Box sx={{ width: 'auto', position: 'absolute', top: '23%', left: '52%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <Typography sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#332D2D', fontSize: { xs: '20px', md: '25px' }, flexGrow: 1,}}>Excel in your courses using our latest set of study resources.</Typography>
        </Box>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={11.7} md={8}>
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                height: '95%',
                maxWidth: '70em',
                margin: '10em auto',
                borderRadius: '1em',
                padding: '1em',
              }}
            >
                <Typography sx={{ color: '#000000', fontSize: { xs: '30px', md: '40px' }, fontWeight: 'bold', marginBottom: '.5em', textAlign: 'center' }}>
                    Order Summary
                </Typography>
                {/* //{showOrderSummary && ( */}
                <Box sx={{ backgroundColor: "#FFD234", 
                            width: '100%', height: '70%', 
                            borderRadius: '1em', padding: '2em', 
                            boxSizing: 'border-box' }}>
        
                <Button
                  sx={{
                    background: '#FFD234', width: '30%', fontSize: '1em', fontWeight: 'bold',
                    color: '#000000', position: 'relative', top: '120%',
                    left: '37%', borderRadius: '10px', textAlign: 'center',
                    
                  }}
                  onClick={handleOpenThankyou}>
                  PURCHASE NOW
                </Button>
                 <ThankyouPopup open={openThankyouPopup} handleClose={handleCloseThankyou} />
              </Box>
            </Box>
          </Grid>
        </Grid>

       
        </div>

    </div>
</ThemeProvider>
   )

}

export default SummaryScreen;