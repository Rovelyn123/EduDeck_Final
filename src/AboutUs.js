// import React from "react";
// import { AppBar, Toolbar, Typography, Button, Box, Grid, IconButton, Divider} from "@mui/material";
// import "./AboutAcadZen.css";
// import InstagramIcon from '@mui/icons-material/Instagram';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import LanguageIcon from '@mui/icons-material/Language';
// import { Link } from "react-router-dom";

// function AboutUs() {
    
//     // when button is clicked, the screen/scroll view is on the top para nice haha
//     const handleButtonClick = () => {
//           window.scrollTo(0,0);
//         };

//     // kani kay para clickable lang ang icons
//     const handleParagraphClick = (item) => {
//         console.log(`Clicked on ${item}`);
//       };

//     return (
//         <>
//         <div className="welcome-back-page">
//         <div className = "AboutBg">
//         <AppBar position="fixed" style={{ background: 'white' }}>
//             <Toolbar
//                 sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 }}
//             >
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <img src="/logo.png" alt="App Logo" style={{ width: 60 }} />
//                 <Typography
//                     variant="h4"
//                     sx={{
//                     fontFamily: 'Poppin, sans-serif',
//                     fontWeight: '600',
//                     fontSize: '30px',
//                     color: '#B18A00',
//                     marginLeft: '8px', // Adjust the spacing as needed
//                     }}
//                 >
//                     AcadZen
//                 </Typography>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Link to="/signup" style={{ textDecoration: 'none' }}><Button style={{ color: '#8C7111', fontWeight: 'bold' }}>Sign up</Button></Link>
//                 <Box sx={{ marginX: '8px', color: '#8C7111' }}>|</Box>
//                 <Link to="/login" style={{ textDecoration: 'none' }}><Button style={{ color: '#8C7111', fontWeight: 'bold' }}>Login</Button></Link>
//                 </div>
//             </Toolbar>
//         </AppBar>
//                 <div style={{margin: '0px 60px 0px 60px'}}>
//                     <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bolder', textAlign: 'center', marginTop: '100px'}}>
//                         Meet Team GenZen
//                     </Typography>
//                     <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '28px', textAlign: 'center', marginTop: '10px'}}>
//                         We are Team GenZen, a team of ambitious college students who developed AcadZen. We’re not just developers; <br/>we’re also students, just like you. 
//                         We understand the challenges of college life firsthand, and <br/> we’re committed to making it a little bit easier.
//                     </Typography>
//                     <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bolder', textAlign: 'center', marginTop: '60px'}}>
//                         Our Mission
//                     </Typography>
//                     <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '28px', textAlign: 'center', marginTop: '10px'}}>
//                         Our mission is to leverage our skills in technology to enhance the academic journey for ourselves and our peers. <br/>
//                         We believe in the power of technology to transform learning, and we’re dedicated to making it accessible to all students
//                     </Typography>            
//                 </div>
//         <div style={{marginTop: '60px', marginLeft: '70px'}}>
//             <Box display="flex" justifyContent="center">
//                 <Box
//                     width={320}
//                     height={400}
//                     bgcolor="#332D2D"
//                     marginRight={10}
//                     display="flex"
//                     flexDirection={"column"}
//                     alignItems="center"
//                     justifyContent="center"
//                     color="#fff"
//                     fontWeight="bold"
//                     borderRadius={2}
//                     boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
//                 >
//                     <Box
//                     width="200px"
//                     height="200px"
//                     bgcolor="white" 
//                     borderRadius="50%"
//                     overflow="hidden"
//                     objectFit={"cover"}
//                     display={"flex"}
//                     justifyContent={"flex-start"}
//                     marginTop={"-20px"}
//                 >
                
//                 <img src="./KarymeProfile.png" alt="Karyme Profile"
//                 style={{ width: '200px', height: '200px'}}
//                 />
//                 </Box>
//                 <Typography variant="body1" style={{ fontFamily: 'Numans', fontSize: '22px', marginTop: '20px'}}>
//                     Karyme Fatima Crisologo
//                 </Typography>
//                 <Typography variant="body1" style={{ fontFamily: 'Oleo Script', fontSize: '20px', margin: '15px 30px 0px 30px', textAlign: 'center'}}>
//                     “The best project you’ll ever work on is you”
//                 </Typography>

//                 </Box>

