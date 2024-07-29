import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./ReviewSessionUI.css";
import { Typography, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TopAppBar from './TopAppBarUI';

function ReviewSessionUI() {
  const [flashcardTitle, setFlashcardTitle] = useState('Review Session');
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [error, setError] = useState(null);
  const [memorizedCards, setMemorizedCards] = useState({});

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const selectedDeckId = localStorage.getItem('selectedDeckId');
        if (!selectedDeckId) {
          throw new Error('No deck selected');
        }
        const response = await axios.get(`http://localhost:8080/api/flashcards/deck/${selectedDeckId}`);
        const flashcardsData = response.data;

        const mappedFlashcards = flashcardsData.map(card => ({
          front: card.question || card.front,
          back: card.answer || card.back
        }));

        setFlashcards(mappedFlashcards);
        setError(null); 
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        setError('An error occurred while fetching flashcards. Please try again later.');
      }
    };

    fetchFlashcards();

    const selectedDeck = localStorage.getItem('selectedDeck');
    setFlashcardTitle(selectedDeck || 'Untitled Deck');
  }, []);

  const showAnswer = () => {
    setIsFlipped(!isFlipped); 
  };

  const buttonText = isFlipped ? 'Show Question' : 'Show Answer';

  const toggleMemorized = () => {
    setMemorizedCards({
      ...memorizedCards,
      [currentCardIndex]: !memorizedCards[currentCardIndex]
    });
  };

  const handleNextClick = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setCurrentNumber(currentNumber + 1);
      setIsFlipped(false);
    }
  };

  const handlePreviousClick = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setCurrentNumber(currentNumber - 1);
      setIsFlipped(false);
    }
  };

  const calculateProgressWidth = () => {
    return `${(currentNumber / flashcards.length) * 100}%`;
  };

  const isMemorized = memorizedCards[currentCardIndex] || false;
  const currentFlashcard = flashcards[currentCardIndex];

  return (
    <div className="lsbody">
      <TopAppBar />

      <div className="center-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <Typography variant="h5" style={{ textAlign: 'center' }}>{flashcardTitle}</Typography>
        {error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : flashcards.length > 0 ? (
          <>
            <div className={`inner-panel ${isFlipped ? 'flipped' : ''}`} onClick={showAnswer} style={{ position: 'relative' }}>
              {isMemorized && (
                <div className="memorized-star">
                  <img
                    src="/star.png"
                    alt="Star"
                    style={{
                      width: '50px',
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
            <span className="indicator">{`${currentNumber}/${flashcards.length}`}</span>
          </>
        ) : (
          <Typography>Loading flashcards...</Typography>
        )}
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: calculateProgressWidth() }}></div>
      </div>

      <div className="show-answer-button">
        <IconButton
          className="action-button"
          onClick={handlePreviousClick}
          disabled={currentCardIndex === 0}
        >
          <ArrowBackIcon />
        </IconButton>
        <Button className="showanswer"
          variant="contained"
          onClick={showAnswer}
          style={{
            backgroundColor: '#ffd234',
            borderRadius: '2em'
          }}
          sx={{
            width: '150px',
            height: '35px',
          }}
        >
          {buttonText}
        </Button>
        <IconButton
          className="action-button"
          onClick={handleNextClick}
          disabled={currentCardIndex === flashcards.length - 1}
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
      <div className="Memorized" style={{ marginTop: 'auto', marginBottom: '20px', textAlign: 'center' }}>
        <Button variant="contained" onClick={toggleMemorized}>
          {isMemorized ? "Unmark as Memorized" : "Mark as Memorized"}
        </Button>
      </div>
    </div>
  );
}

export default ReviewSessionUI;
