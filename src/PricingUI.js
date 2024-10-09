import React, {useState, useEffect, useRef} from "react";
import { Toolbar, Typography, Button, Box, IconButton, ThemeProvider, Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from "@mui/icons-material";
import { createTheme } from '@mui/material/styles';
import '@fontsource/lato';
import axios from 'axios';

function PricingUI() {
    const [settingClicked, setSettingClicked] = useState(false);
    // const [userId, setUserId] = useState(''); // Replace with your logic to get the user ID
    const userId = localStorage.getItem('userid');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState('Free Plan');
    const [loading, setLoading] = useState(false);


    const fetchEmail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user/getEmail/${userId}`);
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

    // Function to fetch the user's email using the provided userId



    // Fetch subscription status based on email
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

        // Function to handle subscription
        const getSubscription = async () => {
            try {
                // Make a POST request to the backend to create a Stripe checkout session
                const response = await axios.post('http://localhost:8080/api/stripe/checkoutsession', {
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





    // const manageSubscription = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8080/api/stripe/create-customer-portal-session', {
    //             email
    //         });
    //         window.location.href = response.data.portalUrl;
    //     } catch (error) {
    //         console.error('Error redirecting to Stripe Customer Portal:', error);
    //     }
    // };

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                backgroundColor: "#eecc9b",
                minHeight: "100vh",
                overflowY: "auto",
                position: "relative"
            }}>
                <div
                    style={{
                        backgroundImage: `url('/crystalbackground.png')`,
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        overflowY: "auto"
                    }}
                >
                    <Toolbar sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop:'-2px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                                EduDeck
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
                        width: {xs: '300px', md: '300px'},
                        height: {xs: '50px', md: '50px'},
                        position: 'relative',
                        top: {xs: '5%', md: '1%'},
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderRadius: '20px',
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
                        top: {xs: '6%', md: '2%'},
                        left: '50%',
                        marginTop:'0.5%',
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

                    <Grid container justifyContent="center" spacing={5} sx={{
                        position: 'absolute',
                        top: {xs: '260px', md: '180px'},
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: {xs: '90%', md: '70%'},
                        marginTop: '4px',
                    }}>
                        <Grid item xs={12} md={6} sx={{pr: {md: 5}}}>
                            <Box sx={{
                                width: '100%',
                                height: '90%',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '20px',
                                border: subscription === 'Free Plan' ? '2px solid #FFDD66' : '2px solid #FFFFFF',
                                boxShadow: subscription === 'Free Plan' ? '0px 0px 15px 5px rgba(250, 199, 18, 0.8)' : '0px 2px 8px rgba(0, 0, 0, 0.2)', // Glow for Free Plan
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: '20px',
                                transition: 'box-shadow 0.3s ease' // Smooth transition between glow states
                            }}>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    fontWeight: 'bolder',
                                    color: '#B18A00',
                                    fontSize: {xs: '30px', md: '30px'},
                                    marginBottom: '25px',
                                    marginTop: '20px'
                                }}>
                                    Free Plan
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: {xs: '18px', md: '15px'}
                                }}>
                                    &bull; Limited number of document uploads per month (5 documents).
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: {xs: '18px', md: '15px'}
                                }}>
                                    &bull; Limited number of flashcards generation per month (100
                                    flashcards).
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: {xs: '18px', md: '15px'}
                                }}>
                                    &bull; Basic quiz generation with limited number of questions.
                                </Typography>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    color: '#9FA0A0',
                                    fontSize: {xs: '18px', md: '15px'}
                                }}>
                                    &bull; Basic progress analytics.
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{pr: {md: 5}}}>
                            <Box sx={{
                                width: '100%',
                                height: '90%',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '20px',
                                border: subscription === 'EduDeck Plus' ? '2px solid #FFDD66' : '2px solid #FFFFFF',
                                boxShadow: subscription === 'EduDeck Plus' ? '0px 0px 15px 5px rgba(250, 199, 18, 0.8)' : '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', // Glow for EduDeck Plus
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: '20px',
                                transition: 'box-shadow 0.3s ease',

                            }}>
                                <Typography sx={{
                                    fontFamily: 'Lato',
                                    fontWeight: 'bolder',
                                    color: '#B18A00',
                                    fontSize: {xs: '30px', md: '30px'},
                                    marginBottom: '5px'
                                }}>
                                    EduDeck Plus
                                    <Typography sx={{
                                        fontFamily: 'Lato',
                                        fontWeight: 'bolder',
                                        color: '#B18A00',
                                        fontSize: {xs: '30px', md: '20px'},
                                        marginBottom: '25px'
                                    }}>
                                        (₱30/month):
                                    </Typography>
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'Lato',
                                        color: '#9FA0A0',
                                        fontSize: {xs: '18px', md: '15px'},
                                        textAlign: 'left'
                                    }}
                                >
                                    &bull; Unlimited document uploads.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'Lato',
                                        color: '#9FA0A0',
                                        fontSize: {xs: '18px', md: '15px'},
                                        textAlign: 'left'
                                    }}
                                >
                                    &bull; Unlimited flashcard generation.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'Lato',
                                        color: '#9FA0A0',
                                        fontSize: {xs: '18px', md: '15px'},
                                        textAlign: 'left'
                                    }}
                                >
                                    &bull; Advanced quiz generation with more questions.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'Lato',
                                        color: '#9FA0A0',
                                        fontSize: {xs: '18px', md: '15px'},
                                        textAlign: 'left'
                                    }}
                                >
                                    &bull; Detailed progress and performance analytics.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'Lato',
                                        color: '#9FA0A0',
                                        fontSize: {xs: '18px', md: '15px'},
                                        textAlign: 'left'
                                    }}
                                >
                                    &bull; Priority customer support.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'Lato',
                                        color: '#9FA0A0',
                                        fontSize: {xs: '18px', md: '15px'},
                                        textAlign: 'left'
                                    }}
                                >
                                    &bull; Early access to new features.
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center', // Center horizontally
                                        alignItems: 'center',     // Center vertically
                                        width: '100%',            // Make sure the container takes full width
                                    }}
                                >
                                    <Button
                                        sx={{
                                            background: subscription === 'EduDeck Plus' ? '#FAC712' : '#FAC712',
                                            fontFamily: 'Lato',
                                            fontSize: { xs: '18px', md: '20px' },
                                            fontWeight: 'bold',
                                            color: '#555245',
                                            textTransform: 'none',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            marginTop: '25px',
                                            width: '48%',
                                            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                        }}
                                        onClick={subscription === 'EduDeck Plus' ? handleManageSubscription : getSubscription}
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


//Current Subscription : {subscription}

//OTHER CODES

//Stripe Button
// useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://js.stripe.com/v3/buy-button.js';
//     script.async = true;
//     script.onload = () => {
//         setStripeLoaded(true); // Stripe script has loaded
//     };
//     document.body.appendChild(script);
//
//     return () => {
//         document.body.removeChild(script); // Clean up the script when the component unmounts
//     };
// }, []);
//
// // Once Stripe has loaded, render the Stripe Buy Button
// useEffect(() => {
//     if (stripeLoaded && stripeButtonRef.current) {
//         stripeButtonRef.current.innerHTML = ''; // Clear ref in case of re-renders
//
//         const button = document.createElement('stripe-buy-button');
//         button.setAttribute('buy-button-id', 'buy_btn_1Q6XlEEWlqrSRLbypjZjYbaa');
//         button.setAttribute('publishable-key', 'pk_test_ayfRS9qp1qSRByurrhvvoeOn00juo8OF67');
//
//         stripeButtonRef.current.appendChild(button);
//     }
// }, [stripeLoaded]);
//
// const handleStripeClick = () => {
//     if (subscription !== 'EduDeck Plus') {
//         // Ensure the Stripe button exists before trying to trigger it
//         const stripeButton = stripeButtonRef.current?.querySelector('stripe-buy-button');
//         if (stripeButton && stripeButton.shadowRoot) {
//             const innerButton = stripeButton.shadowRoot.querySelector('button');
//             if (innerButton) {
//                 innerButton.click(); // Trigger the inner Stripe button
//             } else {
//                 console.error('Stripe Buy Button inner button not found.');
//             }
//         } else {
//             console.error('Stripe Buy Button not available yet.');
//         }
//     }
// };



// useEffect(() => {
//     const fetchUserDetails = async () => {
//         try {
//             const response = await fetch(`http://localhost:8080/user/getUserDetails/${userId}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setEmail(data.email);
//             } else {
//                 console.error('Failed to fetch user details');
//             }
//         } catch (error) {
//             console.error('Error fetching user details:', error);
//         }
//     };
//
//     if (!email) {
//         fetchUserDetails();
//     }
// }, [userId, email]);

// const getSubscription = async () => {
//     try {
//         const response = await axios.post('http://localhost:8080/api/stripe/create-checkout-session', {
//             email,
//             productId: 'price_1PNBLnEWlqrSRLbyYaDHGaHG' // EduDeck Plus product ID
//         });
//         window.location.href = response.data.checkoutUrl;
//     } catch (error) {
//         console.error('Error redirecting to Stripe Checkout:', error);
//     }
// };

//Subscription Set


//Stripe Button
//const stripeButtonRef = useRef(null);
// const [stripeLoaded, setStripeLoaded] = useState(false);
// handleClick