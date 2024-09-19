import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./QuizSessionUI.css";
import { Typography, Box, TextField, Button, AppBar, Toolbar, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import '@fontsource/lato';
import { Link } from 'react-router-dom';

const QuizSessionUI = () => {
    const location = useLocation();
    const { quizId } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const selectedDeckId = localStorage.getItem('selectedDeckId');
                if (!selectedDeckId) {
                    throw new Error('No deck selected');
                }
                console.log(quizId);
                const response = await axios.get(`http://localhost:8080/api/quizzes/${quizId}`);

                const quizItems = response.data.quizItems || [];

                const fetchedQuestions = quizItems.map(quizItem =>({
                    id: quizItem.quizItemId,
                    question: quizItem.question,
                    answer: quizItem.correctAnswer

                }));
                setQuestions(fetchedQuestions);
                setTotalQuestions(fetchedQuestions.length);
                setError(null);
            } catch (error) {
                console.log(error);
                setError('An error occurred while fetching questions. Please try again later.');
            }
        };

        fetchQuestions();

        const selectedDeck = localStorage.getItem('selectedDeck');
        setTitle(selectedDeck || 'Untitled Deck');
    }, []);

    const handleInputChange = (flashcardId, value) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [flashcardId]: value
        }));
    };

    const submitQuiz = () => {
        const detailedResults = questions.map(question => ({
            question: question.question,
            correctAnswer: question.answer,
            userAnswer: userAnswers[question.id] || ''
        }));
    
        let correctAnswers = 0;
        questions.forEach(question => {
            if (userAnswers[question.id] && userAnswers[question.id].toLowerCase() === question.answer.toLowerCase()) {
                correctAnswers++;
            }
        });
    
        const wrongAnswers = totalQuestions - correctAnswers;
        const score = { correctAnswers, wrongAnswers, detailedResults };
    
        navigate('/quizsummary', { state: score });
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
            <Box sx={{
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
                width: '30%'
            }}
        >
            <Box
                style={{
                    background: 'white',
                    borderRadius: '10px',
                    textAlign: 'center',
                    // padding: isMobile ? '5px 10px' : '10px 20px',  // Added padding
                    minWidth: isMobile ? '100px' : '150px',  // Minimum width for responsiveness
                    height: isMobile ? '30px' : '40px',
                    // width: isMobile ? '100%' : 'calc(50% - 150px)',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 'auto'
                }}
            >
                <Typography
                    variant="h5"
                    style={{
                        fontFamily: "Lato",
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

                <Box className="welcome-back-page">
                    <div className="title">
                        <Typography variant="h3" style={{ fontFamily: "Lato", fontSize: '29px', color: '#332D2D', textAlign: 'center', lineHeight: '55px' }}>
                            {title}
                        </Typography>
                    </div>
                    <div className="question">
                        {error ? (
                            <Typography variant="h6" color="error">{error}</Typography>
                        ) : questions.length > 0 ? questions.map((question, index) => (
                            <div key={question.id} className="question-card">
                                <div className="counter">{index + 1}/{totalQuestions}</div>
                                <Typography variant="h6" className="question-label">Question</Typography>
                                <span className="question-text">{question.question}</span>
                                <div className="text-field-bottom">
                                    <TextField label="Your Answer" variant="outlined" style={{ width: '800px', backgroundColor: '#f5f2d8', fontFamily: 'Lato', }} onChange={(e) => handleInputChange(question.id, e.target.value)}/>
                                </div>
                            </div>
                        )) : (
                            <Typography>Loading questions...</Typography>
                        )}
                    </div>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                    <Button variant="contained" sx={{backgroundColor: '#FFD234', fontFamily: 'Lato',}} onClick={submitQuiz}>
                        <Typography>Submit</Typography>
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default QuizSessionUI;
