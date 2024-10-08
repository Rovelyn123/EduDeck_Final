import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, IconButton, Grid, Typography, Toolbar, Button, Box, ButtonGroup, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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

export default function HomePageUI() {
    const [user, setUser] = React.useState(null);
    const [showLogin, setShowLogin] = React.useState(false);
    const [hideAppBar, setHideAppBar] = React.useState(false);
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
            <div>
                <Routes>
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

                                            <Container sx={{ textAlign: 'center', mt: { xs: 6, sm: 10 } }}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={4}>
                                                        <Button
                                                            sx={{ backgroundColor: '#FFFEF9', width: '80%', height: '100%', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' }}
                                                            onClick={() => handleOpenDialog('Document to Flashcard')}
                                                        >
                                                            <img src="/document to flashcard.png" alt="Button Image" style={{ width: '50%', height: 'auto' }} />
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Button
                                                            sx={{ backgroundColor: '#FFFEF9', width: '80%', height: '100%', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' }}
                                                            onClick={() => handleOpenDialog('Text Highlighting')}
                                                        >
                                                            <img src="/quizzes.png" alt="Button Image" style={{ width: '50%', height: 'auto' }} />
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <Button
                                                            sx={{ backgroundColor: '#FFFEF9', width: '80%', height: '100%', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' }}
                                                            onClick={() => handleOpenDialog('AI generated Quiz')}
                                                        >
                                                            <img src="/ai.png" alt="Button Image" style={{ width: '50%', height: 'auto' }} />
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Container>

                                            <Container sx={{ marginBottom: '5em', textAlign: 'center', mt: { xs: 6, sm: 10 } }}>
                                                <Button sx={{
                                                    backgroundColor: '#FFD234', width: '12em', height: '2.5em', color: "#666666", boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                                                    fontFamily: 'Poppins', fontWeight: 600, fontSize: { xs: '1em', sm: '1.4em' }
                                                }} variant="contained">Get Started</Button>
                                                <Typography sx={{ mt: 2, color: "#666666", fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: { xs: '2em', sm: '2.4em' } }}>
                                                    Prepare yourself for the day of the test.
                                                </Typography>
                                                <Typography sx={{ mt: 1, color: "#666666", fontFamily: 'Poppins, sans-serif', fontWeight: 300, fontSize: { xs: '.6em', sm: '1em' } }}>
                                                    Transform your PowerPoint slides into flashcards for accelerated outcomes.
                                                </Typography>
                                            </Container>
                                            <Footer />
                                        </>
                                    )}
                                </div>
                            }
                        />
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
