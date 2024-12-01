import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { 
  AppBar, 
  IconButton, 
  Grid, 
  Typography, 
  Toolbar, 
  Button, 
  Box, 
  ButtonGroup, 
  Container, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions 
} from '@mui/material';
import './HomePageUI.css'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './FooterUI';
import Login from './LoginUI';
import Signup from './SignupUI';
import Dashboard from './DashboardUI';
import ReviewSession from './ReviewSessionUI';
import DocumentUploadUI from './DocumentUploadUI';
import AboutUs from './AboutUsUI';
import AboutEdudeck from './AboutEdudeckUI';
import { Divider } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import ProfileSettings from './ProfileSettingsUI';
import FlashcardManagementUI from './FlashcardManagementUI';
import Pricing from './PricingUI';
import PaymentScreen from './payment/PaymentUI';
import BillingScreen from './payment/BillingUI';
import SummaryScreen from './payment/SummaryUI';
import TextHighlighting from './TextHighlightingUI';
import QuizManagement from './QuizManagementUI';
import QuizSession from './QuizSessionUI';
import QuizSummary from './QuizSummaryUI';
import UserManagement from './UserManagementUI';
import AdminProfile from './AdminProfileUI';
import ErrorPageUI from './ErrorPageUI';
import ReviewResultUI from './ReviewResultUI';
import '@fontsource/lato';

