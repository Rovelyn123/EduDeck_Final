import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenerateFlashcard = () => {
  const [documentId, setDocumentId] = useState('');
  const [deckId, setDeckId] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    setDocumentId('12');
    setDeckId('10');
  }, []);

  const extractText = async () => {
    try {
      // Step 1: Extract text from the document
      const response = await axios.get(`http://localhost:8080/textextractor/document/${documentId}`);
      setExtractedText(response.data);
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };

  const generateFlashcards = async () => {
    try {
      // Step 2: Send extracted text to generate flashcards
      await axios.post(`http://localhost:8080/generate-flashcards/${deckId}`, extractedText);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    }
  };

  const fetchFlashcards = async () => {
    try {
      // Step 3: Fetch flashcards for the deck
      const flashcardsResponse = await axios.get(`http://localhost:8080/api/flashcards/deck/${deckId}`);
      setFlashcards(flashcardsResponse.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  return (
    <div>
      <label htmlFor="documentId">Document ID:</label>
      <input type="text" id="documentId" value={documentId} onChange={(e) => setDocumentId(e.target.value)} />
      <br />
      <label htmlFor="deckId">Deck ID:</label>
      <input type="text" id="deckId" value={deckId} onChange={(e) => setDeckId(e.target.value)} />
      <br />
      <button onClick={extractText}>Extract Text</button>
      <button onClick={generateFlashcards} disabled={!extractedText}>Generate Flashcards</button>
      <button onClick={fetchFlashcards} disabled={!extractedText}>Display Flashcards</button>

      <h2>Extracted Text:</h2>
      <pre>{extractedText}</pre>

      <h2>Flashcards:</h2>
      <ul>
        {flashcards.map((flashcard, index) => (
          <li key={index}>{flashcard.question} - {flashcard.answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenerateFlashcard;
