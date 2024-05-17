import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, IconButton, Grid, Typography, Toolbar, Button, Box, ButtonGroup, Container} from '@mui/material';
import './HomePage.css'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import LearningSession from './LearningSession';
import UploadDocument from './UploadDocument';
import AboutUs from './AboutUs';
import AboutEdudeck from './AboutEdudeck';
import {Divider} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import ProfileSettings from './ProfileSettings';
import FlashcardManagement from './FlashcardManagement';
import Pricing from './Pricing';

export default function HomePage() {
    const [user, setUser] = React.useState(null);
    const [showLogin, setShowLogin] = React.useState(false);
    const [hideAppBar, setHideAppBar] = React.useState(false);
    const [isSignInView, setIsSignInView] = React.useState(false);
    const [showHometoabout, setShowHometoabout] = React.useState(true);
    const theme = createTheme({
        breakpoints: {
          values: {
            xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920,
          },
        },
      });

    const handleLoginClick = () => {
        setShowLogin(true);
        setHideAppBar(true);
        setIsSignInView(true);
        setShowHometoabout(false);
    };

    const handleSignInClick = () => {
        setShowLogin(true);
        setHideAppBar(true);
        setIsSignInView(false);
        setShowHometoabout(false);
    };

    // when button is clicked, the screen/scroll view is on the top para nice haha
    const handleButtonClick = () => {
        window.scrollTo(0,0);
      };

    // kani kay para clickable lang icons 
    const handleParagraphClick = (item) => {
        console.log(`Clicked on ${item}`);
      };


    return (
        <Router>
            <ThemeProvider theme={theme}>
            <div>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/learningsession' element={<LearningSession />} />
                    <Route path='/uploaddocument' element={<UploadDocument />} />
                    <Route path='/flashcardsmgt' element={<FlashcardManagement />} />
                    <Route path='/learningsession' element={<LearningSession/>} />
                    <Route path='/aboutus' element={<AboutUs />} />
                    <Route path='/aboutedudeck' element={<AboutEdudeck />} />
                    <Route path='/pricing' element={<Pricing />} />
                    <Route path="/login" element={<Login isSignInView={isSignInView} setIsSignInView={setIsSignInView} />} />
                    <Route path="/signup" element={<Signup handleToggle={() => setShowLogin(false)} />} />
                    <Route path='/profilesettings' element={<ProfileSettings/>} />
                    <Route
                        path="/"
                        element={
                            <div className='bd'>
                                {!hideAppBar && (
                                    <AppBar position="sticky" sx={{background: 'white'}}>
                                    <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', margin: '0 0 0 -0.7rem '}}>
                                            <Box sx={{height: { xs: '35px', sm: '52px' }, width: 'auto'}}>
                                            <img src='logo.png' alt='logo' className='logo' style={{height: '100%', width: 'auto'}} />
                                        </Box>
                                        <Typography sx={{color: "#8c7111", fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: { xs: '1.2em', sm: '1.8em' }, display: { xs: "none", sm: "block" }}}>
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
                                )}
                                {!hideAppBar && ( 
                                    <Container>
                                    <Grid container spacing={3}>
                                      <Grid item xs={12} md={6}>
                                        <Box sx={{textAlign: 'left', mt: { xs: 6, sm: 10 }, marginLeft: '5em'}}>
                                          <Typography variant="h4" sx={{color: "#8c7111", width: '90%' , fontWeight: 600, fontSize: { xs: '2.4em', sm: '2.8em' }}}>
                                            Elevating College Life for Holistic Success
                                          </Typography>
                                          <Typography variant="body1" sx={{color: "#666666", mt: 2, width: '70%'}}>
                                            Transforming Academic Journey with Integrated Flashcards, Quiz and Text Highlighting.
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <Box sx={{textAlign: 'right', mt: { xs: 6, sm: 0 }}}>
                                          <img src="/homebackgrounds.png" alt="homepagebackground" style={{ marginRight: '5em', width: '90%', height: 'auto'}}/>   
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </Container>

                                    
                                )}
                                {showHometoabout && (
                                    <>  
                                        <Container sx={{textAlign: 'center', mt: { xs: 6, sm: 10 }}}>
                                        <Typography variant="h5" sx={{color: "#666666", fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: { xs: '2em', sm: '2.4em' }}}>
                                            Excel in your courses using our latest set of study resources.
                                        </Typography>
                                        </Container>

                                        <Container sx={{textAlign: 'center', mt: { xs: 6, sm: 10 }}}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={4}>
                                            <Button sx={{backgroundColor: '#FFFEF9', width: '80%', height: '100%', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)'}} > 
                                                <img src="/document to flashcard.png" alt="Button Image" style={{ width: '50%', height: 'auto'}}/>
                                            </Button>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                            <Button sx={{backgroundColor: '#FFFEF9', width: '80%', height: '100%', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)'}} >
                                                <img src="/quizzes.png" alt="Button Image" style={{ width: '50%', height: 'auto'}}/>
                                            </Button>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                            <Button sx={{backgroundColor: '#FFFEF9', width: '80%', height: '100%', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)'}} >
                                                <img src="/ai.png" alt="Button Image" style={{ width: '50%', height: 'auto'}}/>
                                            </Button>
                                            </Grid>
                                        </Grid>
                                        </Container>

                                        <Container sx={{marginBottom: '5em', textAlign: 'center', mt: { xs: 6, sm: 10 }}}>
                                        <Button sx={{backgroundColor: '#FFD234', width: '12em', height: '2.5em', color: "#666666", boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                                        fontFamily: 'Poppins', fontWeight: 600, fontSize: { xs: '1em', sm: '1.4em' }}} variant="contained">Get Started</Button>
                                        <Typography sx={{ mt: 2, color: "#666666", fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: { xs: '2em', sm: '2.4em' }}}>
                                            Prepare yourself for the day of the test.
                                        </Typography>
                                        <Typography sx={{ mt: 1, color: "#666666", fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: { xs: '.6em', sm: '1em' }}}>
                                            Transform your PowerPoint slides into flashcards for accelerated outcomes.
                                        </Typography>
                                       </Container>
                                       <Footer/>
                                    </>
                                )}
                            </div>
                        }
                    />
                </Routes>

                {showLogin && (
                    isSignInView ? (
                        <Signup handleToggle={() => setShowLogin(false)} />
                    ) : (
                        <Login isSignInView={isSignInView} setIsSignInView={setIsSignInView} />
                    )
                )}
            </div>
        </ThemeProvider>
        </Router>
    );
}