export default function HomePageUI() {
    const [user, setUser] = React.useState(null);
    const [showLogin, setShowLogin] = React.useState(false);
    const [isSignInView, setIsSignInView] = React.useState(false);
    const [showHometoabout, setShowHometoabout] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState("");
    const [dialogContent, setDialogContent] = React.useState("");

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920,
            },
        },
    });

    // Custom button styles
    const buttonStyle = {
        backgroundColor: '#FFFEF9', 
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
        fontFamily: 'lato',
        fontWeight: 600,
        fontSize: { xs: '1em', sm: '1.4em' },
        padding: '1.5em 2em',  // Adjust padding as needed
        '&:hover': {
            opacity: 0.8 
        }, 
    };

    // Image container styles
    const imageContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10em', // Adjust height as needed
        width: 'auto',
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setIsSignInView(true);
        setShowHometoabout(false);
    };

    const handleSignInClick = () => {
        setShowLogin(true);
        setIsSignInView(false);
        setShowHometoabout(false);
    };

    const handleButtonClick = () => {
        window.scrollTo(0, 0);
    };

    const handleParagraphClick = (item) => {
        console.log(`Clicked on ${item}`);
    };

    const handleOpenDialog = (content) => {
        let dialogTitle, dialogText;
        switch (content) {
            case 'Document to Flashcard':
                dialogTitle = 'Document to Flashcard';
                dialogText = 'This feature allows you to convert documents, such as notes or textbooks, into flashcards. Flashcards are a popular study tool consisting of concise information on one side (a term or concept) and additional details or definitions on the other side. By converting documents into flashcards, you can condense complex information into digestible chunks for easier memorization and review.';
                break;
            case 'Text Highlighting':
                dialogTitle = 'Text Highlighting';
                dialogText = 'Text highlighting allows you to mark important passages or key information within documents or study materials. This feature is useful for emphasizing critical points, identifying key terms, or organizing information visually.';
                break;
            case 'AI generated Quiz':
                dialogTitle = 'AI generated Quiz';
                dialogText = 'With this feature, artificial intelligence (AI) technology generates customized quizzes based on the content you\'re studying. The AI analyzes the material and formulates questions that test your understanding of key concepts, facts, and relationships. These quizzes can help reinforce your learning, identify areas for improvement, and provide targeted practice for exams.';
                break;
            default:
                dialogTitle = '';
                dialogText = '';
        }
        setDialogTitle(dialogTitle);
        setDialogContent(dialogText);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className='bd' style={{ overflow: 'hidden' }}>
                    <Routes>
                        {/* Homepage route with AppBar */}
                        <Route
                            path="/"
                            element={
                                <>
                                    <AppBar position="fixed" sx={{ background: 'white', zIndex: 1000 }}>
                                        <Toolbar sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between', 
                                            padding: { xs: '2px', sm: '0px 5px' }  // Adjust padding for mobile
                                        }}>
                                            <Box sx={{
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: { xs: 'center', sm: 'flex-start' }, // Center logo on small screens
                                            margin: { xs: '0', sm: '0 0 0 -0.7rem ' }
                                            }}>
                                            <Box sx={{ height: { xs: '35px', sm: '52px' }, width: 'auto' }}>
                                                <img src='logo.png' alt='logo' className='logo' style={{ height: '100%', width: 'auto' }} />
                                            </Box>
                                            <Typography sx={{
                                                color: "#8c7111", 
                                                fontFamily: 'Lato', 
                                                fontWeight: 600, 
                                                fontSize: { xs: '1.2em', sm: '1.8em' }, 
                                            }}>
                                                EduDeck
                                            </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: { xs: '10px', sm: '0' } }}>
                                            <ButtonGroup color="secondary" variant="text" aria-label="Button group">
                                                <Link to="/signup" style={{ textDecoration: 'none' }}>
                                                <Button sx={{
                                                    color: '#8C7111', 
                                                    fontWeight: 'bold', 
                                                    fontSize: { xs: '0.8em', sm: '1em' },
                                                    marginBottom: { xs: '5px', sm: '0' }  // Add margin to separate buttons on mobile
                                                }}>
                                                    Signup
                                                </Button>
                                                </Link>
                                                <Link to="/Login" style={{ textDecoration: 'none' }}>
                                                <Button sx={{
                                                    color: '#8C7111', 
                                                    fontWeight: 'bold', 
                                                    fontSize: { xs: '0.8em', sm: '1em' }
                                                }}>
                                                    Login
                                                </Button>
                                                </Link>
                                            </ButtonGroup>
                                            </Box>
                                        </Toolbar>
                                        </AppBar>

                                    <div className='bd' style={{ overflow: 'hidden' }}>
                                        <img src='homebackgrounds.png' alt='Home Background' className='home-background' style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3}} />
                                        <div style={{ position: 'relative', zIndex: 10 }}> 
                                        <Container sx={{ textAlign: 'center', mt: { xs: 6, sm: 10 } }}>
                                            <Grid 
                                                container 
                                                sx={{
                                                marginTop: { xs: '50%', sm: '18%' }, 
                                                marginBottom: { xs: '15%', sm: '20%' }, 
                                                justifyContent: 'center'  // Center content horizontally
                                                }}
                                            >
                                                <Typography 
                                                variant="h3" 
                                                sx={{
                                                    color: "#967501", 
                                                    fontSize: { xs: '2.5em', sm: '5.5em' },  // Smaller font size on mobile
                                                    fontFamily: 'Lato', 
                                                    fontWeight: 600,
                                                    lineHeight: 1.2  // Adjust line height for better spacing
                                                }}
                                                >
                                                Elevating College Life for Holistic Success
                                                </Typography>
                                                <Typography 
                                                variant="h6" 
                                                sx={{
                                                    color: "#787878", 
                                                    fontFamily: 'Lato', 
                                                    fontSize: { xs: '1.2em', sm: '1.5em' },  // Adjust font size for mobile
                                                    fontWeight: 300,
                                                    marginTop: { xs: '1em', sm: '2em' },  // Add margin top for spacing on mobile
                                                }}
                                                >
                                                Transforming the Academic Journey with Integrated Flashcards and Personalized Study Tools for Long-Term Success
                                                </Typography>
                                                <Link to="/login" style={{ textDecoration: 'none', fontFamily: 'Lato' }}>
                                                <Button 
                                                    sx={{
                                                    backgroundColor: '#FAC712', 
                                                    color: '#332D2D', 
                                                    marginTop: '2em',  
                                                    fontWeight: 600, 
                                                    borderRadius: '5em', 
                                                    width: { xs: '12em', sm: '10em' },  // Adjust button width on mobile
                                                    height: '2.5em', 
                                                    border: 'black 1px solid',
                                                    fontSize: { xs: '1em', sm: '1.2em' }, // Adjust font size for mobile
                                                    marginBottom: {xs: '50%', sm: '0'}
                                                    }}
                                                >
                                                    Get Started
                                                </Button>
                                                </Link>
                                            </Grid>
                                            </Container>
                                                                                        {showHometoabout && (
                                                                                            <>  
                                                                                                <Container sx={{ textAlign: 'center', mt: { xs: 3, sm: 5 } }}>
                                            <Typography 
                                                variant="h5" 
                                                sx={{ 
                                                paddingLeft: { xs: '5%', sm: '10%' },  // Adjust padding for mobile and larger screens
                                                paddingRight: { xs: '5%', sm: '10%' }, 
                                                fontFamily: 'Lato', 
                                                color: '#333333', 
                                                fontWeight: 600, 
                                                fontSize: { xs: '1.5em', sm: '2.8em' },  // Adjust font size for mobile and larger screens
                                                lineHeight: 1.4,  // Better line spacing for readability
                                                marginTop: {xs: '20%', sm: '0'}
                                                }}
                                            >
                                                Excel in your courses using our latest set of study resources and with our exceptional features.
                                            </Typography>
                                            
                                            <Typography 
                                                variant="h5" 
                                                sx={{ 
                                                paddingLeft: { xs: '5%', sm: '10%' },  // Adjust padding for mobile and larger screens
                                                paddingRight: { xs: '5%', sm: '10%' }, 
                                                fontFamily: 'Lato', 
                                                color: "#666666", 
                                                fontSize: { xs: '.8em', sm: '1em' },  // Adjust font size for mobile and larger screens
                                                marginTop: { xs: '1em', sm: '1.5em' },  // Adjust top margin for mobile screens
                                                lineHeight: 1.6,  // Better line spacing for readability
                                                }}
                                            >
                                                Utilize our flashcard tool for quick and effective memorization, text highlighting for easier note-taking and comprehension, and quizzes to test your understanding and reinforce your knowledge. Join our live learning sessions for personalized support from experienced tutors. With EduDeck,
                                            </Typography>
                                            </Container>


                                            <Container sx={{ textAlign: 'center', mt: { xs: 3, sm: 5 } }}>
                                            <Grid
                                                container
                                                spacing={2} // spacing between Grid items
                                                sx={{
                                                display: 'flex',
                                                justifyContent: 'center', // Center the items horizontally on web view
                                                flexDirection: { xs: 'column', sm: 'row' }, // Stack items in a column for xs (mobile), row for sm and up (web)
                                                alignItems: 'center', // Center items vertically in both mobile and web views
                                                }}
                                            >
                                                <Grid
                                                item
                                                xs={6}   // Full width on mobile
                                                md={2}   // 2 columns on medium and up screens
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                >
                                                <Button
                                                    sx={{
                                                    ...buttonStyle,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    textTransform: 'none',
                                                    width: '100%',  // Full width on mobile
                                                    height: 'auto',
                                                    border: 'black 1px solid',
                                                    margin: '10px 0',  // Vertical margin for spacing between buttons

                                                    '&:hover': {
                                                        boxShadow: 'none',
                                                    },

                                                    '&:active': {
                                                        boxShadow: '0 0 10px 5px gold',
                                                    },
                                                    }}
                                                    onClick={() => handleOpenDialog('Document to Flashcard')}
                                                >
                                                    <img
                                                    src="/document to flashcard.png"
                                                    alt="Button Image"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                        transition: 'opacity 0.3s ease',
                                                    }}
                                                    onMouseOver={(e) => (e.currentTarget.style.opacity = 0.5)}
                                                    onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
                                                    />
                                                </Button>
                                                </Grid>

                                                <Grid
                                                item
                                                xs={6}   // Full width on mobile
                                                md={2}   // 2 columns on medium and up screens
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                >
                                                <Button
                                                    sx={{
                                                    ...buttonStyle,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    textTransform: 'none',
                                                    width: '100%', // Full width on mobile
                                                    height: 'auto',
                                                    border: 'black 1px solid',
                                                    margin: '10px 0',  // Add space between buttons

                                                    '&:hover': {
                                                        boxShadow: 'none',
                                                    },

                                                    '&:active': {
                                                        boxShadow: '0 0 10px 5px gold',
                                                    },
                                                    }}
                                                    onClick={() => handleOpenDialog('AI generated Quiz')}
                                                >
                                                    <img
                                                    src="/ai.png"
                                                    alt="Button Image"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                        transition: 'opacity 0.3s ease',
                                                    }}
                                                    onMouseOver={(e) => (e.currentTarget.style.opacity = 0.5)}
                                                    onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
                                                    />
                                                </Button>
                                                </Grid>

                                                <Grid
                                                item
                                                xs={6}   // Full width on mobile
                                                md={2}   // 2 columns on medium and up screens
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                >
                                                <Button
                                                    sx={{
                                                    ...buttonStyle,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    textTransform: 'none',
                                                    width: '100%',  // Full width on mobile
                                                    height: 'auto',
                                                    border: 'black 1px solid',
                                                    margin: '10px 0',  // Vertical margin for spacing between buttons

                                                    '&:hover': {
                                                        boxShadow: 'none',
                                                    },

                                                    '&:active': {
                                                        boxShadow: '0 0 10px 5px gold',
                                                    },
                                                    }}
                                                    onClick={() => handleOpenDialog('Text Highlighting')}
                                                >
                                                    <img
                                                    src="/quizzes.png"
                                                    alt="Button Image"
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        objectFit: 'contain',
                                                        transition: 'opacity 0.3s ease',
                                                    }}
                                                    onMouseOver={(e) => (e.currentTarget.style.opacity = 0.5)}
                                                    onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
                                                    />
                                                </Button>
                                                </Grid>
                                            </Grid>
                                            </Container>
                                                    <Container
                                                        maxWidth={false}  // Ensures the container takes up the full width
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            marginBottom: '5em',
                                                            textAlign: 'center',
                                                            mt: { xs: 6, sm: 10 },
                                                            backgroundColor: '#332D2D',
                                                            height: '16em',
                                                            width: '100%',  // Makes sure the container spans 100% of the screen
                                                            padding: 0,     // Removes any default padding applied by MUI
                                                        }}
                                                        >
                                                        <Typography 
                                                            sx={{ 
                                                            mt: 0, 
                                                            color: "white", 
                                                            fontFamily: 'Lato', 
                                                            fontWeight: 600, 
                                                            fontSize: { xs: '2em', sm: '2.4em' } 
                                                            }}
                                                        >
                                                            Prepare yourself for the day of the test.
                                                        </Typography>
                                                        <Typography 
                                                            sx={{ 
                                                            mt: 1, 
                                                            mb: 2, 
                                                            color: "white", 
                                                            fontFamily: 'Lato', 
                                                            fontWeight: 300, 
                                                            fontSize: { xs: '.6em', sm: '1em' } 
                                                            }}
                                                        >
                                                            Transform your PowerPoint slides into flashcards for accelerated outcomes.
                                                        </Typography>
                                                        <Link to="/signup" style={{ textDecoration: 'none', fontFamily: 'Lato' }}>
                                                            <Button 
                                                            style={{
                                                                backgroundColor:'#FAC712', 
                                                                color: '#333333', 
                                                                borderRadius: '5em',  
                                                                fontWeight: 600, 
                                                                width: '12em', 
                                                                height: '2.5em', 
                                                                border: 'black 1px solid'
                                                            }}
                                                            >
                                                            Create Account
                                                            </Button>
                                                        </Link>
                                                        </Container>

                                                        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                                        <img
  src="studying.jpg"
  alt="studying"
  className="studying"
  style={{
    borderRadius: '.5em',
    width: '40%',
    height: 'auto',
    maxWidth: '600px',
    margin: '0px 70px 90px 70px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
  }}
