import React, {useState, useEffect, useRef} from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions,Toolbar, Typography, Button, Box, IconButton, ThemeProvider, Grid, Backdrop } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from "@mui/icons-material";
import { createTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import PurchasePopout from './PurchasePopout';
import InfoStripePopOut from "./InfoStripePopOut";
import '@fontsource/lato';
import axios from 'axios';
import BASE_URL from "./config";

function PricingUI() {
    const [settingClicked, setSettingClicked] = useState(false);
    // const [userId, setUserId] = useState(''); // Replace with your logic to get the user ID
    const userId = localStorage.getItem('userid');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState('Free Plan');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    const [action, setAction] = useState(null);
    //Purchase Popout
    const location = useLocation();
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const [popoutOpen, setPopoutOpen] = useState(false);
    const [nextBillingDateFormatted, setNextBillingDateFormatted] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentSuccessQuery = queryParams.get("success");

        if (paymentSuccessQuery === "true") {
            setPaymentSuccess(true);
            setPopoutOpen(true);  // Show popout when payment is successful
        } else if (paymentSuccessQuery === "false") {
            setPaymentSuccess(false);
            setPopoutOpen(true);  // Show popout when payment failed
        }
    }, [location.search]); // Re-run whenever the query params change


    const handleClosePopOut = () => {
        setPopoutOpen(false);  // Close the popout
    };

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

    // Handle Manage Subscription
    const handleManageSubscription = async () => {
        setLoading(true);
        try {
            if (!email) {
                console.error('Email not yet loaded');
                return;
            }
            const response = await fetch(`http://localhost:8080/create-customer-portal?email=${email}`);
            const portalUrl = await response.text();
            window.location.href = portalUrl; // Redirect to the Stripe customer portal
        } catch (error) {
            console.error('Error creating customer portal session:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (message, callback) => {
        setDialogContent(message);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleProceed = () => {
        if (subscription === 'EduDeck Plus') {
            handleManageSubscription(); // Manage subscription if the user is on EduDeck Plus
        } else {
            getSubscription(); // Call getSubscription if the user is not subscribed
        }
    };


    // Fetch subscription status based on email
    const fetchSubscription = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/subscription`, { email });
            const data = response.data;
            setSubscription(data.active ? 'EduDeck Plus' : 'Free Plan'); // Set subscription based on active status

            if (data.nextBillingDate) {
                // Convert Unix timestamp to readable format
                const date = new Date(data.nextBillingDate * 1000);
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
                setNextBillingDateFormatted(formattedDate); // Set the formatted date
            }
        } catch (error) {
            console.error('Error fetching subscription:', error);
        }
    };



    useEffect(() => {
        if (email) {
            fetchSubscription();
        }
    }, [email]);

        // Function to handle subscription
        const getSubscription = async () => {
            try {
                // Make a POST request to the backend to create a Stripe checkout session
                const response = await axios.post(`${BASE_URL}/api/stripe/checkoutsession`, {
                    email: email, // Pass the email retrieved from the backend
                });

                // Redirect to the Stripe checkout URL
                if (response.data.checkoutUrl) {
                    window.location.href = response.data.checkoutUrl;
                }
            } catch (error) {
                console.error('Error creating Stripe checkout session:', error);
            }
        };


    const handleClick = () => {
        navigate('/Payment');
    };

    const handleClickDashboard = () => {
        navigate('/Dashboard');
    };

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
            <div style={{
                backgroundColor: "antiquewhite",
                minHeight: "100vh",
                overflowY: "auto",
                position: "relative",
            }}>


                <PurchasePopout //Modals
                    isSuccess={paymentSuccess}
                    popoutOpen={popoutOpen}
                    handleClosePopOut={handleClosePopOut}
                />
                <InfoStripePopOut //Modals
                    open={open}
                    handleClose={handleClose}
                    dialogContent={dialogContent}
                    handleProceed={handleProceed}
                />


                <div
                    style={{
                        backgroundImage: `url('/img.png')`,
                        backgroundSize: "cover", // Ensures the image covers the entire container
                        backgroundPosition: "center", // Centers the image
                        backgroundRepeat: "no-repeat", // Prevents the image from repeating
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        overflowY: "auto",
                    }}
                >

                    <Toolbar sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '-2px'
                    }}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <div
                                onClick={handleClickDashboard}
                                style={{cursor: 'pointer'}} // Adds pointer cursor to indicate it's clickable
                            >
                                <img
                                    src="/logo.png"
                                    alt="App Logo"
                                    style={{
                                        width: 70,
                                        marginLeft: '0%',
                                        '@media (max-width: 400px)': {marginLeft: '25%'},
                                    }}
                                />
                            </div>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontFamily: 'Lato',
                                    fontWeight: '900',
                                    fontSize: {xs: '25px', md: '30px'},
                                    color: '#B18A00',
                                    ml: 2,
                                }}
                            >
                                EduDeck {subscription === 'EduDeck Plus' && (
                                <span style={{ color: 'black' }}>Plus</span>
                            )}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2, // Adds space between Stripe logo and icon
                            }}
                        >
                            <img
                                src="/Stripe.png"
                                alt="Stripe Logo"
                                style={{
                                    width: 150,
                                    '@media (max-width: 400px)': { marginLeft: '-15%' },
                                }}
                            />
                            <Box
                                sx={{
                                    background: '#D0BF81',
                                    borderRadius: '50px',
                                    width: { xs: '35px', sm: '35px' },
                                    height: { xs: '35px', sm: '35px' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <IconButton
                                    onClick={() => navigate("/profilesettings")}
                                    color="inherit"
                                    sx={{ fontSize: '35px', p: '0' }}
                                >
                                    <AccountCircle sx={{ fontSize: '100%', width: '100%', color: 'white' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>

                    <Box sx={{
                        width: {xs: '260px', md: '260px'},
                        height: {xs: '50px', md: '50px'},
                        position: 'relative',
                        // top: {xs: '5%', md: '1%'},
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'white'
                    }}>
                        <Typography style={{
                            fontFamily: 'Lato',
                            fontWeight: 'bolder',
                            color: '#B18A00',
                            fontSize: '35px',
                            marginRight: '12px'
                        }}>EduDeck</Typography>
                        <Typography style={{
                            fontFamily: 'Lato',
                            fontWeight: 'bolder',
                            color: '#332D2D',
                            fontSize: '35px'
                        }}>Plus</Typography>
                    </Box>

                    <Box sx={{
                        width: {xs: '100%', md: 'auto'},
                        position: 'relative',
                        // top: {xs: '6%', md: '2%'},
                        left: '50%',
                        marginTop:'2%',
                        transform: 'translateX(-50%)',
                        textAlign: 'center'
                    }}>
                        <Typography sx={{
                            fontFamily: 'Lato',
                            fontWeight: 'bold',
                            color: '#332D2D',
                            fontSize: {xs: '20px', md: '20px'}
                        }}>
                            Excel in your courses using our latest set of study resources.
                        </Typography>
                    </Box>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                        sx={{
                            position: 'relative', // Switch from absolute to relative positioning for better alignment
                            // width: { md: '30%' },
                            marginTop: '5px',
                            // marginLeft:'-15px',
                            // marginRight:'5px',
                            marginBottom:'10px',
                            transform: 'translateX(-50%)',
                            left: '50%',
                        }}
                    >
                        {/* Free Plan Box */}
                        <Grid item xs={9} md={2.5}>
                            <Box sx={{
                                width: 'auto', // Full width inside its grid item
                                height: '356px', // Allow dynamic height based on content
                                backgroundColor: '#FFFFFF',
                                borderRadius: '10px',
                                border: '1px solid #000000',
                                boxShadow: subscription === 'Free Plan'
                                    ? '0px 0px 15px 5px rgba(250, 199, 18, 0.8)'
                                    : '0px 2px 8px rgba(0, 0, 0, 0.2)', // Glow effect for Free Plan
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: '20px',
                                transition: 'box-shadow 0.3s ease', // Smooth transition between glow states
                            }}>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    fontWeight: 'bolder',
                                    color: '#B18A00',
                                    fontSize: { xs: '30px', md: '30px' },
                                    marginBottom: '25px',
                                    marginTop: '20px'
                                }}>
                                    Free Plan
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Limited number of document uploads per month (5 documents).
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Limited number of flashcards generation per month (100 flashcards).
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Basic quiz generation with limited number of questions.
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Basic progress analytics.
                                </Typography>
                            </Box>
                        </Grid>

                        {/* EduDeck Plus Plan Box */}
                        <Grid item xs={9} md={2.5}>
                            <Box sx={{
                                width: 'auto', // Full width inside its grid item
                                height: '356px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '10px',
                                border: '1px solid #000000',
                                boxShadow: subscription === 'EduDeck Plus'
                                    ? '0px 0px 15px 5px rgba(250, 199, 18, 0.8)'
                                    : '0px 4px 4px rgba(0, 0, 0, 0.25)', // Glow effect for EduDeck Plus
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: '20px',
                                transition: 'box-shadow 0.3s ease', // Smooth transition
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginBottom: '5px'
                                }}>
                                    <Typography sx={{
                                        fontFamily: 'Lato',
                                        fontWeight: 'bolder',
                                        marginTop: '-5px',
                                        fontSize: { xs: '30px', md: '30px' }
                                    }}>
                                        <span style={{ color: '#B18A00' }}>EduDeck</span>
                                        <span style={{ color: '#000000' }}> Plus</span>
                                    </Typography>
                                </Box>

                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    fontWeight: 'bolder',
                                    color: '#B18A00',
                                    fontSize: { xs: '25px', md: '25px' },
                                    marginBottom: '20px',
                                    marginTop: '-10px'
                                }}>
                                    ₱30.00
                                    <span style={{ color: '#9FA0A0', fontSize: '15px' }}> / month </span>
                                </Typography>

                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Unlimited document uploads.
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Unlimited flashcard generation.
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Advanced quiz generation with more questions.
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Detailed progress and performance analytics.
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Priority customer support.
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: { xs: '18px', md: '15px' }
                                }}>
                                    &bull; Early access to new features.
                                </Typography>

                                {/* Conditionally render the next billing date if subscribed to EduDeck Plus */}
                                {subscription === 'EduDeck Plus' && nextBillingDateFormatted && (
                                    <Typography sx={{
                                        fontFamily: 'Lato',
                                        color: '#B18A00',
                                        fontWeight: 'bold',
                                        fontSize: { xs: '15px', md: '13px' },
                                        marginTop: '10px',
                                        justifyContent:'center'
                                    }}>
                                        Next Billing Date: {nextBillingDateFormatted}
                                    </Typography>
                                )}

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginTop: '5px'
                                }}>
                                    <Button
                                        sx={{
                                            background: subscription === 'EduDeck Plus' ? '#FAC712' : '#FAC712',
                                            fontFamily: 'Lato',
                                            fontSize: { xs: '18px', md: '18px' },
                                            fontWeight: 'bold',
                                            color: '#555245',
                                            textTransform: 'none',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            marginTop: '10px',
                                            position:'relative',
                                            width:'90%', height:'40px',
                                            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                        }}
                                        onClick={() => handleOpenModal(
                                            subscription === 'EduDeck Plus'
                                                ? 'You will be redirected to Stripe, a secure third-party customer billing portal provider. All information processed through Stripe is safeguarded and protected.'
                                                : 'You will be redirected to Stripe, a secure third-party payment provider. Please be assured that all information processed through Stripe is secure and protected.',
                                            subscription === 'EduDeck Plus' ? handleManageSubscription : getSubscription
                                        )}
                                    >
                                        {subscription === 'EduDeck Plus' ? 'Manage Subscription' : 'Get EduDeck Plus'}
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default PricingUI;



