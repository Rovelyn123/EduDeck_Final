
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
             <div style={{ backgroundColor: "#FFFFFF", position: "relative", width: "100vw", height: "100vh" }}>
            <Box
                sx={{
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

                    <Toolbar sx={{ mt: 2 }}>
                        <img src="/logo.png" alt="App Logo" sx={{width: 90, marginLeft: '45px'}} />
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
                              <IconButton color="inherit" sx={{ fontSize: '35px', p: '0' }}>
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
      container
      justifyContent="center"
      sx={{
        transform: 'translateX(-50%)',
        padding: 2, 
        flexDirection: { xs: 'column', md: 'row' }, // Stack boxes vertically on smaller screens
        backgroundColor: "#FFFFFF",
        width: { xs: '90%', md: '58%' }, // Responsive width
        height: { xs: 'auto', md: 'auto' },
        marginTop: {xs: '12%', md: '1%'},
        marginLeft: {xs: '52%', md: '52%'},
        borderRadius: '1em',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
      
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
          <Typography sx={{ color: '#000000', fontSize: { xs: '24px', md: '25px' }, fontWeight: 'bolder', padding: 1, textAlign: 'center' }}>
            Billing Info
          </Typography>

          <TextField
                sx={{
                  backgroundColor: "#FFFFFF",
                  width: '100%',
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                  borderRadius: '.5em',
                  marginBottom: '1em',
                  '& .MuiInputBase-root': {
                    height: '2.5em', // Adjust height as needed
                    padding: '0 0.5em', // Adjust padding as needed
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '0.8em', // Adjust label font size as needed
                    top: '-5px', // Adjust the position of the label as needed
                  },
                  '& .MuiInputLabel-shrink': {
                    top: '0', // Adjust the position of the label when shrink as needed
                  },
                  '& .MuiInputBase-input': {
                    padding: '0.5em', // Adjust padding as needed
                    fontSize: '0.9em', // Adjust input font size as needed
                  },
                }}            
                id="NameCard"
                label="Name on Card"
            
          />

          <TextField
                sx={{
                  backgroundColor: "#FFFFFF",
                  width: '100%',
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                  borderRadius: '.5em',
                  marginBottom: '1em',
                  '& .MuiInputBase-root': {
                    height: '2.5em', // Adjust height as needed
                    padding: '0 0.5em', // Adjust padding as needed
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '0.8em', // Adjust label font size as needed
                    top: '-5px', // Adjust the position of the label as needed
                  },
                  '& .MuiInputLabel-shrink': {
                    top: '0', // Adjust the position of the label when shrink as needed
                  },
                  '& .MuiInputBase-input': {
                    padding: '0.5em', // Adjust padding as needed
                    fontSize: '0.9em', // Adjust input font size as needed
                  },
                }}            
                id="CardNumber"
                label="Card Number"
           
          />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                   sx={{
                    backgroundColor: "#FFFFFF",
                    width: '100%',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '.5em',
                    marginBottom: '1em',
                    '& .MuiInputBase-root': {
                      height: '2.5em', // Adjust height as needed
                      padding: '0 0.5em', // Adjust padding as needed
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.8em', // Adjust label font size as needed
                      top: '-5px', // Adjust the position of the label as needed
                    },
                    '& .MuiInputLabel-shrink': {
                      top: '0', // Adjust the position of the label when shrink as needed
                    },
                    '& .MuiInputBase-input': {
                      padding: '0.5em', // Adjust padding as needed
                      fontSize: '0.9em', // Adjust input font size as needed
                    },
                  }}                
                  id="Month"
                  label="Month"
                
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                    sx={{
                      backgroundColor: "#FFFFFF",
                      width: '100%',
                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                      borderRadius: '.5em',
                      marginBottom: '1em',
                      '& .MuiInputBase-root': {
                        height: '2.5em', // Adjust height as needed
                        padding: '0 0.5em', // Adjust padding as needed
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '0.8em', // Adjust label font size as needed
                        top: '-5px', // Adjust the position of the label as needed
                      },
                      '& .MuiInputLabel-shrink': {
                        top: '0', // Adjust the position of the label when shrink as needed
                      },
                      '& .MuiInputBase-input': {
                        padding: '0.5em', // Adjust padding as needed
                        fontSize: '0.9em', // Adjust input font size as needed
                      },
                    }}                
                    id="Year"
                    label="Year"
                
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                   sx={{
                    backgroundColor: "#FFFFFF",
                    width: '100%',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '.5em',
                    marginBottom: '1em',
                    '& .MuiInputBase-root': {
                      height: '2.5em', // Adjust height as needed
                      padding: '0 0.5em', // Adjust padding as needed
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '0.8em', // Adjust label font size as needed
                      top: '-5px', // Adjust the position of the label as needed
                    },
                    '& .MuiInputLabel-shrink': {
                      top: '0', // Adjust the position of the label when shrink as needed
                    },
                    '& .MuiInputBase-input': {
                      padding: '0.5em', // Adjust padding as needed
                      fontSize: '0.9em', // Adjust input font size as needed
                    },
                  }}                
                  id="CVV"
                  label="CVV"
                
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
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Typography sx={{ color: '#000000', fontSize: '1em', fontWeight: 'bolder', mb: 2,  }}>
              Order Summary
            </Typography>
            {/* Add other order summary content here */}
          </Box>
          <Button
            sx={{
              background: '#FFFFFF',
              width: '100%',
              height: '15%',
              fontSize: '1em',
              fontWeight: 'bold',
              color: '#000000',
              borderRadius: '.5em',
              mt: 2,
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
            }}
            onClick={handleClick}
          >
            PURCHASE NOW
          </Button>
        </Box>
      </Grid>
    </Grid>
</Box>
</div>
        </ThemeProvider>
    );
}

export default BillingScreen;