/>

<style jsx>{`
  @media (max-width: 768px) {
    .studying {
      width: 100%;  /* Set to 100% for mobile to take up more space */
      max-width: 100%;  /* Ensure it can take up full width */
      margin: 0 10px 20px 10px;  /* Adjust margins for smaller screens */
    }
  }
`}</style>

  <div style={{ flex: 1, textAlign: 'right' }}>
    <Typography
      variant="h5"
      sx={{
        color: '#333333',
        mb: 2,
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '4em',
        lineHeight: '1',
        '@media (max-width: 768px)': { // Adjust for tablet and mobile devices
          fontSize: '2.5em',
          textAlign: 'center',
        },
      }}
    >
      Your Journey Starts Here!
    </Typography>
    <Typography
      sx={{
        fontSize: '1rem',
        fontFamily: 'Lato',
        color: '#333333',
        marginBottom: {xs: '10%', sm: '0'},
        '@media (max-width: 768px)': { // Adjust for mobile view
          fontSize: '1rem',
          textAlign: 'center',
        },
      }}
    >
      Discover tools and connections that will transform your academic and personal journey. Take the first step toward achieving your academic goals with EduDeck by your side.
    </Typography>
  </div>
</Container>


                                                    <Footer/>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </>
                            }
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path='/uploaddocument' element={<DocumentUploadUI />} />
                        <Route path='/flashcardsmgt' element={<FlashcardManagementUI />} />
                        <Route path='/reviewsession' element={<ReviewSession/>} />
                        <Route path='/aboutus' element={<AboutUs />} />
                        <Route path='/aboutedudeck' element={<AboutEdudeck />} />
                        <Route path='/pricing' element={<Pricing />} />
                        <Route path='/payment' element={<PaymentScreen />} />
                        <Route path='/billing' element={<BillingScreen />} />
                        <Route path='/summary' element={<SummaryScreen />} />
                        <Route path="/login" element={<Login isSignInView={isSignInView} setIsSignInView={setIsSignInView} />} />
                        <Route path="/signup" element={<Signup handleToggle={() => setShowLogin(false)} />} />
                        <Route path='/profilesettings' element={<ProfileSettings/>} />
                        <Route path='/TextHighlighting' element={<TextHighlighting/>} />
                        <Route path='/quiz' element={<QuizManagement />} />
                        <Route path='/quizsession' element={<QuizSession />} />
                        <Route path='/quizsummary' element={<QuizSummary />} />
                        <Route path='/usermanagement' element={<UserManagement />} />
                        <Route path='/adminprofile' element={<AdminProfile />} />
                        <Route path='/reviewresult' element={<ReviewResultUI />} />
                        <Route path="*" element={<ErrorPageUI />} />
                    </Routes>

                    {showLogin && (
                        isSignInView ? (
                            <Signup handleToggle={() => setShowLogin(false)} />
                        ) : (
                            <Login isSignInView={isSignInView} setIsSignInView={setIsSignInView} />
                        )
                    )}

                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogContent>
                            <Typography>{dialogContent}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </ThemeProvider>
        </Router>
    );
} 