//                 <Box
//                     width={320}
//                     height={400}
//                     bgcolor="#332D2D"
//                     marginRight={10}
//                     display="flex"
//                     flexDirection={"column"}
//                     alignItems="center"
//                     justifyContent="center"
//                     color="#fff"
//                     fontWeight="bold"
//                     borderRadius={2}
//                     boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
//                 >
//                     <Box
//                     width="200px"
//                     height="200px"
//                     bgcolor="white" 
//                     borderRadius="50%"
//                     overflow="hidden"
//                     objectFit={"cover"}
//                     display={"flex"}
//                     justifyContent={"flex-start"}
//                     marginTop={"-20px"}
//                 >
                
//                 <img src="./RovelynProfile.png" alt="Rovelyn Profile"
//                 style={{ width: '200px', height: '200px'}}
//                 />
//                 </Box>
//                 <Typography variant="body1" style={{ fontFamily: 'Numans', fontSize: '22px', marginTop: '20px'}}>
//                     Rovelyn Aguinaldo
//                 </Typography>
//                 <Typography variant="body1" style={{ fontFamily: 'Oleo Script', fontSize: '20px', margin: '15px 30px 0px 30px', textAlign: 'center'}}>
//                     “Do what makes your <br/> soul shine”
//                 </Typography>

//                 </Box>

//                 <Box
//                     width={320}
//                     height={400}
//                     bgcolor="#332D2D"
//                     marginRight={10}
//                     display="flex"
//                     flexDirection={"column"}
//                     alignItems="center"
//                     justifyContent="center"
//                     color="#fff"
//                     fontWeight="bold"
//                     borderRadius={2}
//                     boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
//                 >
//                     <Box
//                     width="200px"
//                     height="200px"
//                     bgcolor="white" 
//                     borderRadius="50%"
//                     overflow="hidden"
//                     objectFit={"cover"}
//                     display={"flex"}
//                     justifyContent={"flex-start"}
//                     marginTop={"-20px"}
//                 >
                
//                 <img src="./JoshuaProfile.png" alt="Joshua Profile"
//                 style={{ width: '200px', height: '200px'}}
//                 />
//                 </Box>
//                 <Typography variant="body1" style={{ fontFamily: 'Numans', fontSize: '22px', marginTop: '20px'}}>
//                     Joshua Biong
//                 </Typography>
//                 <Typography variant="body1" style={{ fontFamily: 'Oleo Script', fontSize: '20px', margin: '15px 30px 0px 30px', textAlign: 'center'}}>
//                     “Take those risk, it will be <br/> worth it”
//                 </Typography>

//                 </Box>

//                 <Box
//                     width={320}
//                     height={400}
//                     bgcolor="#332D2D"
//                     marginRight={10}
//                     display="flex"
//                     flexDirection={"column"}
//                     alignItems="center"
//                     justifyContent="center"
//                     color="#fff"
//                     fontWeight="bold"
//                     borderRadius={2}
//                     boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
//                 >
//                     <Box
//                     width="200px"
//                     height="200px"
//                     bgcolor="white" 
//                     borderRadius="50%"
//                     overflow="hidden"
//                     objectFit={"cover"}
//                     display={"flex"}
//                     justifyContent={"flex-start"}
//                     marginTop={"-50px"}
//                 >
                
//                 <img src="./KerchProfile.png" alt="Kerch Profile"
//                 style={{ width: '200px', height: '200px'}}
//                 />
//                 </Box>
//                 <Typography variant="body1" style={{ fontFamily: 'Numans', fontSize: '22px', marginTop: '20px'}}>
//                     Kerch Cabo
//                 </Typography>
//                 <Typography variant="body1" style={{ fontFamily: 'Oleo Script', fontSize: '20px', margin: '15px 30px 0px 30px', textAlign: 'center'}}>
//                     “Just trust the process”
//                 </Typography>

//                 </Box>

//             </Box>
//         </div>
//         </div>

//         <div className="AppInfo">
//              <div className="grid-item">
//                 <h2>About</h2>
//                 <Link to="/aboutus"><Button onClick={handleButtonClick}>About us</Button></Link>
//                 <Link to="/aboutacadzen"><Button onClick={handleButtonClick}>About AcadZen</Button></Link>
//                 <Button>Get the app</Button>
//             </div>

//             <div className="grid-item">
//                 <h2>For Students</h2>
//                 <Button>Flashcards</Button>
//                 <Button>Quiz</Button>
//                 <Button>Learn</Button>
//             </div>

//             <div className="grid-item">
//                 <h2>Resources</h2>
//                 <Button>Terms</Button>
//                 <Button>Guidelines</Button>
//                 <Button>Honor code</Button>
//             </div>
//          </div>

