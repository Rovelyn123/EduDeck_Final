import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlashcardGenerator = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateFlashcards = async () => {
      try {
        const response = await axios.post('http://localhost:8080/generate-flashcards?deckId=5', { lessonText: "Scope management is a critical aspect of project management that involves defining, controlling, and managing what is and is not included in a project. It encompasses the processes required to ensure that the project includes all the work required to complete it successfully while excluding any unnecessary work." });

        if (Array.isArray(response.data)) {
          setFlashcards(response.data);
          setLoading(false);
        } else {
          setError('Invalid response format');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error generating flashcards:', error);
        setError('Failed to generate flashcards');
        setLoading(false);
      }
    };

    generateFlashcards();
}, []);

  const handleSaveFlashcards = () => {
    // Handle saving flashcards
    console.log('Flashcards saved!');
  };

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center', fontSize: '24px', color: 'gray', marginTop: '50px' }}>
          Generating flashcards...
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', fontSize: '24px', color: 'red', marginTop: '50px' }}>
          {error}
        </div>
      ) : (
        <div>
          {flashcards.map((flashcard, index) => (
            <div key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px' }}>
              <div style={{ fontWeight: 'bold' }}>Question:</div>
              <div>{flashcard.question}</div>
              <div style={{ fontWeight: 'bold', marginTop: '10px' }}>Answer:</div>
              <div>{flashcard.answer}</div>
            </div>
          ))}
          <button onClick={handleSaveFlashcards}>Save Flashcards</button>
        </div>
      )}
    </div>
  );
};

export default FlashcardGenerator;
