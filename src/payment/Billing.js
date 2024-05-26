
import React from 'react';
import { Toolbar, Typography, Button, Box, IconButton, container, Grid } from '@mui/material';
import { AccountCircle, NotificationsNone } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function BillingScreen() {
const navigate = useNavigate();

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

    const handleClick = () => {
        navigate('/Summary');
    };
    


    return (
        <ThemeProvider theme={theme}>
            
            <Box
                sx={{     
                    // height: '100%',
                    // width: '100%',
                    // backgroundColor: '#FFFFFF',
                    // backgroundImage: 'url("/pricebg.png")',
                    // backgroundSize: 'cover',
                    // position: 'absolute',
                    // top: 0,
                    // left: 0,
                    // backgroundPosition: 'center',
                    // zIndex: -1,
                    // overflow: 'hidden',

                    backgroundImage: `url('/pricebg.png')`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "110%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    justifyContent: "center",
                    alignItems: "center",
                        }}
                    >

                    <Toolbar sx={{ mt: 2 }}>
                        <img src="/logo.png" alt="App Logo" sx={{width: 100, marginLeft: '45px'}} />
                        <Typography
                            variant="h3"
                            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: { xs: '25px', md: '40px' }, color: '#B18A00', flexGrow: 1 }}
                        >
                            EduDeck
                        </Typography>
                        <Box sx={{ background: 'white', borderRadius: '50px', p: .8, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: { xs: 1, md: 2 }, boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                            <Box sx={{ background: '#D0BF81', borderRadius: '50px', width: 45, height: 45 }}>
                                <IconButton style={{ fontSize: '45px', padding: 0 }}>
                                    <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ background: 'white', borderRadius: '50px', p: .8, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                            <Box sx={{ background: 'white', borderRadius: '50px', width: 45, height: 45 }}>
                                <IconButton style={{ fontSize: '45px', padding: 0 }}>
                                    <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>

                    {/* <Box sx={{ width: 'auto', position: 'absolute', top: '14%', left: '52%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 2, borderRadius: 2, textAlign: 'center' }}>
                        <Typography sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#B18A00', fontSize: { xs: '30px', md: '40px' }, flexGrow: 1, }}>EduDeck</Typography>
                        <Typography sx={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#332D2D', fontSize: { xs: '30px', md: '40px' }, flexGrow: 1, }}>Plus</Typography> 
                    </Box> */}
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
      container
      justifyContent="center"
    //   spacing={2}
      sx={{
        backgroundColor: '#FFFFFF',
        width: { xs: '90%', md: '70%' }, // Responsive width
        height: { xs: 'auto', md: 'auto' },
        borderRadius: '1em',
        position: 'relative', // Changed to relative for better positioning
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: 2, 
        mt: { xs: 6, sm: 10 },
        px: 1,
        flexDirection: { xs: 'column', md: 'row' }, // Stack boxes vertically on smaller screens
      }}
    >
      <Grid item xs={12} md={6} sx={{ mb: { xs: 4, md: 0 }, pr: { md: 2 } }}> {/* Margin bottom for better spacing on small screens */}
        <Box
          sx={{
            backgroundColor: '#FFD234',
            width: '100%',
            height: '100%',
            borderRadius: '1em',
            padding: 2,
            boxSizing: 'border-box',
          }}
        >
          <Typography sx={{ color: '#000000', fontSize: { xs: '24px', md: '40px' }, fontWeight: 'bolder', padding: 2, textAlign: 'center' }}>
            Billing Info
          </Typography>

          <TextField
            sx={{ my: 2, width: '100%', backgroundColor: "#FFFFFF", borderRadius: '.5em' }}
            id="NameCard"
            label="Name on Card"
            fullWidth
          />

          <TextField
            sx={{ my: 2, width: '100%', backgroundColor: "#FFFFFF", borderRadius: '.5em' }}
            id="CardNumber"
            label="Card Number"
            fullWidth
          />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                sx={{ my: 2, width: '100%', backgroundColor: "#FFFFFF", borderRadius: '.5em' }}
                id="Month"
                label="Month"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ my: 2, width: '100%', backgroundColor: "#FFFFFF", borderRadius: '.5em' }}
                id="Year"
                label="Year"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ my: 2, width: '100%', backgroundColor: "#FFFFFF", borderRadius: '.5em' }}
                id="CVV"
                label="CVV"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12} md={5.5}>
        <Box
          sx={{
            backgroundColor: '#FFD234',
            width: '100%',
            height: '100%',
            borderRadius: '1em',
            padding: 2,
            // transform: 'translateX(4%)',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              width: '100%',
              height: '80%',
              borderRadius: '0.5em',
              padding: 2,
              boxSizing: 'border-box',
            }}
          >
            <Typography sx={{ color: '#000000', fontSize: '1.5em', fontWeight: 'bolder', mb: 2, padding: 2 }}>
              Order Summary
            </Typography>
            {/* Add other order summary content here */}
          </Box>
          <Button
            sx={{
              background: '#FFFFFF',
              width: '100%',
              fontSize: '1em',
              fontWeight: 'bold',
              color: '#000000',
              borderRadius: '.5em',
              mt: 2,
            }}
            onClick={handleClick}
          >
            PURCHASE NOW
          </Button>
        </Box>
      </Grid>
    </Grid>
</Box>
        </ThemeProvider>
    );
}

export default BillingScreen;
