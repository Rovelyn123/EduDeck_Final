import React from "react";
import { Toolbar, Typography, Button, Box, IconButton, Container} from "@mui/material";
import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function PaymentScreen() {
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
        navigate('/Billing');
    };

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

        
        <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: "#FFFFFF", height: { xs: '85%', md: '80%' }, maxWidth: { xs: '82%', md: '50%' }, marginTop: {xs: '12%', md: '1%'},
        marginLeft: {xs: '5%', md: '28%'}, borderRadius: '1em', padding: '1em', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', }}>
          <Box sx={{ backgroundColor: "#FFD234", width: '100%', height: '100%', borderRadius: '1em', padding: '2em', boxSizing: 'border-box' }}>
            <Typography sx={{ color: '#000000', fontSize: { xs: '24px', md: '25px' }, fontWeight: 'bold', marginBottom: '.5em', textAlign: 'center' }}>
              Payment Method
            </Typography>

            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
    hiddenLabel
    id="Name"
    label="Name"
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
    hiddenLabel
    id="Email"
    label="Email"
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
    hiddenLabel
    id="Billing"
    label="Billing Address"
  />
</Grid>


              <Grid item xs={12} md={6}>
                <Box sx={{ backgroundColor: "#FFFFFF", width: '100%', height: {xs: 'auto', md: 'auto'}, borderRadius: '1em', padding: '1em', boxSizing: 'border-box', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', }}>
                  <RadioGroup aria-labelledby="Card" name="Card">
                    <FormControlLabel value="Credit Card" control={<Radio />} label={<span style={{ fontSize: '15px' }}>Credit Card</span>} />
                    <FormControlLabel value="Debit Card" control={<Radio />} label={<span style={{ fontSize: '15px' }}>Debit Card</span>} />
                  </RadioGroup>
<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '.5em',
    flexWrap: 'nowrap', // Ensure buttons stay in a row
    gap: '1em',
  }}
>
  <Button
    sx={{
      backgroundImage: `url('/PayMaya.png')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      width: "4em", // Adjust width as needed
      height: "2.5em", // Adjust height as needed
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    }}
  />
  <Button
    sx={{
      backgroundImage: `url('/Gcash.png')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      width: "2em", // Adjust width as needed
      height: "2.5em", // Adjust height as needed
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    }}
  />
  <Button
    sx={{
      backgroundImage: `url('/Paypal.png')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      width: "2em", // Adjust width as needed
      height: "2.5em", // Adjust height as needed
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    }}
  />
</Box>

                </Box>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', top: '1em' }}>
              <Button sx={{ background: '#FFFFFF',  fontSize: '15px', fontWeight: 'bold', color: '#000000', borderRadius: '10px', width: '10em', top: {xs:'10px', md:'1px'}, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',}} onClick={handleClick}>
                OK
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>


        </div>
    </div>
</ThemeProvider>
   )

}

export default PaymentScreen;