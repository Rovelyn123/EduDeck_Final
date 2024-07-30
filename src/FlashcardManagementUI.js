import React, { useState } from "react";
import "./flashcardmanagement.css";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, SwipeableDrawer, useMediaQuery, useTheme, Divider, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FlashcardManagementUI() {
    const userid = localStorage.getItem('userid');

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openConfirmDeleteDeckDialog, setOpenConfirmDeleteDeckDialog] = useState(false);
    const [openNewDeckDialog, setOpenNewDeckDialog] = useState(false);
    const [currentFlashcard, setCurrentFlashcard] = useState(null);
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [newDeckTitle, setNewDeckTitle] = useState("");
    const [decks, setDecks] = useState([]);
    const [flashcards, setFlashcards] = useState([]);
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedDeck, setSelectedDeck] = useState(() => {
        return localStorage.getItem('selectedDeck') || '';
    });
    const [selectedDeckId, setSelectedDeckId] = useState(() => {
        return localStorage.getItem('selectedDeckId') || '';
    });

    useEffect(() => {
        const fetchDecks = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/decks/getDecksByUser/${userid}`);
            setDecks(response.data);
          } catch (error) {
            console.error("Error fetching decks:", error);
          }
        };
        fetchDecks();
      }, [userid]);

    useEffect(() => {
        if (selectedDeckId) {
            const fetchFlashcards = async () => {
                try {
                  const flashcardsResponse = await axios.get(`http://localhost:8080/api/flashcards/deck/${selectedDeckId}`);
                  setFlashcards(flashcardsResponse.data);
                } catch (error) {
                  console.error('Error fetching flashcards:', error);
                }
              };
            fetchFlashcards();
        }
    }, [selectedDeckId]);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsBoxVisible(open);
    };

    const handleEditClick = (flashcard) => {
        setCurrentFlashcard(flashcard);
        setNewQuestion(flashcard.question);
        setNewAnswer(flashcard.answer);
        localStorage.setItem('currentflashcardid', flashcard.flashcardId); // Add this line
        setOpenEditDialog(true);
    };

    const handleDeleteClick = (flashcard) => {
        setCurrentFlashcard(flashcard);
        localStorage.setItem('currentflashcardid', flashcard.flashcardId); // Add this line
        setOpenDeleteDialog(true);
    };

    const handleSaveEdit = async () => {
        const currentflashcardid = localStorage.getItem('currentflashcardid'); // Correct variable name
        try {
            const updatedFlashcard = {
                ...currentFlashcard,
                question: newQuestion,
                answer: newAnswer
            };
            await axios.put(`http://localhost:8080/api/flashcards/editFlashcard/${currentflashcardid}`, updatedFlashcard); // Correct variable name
            setFlashcards(flashcards.map((fc) => (fc.id === currentFlashcard.id ? updatedFlashcard : fc)));
            setOpenEditDialog(false);
            setCurrentFlashcard(null);
        } catch (error) {
            console.error('Error updating flashcard:', error);
        }
    };

    const handleConfirmDelete = async () => {
        const currentflashcardid = localStorage.getItem('currentflashcardid'); // Retrieve the current flashcard ID
        try {
            await axios.put(`http://localhost:8080/api/flashcards/deleteFlashcard/${currentflashcardid}`); // Use the API endpoint to delete the flashcard
            setFlashcards(flashcards.filter(fc => fc !== currentFlashcard));
            setOpenDeleteDialog(false);
            setCurrentFlashcard(null);
        } catch (error) {
            console.error('Error deleting flashcard:', error);
        }
    };

    const handleAddFlashcard = async () => {
        if (selectedDeck) {
            try {
                const response = await axios.post('http://localhost:8080/api/flashcards/createFlashcard', {
                    question: newQuestion,
                    answer: newAnswer,
                    flashcardDeck: {
                        deckId: selectedDeckId
                    }
                });

                if (response.status === 200) {
                    const newFlashcard = {
                        question: newQuestion,
                        answer: newAnswer,
                        deck: selectedDeck
                    };
                    setFlashcards([...flashcards, newFlashcard]);
                    setOpenAddDialog(false);
                    setNewQuestion('');
                    setNewAnswer('');
                } else {
                    alert('Failed to add flashcard. Please try again.');
                }
            } catch (error) {
                console.error('Error adding flashcard:', error);
                alert('An error occurred while adding the flashcard.');
            }
        } else {
            alert('Please select a deck before adding a flashcard.');
        }
    };

    const handleDeleteAll = () => {
        setFlashcards(flashcards.filter((fc) => fc.deck !== selectedDeck));
        setDecks(decks.filter((deck) => deck.title !== selectedDeck));
        setSelectedDeck('');
        setSelectedDeckId('');
        setOpenConfirmDeleteDeckDialog(false);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setNewQuestion("");
        setNewAnswer("");
    };

    const handleOpenAddDialog = () => {
        setNewQuestion("");
        setNewAnswer("");
        setOpenAddDialog(true);
    };

    const handleOpenNewDeckDialog = () => {
        setNewDeckTitle("");
        setOpenNewDeckDialog(true);
    };

    const handleCloseNewDeckDialog = () => {
        setOpenNewDeckDialog(false);
    };

    const handleCreateNewDeck = () => {
        setDecks([...decks, { title: newDeckTitle }]);
        setOpenNewDeckDialog(false);
    };

    const handleDeckSelection = (deck) => {
        setSelectedDeck(deck.title);
        setSelectedDeckId(deck.deckId);
        localStorage.setItem('selectedDeck', deck.title);
        localStorage.setItem('selectedDeckId', deck.deckId);
    };

    const drawerContent = (
        <Box sx={{ width: { xs: '50vw', sm: 230 }, height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
            <Grid container>
                <Grid item xs={12}>
                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography marginTop={2} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 18 }}>
                            Documents
                        </Typography>
                        <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
                    </Box>
                </Grid>
                <Box style={{ overflow: 'auto', maxHeight: '60vh', width: '100%' }}>
                    <Grid container>
                        {decks.map((deck, index) => (
                            <Grid item xs={12} style={{ marginTop: isMobile ? 20 : 40 }} key={index}>
                                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                    <Button style={{
                                        textTransform: 'none', backgroundColor: selectedDeck === deck.title ? 'rgba(255, 210, 52, 0.3)' : 'transparent',
                                        color: selectedDeck === deck.title ? '#B18A00' : '#332D2D', boxShadow: selectedDeck === deck.title ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                                        width: '100%', justifyContent: 'center'
                                    }}
                                    onClick={() => handleDeckSelection(deck)}>
                                        <Typography variant='body1' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deck.title}</Typography>
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>
            <Button onClick={handleOpenNewDeckDialog} style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                <Typography style={{ color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 300, fontSize: '20px', textTransform: 'none' }}>
                    Create New Deck
                </Typography>
            </Button>
        </Box>
    );

    return (
        <>
            <div className="body">

      <div style={{ backgroundImage: 'url(/crystalbackground.png)', minHeight: '100vh', overflow: 'hidden' }}>
        <Box style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}>
          <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} />
          {!isMobile && (
            <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00', marginLeft: 10 }}>
              EduDeck
            </Typography>
          )}
          {isMobile && (
            <IconButton onClick={toggleDrawer(true)} style={{ marginLeft: 'auto' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        {isMobile ? (
          <SwipeableDrawer
            anchor="left"
            open={isBoxVisible}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            transitionDuration={{ enter: 500, exit: 500 }}
            SlideProps={{ direction: "right" }}
            PaperProps={{ style: { backgroundColor: 'transparent', height: '100vh', overflow: 'hidden' } }}
            BackdropProps={{ invisible: true }}
          >
            {drawerContent}
          </SwipeableDrawer>
        ) : (
          <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
            <Grid container>
              <Grid item xs={12}>
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 30 }}>
                    Documents
                  </Typography>
                  <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
                </Box>
              </Grid>
              <Box style={{ overflow: 'auto', maxHeight: '60vh', width: '100%' }}>
                <Grid container>
                  {decks.map((deck, index) => (
                    <Grid item xs={12} style={{ marginTop: isMobile ? 25 : 40 }} key={index}>
                      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                        <Button style={{
                          textTransform: 'none', backgroundColor: selectedDeck === deck.title ? 'rgba(255, 210, 52, 0.3)' : 'transparent',
                          color: selectedDeck === deck.title ? '#B18A00' : '#332D2D', boxShadow: selectedDeck === deck.title ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                          width: '100%', justifyContent: 'center'
                        }}
                        onClick={() => handleDeckSelection(deck)}>
                          <Typography variant='body1' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{deck.title}</Typography>
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Button  onClick={handleOpenNewDeckDialog} style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              <Typography style={{ color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '20px', textTransform: 'none' }}>
                Create New Deck
              </Typography>
            </Button>
          </Box>
        )}
      </div>

                <div className="flashcardcontainer">
                    <div className="flashcardtitle">
                        <div className="left-buttons">
                            <Button style={{borderRadius: '12px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', border: '.5px solid #D9D9D9', padding: '4px 8px', fontSize: '0.875rem'}} variant="contained" className="title-button" onClick={handleOpenAddDialog}>Add Question</Button>
                            <Button style={{borderRadius: '12px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', border: '.5px solid #D9D9D9', padding: '4px 8px', fontSize: '0.875rem'}} variant="contained" className="title-button" onClick={() => setOpenConfirmDeleteDeckDialog(true)}>Delete Deck</Button>
                        </div>
                       <h1> {selectedDeck ? selectedDeck : "Flashcards"} </h1>
                    </div>
                    <div className="flashcards">
                    {selectedDeck ? (
                        flashcards.length > 0 ? (
                            flashcards.map((flashcard, index) => (
                                <div key={index} className="flashcard">
                                    <div className="flashcard-content">
                                        <div><strong>Question:</strong> {flashcard.question}</div>
                                        <div><strong>Answer:</strong> {flashcard.answer}</div>
                                    </div>
                                    <div className="icons">
                                        <Edit className="icon" onClick={() => handleEditClick(flashcard)} />
                                        <Delete className="icon" onClick={() => handleDeleteClick(flashcard)} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
                                No flashcards available. Add a new flashcard.
                            </Typography>
                        )
                    ) : (
                        <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
                            Select a deck to see flashcards or add a new flashcard.
                        </Typography>
                    )}
                </div>
                    <div className="footer-buttons">
                        <Link to="/quizsession">
                        <Button style={{borderRadius: '20px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', border: '.5px solid #D9D9D9', backgroundColor: 'white', color: 'black'}} variant="contained">Start Quiz</Button>
                        </Link>
                        <Link to="/reviewsession">
                        <Button style={{borderRadius: '20px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', border: '.5px solid #D9D9D9', backgroundColor: 'white', color: 'black'}} variant="contained">Start Review Session</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Flashcard</DialogTitle>
                <DialogContent>
                    <TextField label="Question" fullWidth value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                    <TextField label="Answer" fullWidth value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: 'white', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9' }}>Cancel</Button>
                    <Button onClick={handleSaveEdit} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: '#FFD700', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9' }}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this flashcard?
                </DialogContent>
                <DialogActions style={{margin: '.5em'}}>
                    <Button onClick={() => setOpenDeleteDialog(false)} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: 'white', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9'}}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: '#FFD700', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9'}}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle>Add New Flashcard</DialogTitle>
                <DialogContent>
                    <TextField label="Question" fullWidth value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                    <TextField label="Answer" fullWidth value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: 'white', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9'}}>Cancel</Button>
                    <Button onClick={handleAddFlashcard} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: '#FFD700', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9'}}>Add</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openConfirmDeleteDeckDialog} onClose={() => setOpenConfirmDeleteDeckDialog(false)}>
                <DialogTitle>Confirm Delete Deck</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete the entire deck?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDeleteDeckDialog(false)} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: 'white', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9'}}>Cancel</Button>
                    <Button onClick={handleDeleteAll} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: '#FFD700', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9'}}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openNewDeckDialog} onClose={handleCloseNewDeckDialog}>
                <DialogTitle>Create New Deck</DialogTitle>
                <DialogContent>
                    <TextField label="Deck Title" fullWidth value={newDeckTitle} onChange={(e) => setNewDeckTitle(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewDeckDialog} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: 'white', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9'}}>Cancel</Button>
                    <Button onClick={handleCreateNewDeck} style={{ width: '7em', height: '2.3em', borderRadius: '20px', backgroundColor: '#FFD700', color: 'black' , boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                    border: '.5px solid #D9D9D9'}}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default FlashcardManagementUI;