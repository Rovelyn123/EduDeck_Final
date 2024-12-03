import React, { useState, useEffect } from "react";
import axios from 'axios';
//import "./ReviewSessionUI.css";
import { Typography, IconButton, Button, Box, useMediaQuery } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TopAppBar from './TopAppBarUI';
import '@fontsource/lato';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "./config";

function ReviewResultUI() {
  const [flashcardTitle, setFlashcardTitle] = useState('Review Session');
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [error, setError] = useState(null);
  const [memorizedCards, setMemorizedCards] = useState({});
  const [isCompleted, setIsCompleted] = useState(false); // Completion screen state
  const [percentage, setPercentage] = useState(100);
  const location = useLocation();
  const [totalCards, setTotalCards] = useState(0);
  const [flashcardName, setFlashcardName] = useState('cards');
  const { reviewedFlashcards, totalFlashcards, deckName } = location.state || {};
  const navigate = useNavigate();


  // Save progress to localStorage
  useEffect(() => {
    const savedCardIndex = localStorage.getItem('currentCardIndex');
    const savedMemorizedCards = localStorage.getItem('memorizedCards');

    if (savedCardIndex) {
      setCurrentCardIndex(parseInt(savedCardIndex, 10));
      setCurrentNumber(parseInt(savedCardIndex, 10) + 1);
    }

    if (savedMemorizedCards) {
      setMemorizedCards(JSON.parse(savedMemorizedCards));
    }
  }, []);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const selectedDeckId = localStorage.getItem('selectedDeckId');
        if (!selectedDeckId) {
          throw new Error('No deck selected');
        }
        const response = await axios.get(`${BASE_URL}/api/flashcards/deck/${selectedDeckId}`);
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

  // Save progress and memorized cards to localStorage when they change
  useEffect(() => {
    localStorage.setItem('currentCardIndex', currentCardIndex.toString());
    localStorage.setItem('memorizedCards', JSON.stringify(memorizedCards));
  }, [currentCardIndex, memorizedCards]);

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
    } else {
      setIsCompleted(true); // Mark session as complete when finished
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

  const handleRestart = async () => {
    try {
      // Create a new review session similar to how it's done in ReviewSessionUI
      const userId = localStorage.getItem('userid');
      const deckId = localStorage.getItem('selectedDeckId');
  
      if (!userId || !deckId) {
        console.error('User ID or Deck ID is missing');
        return;
      }
  
      const startTime = new Date().toISOString();
      const sessionData = {
        user: { userid: userId },
        flashcardDeck: { deckId: deckId },
        startTime: startTime,
      };
  
      // Create a new session and get the sessionId
      const response = await axios.post(`${BASE_URL}/api/ReviewSession/create`, sessionData);
      const { reviewSessionId } = response.data;
  
      // Reset session-related local storage
      localStorage.setItem('reviewSessionId', reviewSessionId);
      localStorage.setItem('currentCardIndex', 0); // Start from the beginning
  
      // Navigate back to the review session UI
      navigate('/reviewsession', { state: { selectedDeckId: deckId } });
    } catch (error) {
      console.error('Error restarting the session:', error);
    }
  };
  

    return (
      <div className="completion-screen" style={{ textAlign: 'center', background: '#f4f4f4', backgroundImage: `url('/crystalbackground.png')`, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',  minHeight: isMobile ? '120vh' : '0', overflow: isMobile ? 'scroll' : 'hidden'}}>
        <TopAppBar />
        <div className="completion-content" 
            style={{
                backgroundColor: "#FFFFFF",
                width: isMobile ? '80%' : '65%',
                top: isMobile ? '5%' : '0%',
                height: isMobile ? '420px' : '300px',
                marginLeft: isMobile ? '0%' : '2%',
                marginTop: isMobile ? '5%' : '5%',
                borderRadius: '1em',
                boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.25)',
                position: 'relative'
            }}>
        <Box style={{
                width: isMobile ? '180px' : '200px',
                height: isMobile ? '180px' : '200px',
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
            <Box style={{
                        position: 'absolute',
                        top: isMobile ? '65%' : '30%',
                        left: isMobile ? '0%' : '-10%',
                        width: '100%',
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
                            Well done! You've gone through all your cards.
                        </Typography>
                    </Box>
                    <Box style={{
                        position: 'absolute',
                        top: isMobile ? '75%' : '50%',
                        left: isMobile ? '0%' : '-10%',
                        width: '100%',
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
                            {reviewedFlashcards} / {totalFlashcards} 
                        </Typography>
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
                          {deckName}
                        </Typography>
                    </Box>
              </div>

          <div 
            className="next-steps" 
            style={{ 
              display: 'grid', 
              gap: '15px', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', // Stack buttons on mobile, two columns on larger screens
              marginTop: isMobile ? '15%' : '3%',
              padding: isMobile ? '0 10px' : '0' // Add padding for mobile
            }}
          >
            {/* Study Unmemorized Cards Button */}
            {/* <Button
              variant="contained"
              sx={{'&:hover': {transform: 'scale(1.05)'}}}
              style={{ 
                height: 'auto', 
                width: '100%', 
                fontFamily: 'Lato', 
                backgroundColor: '#fff', 
                color: '#000', 
                fontWeight: 'bold', 
                borderRadius: '15px', 
                padding: '15px 20px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => {}}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="star_icon.png" alt="icon" style={{ width: '30px', marginRight: '10px' }} />
                <div style={{ textAlign: 'left' }}>
                  <Typography style={{ fontWeight: 'bold', fontSize: '1em' }}>Study Unmemorized Cards</Typography>
                  <Typography style={{ fontSize: '0.8em', color: '#555' }}>Focus on the cards you unmark.</Typography>
                </div>
              </div>
              <div style={{ fontSize: '1.5em', color: '#555' }}> </div>
            </Button> */}

            {/* Start Quiz Button */}
            {/* <Button
              variant="contained"
              sx={{'&:hover': {transform: 'scale(1.05)'}}}
              style={{ 
                height: 'auto', width: '100%', fontFamily: 'Lato', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', borderRadius: '15px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => {}}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="quiz_icon.png" alt="icon" style={{ width: '30px', marginRight: '10px' }} />
                <div style={{ textAlign: 'left' }}>
                  <Typography style={{ fontWeight: 'bold', fontSize: '1em' }}>Start Quiz</Typography>
                  <Typography style={{ fontSize: '0.8em', color: '#555' }}>Test your knowledge now!</Typography>
                </div>
              </div>
              <div style={{ fontSize: '1.5em', color: '#555' }}> </div>
            </Button> */}

            {/* Restart Flashcards Button */}
            <Button
              variant="contained"
              sx={{'&:hover': {transform: 'scale(1.05)'}}}
              style={{ 
                height: 'auto', width: '100%', fontFamily: 'Lato',  backgroundColor: '#fff', color: '#000', fontWeight: 'bold', borderRadius: '15px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              onClick={handleRestart}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="restart_icon.png" alt="icon" style={{ width: '30px', marginRight: '10px' }} />
                <div style={{ textAlign: 'left' }}>
                  <Typography style={{ fontWeight: 'bold', fontSize: '1em' }}>Restart Flashcards</Typography>
                  <Typography style={{ fontSize: '0.8em', color: '#555' }}>Study all the cards from the beginning.</Typography>
                </div>
              </div>
              <div style={{ fontSize: '1.5em', color: '#555' }}> </div>
            </Button>

            {/* Select New Flashcard Deck Button */}
            <Button
              variant="contained"
              sx={{'&:hover': {transform: 'scale(1.05)'}}}
              style={{ 
                height: 'auto', width: '100%', fontFamily: 'Lato', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', borderRadius: '15px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'}}
              component={Link} 
              to="/flashcardsmgt"
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="deck_icon.png" alt="icon" style={{ width: '30px', marginRight: '10px' }} />
                <div style={{ textAlign: 'left' }}>
                  <Typography style={{ fontWeight: 'bold', fontSize: '1em' }}>Select New Flashcard Deck</Typography>
                  <Typography style={{ fontSize: '0.8em', color: '#555' }}>Choose a new flashcard set.</Typography>
                </div>
              </div>
              <div style={{ fontSize: '1.5em', color: '#555' }}></div>
            </Button>
          </div>

                </div>
              );
}

export default ReviewResultUI;
