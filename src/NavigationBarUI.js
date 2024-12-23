import React, {useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
    Typography,
    Drawer,
    useMediaQuery,
    useTheme,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton'; // Keep only one import for IconButton
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from "react-router-dom";
import '@fontsource/lato';
import axios from "axios";

// Import the Stepper component
import NavBarStepperUI from './NavBarStepperUI';
import BASE_URL from "./config";

// Remove the import for CloseIcon
// import CloseIcon from '@mui/icons-material/CloseIcon';

function NavigationBarUI() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [clicked, setClicked] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [openStepper, setOpenStepper] = useState(false); // State for stepper dialog
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

    const handleUserGuideClick = () => {
        setOpenStepper(true); // Open the stepper dialog
    };

    const handleStepperClose = () => {
        setOpenStepper(false); // Close the stepper dialog
    };

    //Subscription Fetch
    const fetchEmail = async () => {

        try {
            const response = await axios.get(`${BASE_URL}/user/getEmail/${userId}`);
            setEmail(response.data); // Set the email from the response
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };
    // Fetch email when the component mounts
    useEffect(() => {
        fetchEmail();
    }, [userId]);

    const fetchSubscription = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/subscription`, {
                email: email // Send the email in the request body
            });


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
                <Box sx={{ display: 'flex', padding: 1 }}>
                    <img src="/logo.png" alt="logo" style={{ height: 60,marginTop:'5px' }} />
                    <Typography
                        variant="h3"
                        style={{
                            marginTop: '.5em',
                            marginRight: '.5em',
                            fontFamily: 'Lato',
                            fontWeight: '900',
                            fontSize: '1.5em',
                            color: '#B18A00'
                        }}>
                        EduDeck {subscription === 'EduDeck Plus' ? (
                        <sup style={{ color: 'black', fontSize: '0.5em' }}>Plus</sup>
                    ) : (
                        <sup style={{ fontSize: '0.5em', color: '#888' }}>Free</sup>
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
                                marginBottom: '6%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                textAlign: 'left' // Ensure text is aligned left
                            }}
                                onClick={() => {
                                    window.open('/pricing', '_blank');
                                    handleButtonClick('pricing');
                                }}

                        >
                            <img src="/pricing.png" alt="pricing" style={{ height: 25, marginLeft: '1.3em' }} />
                            <Typography style={{ color: 'black', fontFamily: 'Lato',  fontSize: '1.1em', textTransform: 'none', flexGrow: 1, marginLeft: '2em' }}>
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

            </Box>
        </Box>
    );

    return (
        <>
            <div style={{backgroundImage: 'url(/crystalbackground.png)', minHeight: '100vh', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: -1}}>
                        <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50, marginTop:'5px', marginLeft:'5px',marginBottom:'-5px'}} />
                        {!isMobile && (
                            <Typography
                                variant="h3"
                                style={{
                                    marginRight: '.5em',
                                    fontFamily: 'Lato',
                                    fontWeight: '900',
                                    fontSize: '2em',
                                    color: '#B18A00'
                                }}>
                                EduDeck {subscription === 'EduDeck Plus' ? (
                                <sup style={{ color: 'black', fontSize: '0.5em' }}>Plus</sup>
                            ) : (
                                <sup style={{ fontSize: '0.5em', color: '#888' }}>Free</sup>
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
                    <Box sx={{ width: {xs: 110, sm: 240}, height: {xs: '80vh', sm: '100.5vh'}, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-54px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                        <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: '30%'}} />
                        <Grid container>

                            <Button component={Link}
                                    to="/dashboard"
                                    style={{backgroundColor: clicked === 'overview' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'overview' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginTop: '3%', marginBottom: '5%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
                                    onClick={() => handleButtonClick('overview')}
                            >
                                <img src="/overview.png" alt="overview" style={{height: '80%', marginRight: '.5em'}} />
                                <Typography style={{ color: 'black', fontFamily: 'Lato', fontWeight: 300, fontSize: '15px', textTransform: 'none', flexGrow: 1}}>
                                    Overview
                                </Typography>
                            </Button>

                            <Button component={Link}
                                    to="/uploaddocument"
                                    style={{backgroundColor: clicked === 'document to flashcards' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'document to flashcards' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: '6%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
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
                                style={{backgroundColor: clicked === 'downloads' ? '#FFEAA0' : 'transparent', width: '100%', boxShadow: clicked === 'downloads' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none', marginBottom: '6%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}
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

                            <Button
                                style={{
                                    backgroundColor: clicked === 'pricing' ? '#FFEAA0' : 'transparent',
                                    width: '100%',
                                    boxShadow: clicked === 'pricing' ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                                    marginBottom: '6%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textAlign: 'left' // Ensure text is aligned left
                                }}
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
                        <Button
                            sx={{
                                width: { xs: 220 },
                                height: { xs: '5vh', sm: '5.5vh' },
                                backgroundColor: '#FAC712',
                                color: 'black',
                                borderRadius: '5px',
                                marginTop: 'auto',
                                marginBottom: '1em',
                                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                '&:hover': { backgroundColor: '#FAC712' }  // Remove hover effect
                            }}
                            onClick={handleUserGuideClick}
                        >
                            User Guide
                        </Button>
                    </Box>

                )}


                {/* Stepper Dialog */}
                <Dialog open={openStepper} onClose={handleStepperClose} fullWidth maxWidth="lg">
                            <DialogTitle>
                                User Guide
                                <IconButton
                                    aria-label="close"
                                    onClick={handleStepperClose}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <NavBarStepperUI />
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>

            </div>
        </>
    );
}

export default NavigationBarUI;