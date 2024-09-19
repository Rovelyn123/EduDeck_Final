// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './QuizUI.css';
// import { Typography, Box, TextField, Button, AppBar, Toolbar, useMediaQuery } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
// import '@fontsource/lato';

// function QuizManagementUI() {
//     const [questions, setQuestions] = useState([]);
//     const [totalQuestions, setTotalQuestions] = useState(0);
//     const [title, setTitle] = useState('');
//     const [error, setError] = useState(null);
//     const [userAnswers, setUserAnswers] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchQuestions = async () => {
//             try {
//                 const selectedDeckId = localStorage.getItem('selectedDeckId');
//                 if (!selectedDeckId) {
//                     throw new Error('No deck selected');
//                 }

//                 // Fetch questions - AI-generated or from your API
//                 const response = await axios.get(`http://localhost:8080/api/flashcards/deck/${selectedDeckId}`);
//                 const flashcards = response.data;

//                 const fetchedQuestions = flashcards.map(flashcard => ({
//                     id: flashcard.flashcardId,
//                     question: flashcard.question,  // AI-generated or fetched question
//                     answer: flashcard.answer,
//                     type: flashcard.type || 'open-ended',  // Set default type
//                     options: flashcard.options || [],      // Possible choices
//                     dynamicInfo: flashcard.dynamicInfo || ''  // Any dynamic info from AI
//                 }));

//                 setQuestions(fetchedQuestions);
//                 setTotalQuestions(fetchedQuestions.length);
//                 setError(null);
//             } catch (error) {
//                 setError('An error occurred while fetching questions. Please try again later.');
//             }
//         };

//         fetchQuestions();

//         const selectedDeck = localStorage.getItem('selectedDeck');
//         setTitle(selectedDeck || 'Untitled Deck');
//     }, []);

//     const handleInputChange = (flashcardId, value) => {
//         setUserAnswers(prevAnswers => ({
//             ...prevAnswers,
//             [flashcardId]: value,
//         }));
//     };

//     const submitQuiz = () => {
//         const detailedResults = questions.map(question => ({
//             question: question.question,
//             correctAnswer: question.answer,
//             userAnswer: userAnswers[question.id] || ''
//         }));

//         let correctAnswers = 0;
//         questions.forEach(question => {
//             if (userAnswers[question.id] && userAnswers[question.id].toLowerCase() === question.answer.toLowerCase()) {
//                 correctAnswers++;
//             }
//         });

//         const wrongAnswers = totalQuestions - correctAnswers;
//         const score = { correctAnswers, wrongAnswers, detailedResults };

//         navigate('/quizsummary', { state: score });
//     };

//     const theme = createTheme({
//         breakpoints: {
//             values: {
//                 xs: 0,
//                 sm: 600,
//                 md: 960,
//                 lg: 1280,
//                 xl: 1920,
//             },
//         },
//     });

//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     // Render buttons for True/False and Multiple Choice
//     const renderAnswerField = (question) => {
//         switch (question.type) {
//             case 'truefalse':
//                 return (
//                     <div className="answer-options">
//                         <Button
//                             variant={userAnswers[question.id] === 'true' ? 'contained' : 'outlined'}
//                             onClick={() => handleInputChange(question.id, 'true')}
//                             sx={{ mr: 2 }}
//                         >
//                             True
//                         </Button>
//                         <Button
//                             variant={userAnswers[question.id] === 'false' ? 'contained' : 'outlined'}
//                             onClick={() => handleInputChange(question.id, 'false')}
//                         >
//                             False
//                         </Button>
//                     </div>
//                 );
//             case 'multiplechoice':
//                 return (
//                     <div className="answer-options">
//                         {question.options.map((option, idx) => (
//                             <Button
//                                 key={idx}
//                                 variant={userAnswers[question.id] === option ? 'contained' : 'outlined'}
//                                 onClick={() => handleInputChange(question.id, option)}
//                                 sx={{ mr: 2, mb: 2 }}
//                             >
//                                 {option}
//                             </Button>
//                         ))}
//                     </div>
//                 );
//             case 'open-ended':
//             default:
//                 return (
//                     <TextField
//                         label="Your Answer"
//                         variant="outlined"
//                         value={userAnswers[question.id] || ''}
//                         onChange={(e) => handleInputChange(question.id, e.target.value)}
//                         sx={{ width: '100%' }}
//                     />
//                 );
//         }
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <Box
//                 sx={{
//                     backgroundImage: `url('/crystalbackground.png')`,
//                     backgroundSize: 'cover',
//                     minHeight: '100vh',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                 }}
//             >
//                 <AppBar
//                     position="static"
//                     style={{
//                         background: 'none',
//                         boxShadow: 'none',
//                         padding: '10px',
//                         marginTop: '10px',
//                     }}
//                 >
//                     <Toolbar
//                         style={{
//                             display: 'flex',
//                             flexDirection: isMobile ? 'column' : 'row',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <Box style={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
//                             <img src="/logo.png" alt="App Logo" style={{ width: 70 }} />
//                             <Typography
//                                 variant="h4"
//                                 style={{
//                                     fontFamily: 'Lato',
//                                     fontWeight: '900',
//                                     fontSize: '30px',
//                                     color: '#B18A00',
//                                     marginLeft: '10px',
//                                 }}
//                             >
//                                 EduDeck
//                             </Typography>
//                         </Box>
//                     </Toolbar>
//                 </AppBar>

