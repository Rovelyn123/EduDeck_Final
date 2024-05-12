import React, { useState } from 'react';
import "./QuizSession.css";
import { AppBar, Toolbar, Typography, IconButton, Box, TextField } from "@mui/material";

const QuizSession = () => {
    // Array of questions
    const questions = [
        "What is the capital of France?",
        "What is the capital of Brazil?",
        "What is the capital of Philippines?",
        // Add more questions as needed
    ];

  return (
    <div className="welcome-back-page">
      <AppBar style={{background: 'none', boxShadow: 'none', padding: '10px', marginTop: '10px'}}>
        <Toolbar>
          <img src="/logo.png" alt="App Logo" style={{width: 100, marginLeft: '50px'}}/>
          <Typography variant="h3" style={{fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '40px',color: '#B18A00'}}>
            AcadZen
          </Typography>
        </Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '100px'}}>
          <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '1101px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
            <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px',color: '#332D2D', textAlign: 'center', lineHeight: '55px' }}>
              Test Quiz
            </Typography>
          </div>
        </div>
      </AppBar>
        <div className="title">
          <Typography variant="h3" style={{ fontFamily: "Roboto Condensed", fontSize: '35px',color: '#332D2D', textAlign: 'center', lineHeight: '55px' }}>Rizal's Lovers</Typography>
        </div>
        <div className="question">
                {questions.map((question, index) => (
                    <div key={index} className="question-card">
                        <div className="counter">{index + 1}/20</div>
                        <Typography variant="h6" className="question-label">Question</Typography>
                        <span className="question-text">{question}</span>
                        <div className="text-field-bottom">
                            <TextField label="Your Answer" variant="outlined" style={{ width: '800px' }}/>
                        </div>
                    </div>
                ))}
            </div>
      </div>
  );
};

export default QuizSession;