//         <div className="footer">
//             <Divider style={{ marginBottom: '16px', backgroundColor: '#C8C8C8' }} />
//             <Grid container spacing={4} justifyContent="center">
//             <Grid item>
//                 <IconButton onClick={() => handleParagraphClick('Icon 1')}>
//                 <InstagramIcon style={{fontSize: '60px', color: 'black'}}/>
//                 </IconButton>
//             </Grid>
//             <Grid item>
//                 <IconButton onClick={() => handleParagraphClick('Icon 2')}>
//                 <FacebookIcon style={{fontSize: '60px', color: 'black'}} />
//                 </IconButton>
//             </Grid>
//             <Grid item>
//                 <IconButton onClick={() => handleParagraphClick('Icon 3')}>
//                 <TwitterIcon style={{fontSize: '60px', color: 'black'}} />
//                 </IconButton>
//             </Grid>
//             </Grid>
//                 <Typography variant="h6" mt={2}>
//                     Privacy Policy &nbsp; | &nbsp; Cookie Policy &nbsp; | &nbsp; Legal Notice &nbsp; | &nbsp; Accessibility Policy &nbsp; | &nbsp; Cookie Settings
//                 </Typography>
//                 <Typography variant="body2" mt={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//                     <LanguageIcon style={{ marginRight: '6px' }} />
//                     <strong>Philippines - English</strong>
//                 </Typography>
//                 <Typography variant="body2" mt={2}>
//                     © 2023 AcadZen Inc.
//                 </Typography>
//         </div>
//         </div>
//         </>
//     );
// }

// export default AboutUs;


