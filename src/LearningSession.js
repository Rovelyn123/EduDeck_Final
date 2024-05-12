import React, { useState, useEffect } from "react";
import "./LearningSession.css";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import axios from 'axios';

function LearningSession() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState({
    "Rizal's Lovers": [
      { front: 'Who was Jose Rizal’s puppy love?', back: 'Segunda Katigbak' },
      { front: 'Unfortunately, _______’s mother disapproved of her daughter’s relationship with Rizal, who was then a known filibustero.', back: 'Leonor Rivera' },
      { front: 'Who was Jose Rizal’s true love in exile?', back: 'Josephine Bracken' }
    ]
  });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(1);

  const showAnswer = () => {
    setIsFlipped(!isFlipped); // Toggle the flip state
  };

  const buttonText = isFlipped ? 'Show Question' : 'Show Answer';

  const [memorizedCards, setMemorizedCards] = useState({}); // State to track memorized cards

  const toggleMemorized = () => {
    setMemorizedCards({
      ...memorizedCards,
      [currentCardIndex]: !memorizedCards[currentCardIndex]
    });
  };

  const handleNextClick = () => {
    const nextIndex = (currentCardIndex + 1) % flashcards["Rizal's Lovers"].length;
    setCurrentCardIndex(nextIndex);
    setCurrentNumber(currentNumber + 1 > 20 ? 20 : currentNumber + 1); // Update the current number
    // Reset flip state when switching to a new card
    setIsFlipped(false);
  };

  const handlePreviousClick = () => {
    const prevIndex = (currentCardIndex - 1 + flashcards["Rizal's Lovers"].length) % flashcards["Rizal's Lovers"].length;
    setCurrentCardIndex(prevIndex);
    setCurrentNumber(currentNumber - 1 < 1 ? 1 : currentNumber - 1); // Update the current number
    // Reset flip state when switching to a new card
    setIsFlipped(false);
  };

  const calculateProgressWidth = () => {
    return `${(currentNumber / 20) * 100}%`; // Calculate the width as a percentage
  };

  const isMemorized = memorizedCards[currentCardIndex] || false;

  const currentFlashcard = flashcards["Rizal's Lovers"][currentCardIndex];

  const fetchLearningSessions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/LearningSession/getAllLearningSession');
      const learningSessions = response.data; // Assuming your API returns data in JSON format
      console.log('Learning Sessions:', learningSessions);
      // Perform further actions with the retrieved data (e.g., set state, display data)
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors accordingly
    }
  };

  const handleFetchLearningSessions = () => {
    fetchLearningSessions();
  };

    return (
    <>
    <div className="welcome-back-page">
        <AppBar style={{background: 'none', boxShadow: 'none', padding: '10px', marginTop: '10px'}}>
            <Toolbar>
                <img src= "/logo.png" alt="App Logo" style={{width: 100, marginLeft: '50px'}}/>
                <Typography variant="h3" style={{fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '40px',color: '#B18A00'}}
                >AcadZen
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '100px'}}>
                    <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '1101px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                        <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px',color: '#332D2D', textAlign: 'center', lineHeight: '55px' }}
                        >Learning Session
                        </Typography>
                    </div>
                </div>
                <Box style={{ background: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '70px'}}>
                    <Box style={{ background: '#FAC712', borderRadius: '10px', width: '50px', height: '50px'}}>
                      <Link to='/dashboard' style={{textDecoration:'none'}}>
                        <IconButton color="black" style={{ fontSize: '45px'}}>
                          <HomeIcon style={{ fontSize: '80%', width: '100%'}} />
                        </IconButton>
                      </Link>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
        
        <div className="center-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <Typography variant="h4" style={{ textAlign: 'center' }}>Rizal's Lover</Typography>
          <div className="inner-panel" style={{ position: 'relative' }}>
            {isMemorized && (
              <div className="memorized-star">
                <img
                  src="/star.png"
                  alt="Star"
                  style={{
                    width: '80px', // Increase the width for a larger star
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                  }}
                />
              </div>
            )}
            <div
              className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}
              onClick={showAnswer}
            >
              <div className="front">
                <Typography variant="h4">{currentFlashcard.front}</Typography>
              </div>
              <div className="back">
                <Typography variant="h4">{currentFlashcard.back}</Typography>
              </div>
            </div>
          </div>
          <span className="indicator">{`${currentNumber}/20`}</span>
        </div>

            <div className="progress-bar">
                    <div className="progress" style={{ width: calculateProgressWidth() }}></div>
                </div>

                <div className="show-answer-button">
                <IconButton className="action-button" onClick={handlePreviousClick}>
                    <ArrowBackIcon />
                </IconButton>
                <Button variant="contained"  
                onClick={showAnswer}
                sx={{
                        width: '150px', // Adjust width as needed
                        height: '45px', // Adjust height as needed 
                    }}>
                {buttonText}
                </Button>

                <IconButton className="action-button" onClick={handleNextClick}>
                    
                    <ArrowForwardIcon />
                </IconButton>
            </div >
                <div className="Memorized" style={{ marginTop: 'auto', marginBottom: '20px', textAlign: 'center'}}>
                <Button variant="contained" onClick={toggleMemorized}>
                    Marked as Memorized
                </Button>
                <Button onClick={handleFetchLearningSessions}>
                  Fetch Learning Sessions
                </Button>
            </div>
            
    </div>

    </>
    );
}

export default LearningSession;