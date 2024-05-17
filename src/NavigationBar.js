import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Drawer, useMediaQuery, useTheme, Divider, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from "react-router-dom";


function NavigationBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [clicked, setClicked] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

    const handleButtonClick = (buttonName) => {
        setClicked(buttonName); 
    };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };


//// sa mobile view ni need pa i adjust
  const drawerContent = (
    <Box
      sx={{
        width: { xs: 110, sm: 230 },
        height: { xs: '80vh', sm: '100vh' },
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 0,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          overflowY: 'auto',
          paddingBottom: '5rem',
        }}
      >
        <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
        <Grid container spacing={1} sx={{ paddingTop: 2 }}>
          <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: clicked === 'overview' ? '#FFEAA0' : 'transparent',
                width: '100%',
                boxShadow: clicked === 'overview' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onClick={() => handleButtonClick('overview')}
            >
              <img src="/overview.png" alt="overview" style={{ height: 35, marginRight: 0 }} />
              <Typography style={{ color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1 }}>
                Overview
              </Typography>
            </Button>
          </Grid>
  
          {/* Add similar Button components for other items */}
          <Grid item xs={12}>
            <Button
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
              <img src="/convert.png" alt="convert icon" style={{ height: 25, marginRight: 0 }} />
              <Typography style={{ color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1 }}>
                Document to Flashcards
              </Typography>
            </Button>
          </Grid>
  
          {/* Add similar Button components for other items */}
          <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: clicked === 'downloads' ? '#FFEAA0' : 'transparent',
                width: '100%',
                boxShadow: clicked === 'downloads' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              onClick={() => handleButtonClick('downloads')}
            >
              <img src="/downloads.png" alt="downloads" style={{ height: 20, marginRight: 0 }} />
              <Typography style={{ color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1 }}>
                Downloads
              </Typography>
            </Button>
          </Grid>

          <Grid item xs={12}>
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
              <img src="/quiz.png" alt="Quiz icon" style={{ height: 30, marginRight: 0 }} />
              <Typography style={{ color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1 }}>
                Quiz
              </Typography>
            </Button>
          </Grid>
         
  
        </Grid>
      </Box>
    </Box>
  );
  

  return (
    <>
      {/* <div style={{backgroundImage: 'url(/crystalbackground.png)', minHeight: '100vh', overflow: 'hidden' }}> */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: -1}}>
            <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} />
            {!isMobile && (
              <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00', ml: 1 }}>
                EduDeck
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
            PaperProps={{ style: { backgroundColor: 'transparent', height: '60vh', top: '12vh' } }}
            BackdropProps={{ invisible: true }}
          >
            {drawerContent}
          </Drawer>
        )}
        {!isMobile && (
          <Box sx={{ width: {xs: 110, sm: 240}, height: {xs: '80vh', sm: '100vh'}, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
            <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 80}} />
            <Grid container>
            <Button
            component={Link}
            to="/dashboard"
              style={{backgroundColor: location.pathname === '/dashboard' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: location.pathname === '/dashboard' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('dashboard')}
            >
              <img src="/overview.png" alt="dashboard" style={{height: 35, marginRight: 40}} />
              <Typography style={{color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1}}>
                Overview
              </Typography>
            </Button>

            <Button
            component={Link}
            to="/uploaddocument"
              style={{backgroundColor: clicked === 'document to flashcards' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'document to flashcards' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('document to flashcards')}
            >
            <img src="/convert.png" alt="convert icon" style={{height: 25, marginRight: 50}} />
              <Typography style={{color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1}}>
              Document to Flashcards
              </Typography>
            </Button>

            <Button
              style={{backgroundColor: clicked === 'downloads' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'downloads' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('downloads')}
            >
              <img src="/downloads.png" alt="downloads" style={{height: 20, marginRight: -10}} />
              <Typography style={{color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1}}>
                Downloads
              </Typography>
            </Button>

            <Button
            component={Link}
            to="/quiz"
              style={{backgroundColor: location.pathname === '/quiz' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: location.pathname === '/quiz' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('quiz')}
            >
            <img src="/quiz.png" alt="Quiz icon" style={{height: 30, marginRight: 49}} />
              <Typography style={{color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1}}>
              Quiz
              </Typography>
            </Button>

            <Button
            component={Link}
            to="/pricing"
              style={{backgroundColor: location.pathname === '/pricing' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: location.pathname === '/pricing' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('pricing')}
            >
              <img src="/pricing.png" alt="pricing" style={{height: 35, marginRight: 42}} />
              <Typography style={{color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1}}>
                Pricing
              </Typography>
            </Button>

            <Button
            component={Link}
            to="/profilesettings"
              style={{backgroundColor: location.pathname === '/profilesettings' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: location.pathname === '/profilesettings' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
              onClick={() => handleButtonClick('profilesettings')}
            >
            <img src="/settings.png" alt="settings icon" style={{height: 28, marginRight: 48}} />
              <Typography style={{color: 'black', fontFamily: 'Roboto', fontWeight: 300, fontSize: '1.3em', textTransform: 'none', flexGrow: 1}}>
              Settings
              </Typography>
            </Button>
            </Grid>

            <Divider style={{ backgroundColor: '#BCA860', width: '80%'}} />

            <Box style={{backgroundColor: '#F3F3F3', height: '26%', width: "90%", marginBottom: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.25)', justifyContent: 'center'
            }}>
              <Typography style={{fontFamily: 'Roboto Condensed', fontSize: 17, fontWeight: 500, color: 'black', margin: "5px 2px 20px 2px" , textAlign: 'center'}}>
                Encountering problems with our service? Reach out to our customer support team for assistance.
              </Typography>
            <Button style={{backgroundColor: '#FFD234', width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                <Typography style={{color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '1.5em', textTransform: 'none'}}>
                  Contact Us
                </Typography>
              </Button>
            </Box>
            
          </Box>
        )}
      {/* </div> */}
    </>
  );
}

export default NavigationBar;