import React from 'react'
import { AppBar, Paper, Typography, Toolbar, Button, Box, ButtonGroup} from '@mui/material'
import './AboutUs.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function AboutUs() {

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

            <AppBar position="sticky" sx={{background: 'white'}}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Link to="/" style={{textDecoration: 'none'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', margin: '0 0 0 -0.7rem '}}>
                        <Box sx={{height: { xs: '35px', sm: '52px' }, width: 'auto'}}>
                        <img src='logo.png' alt='logo' className='logo' style={{height: '100%', width: 'auto'}} />
                    </Box>
                    <Typography sx={{color: "#8c7111", fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: { xs: '1.2em', sm: '1.8em' }, display: { xs: "none", sm: "block" }}}>
                        EduDeck
                    </Typography>
                    </Box>
                    </Link>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <ButtonGroup color="secondary" variant="text" aria-label="Button group">
                        <Link to="/signup" style={{ textDecoration: 'none' }}><Button sx={{color: '#8C7111', fontWeight: 'bold', fontSize: { xs: '0.8em', sm: '1em' }}}>Signup</Button></Link>
                        <Link to="/Login" style={{ textDecoration: 'none' }}>   <Button sx={{color: '#8C7111', fontWeight: 'bold', fontSize: { xs: '0.8em', sm: '1em' }}}>Login</Button></Link>
                    </ButtonGroup>
                    </Box>
                </Toolbar>
            </AppBar>
        <div>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '1.5rem'}}>
                    <Typography gutterBottom sx={{color: 'black', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 800, fontSize: { xs: '1rem', sm: '2rem' }}}>
                        Meet Team DinoSure
                    </Typography>
                    <Typography m={2} sx={{color: 'black', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600, textAlign: 'center', fontSize: { xs: '0.8rem', sm: '1.5rem' }}}>
                        We are Team DinoSure, a team of ambitious college students who developed EduDeck. We’re not just developers; <br/>we’re also students, just like you. 
                        We understand the challenges of college life firsthand, and <br/> we’re committed to making it a little bit easier.
                    </Typography>
                    <Typography mt={2} gutterBottom sx={{color: 'black', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 800, fontSize: { xs: '1rem', sm: '2rem' }}}>
                        Our Mission
                    </Typography>
                    <Typography m={2} sx={{color: 'black', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600, textAlign: 'center', fontSize: { xs: '0.8rem', sm: '1.5rem' }}}>
                        Our mission is to leverage our skills in technology to enhance the academic journey for ourselves and our peers. <br/>
                        We believe in the power of technology to transform learning, and we’re dedicated to making it accessible to all students
                    </Typography>
                </Box>

                <Box display="flex" flexWrap="wrap" justifyContent={{ xs: 'center', sm: 'flex-start' }} sx={{ marginLeft: { xs: '10px', sm: '70px' }, marginRight: { xs: '10px', sm: '50px' } }}>
                <Box m={1} sx={{ width: { xs: 'auto', sm: '250px' }, display: { xs: "block", sm: "flex" } }}>
                    <Paper elevation={5} sx={{ height: { xs: 200, sm: 310 }, width: { xs: 300, sm: 280 }, backgroundColor: 'black', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <Box sx={{height: { xs: 60, sm: 120 }, display: 'flex', borderRadius: '50%', alignItems: 'center', margin: '1rem', backgroundColor: 'white'}}>
                            <img src="/KarymeProfile.png" alt="Karyme Profile" style={{ width: '100%', height: '100%', objectFit: 'cover'}} />
                        </Box>
                        <Typography variant="body1" style={{ fontFamily: 'Numans', color: 'white', fontWeight: 600, marginTop: '1rem'}}>
                            Karyme Fatima Crisologo
                        </Typography>
                        <Typography variant="body1" style={{ fontFamily: 'Oleo Script', color: 'white', textAlign: 'center', margin: '.50rem'}}>
                            “The best project you’ll ever work on is you”
                        </Typography>
                    </Paper>
                </Box>
                <Box m={1} sx={{ width: { xs: 'auto', sm: '250px' }, display: { xs: "block", sm: "flex" } }}>
                    <Paper elevation={5} sx={{ height: { xs: 200, sm: 310 }, width: { xs: 300, sm: 280 }, backgroundColor: 'black', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <Box sx={{height: { xs: 60, sm: 120 }, display: 'flex', borderRadius: '50%', alignItems: 'center', margin: '1rem', backgroundColor: 'white'}}>
                            <img src="/RovelynProfile.png" alt="Rovelyn Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Typography variant="body1" style={{ fontFamily: 'Numans', color: 'white', fontWeight: 600, marginTop: '1rem'}}>
                            Rovelyn Aguinaldo
                        </Typography>
                        <Typography variant="body1" style={{ fontFamily: 'Oleo Script', color: 'white', textAlign: 'center', margin: '.50rem'}}>
                            “Do what makes your <br/> soul shine”
                        </Typography>
                    </Paper>
                </Box>
                <Box m={1} sx={{ width: { xs: 'auto', sm: '250px' }, display: { xs: "block", sm: "flex" } }}>
                    <Paper elevation={5} sx={{ height: { xs: 200, sm: 310 }, width: { xs: 300, sm: 280 }, backgroundColor: 'black', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <Box sx={{height: { xs: 60, sm: 120 }, display: 'flex', borderRadius: '50%', alignItems: 'center', margin: '1rem', backgroundColor: 'white'}}>
                            <img src="/KerchProfile.png" alt="Kerch Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Typography variant="body1" style={{ fontFamily: 'Numans', color: 'white', fontWeight: 600, marginTop: '1rem'}}>
                            Kerch Cabo
                        </Typography>
                        <Typography variant="body1" style={{ fontFamily: 'Oleo Script', color: 'white', textAlign: 'center', margin: '.50rem'}}>
                            “Just trust the process”
                        </Typography>
                    </Paper>
                </Box>
                <Box m={1} sx={{ width: { xs: 'auto', sm: '250px' }, display: { xs: "block", sm: "flex" } }}>
                    <Paper elevation={5} sx={{ height: { xs: 200, sm: 310 }, width: { xs: 300, sm: 280 }, backgroundColor: 'black', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <Box sx={{height: { xs: 60, sm: 120 }, display: 'flex', borderRadius: '50%', alignItems: 'center', margin: '1rem', backgroundColor: 'white'}}>
                            <img src="/KateProfile.png" alt="Kate Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Typography variant="body1" style={{ fontFamily: 'Numans', color: 'white', fontWeight: 600, marginTop: '1rem'}}>
                            Fame Kate Sagolili
                        </Typography>
                        <Typography variant="body1" style={{ fontFamily: 'Oleo Script', color: 'white', textAlign: 'center', margin: '.50rem'}}>
                            “The greatest lesson would be, there's nothing easy in life”
                        </Typography>
                    </Paper>
                </Box>
                <Box m={1} sx={{ width: { xs: 'auto', sm: '250px' }, display: { xs: "block", sm: "flex" } }}>
                    <Paper elevation={5} sx={{ height: { xs: 200, sm: 310 }, width: { xs: 300, sm: 280 }, backgroundColor: 'black', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <Box sx={{height: { xs: 60, sm: 120 }, display: 'flex', borderRadius: '50%', alignItems: 'center', margin: '1rem', backgroundColor: 'white'}}>
                            <img src="/MarcProfile.png" alt="Marc Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Typography variant="body1" style={{ fontFamily: 'Numans', color: 'white', fontWeight: 600, marginTop: '1rem'}}>
                            Marc Angelo Baguion
                        </Typography>
                        <Typography variant="body1" style={{ fontFamily: 'Oleo Script', color: 'white', textAlign: 'center', margin: '.50rem'}}>
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

export default AboutUs;