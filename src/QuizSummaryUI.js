import React, { useEffect, useState } from "react";
//import "./QuizSummary.css";
import { Toolbar, Typography, Divider, Button, Dialog, DialogActions, 
    DialogContent, TextField, DialogTitle, IconButton, Box, AppBar, useMediaQuery, 
    Slider} from '@mui/material';
import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/lato';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import axios from 'axios';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';



const QuizSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openFeedback, setOpenFeedback] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [openFeedbackDialog, setOpenFeedbackDialog] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const { correctAnswers, wrongAnswers, detailedResults } = location.state || { correctAnswers: 0, wrongAnswers: 0, detailedResults: [] };

    if (!location.state) {
        navigate('/quizsession');
    }

    const totalQuestions = correctAnswers + wrongAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const successMessage = percentage >= 60 ? "Great job! You're on the right track." : "Keep trying! Review your answers and improve.";

    const handleClickOk = () => {
        navigate('/Dashboard');
    };

    const marks = [
        {
            value: 1,
            label: "Didn't meet Expectations",
        },
        {
            value: 3,
            label: 'Met Expectations',
        },
        {
            value: 5,
            label: 'Exceeded Expectations',
        },
    ];
    
    // State to track slider value
    const [feedbackValue, setFeedbackValue] = useState(3);
    
    // Function to handle slider change
    const handleSliderChange = (event, newValue) => {
        setFeedbackValue(newValue);
    };
    
    // Handles feedback submission and dialog close
    const handleFeedbackSubmission = async () => {
        console.log("Feedback selected:", feedbackValue);
    
        try {
            const response = await axios.post('https://your-server-api.com/feedback', { //karyme ikaw lng butang hehe
                rating: feedbackValue,
                quizId: '1234',
                userId: '5678',
            });
    
            if (response.status === 200) {
                console.log('Feedback submitted successfully');
            } else {
                console.error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    
        setOpenFeedbackDialog(false); // Close the dialog after feedback submission
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

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

return (
<ThemeProvider theme={theme}>
    <div style={{
                backgroundImage: `url('/crystalbackground.png')`,
                backgroundSize: 'cover',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', 
            }}>
               
               <AppBar
                    position="static"
                    style={{
                        background: 'none',
                        boxShadow: 'none',
                        padding: '10px',
                        marginTop: '10px'
                    }}
                >
                    <Toolbar style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
                            <img src="/logo.png" alt="App Logo" style={{ width: 70 }} />
                            <Typography
                                variant="h4"
                                style={{
                                    fontFamily: 'Lato',
                                    fontWeight: '900',
                                    fontSize: '30px',
                                    color: '#B18A00',
                                    marginLeft: '10px'
                                }}
                            >
                                EduDeck
                            </Typography>
                        </Box>
                        </Link>
                        <Box
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isMobile ? 'center' : 'flex-start',
                                flexGrow: 1,
                                marginLeft: '3em',
                                width: 'auto'
                            }}
                        >
                            <Box
                                style={{
                                    background: 'white',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                    minWidth: isMobile ? '100px' : '150px',
                                    height: isMobile ? '30px' : '40px',
                                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                                    flexGrow: 1,
                                    flexShrink: 1,
                                    flexBasis: 'auto'
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontFamily: "lato",
                                        fontSize: isMobile ? '20px' : '30px',
                                        color: '#332D2D',
                                        textAlign: 'center',
                                        lineHeight: isMobile ? '30px' : '40px',
                                    }}
                                >
                                    Test Quiz
                                </Typography>
                            </Box>
                        </Box>
                        {!isMobile && (
                            <Box
                                style={{
                                    display: 'flex',
                                    background: 'white',
                                    borderRadius: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '70px',
                                }}
                            >
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>

    <div>
        <Box style={{
            backgroundColor: "#FFFFFF",
            width: isMobile ? '90%' : '65%',
            height: isMobile ? '420px' : '310px',
            marginLeft: isMobile ? '5%' : '18%',
            marginTop: isMobile ? '5%' : '2%',
            borderRadius: '1em',
            boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.25)',
            position: 'relative'
        }}>
            <Box style={{
                width: isMobile ? '180px' : '220px',
                height: isMobile ? '180px' : '220px',
                position: 'relative',
                top: isMobile ? '20px' : '35px',
                marginLeft: isMobile ? 'calc(50% - 100px)' : '10%'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFD234',
                    borderRadius: '50%',
                    padding: 15
                }}>
                    <CircularProgressbar
                        value={percentage}
                        text={`${Math.round(percentage)}%`}
                        styles={buildStyles({
                            textColor: '#fff',
                            pathColor: '#fff',
                            trailColor: '#FFD234',
                            textSize: '18px'
                        })}
                    />
                </div>
            </Box>

                    <Typography style={{
                        color: '#43A047',
                        fontSize: '1.2em',
                        fontWeight: 'bolder',
                        position: 'absolute',
                        top: isMobile ? '57%' : '20%',
                        marginLeft: isMobile ? 'calc(50% - 130px)' : '50%',
                        fontFamily: 'Lato',
                    }}>
                        Correct: {correctAnswers}
                    </Typography>
                    <Typography style={{
                        color: '#D32F2F',
                        fontSize: '1.2em',
                        fontWeight: 'bolder',
                        position: 'absolute',
                        top: isMobile ? '57%' : '35%',
                        marginLeft: isMobile ? 'calc(100% - 130px)' : '50%',
                        fontFamily: 'Lato',
                    }}>
                        Wrong: {wrongAnswers}
                    </Typography>
                    <Box style={{
                        position: 'absolute',
                        top: isMobile ? '65%' : '50%',
                        width: '100%',
                    // textAlign: isMobile ? 'center' : 0 ,
                    }}>
                        <Typography style={{
                            marginLeft: isMobile ? '5%' : '50%',
                            textAlign: isMobile ? 'center' : 0 ,
                            color: '#000000',
                            fontSize: isMobile ? '1.1em' : '1.3em',
                            fontWeight: 'bolder',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            fontFamily: 'Lato',
                        }}>
                            {successMessage}
                        </Typography>
                    </Box>
                    <Button component={Link} to="/flashcardsmgt"
                    style={{
                        background: '#FFEAA0',
                        width: '20%',
                        height: '10%',
                        fontWeight: 'bold',
                        color: '#000000',
                        position: 'absolute',
                        top: isMobile ? '85%' : '80%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderRadius: '10px',
                        boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.25)'
                    }}onClick={handleClickOk}>OK</Button>
                </Box>

        </div>
        
        <div>
            <Box
                style={{
                    top: isMobile ? '30px' : '30px',
                    padding: '2%',
                    backgroundColor: '#ffffff',
                    borderRadius: '1em',
                    width: isMobile ? '87%' : '61%',
                    marginLeft: isMobile ? '5%' : '18%',
                    marginBottom: isMobile ? '5em' : '2em',
                    boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.25)',
                    position: 'relative',
                }}
            >
                <Typography variant="h5" style={{ marginBottom: '1em', fontWeight: 'bolder', fontFamily: 'Lato' }}>
                    Review Your Answers
                </Typography>
                {detailedResults.map((result, index) => (
                    <Box key={index} style={{ marginBottom: '1em', fontFamily: 'Lato' }}>
                        <Typography variant="h6">
                            Question {index + 1}: {result.question}
                        </Typography>

                        {/* Flexbox container for the answer, icon, and feedback buttons */}
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center">
                                <Typography>Your Answer: {result.userAnswer}</Typography>
                                {/* Conditional icon rendering based on correctness */}
                                {result.userAnswer === result.correctAnswer ? (
                                    <CheckIcon style={{ color: 'green', marginLeft: '0.5em', fontSize: '1.5rem' }} />
                                ) : (
                                    <CloseIcon style={{ color: 'red', marginLeft: '0.5em', fontSize: '1.5rem' }} />
                                )}
                            </Box>
                            {/* Thumbs up/down icons for feedback */}
                            <Box display="flex" alignItems="center">
                                <IconButton
                                    sx={{
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.2)',
                                            color: 'green',
                                        },
                                        marginRight: '0.5em',
                                    }}
                                >
                                    <ThumbUpAltIcon sx={{ fontSize: '1.5rem', color: '#4CAF50' }} /> {/* Softer green */}
                                </IconButton>
                                <IconButton
                                    sx={{
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.2)',
                                            color: 'red',
                                        },
                                    }}
                                >
                                    <ThumbDownAltIcon sx={{ fontSize: '1.5rem', color: '#E57373' }} /> {/* Softer red */}
                                </IconButton>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center">
                                <Typography>Correct Answer: {result.correctAnswer}</Typography>
                                <CheckIcon style={{ color: 'green', marginLeft: '0.5em', fontSize: '1.5rem' }} />
                            </Box>
                        </Box>

                        <hr style={{ marginTop: '0.5em', marginBottom: '0.5em', borderColor: '#ddd' }} />
                    </Box>
                ))}
            </Box>
        </div>

        <Dialog
            open={openFeedbackDialog}
            onClose={() => setOpenFeedbackDialog(false)}
            aria-labelledby="feedback-dialog-title"
            aria-describedby="feedback-dialog-description"
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: 3, 
                    border: '1px solid #ccc', 
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
                    height: '320px', 
                    overflow: 'hidden', 
                },
            }}
        >
            <DialogTitle
                id="feedback-dialog-title"
                style={{ textAlign: 'center', fontFamily: 'Lato', fontWeight: 'bold', marginTop: '30px' }}
            >
                How relevant are these questions to you? <br/> Please let us know your feedback to help us improve our system.
            </DialogTitle>

            <DialogContent
                sx={{
                    overflow: 'hidden', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px 0', 
                }}
            >
                {/* Slider for feedback */}
                <Box sx={{ width: '100%', textAlign: 'center', mt: 3 }}>
                    <Typography gutterBottom>How relevant are these questions to you?</Typography>
                    <Slider
                        value={feedbackValue}
                        onChange={handleSliderChange}
                        aria-labelledby="feedback-slider"
                        step={1}
                        marks={marks}
                        min={1}
                        max={5}
                        sx={{
                            color: 'green',
                            height: 8,
                            width: '80%',
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleFeedbackSubmission} color="primary" variant="contained">
                    Submit Feedback
                </Button>
            </DialogActions>
        </Dialog>



    </div>
    </ThemeProvider>
);

}

export default QuizSummary;