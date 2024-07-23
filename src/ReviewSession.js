import React, { useState } from "react";
import "./ReviewSession.css";
import { Typography, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TopAppBar from './TopAppBar';

function ReviewSession() {
  const [flashcardTitle, setFlashcardTitle] = useState('Rizal Lovers');
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards] = useState({
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

  return (
    <div className="lsbody">
      <TopAppBar/>

      <div className="center-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <Typography variant="h5" style={{ textAlign: 'center' }}>{flashcardTitle}</Typography>
        <div className={`inner-panel ${isFlipped ? 'flipped' : ''}`} onClick={showAnswer} style={{ position: 'relative' }}>
          {isMemorized && (
            <div className="memorized-star">
              <img
                src="/star.png"
                alt="Star"
                style={{
                  width: '50px', // Increase the width for a larger star
                  position: 'absolute',
                  top: '10px',
                  right: '10px'
                }}
              />
            </div>
          )}
          <div className="flashcard-container">
            <div className="flashcard">
              <div className="front">
                <Typography variant="h5">{currentFlashcard.front}</Typography>
              </div>
              <div className="back">
                <Typography variant="h5">{currentFlashcard.back}</Typography>
              </div>
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
        <Button className="showanswer"
          variant="contained"
          onClick={showAnswer}

          style={{
            backgroundColor: '#ffd234',
            borderRadius:'2em'
          }}

          sx={{
            width: '150px', // Adjust width as needed
            height: '35px', // Adjust height as needed
          }}
        >
          {buttonText}
        </Button>

        <IconButton className="action-button" onClick={handleNextClick}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
      <div className="Memorized" style={{ marginTop: 'auto', marginBottom: '20px', textAlign: 'center' }}>
        <Button variant="contained" onClick={toggleMemorized}>
          Mark as Memorized
        </Button>
      </div>
    </div>
  );
}

export default ReviewSession;
