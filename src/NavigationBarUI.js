import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Drawer, useMediaQuery, useTheme, Divider, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from "react-router-dom";
import '@fontsource/lato';
import axios from "axios";

function NavigationBarUI() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem('userid');
  const [subscription, setSubscription] = useState('Free Plan');
  const [email, setEmail] = useState('');
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleButtonClick = (buttonName) => {
    setClicked(buttonName === clicked ? null : buttonName);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  //Subscription Fetch
    const fetchEmail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/getEmail/${userId}`);
            setEmail(response.data); // Set the email from the response
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };

    useEffect(() => {
        fetchEmail();
    }, [userId]);

    const fetchSubscription = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/subscription`, {
                email: email // Send the email in the request body
            });
            console.log('Subscription response:', response.data); // Log the response data

            if (response.data.active) {
                setSubscription('EduDeck Plus');
            } else {
                setSubscription('Free Plan');
            }
        } catch (error) {
            console.error('Error fetching subscription:', error);
            // Optionally handle error state
        }
    };

    useEffect(() => {
        if (email) {
            fetchSubscription();
        }
    }, [email]);






    const drawerContent = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 0,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Box sx={{ width: '100%', height: '90%', overflowY: 'auto', paddingBottom: '5em' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
          <img src="/logo.png" alt="logo" style={{ height: 50 }} />
            <Typography
                variant="h3"
                style={{
                    marginRight: '.5em',
                    fontFamily: 'Lato',
                    fontWeight: '900',
                    fontSize: '2em',
                    color: '#B18A00',
                }}
            >
                EduDeck {subscription === 'EduDeck Plus' && (
                <sup style={{ color: 'black', fontSize: '0.5em' }}>Plus</sup>
            )}
            </Typography>

        </Box>
        <Divider style={{ marginLeft: '1em', backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
        <Grid container spacing={1} sx={{ paddingTop: 2 }}>
          <Grid item xs={12}>
            <Button component={Link}
            to="/dashboard"
              style={{
                backgroundColor: clicked === 'overview' ? '#FFEAA0' : 'transparent',
                width: '100%',
                boxShadow: clicked === 'overview' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              // onClick={() => handleButtonClick('overview')}
            >
              <img src="/overview.png" alt="overview" style={{ height: 25, marginLeft: '1.2em' }} />
              <Typography style={{ color: 'black', fontFamily: 'Lato', fontSize: '1.1em', textTransform: 'none', flexGrow: 1, marginLeft: '2em' }}>
                Overview
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button component={Link}
            to="/uploaddocument"
              style={{
                backgroundColor: clicked === 'document to flashcards' ? '#FFEAA0' : 'transparent',
                width: '100%',
                boxShadow: clicked === 'document to flashcards' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onClick={() => handleButtonClick('document to flashcards')}
            >
              <img src="/convert.png" alt="convert icon" style={{ height: 20, marginLeft: '1.3em'  }} />
              <Typography style={{ color: 'black', fontFamily: 'Lato', fontSize: '1.1em', textTransform: 'none', flexGrow: 1, marginLeft: '2em' }}>
                Document to Flashcards
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button component={Link}
            to="/flashcardsmgt"
              style={{
                backgroundColor: clicked === 'downloads' ? '#FFEAA0' : 'transparent',
                width: '100%',
                boxShadow: clicked === 'downloads' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              // onClick={() => handleButtonClick('downloads')}
            >
              <img src="/downloads.png" alt="downloads" style={{ height: 15, marginLeft: '1.3em' }} />
              <Typography style={{ color: 'black', fontFamily: 'Lato', fontSize: '1.1em', textTransform: 'none', flexGrow: 1, marginLeft: '2em' }}>
                Flashcards
              </Typography>
            </Button>
          </Grid>
          {/* <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: clicked === 'quiz' ? '#FFEAA0' : 'transparent',
                width: '100%',
                boxShadow: clicked === 'quiz' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onClick={() => handleButtonClick('quiz')}
            >
              <img src="/quiz.png" alt="Quiz icon" style={{ height: 23, marginLeft: '1.4em' }} />
              <Typography style={{ color: 'black', fontFamily: 'Roboto', fontSize: '1.1em', textTransform: 'none', flexGrow: 1 }}>
                Quiz
              </Typography>
            </Button>
          </Grid> */}
          <Grid item xs={12}>
              <Button
                  style={{
                      backgroundColor: clicked === 'pricing' ? '#FFEAA0' : 'transparent',
                      width: '100%',
                      boxShadow: clicked === 'pricing' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                      marginBottom: 2,
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      padding: '0.5em 1em', // Add padding for better alignment
                      textAlign: 'left' // Ensure text is aligned left
                  }}
                  onClick={() => {
                      window.open('/pricing', '_blank');
                      handleButtonClick('pricing');
                  }}
              >
                  <img src="/pricing.png" alt="pricing" style={{ height: 25, marginRight: '1em' }} />
                  <Typography
                      style={{
                          color: 'black',
                          fontFamily: 'Lato',
                          fontSize: '1.1em',
                          textTransform: 'none',
                          flexGrow: 1,
                          marginLeft: '0.5em', // Adjust spacing between the image and text
                      }}
                  >
                      Subscription
                  </Typography>
              </Button>

          </Grid>
          <Grid item xs={12}>
            <Button component={Link}
            to="/profilesettings"
              style={{
                backgroundColor: clicked === 'settings' ? '#FFEAA0' : 'transparent',
                width: '100%',
                boxShadow: clicked === 'settings' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              // onClick={() => handleButtonClick('settings')}
            >
              <img src="/settings.png" alt="settings icon" style={{ height: 20, marginLeft: '1.3em' }} />
              <Typography style={{ color: 'black', fontFamily: 'Lato', fontSize: '1.1em', textTransform: 'none', flexGrow: 1, marginLeft: '2em' }}>
                Settings
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button component={Link}
              to="/logout"
              style={{
                width: '100%',
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onClick={handleLogout}  // Assuming `handleLogout` is implemented
            >
              <img src="/logout.png" alt="logout icon" style={{ height: 20, marginLeft: '1.3em' }} />
              <Typography style={{ color: 'black', fontFamily: 'Lato', fontSize: '1.1em', textTransform: 'none', flexGrow: 1, marginLeft: '2em' }}>
                Logout
              </Typography>
              {/* <button className="logout-button" onClick={handleLogout}><FaSignOutAlt /> Logout</button> */}
            </Button>
          </Grid>
        </Grid>
        <Divider style={{ marginLeft: '1em', backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
        <Box
          sx={{
            backgroundColor: '#F3F3F3',
            width: '70%',
            height: 'auto',
            marginTop: 2,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.25)',
            padding: '1em',
            marginLeft: '8%'
          }}
        >
          <Typography
            style={{
              fontFamily: 'Lato',
              fontSize: 12,
              color: 'black',
              margin: "0px 2px 5px 2px",
              textAlign: 'center',
            }}
          >
            Encountering problems with our service? Reach out to our customer support team for assistance.
          </Typography>
          <Button component={Link}
          to="/aboutus"
          style={{ backgroundColor: '#FFD234', width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
            <Typography style={{ color: 'black', fontFamily: 'Lato', fontSize: '1em', textTransform: 'none' }}>
              Contact Us
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <div style={{backgroundImage: 'url(/crystalbackground.png)', minHeight: '100vh', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: -1}}>
            <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} />
            {!isMobile && (
                <Typography
                    variant="h3"
                    style={{
                        marginRight: '.5em',
                        fontFamily: 'Lato',
                        fontWeight: '900',
                        fontSize: '2em',
                        color: '#B18A00',
                    }}
                >
                    EduDeck {subscription === 'EduDeck Plus' && (
                    <sup style={{ color: 'black', fontSize: '0.5em' }}>Plus</sup>
                )}
                </Typography>

            )}
          </Box>
          
        </Box>
        {isMobile && (
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{ zIndex: 100 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        {isMobile && (
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            transitionDuration={{ enter: 500, exit: 500 }}
            SlideProps={{ direction: "right" }}
            PaperProps={{ style: { backgroundColor: 'white', width: '50%', height: '100%' } }}
          >
            {drawerContent}
          </Drawer>
        )}
        {!isMobile && (
          <Box sx={{ width: {xs: 110, sm: 240}, height: {xs: '80vh', sm: '100vh'}, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
            <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: '30%'}} />
            <Grid container>

            <Button component={Link}
            to="/dashboard"
              style={{backgroundColor: clicked === 'overview' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'overview' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: '3%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('overview')}
            >
              <img src="/overview.png" alt="overview" style={{height: '80%', marginRight: '.5em'}} />
              <Typography style={{color: 'black', fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', textTransform: 'none', flexGrow: 1}}>
                Overview
              </Typography>
            </Button>

            <Button component={Link}
            to="/uploaddocument"
              style={{backgroundColor: clicked === 'document to flashcards' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'document to flashcards' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: '3%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('document to flashcards')}
            >
            <img src="/convert.png" alt="convert icon" style={{height: '80%', marginRight: '.6em'}} />
              <Typography style={{color: 'black', fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', textTransform: 'none', flexGrow: 1}}>
              Document to Flashcards
              </Typography>
            </Button>

            <Button 
            component={Link}
            to="/flashcardsmgt"
              style={{backgroundColor: clicked === 'downloads' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'downloads' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: '3%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('downloads')}
            >
              <img src="/downloads.png" alt="downloads" style={{height: '70%', marginRight: '.5em'}} />
              <Typography style={{color: 'black', fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', textTransform: 'none', flexGrow: 1}}>
                Flashcards
              </Typography>
            </Button>

            {/* <Button  component={Link}
            to="/quiz"
              style={{backgroundColor: clicked === 'quiz' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'quiz' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: '3%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('quiz')}
            >
            <img src="/quiz.png" alt="Quiz icon" style={{height: '90%', marginRight: '.5em'}} />
              <Typography style={{color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '15px', textTransform: 'none', flexGrow: 1}}>
              Quiz
              </Typography>
            </Button> */}

            <Button component={Link} to="/pricing"
              style={{backgroundColor: clicked === 'pricing' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'pricing' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: '3%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
                    onClick={() => {
                        window.open('/pricing', '_blank');
                        handleButtonClick('pricing');
                    }}
            >
              <img src="/pricing.png" alt="pricing" style={{height: '100%', marginRight: '.5em'}} />
              <Typography style={{color: 'black', fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', textTransform: 'none', flexGrow: 1}}>
                Subscription
              </Typography>
            </Button>

            <Button component={Link}
            to="/profilesettings"
              style={{backgroundColor: clicked === 'settings' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'settings' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: '3%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('settings')}
            >
            <img src="/settings.png" alt="settings icon" style={{height: '100%', marginRight: '.5em'}} />
              <Typography style={{color: 'black', fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', textTransform: 'none', flexGrow: 1}}>
              Settings
              </Typography>
            </Button>
            <Button
              style={{width: '100%', marginBottom: '3%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={handleLogout}  // Assuming `handleLogout` is implemented
            >
              <img src="/logout.png" alt="logout icon" style={{height: '100%', marginRight: '.5em'}} />
              <Typography style={{color: 'black', fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', textTransform: 'none', flexGrow: 1, marginRight: '9.5em'}}>
                Logout
              </Typography>
              {/* <FaSignOutAlt /> Logout */}
            </Button>
            </Grid>

            <Divider style={{ backgroundColor: '#BCA860', width: '80%'}} />

            <Box style={{backgroundColor: '#F3F3F3', height: '26%', width: "90%", marginBottom: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.25)', justifyContent: 'center', borderRadius: '8px',
            }}>
              <Typography style={{fontFamily: 'Lato', fontSize: '15px', fontWeight: 500, color: 'black', padding: '2px', textAlign: 'center'}}>
                Encountering problems with our service? Reach out to our customer support team for assistance.
              </Typography>
            <Button component={Link}
            to="/aboutus"
            style={{backgroundColor: '#FFD234', width: '90%', height: '25%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                <Typography style={{color: 'black', fontFamily: 'Lato', fontWeight: 600, fontSize: '20px', textTransform: 'none'}}>
                  Contact Us
                </Typography>
              </Button>
            </Box>
            
          </Box>
        )}
      </div>
    </>
  );
}

export default NavigationBarUI;
