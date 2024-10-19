import React from 'react'
import { AppBar, Paper, Typography, Toolbar, Button, Box, ButtonGroup} from '@mui/material'
import './AboutUsUI.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './FooterUI';
import { Link } from 'react-router-dom';

function AboutUsUI() {

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

      const handleButtonClick = () => {
                  window.scrollTo(0,0);
                };
        
            // kani kay para clickable lang ang icons
            const handleParagraphClick = (item) => {
                console.log(`Clicked on ${item}`);
    };

    return (
        <ThemeProvider theme={theme}>
        <div className='background'>

        <AppBar position="fixed" sx={{background: 'white', zIndex: 1000 }}>
    <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex', alignItems: 'center', margin: '0 0 0 -0.7rem '}}>
            <Box sx={{height: { xs: '35px', sm: '52px' }, width: 'auto'}}>
                <img src='logo.png' alt='logo' className='logo' style={{height: '100%', width: 'auto'}} />
            </Box>
            <Typography sx={{color: "#8c7111", fontFamily: 'lato', fontWeight: 600, fontSize: { xs: '1.2em', sm: '1.8em' }, display: { xs: "none", sm: "block" }}}>
                EduDeck
            </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <ButtonGroup color="secondary" variant="text" aria-label="Button group">
                <Link to="/signup" style={{ textDecoration: 'none' }}><Button sx={{color: '#8C7111', fontWeight: 'bold', fontSize: { xs: '0.8em', sm: '1em' }}}>Signup</Button></Link>
                <Link to="/Login" style={{ textDecoration: 'none' }}>   <Button sx={{color: '#8C7111', fontWeight: 'bold', fontSize: { xs: '0.8em', sm: '1em' }}}>Login</Button></Link>
            </ButtonGroup>
        </Box>
    </Toolbar>
</AppBar>
        <div style={{marginBottom: '2em'}}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '5em'}}>
                    <Typography gutterBottom sx={{color: 'black', fontFamily: 'Lato', fontWeight: 800, fontSize: { xs: '1rem', sm: '2rem' }}}>
                        Meet Team DinoSure
                    </Typography>
                    <Typography m={2} sx={{color: 'black', fontFamily: 'Lato', textAlign: 'center'}}>
                        We are Team DinoSure, a team of ambitious college students who developed EduDeck. We’re not just developers; <br/>we’re also students, just like you. 
                        We understand the challenges of college life firsthand, and <br/> we’re committed to making it a little bit easier.
                    </Typography>
                    <Typography mt={2} gutterBottom sx={{color: 'black', fontFamily: 'Lato', fontWeight: 800, fontSize: { xs: '1rem', sm: '2rem' }}}>
                        Our Mission
                    </Typography>
                    <Typography m={2} sx={{color: 'black', fontFamily: 'Lato', textAlign: 'center'}}>
                        Our mission is to leverage our skills in technology to enhance the academic journey for ourselves and our peers. <br/>
                        We believe in the power of technology to transform learning, and we’re dedicated to making it accessible to all students
                    </Typography>
                </Box>

                <Box
            display="flex"
            flexWrap="nowrap"
            justifyContent="space-between"
            overflowX="auto"
            sx={{ paddingLeft: { xs: '10px', sm: '70px' }, paddingRight: { xs: '10px', sm: '50px' } }}
          >
            {/* Profile 1: Karyme Fatima Crisologo */}
            <Box m={1} sx={{ width: { xs: '200px', sm: '250px' } }}>
              <Paper
                elevation={5}
                sx={{
                  height: { xs: 200, sm: 310 },
                  width: '100%',
                  backgroundColor: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    height: { xs: 60, sm: 120 },
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    margin: '1rem',
                    backgroundColor: 'white',
                  }}
                >
                  <img
                    src="/KarymeProfile.png"
                    alt="Karyme Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', fontWeight: 600, marginTop: '1rem' }}
                >
                  Karyme Fatima Crisologo
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', textAlign: 'center', margin: '.50rem' }}
                >
                  “The best project you’ll ever work on is you”
                </Typography>
              </Paper>
            </Box>

            {/* Profile 2: Rovelyn Aguinaldo */}
            <Box m={1} sx={{ width: { xs: '200px', sm: '250px' } }}>
              <Paper
                elevation={5}
                sx={{
                  height: { xs: 200, sm: 310 },
                  width: '100%',
                  backgroundColor: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    height: { xs: 60, sm: 120 },
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    margin: '1rem',
                    backgroundColor: 'white',
                  }}
                >
                  <img
                    src="/RovelynProfile.png"
                    alt="Rovelyn Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', fontWeight: 600, marginTop: '1rem' }}
                >
                  Rovelyn Aguinaldo
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', textAlign: 'center', margin: '.50rem' }}
                >
                  “Do what makes your soul shine”
                </Typography>
              </Paper>
            </Box>

            {/* Profile 3: Kerch Cabo */}
            <Box m={1} sx={{ width: { xs: '200px', sm: '250px' } }}>
              <Paper
                elevation={5}
                sx={{
                  height: { xs: 200, sm: 310 },
                  width: '100%',
                  backgroundColor: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    height: { xs: 60, sm: 120 },
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    margin: '1rem',
                    backgroundColor: 'white',
                  }}
                >
                  <img
                    src="/KerchProfile.png"
                    alt="Kerch Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', fontWeight: 600, marginTop: '1rem' }}
                >
                  Kerch Cabo
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', textAlign: 'center', margin: '.50rem' }}
                >
                  “Just trust the process”
                </Typography>
              </Paper>
            </Box>

            {/* Profile 4: Fame Kate Sagolili */}
            <Box m={1} sx={{ width: { xs: '200px', sm: '250px' } }}>
              <Paper
                elevation={5}
                sx={{
                  height: { xs: 200, sm: 310 },
                  width: '100%',
                  backgroundColor: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    height: { xs: 60, sm: 120 },
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    margin: '1rem',
                    backgroundColor: 'white',
                  }}
                >
                  <img
                    src="/KateProfile.png"
                    alt="Kate Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', fontWeight: 600, marginTop: '1rem' }}
                >
                  Fame Kate Sagolili
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', textAlign: 'center', margin: '.50rem' }}
                >
                  “The greatest lesson would be, there’s nothing easy in life”
                </Typography>
              </Paper>
            </Box>

            {/* Profile 5: Marc Angelo Baguion */}
            <Box m={1} sx={{ width: { xs: '200px', sm: '250px' } }}>
              <Paper
                elevation={5}
                sx={{
                  height: { xs: 200, sm: 310 },
                  width: '100%',
                  backgroundColor: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    height: { xs: 60, sm: 120 },
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    margin: '1rem',
                    backgroundColor: 'white',
                  }}
                >
                  <img
                    src="/MarcProfile.png"
                    alt="Marc Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', fontWeight: 600, marginTop: '1rem' }}
                >
                  Marc Angelo Baguion
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontFamily: 'Lato', color: 'white', textAlign: 'center', margin: '.50rem' }}
                >
                  “The best project you’ll ever work on is you”
                </Typography>
              </Paper>
            </Box>
          </Box>
        </div>
       
    <Footer/>
        </div>
       
        </ThemeProvider>
            
    )
}

export default AboutUsUI;