//                 <Box className="welcome-back-page">
//                     <div className="title">
//                         <Typography
//                             variant="h3"
//                             style={{
//                                 fontFamily: 'Lato',
//                                 fontSize: '29px',
//                                 color: '#332D2D',
//                                 textAlign: 'center',
//                                 lineHeight: '55px',
//                             }}
//                         >
//                             {title}
//                         </Typography>
//                     </div>
//                     <div className="question">
//                         {questions.length > 0 ? (
//                             questions.map((question, index) => (
//                                 <div key={question.id} className="question-card">
//                                     <div className="counter">
//                                         {index + 1}/{totalQuestions}
//                                     </div>
//                                     <Typography variant="h6" className="question-label">
//                                         Question
//                                     </Typography>
//                                     <span className="question-text">
//                                         {question.dynamicInfo
//                                             ? `${question.dynamicInfo} ${question.question}` // Add AI dynamic content
//                                             : question.question}
//                                     </span>
//                                     <div className="text-field-bottom">{renderAnswerField(question)}</div>
//                                 </div>
//                             ))
//                         ) : (
//                             <Typography>Loading questions...</Typography>
//                         )}
//                     </div>
//                 </Box>

//                 <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
//                     <Button
//                         variant="contained"
//                         sx={{ backgroundColor: '#FFD234', fontFamily: 'Lato' }}
//                         onClick={submitQuiz}
//                     >
//                         <Typography>Submit</Typography>
//                     </Button>
//                 </Box>
//             </Box>
//         </ThemeProvider>
//     );
// }

// export default QuizManagementUI;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './QuizUI.css';
import { Typography, Box, TextField, Button, AppBar, Toolbar, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import '@fontsource/lato';

function QuizManagementUI() {
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

                // Fetch questions - AI-generated or from your API
                const response = await axios.get(`http://localhost:8080/api/flashcards/deck/${selectedDeckId}`);
                const flashcards = response.data;

                const fetchedQuestions = flashcards.map(flashcard => ({
                    id: flashcard.flashcardId,
                    question: flashcard.question,  // AI-generated or fetched question
                    answer: flashcard.answer,
                    type: flashcard.type || 'open-ended',  // Set default type
                    options: flashcard.options || [],      // Possible choices
                    dynamicInfo: flashcard.dynamicInfo || ''  // Any dynamic info from AI
                }));

                setQuestions(fetchedQuestions);
                setTotalQuestions(fetchedQuestions.length);
                setError(null);
            } catch (error) {
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
            [flashcardId]: value,
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

    const renderAnswerField = (question) => {
      // Check if the question contains "True or False:"
      const isTrueFalseQuestion = question.question.includes('True or False:');
  
      if (isTrueFalseQuestion) {
          return (
              <div className="question-section">
                  {/* Display the question */}
                  {/* <Typography variant="h6" className="question-label">
                      {question.question}
                  </Typography> */}
  
                  {/* Render True/False buttons */}
                  <div className="answer-options" style={{ marginTop: '10px' }}>
                      <Button
                          variant={userAnswers[question.id] === 'true' ? 'contained' : 'outlined'}
                          onClick={() => handleInputChange(question.id, 'true')}
                          sx={{ mr: 2 }}
                      >
                          True
                      </Button>
                      <Button
                          variant={userAnswers[question.id] === 'false' ? 'contained' : 'outlined'}
                          onClick={() => handleInputChange(question.id, 'false')}
                      >
                          False
                      </Button>
                  </div>
              </div>
          );
      }
  
      // Handle other types of questions
      switch (question.type) {
          case 'multiplechoice':
              return (
                  <div className="answer-options">
                      {question.options.map((option, idx) => (
                          <Button
                              key={idx}
                              variant={userAnswers[question.id] === option ? 'contained' : 'outlined'}
                              onClick={() => handleInputChange(question.id, option)}
                              sx={{ mr: 2, mb: 2 }}
                          >
                              {option}
                          </Button>
                      ))}
                  </div>
              );
          case 'open-ended':
          default:
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
            <Box
                sx={{
                    backgroundImage: `url('/crystalbackground.png')`,
                    backgroundSize: 'cover',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <AppBar
                    position="static"
                    style={{
                        background: 'none',
                        boxShadow: 'none',
                        padding: '10px',
                        marginTop: '10px',
                    }}
                >
                    <Toolbar
                        style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Box style={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
                            <img src="/logo.png" alt="App Logo" style={{ width: 70 }} />
                            <Typography
                                variant="h4"
                                style={{
                                    fontFamily: 'Lato',
                                    fontWeight: '900',
                                    fontSize: '30px',
                                    color: '#B18A00',
                                    marginLeft: '10px',
                                }}
                            >
                                EduDeck
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box className="welcome-back-page">
                    <div className="title">
                        <Typography
                            variant="h3"
                            style={{
                                fontFamily: 'Lato',
                                fontSize: '29px',
                                color: '#332D2D',
                                textAlign: 'center',
                                lineHeight: '55px',
                            }}
                        >
                            {title}
                        </Typography>
                    </div>
                    <div className="question">
                        {questions.length > 0 ? (
                            questions.map((question, index) => (
                                <div key={question.id} className="question-card">
                                    <div className="counter">
                                        {index + 1}/{totalQuestions}
                                    </div>
                                    <Typography variant="h6" className="question-label">
                                        Question
                                    </Typography>
                                    <span className="question-text">
                                        {question.dynamicInfo
                                            ? `${question.dynamicInfo} ${question.question}` // Add AI dynamic content
                                            : question.question}
                                    </span>
                                    <div className="text-field-bottom">{renderAnswerField(question)}</div>
                                </div>
                            ))
                        ) : (
                            <Typography>Loading questions...</Typography>
                        )}
                    </div>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#FFD234', fontFamily: 'Lato' }}
                        onClick={submitQuiz}
                    >
                        <Typography>Submit</Typography>
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default QuizManagementUI;