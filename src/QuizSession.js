import React, { useState, useEffect } from 'react';
import "./QuizSession.css";
import { Typography, Box, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QuizTopBar from "./QuizTopBar";

const QuizSession = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Function to fetch or generate questions
        const fetchQuestions = () => {
            // This is where you retrieve the questions from the document
            // For demonstration, we will simulate this with a timeout
            setTimeout(() => {
                const generatedQuestions = [
                    "Who was Jose Rizal’s puppy love?",
                    "Unfortunately, _______’s mother disapproved of her daughter’s relationship with Rizal, who was then a known filibustero.",
                    "Who was Jose Rizal’s true love in exile?",
                    "What does UML stand for?",
                    "Explain the purpose of a use case diagram.",
                    "Define scope creep.",
                    "What are the key elements of a project scope statement?",
                    // Add more questions as needed
                ];
                setQuestions(generatedQuestions);
            }, 1000);
        };

        fetchQuestions();
    }, []);

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
            <Box sx={{
                backgroundImage: `url('/crystalbackground.png')`,
                backgroundSize: 'cover',
                minHeight: { xs: '150vh', md: '100vh' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <div className="welcome-back-page">
                    <QuizTopBar />
                    <div className="title">
                        <Typography variant="h3" style={{ fontFamily: "Roboto Condensed", fontSize: '29px', color: '#332D2D', textAlign: 'center', lineHeight: '55px' }}>
                            Rizal's Lovers
                        </Typography>
                    </div>
                    <div className="question">
                        {questions.length > 0 ? questions.map((question, index) => (
                            <div key={index} className="question-card">
                                <div className="counter">{index + 1}/20</div>
                                <Typography variant="h6" className="question-label">Question</Typography>
                                <span className="question-text">{question}</span>
                                <div className="text-field-bottom">
                                    <TextField label="Your Answer" variant="outlined" style={{ width: '800px', backgroundColor: '#f5f2d8' }} />
                                </div>
                            </div>
                        )) : (
                            <Typography>Loading questions...</Typography>
                        )}
                    </div>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
                    <Button variant="contained" sx={{backgroundColor: '#FFD234'}}>
                        <Typography>Submit</Typography>
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default QuizSession;
