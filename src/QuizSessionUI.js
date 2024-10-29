import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./QuizSessionUI.css";
import { Typography, Box, TextField, Button, AppBar, Toolbar, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import '@fontsource/lato';
import { Link } from 'react-router-dom';
import BASE_URL from './config';

const QuizSessionUI = () => {
    const location = useLocation();
    const { quizId } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const navigate = useNavigate();
    const [isTrueFalseQuestion, setIsTrueFalseQuestion] = useState(false);
    const [isMultipleChoiceQuestion, setIsMultipleChoiceQuestion] = useState(false);
    const [options, setOptions] = useState([]);
    const [extractOptions, setExtractOptions] = useState([]);
    const userId = localStorage.getItem('userid');
    const [subscription, setSubscription] = useState('Free Plan');
    const [email, setEmail] = useState('');
    const userid = localStorage.getItem('userid');
    const [startTime, setStartTime] = useState(null); // Time when the question is displayed
    const [questionTimes, setQuestionTimes] = useState([]); // Track time per question
    const [averageTimes, setAverageTimes] = useState({
        'multiple_choice': 0,
        'true/false': 0,
        'short_answer': 0,
    });


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


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const selectedDeckId = localStorage.getItem('selectedDeckId');
                if (!selectedDeckId) {
                    throw new Error('No deck selected');
                }
                const response = await axios.get(`${BASE_URL}/api/quizzes/${quizId}`);
                const quizItems = response.data.quizItems || [];

                const fetchedQuestions = quizItems.map(quizItem =>({
                    id: quizItem.quizItemId,
                    question: quizItem.question,
                    type: quizItem.questionType,
                    options: quizItem.options || [],
                    answer: quizItem.correctAnswer

                }));
                setQuestions(fetchedQuestions);
                setTotalQuestions(fetchedQuestions.length);
                setError(null);
            } catch (error) {
                setError('An error occurred while fetching questions. Please try again later.');
            }
        };

        fetchQuestions();
        setStartTime(Date.now());

        const selectedDeck = localStorage.getItem('selectedDeck');
        // setTitle(selectedDeck || 'Untitled Deck');

        const title = selectedDeck || 'Untitled Deck';  // This line uses 'title'
        setTitle(title);  // Make sure you're using setTitle if you're updating state
        
        if (title) {
            localStorage.setItem('quizTitle', title);
        }
    }, []);

    const handleInputChange = (flashcardId, value) => {
        const currentTime = Date.now();
        const timeSpent = currentTime - startTime;
        setQuestionTimes(prevTimes => [
        ...prevTimes,
        { questionId: flashcardId, timeSpent }
        ]);

        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [flashcardId]: value
        }));

        setStartTime(currentTime);
    };

    const calculateAverageTimes = () => {
        const timesByType = { multiple_choice: [], 'true/false': [], 'short_answer': [] };
    
        questionTimes.forEach(({ questionId, timeSpent }) => {
          const question = questions.find(q => q.id === questionId);
          if (question) {
            const type = question.type;
            timesByType[type] = [...timesByType[type], timeSpent];
          }
        });
    
        const averages = {
            multiple_choice: timesByType.multiple_choice.length
                ? timesByType.multiple_choice.reduce((a, b) => a + b, 0) / timesByType.multiple_choice.length
                : 0,
            'true/false': timesByType['true/false'].length
                ? timesByType['true/false'].reduce((a, b) => a + b, 0) / timesByType['true/false'].length
                : 0,
            'short_answer': timesByType['short_answer'].length
                ? timesByType['short_answer'].reduce((a, b) => a + b, 0) / timesByType['short_answer'].length
                : 0,
        };

        setAverageTimes(averages);
        return averages;
    };

    const submitQuiz = async () => {
        const averages = calculateAverageTimes();
        const totalQuestions = questions.length;
        let correctAnswers = 0;

        const detailedResults = questions.map(question => ({
            question: question.question,
            correctAnswer: question.answer,
            userAnswer: userAnswers[question.id] || ''
        }));
        
        questions.forEach(question => {
            if (userAnswers[question.id] && userAnswers[question.id].toLowerCase() === question.answer.toLowerCase()) {
                correctAnswers++;
            }
        });

        const scorePercentage = (correctAnswers / totalQuestions) * 100;
    
        const wrongAnswers = totalQuestions - correctAnswers;
        const score = { correctAnswers, wrongAnswers, detailedResults };

        try {
            await axios.put(`${BASE_URL}/api/quizzes/update/${quizId}`, {
                score: correctAnswers,
                scorePercentage: scorePercentage,
                totalQuestions: totalQuestions
            });
    
            console.log('Quiz score updated successfully');
    
            navigate('/quizsummary', { state: score });
        localStorage.setItem('averageTimes', JSON.stringify(averages));
        } catch (error) {
            console.error('Error updating quiz score:', error);
        }
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

    const renderAnswerField = (question) => {
    
        if (question.type === 'true/false') {
            return (
                <div className="question-section">
                    <div className="answer-options" style={{ marginLeft: isMobile ? '20px' : '250px', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant={userAnswers[question.id] === 'True' ? 'contained' : 'outlined'}
                            onClick={() => handleInputChange(question.id, 'True')}
                            sx={{ mr: 3, backgroundColor: '#F5F2D8', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', color: '#CBBA61',
                                width: '150px', height: '40px', fontFamily: 'Lato', fontSize: '15px', fontWeight: 'bold', borderStyle: 'none', borderRadius: '5px' }}
                        >
                            True
                        </Button>
                        <Button
                            variant={userAnswers[question.id] === 'False' ? 'contained' : 'outlined'}
                            onClick={() => handleInputChange(question.id, 'False')}
                            sx={{ mr: 3, backgroundColor: '#F5F2D8', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', color: '#CBBA61',
                                width: '150px', height: '40px', fontFamily: 'Lato', fontSize: '15px', fontWeight: 'bold', borderStyle: 'none', borderRadius: '5px' }}
                        >
                            False
                        </Button>
                    </div>
                </div>
            );
        }else if (question.type === 'multiple_choice') {
            return (
                // <div className="answer-options">
                //     {question.options.map((option, idx) => (
                //         <Button
                //             key={idx}
                //             variant={userAnswers[question.id] === option ? 'contained' : 'outlined'}
                //             onClick={() => handleInputChange(question.id, option)}
                //             sx={{ mr: 2, mt: 2, backgroundColor: '#F5F2D8', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', color: '#CBBA61', 
                //                 width: isMobile ? '150px' : '390px', height: '40px', fontFamily: 'Lato', fontSize: '13px', fontWeight: 'bold', borderStyle: 'none', borderRadius: '5px', 
                //                 marginLeft: isMobile ? '20px' : '15px',
                //             }}>
                //         {option}
                //         </Button>
                //     ))}
                // </div>
                <div
                    className="answer-options"
                    style={{
                        display: 'inline-flex',
                        flexWrap: isMobile ? 'wrap' : 'wrap',
                        justifyContent: isMobile ? 'center' : 'center',
                        gap: isMobile ? '10px' : '15px',
                    }}
                    >
                    {question.options.map((option, idx) => (
                        <Button
                        key={idx}
                        variant={userAnswers[question.id] === option ? 'contained' : 'outlined'}
                        onClick={() => handleInputChange(question.id, option)}
                        sx={{
                            backgroundColor: '#F5F2D8',
                            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                            color: '#CBBA61',
                            width: isMobile ? '45%' : '390px', 
                            height: isMobile ? 'auto' : '40px',
                            fontFamily: 'Lato',
                            fontSize: isMobile ? '10px' : '13px',
                            fontWeight: 'bold',
                            borderStyle: 'none',
                            borderRadius: '5px',
                        }}
                        >
                        {option}
                        </Button>
                    ))}
                    </div>

                );
        } else {
            return (
                <TextField
                    label="Your Answer"
                    variant="outlined"
                    value={userAnswers[question.id] || ''}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    sx={{ width: '100%' }}
                    />
                );
            }
        };


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
                                EduDeck {subscription === 'EduDeck Plus' ? (
                                <sup style={{ color: 'black', fontSize: '0.5em' }}>Plus</sup>
                            ) : (
                                <sup style={{ fontSize: '0.5em', color: '#888' }}>Free</sup>
                            )}
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
                        ) : questions.length > 0 ? (
                            questions.map((question, index) => (
                                <div key={question.id} className="question-card">
                                    <div className="counter">{index + 1}/{totalQuestions}</div>
                                    <Typography variant="h6" className="question-label">Question</Typography>
                                    <span className="question-text">
                                        {question.question}
                                    </span>
                                    <div
                                        className="text-field-bottom"
                                        style={{
                                            backgroundColor: question.type === 'multiple_choice' || question.type === 'true/false' 
                                            ? 'transparent'  // Remove background color for multiple choice and True/False
                                            : '#F5F2D8' ,     // Keep default background for other questions
                                        }}
                                        >
                                        {renderAnswerField(question)}
                                    </div>


                                </div>
                            ))
                        ) : (
                            <Typography>Loading questions...</Typography>
                        )}
                    </div>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px', }}>
                    <Button className='submitButton' variant="contained" onClick={submitQuiz}>
                        <Typography>Submit</Typography>
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default QuizSessionUI;
