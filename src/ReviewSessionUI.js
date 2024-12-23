import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./ReviewSessionUI.css";
import { Typography, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TopAppBar from './TopAppBarUI';
import '@fontsource/lato';
import { useLocation, useNavigate } from 'react-router-dom';
import BASE_URL from "./config";

function ReviewSessionUI() {
  const [flashcardTitle, setFlashcardTitle] = useState('Review Session');
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [error, setError] = useState(null);
  const [memorizedCards, setMemorizedCards] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [totalFlashcards, setTotalFlashcards] = useState(0);
  const [isSessionEnded, setIsSessionEnded] = useState(false); // Add session ended flag

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDeckId: deckIdFromState } = location.state || {};
  const isSessionEnding = useRef(false); // To prevent multiple session end triggers

  // Initialize the session when the component mounts
  useEffect(() => {
    const initializeSession = async () => {
      const existingSessionId = localStorage.getItem('reviewSessionId');
      const existingCardIndex = parseInt(localStorage.getItem('currentCardIndex'), 10);
      const existingMemorized = JSON.parse(localStorage.getItem('memorizedCards')) || {};

      // Restore memorized flashcards state
      setMemorizedCards(existingMemorized);

      if (existingSessionId) {
        // Restore session state from localStorage
        setSessionId(existingSessionId);
        setCurrentCardIndex(isNaN(existingCardIndex) ? 0 : existingCardIndex);
        fetchFlashcards(existingSessionId);
      } else {
        // Create a new session if no existing session is found
        createReviewSession();
      }
    };

    const createReviewSession = async () => {
      const userId = localStorage.getItem('userid');
      const startTime = new Date().toISOString();
      const deckId = deckIdFromState || localStorage.getItem('selectedDeckId');

      if (!userId || !deckId) {
        console.error('User ID or Deck ID is missing');
        setError('User ID or Deck ID is missing');
        return;
      }

      const sessionData = {
        user: { userid: userId },
        flashcardDeck: { deckId: deckId },
        startTime: startTime,
      };

      try {
        const response = await axios.post(`${BASE_URL}/api/ReviewSession/create`, sessionData);
        const { reviewSessionId } = response.data;
        setSessionId(reviewSessionId);
        localStorage.setItem('reviewSessionId', reviewSessionId); // Persist session ID
        setCurrentCardIndex(0); // Start from the first flashcard
        localStorage.setItem('currentCardIndex', 0); // Persist index as 0
        fetchFlashcards(reviewSessionId); // Fetch flashcards after session creation
      } catch (error) {
        console.error('Error creating review session:', error);
        setError('Failed to create review session. Please try again.');
      }
    };

    initializeSession();
  }, [deckIdFromState]);

  // Fetch flashcards and set the flashcard title
  const fetchFlashcards = async (sessionId) => {
    const deckId = deckIdFromState || localStorage.getItem('selectedDeckId');
    setSelectedDeckId(deckId);

    if (deckId) {
      try {
        const response = await axios.get(`${BASE_URL}/api/flashcards/deck/${deckId}`);
        setFlashcards(response.data);
        setTotalFlashcards(response.data.length);

        const deckResponse = await axios.get(`${BASE_URL}/api/decks/getFlashcardDeckById/${deckId}`);
        setFlashcardTitle(deckResponse.data.title);
      } catch (error) {
        console.error('Error fetching flashcards or deck title:', error);
      }
    }
  };

  const addRecentActivity = (deckTitle, flashcardCount) => {
    const userId = localStorage.getItem('userid');  // Get the logged-in user's ID
    if (!userId) return;  // If userId is missing, don't save

    // Get all user-specific activities from localStorage
    const allUserActivities = JSON.parse(localStorage.getItem('recentActivities')) || {};
    
    // Initialize userActivities as an empty array if undefined
    let userActivities = allUserActivities[userId] || [];
    
    if (!Array.isArray(userActivities)) {
        userActivities = [];  // Ensure it's an array
    }

    // Add the new activity to this user's history
    userActivities.unshift({
        deckTitle: deckTitle,
        flashcardCount: flashcardCount,
        timestamp: new Date().toISOString(), // Timestamp for sorting or display
    });

    // Keep only the last 5 activities per user
    if (userActivities.length > 5) {
        userActivities.pop();  // Remove the oldest entry if the list exceeds 5 activities
    }

    // Update the user's activity in the all activities object
    allUserActivities[userId] = userActivities;

    // Save back to localStorage
    localStorage.setItem('recentActivities', JSON.stringify(allUserActivities));
};


  // Toggle the memorized status of a flashcard and persist the change
  const toggleMemorized = async () => {
    const isMemorized = !memorizedCards[currentCardIndex];

    try {
      await axios.put(`${BASE_URL}/api/ReviewSession/markMemorized`, null, {
        params: {
          reviewSessionId: sessionId,
          flashcardId: flashcards[currentCardIndex]?.id,
          isMemorized,
        },
      });

      const updatedMemorizedCards = {
        ...memorizedCards,
        [currentCardIndex]: isMemorized,
      };
      setMemorizedCards(updatedMemorizedCards);
      localStorage.setItem('memorizedCards', JSON.stringify(updatedMemorizedCards)); // Persist memorized status
    } catch (error) {
      console.error('Error updating memorized status:', error);
    }
  };

  // Navigate to the next flashcard and persist the current index
  const handleNextClick = async () => {
    if (isSessionEnded) return; // Prevent interaction if session is ended
    if (currentCardIndex < flashcards.length - 1) {
      const newIndex = currentCardIndex + 1;
      setCurrentCardIndex(newIndex);
      localStorage.setItem('currentCardIndex', newIndex); // Persist current card index

      try {
        await axios.put(`${BASE_URL}/api/ReviewSession/updateCurrentIndex`, null, {
          params: {
            reviewSessionId: sessionId,
            currentCardIndex: newIndex,
            isMemorized: memorizedCards[newIndex] || false,
          },
        });
      } catch (error) {
        console.error('Error updating current card index:', error);
      }
    } else {
      // If at the last flashcard, end the session and navigate to the review result page
      if (!isSessionEnding.current) {
        isSessionEnding.current = true; // Prevent multiple calls to end session
        endSession();
      navigateToReviewResults();
      }
    }
  };

  const navigateToReviewResults = () => {
    navigate('/reviewresult'); // Use the navigate function instead of history.push
  };

  // Navigate to the previous flashcard and persist the current index
  const handlePreviousClick = () => {
    if (isSessionEnded) return; // Prevent interaction if session is ended
    if (currentCardIndex > 0) {
      const newIndex = currentCardIndex - 1;
      setCurrentCardIndex(newIndex);
      localStorage.setItem('currentCardIndex', newIndex); // Persist current card index
    }
  };

const endSession = async () => {
  try {
    const endTime = new Date().toISOString();

    await axios.put(`${BASE_URL}/api/ReviewSession/endSession`, null, {
      params: {
        reviewSessionId: sessionId,
        endTime: endTime,
      },
    });

    // Clean up session-related local storage
    localStorage.removeItem('reviewSessionId');
    localStorage.removeItem('currentCardIndex');
    localStorage.removeItem('memorizedCards');

    // Mark the session as ended and navigate to review result
    setIsSessionEnded(true);

    // Add to recent activities when session ends
    addRecentActivity(flashcardTitle, flashcards.length);

    navigate('/reviewresult', { 
      state: { 
        sessionId,
        totalFlashcards: flashcards.length,
        reviewedFlashcards: currentCardIndex + 1,
        deckName: flashcardTitle
      } 
    });
  } catch (error) {
    console.error('Error ending the session:', error);
  }
};


  // Toggle the flashcard to show the answer or the question
  const showAnswer = () => {
    setIsFlipped(!isFlipped);
  };

  const buttonText = isFlipped ? 'FLIP' : 'FLIP';
  const isMemorized = memorizedCards[currentCardIndex] || false;
  const currentFlashcard = flashcards[currentCardIndex];

  return (
    <div className="lsbody">
      <TopAppBar />
      <div className="center-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <Typography variant="h5" style={{ textAlign: 'center', fontFamily: 'Lato' }}>{flashcardTitle}</Typography>
        {error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : flashcards.length > 0 ? (
          <>
            <div className={`inner-panel ${isFlipped ? 'flipped' : ''}`} onClick={showAnswer} style={{ position: 'relative' }}>
              {isMemorized && (
                <div className="memorized-star">
                  <img src="/star.png" alt="Star" style={{ width: '50px', position: 'absolute', top: '10px', right: '10px' }} />
                </div>
              )}
              <div className="flashcard-container">
                <div className="flashcard">
                {isFlipped ? <p className="answerlabel">ANSWER</p> : <p className="questionlabel">QUESTION</p>}
                  <div className="front">
                    <Typography variant="h5">{currentFlashcard?.question || 'Loading...'}</Typography>
                  </div>
                  <div className="back">
                    <Typography variant="h5">{currentFlashcard?.answer || 'Loading...'}</Typography>
                  </div>
                </div>
              </div>
            </div>
            <span className="indicator">{`${currentCardIndex + 1}/${totalFlashcards}`}</span>
          </>
        ) : (
          <Typography>Loading flashcards...</Typography>
        )}
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${((currentCardIndex + 1) / totalFlashcards) * 100}%` }}></div>
      </div>
      <div className="show-answer-button">
  <IconButton
    className="action-button"
    onClick={handlePreviousClick}
    disabled={currentCardIndex === 0} // Disable when on the first card
  >
    <ArrowBackIcon />
  </IconButton>
  
  <Button className="showanswer" variant="contained" onClick={showAnswer} 
  style={{
      backgroundColor: '#ffd234',
      borderRadius: '2em',
      fontFamily: 'Lato',
      fontWeight: '600',
      width: '150px',
      height: '35px',
    }}>
    {buttonText}
  </Button>

  <IconButton
    className="action-button"
    onClick={handleNextClick}
    disabled={currentCardIndex === flashcards.length - 1} // Disable the next button when on the last card
  >
    <ArrowForwardIcon />
  </IconButton>
</div>

{currentCardIndex === flashcards.length - 1 && (
  <Button
    className="finish-session-button"
    variant="contained"
    onClick={endSession}
  >
    DONE
  </Button>
)}

      <div className="Memorized" style={{ textAlign: 'center', fontFamily: 'Lato', fontWeight: '700' }}>
        <Button variant="contained" onClick={toggleMemorized}>
          {isMemorized ? "Unmark as Memorized" : "Mark as Memorized"}
        </Button>
      </div>
    </div>
  );
}

export default ReviewSessionUI;