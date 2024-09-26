import React, { useState } from "react";
import './flashcardmanagement.css';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Card,
    CardContent,
    MenuItem, InputLabel, FormControl, Select,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, SwipeableDrawer, useMediaQuery, useTheme, Divider, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '@fontsource/lato';

function handleQuestionChange() {

}

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
    // const [selectedDeck, setSelectedDeck] = useState(() => {
    //     return localStorage.getItem('selectedDeck') || '';
    // });
    // const [selectedDeckId, setSelectedDeckId] = useState(() => {
    //     return localStorage.getItem('selectedDeckId') || '';
    // });
    const [selectedDeck, setSelectedDeck] = useState('');
    const [selectedDeckId, setSelectedDeckId] = useState('');
    const [selectedDeckDocumentId, setSelectedDeckDocumentId] = useState(null);

    const handleQuestionChange = (event) => {
        setNewQuestion(event.target.value);
    };

    // const handleDifficultySelection = (level) => {
    //     setDifficultyLevel(level);
    //   };

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
        setCurrentFlashcard(flashcard.flashcardId);
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
        try {
            const currentflashcardid = currentFlashcard; 
            const updatedFlashcard = {
                question: newQuestion,
                answer: newAnswer
            };
            const response = await axios.put(`http://localhost:8080/api/flashcards/editFlashcard/${currentflashcardid}`, updatedFlashcard);
    
            if (response.status === 200) {
                // Update the flashcard in the local state immediately
                setFlashcards(flashcards.map((fc) =>
                    fc.flashcardId === currentflashcardid ? { ...fc, question: newQuestion, answer: newAnswer } : fc
                ));
                setOpenEditDialog(false);
            } else {
                console.error('Error: Flashcard not updated correctly.');
            }
        } catch (error) {
            console.error('Error updating flashcard:', error);
        }
    };
    const [open, setOpen] = useState(false);

    // Function to open the dialog
    const handleOpen = () => {
        setOpen(true);
    };
    const [selectedDifficulty, setSelectedDifficulty] = useState(null); // Track selected card

    const handleCardSelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
    };
    // Function to close the dialog
    const handleClose = () => {
        setOpen(false);
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

    const handleDeleteAll = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/decks/deleteFlashcardDeck/${selectedDeckId}`);
    
            if (response.status === 200) {
                setDecks(decks.filter((deck) => deck.deckId !== selectedDeckId));
                setFlashcards(flashcards.filter((fc) => fc.deckId !== selectedDeckId));

                setSelectedDeck(''); // Reset the selected deck
                setSelectedDeckId(''); // Reset the selected deck ID
                setOpenConfirmDeleteDeckDialog(false); // Close the delete confirmation dialog
            } else {
                console.error('Failed to delete the deck from the server.');
            }
        } catch (error) {
            console.error('Error deleting deck:', error);
        }
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
                        <Typography marginTop={2} style={{ fontFamily: 'Lato', fontWeight: 900, fontSize: 18 }}>
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
                                        <Typography variant='body1' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Lato', }}>{deck.title}</Typography>
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>
            <Button onClick={handleOpenNewDeckDialog} style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                <Typography style={{ color: 'black', fontFamily: 'Lato', fontWeight: 300, fontSize: '20px', textTransform: 'none' }}>
                    Create New Deck
                </Typography>
            </Button>
        </Box>
    );

    let selectedQuestions;
    return (
        <>
            <div className="body">

      <div style={{ backgroundImage: 'url(/crystalbackground.png)', minHeight: '100vh', overflow: 'hidden' }}>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
         <Box style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}>
          <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} /> 
          {!isMobile && (
            <Typography variant="h3" style={{ fontFamily: 'Lato', fontWeight: '900', fontSize: '2em', color: '#B18A00', marginLeft: 10 }}>
              EduDeck
            </Typography>
          )}
          {isMobile && (
            <IconButton onClick={toggleDrawer(true)} style={{ marginLeft: 'auto' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        </Link>
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
                  <Typography marginTop={13} style={{ fontFamily: 'Lato', fontWeight: 900, fontSize: 30 }}>
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
                          <Typography variant='body1' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Lato', }}>{deck.title}</Typography>
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
            <Button  onClick={handleOpenNewDeckDialog} style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              <Typography style={{ color: 'black', fontFamily: 'Lato', fontWeight: 500, fontSize: '20px', textTransform: 'none' }}>
                Create New Deck
              </Typography>
            </Button>
          </Box>
        )}
      </div>

                <div className="flashcardcontainer">
                    <div className="flashcardtitle">
                        <div className="left-buttons">
                            <Button style={{borderRadius: '12px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', border: '.5px solid #D9D9D9', padding: '4px 8px', fontSize: '0.875rem', fontFamily: 'Lato', fontWeight: '700'}} variant="contained" className="title-button" onClick={handleOpenAddDialog}>Add Question</Button>
                            <Button style={{borderRadius: '12px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', border: '.5px solid #D9D9D9', padding: '4px 8px', fontSize: '0.875rem', fontFamily: 'Lato', fontWeight: '700'}} variant="contained" className="title-button" onClick={() => setOpenConfirmDeleteDeckDialog(true)}>Delete Deck</Button>
                        </div>
                        <Typography variant= {isMobile ? 'body2' : "h5"} style={{fontWeight: 'bold', maxWidth: isMobile ? '150px' : '480px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedDeck ? selectedDeck : "Flashcards"}</Typography>
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
                            <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Lato', }}>
                                No flashcards available. Add a new flashcard.
                            </Typography>
                        )
                    ) : (
                        <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Lato',}}>
                            Select a deck to see flashcards or add a new flashcard.
                        </Typography>
                    )}
                </div>
                    <div className="footer-buttons">
                        <Button style={{borderRadius: '20px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', border: '.5px solid #D9D9D9', backgroundColor: 'white', color: 'black', fontFamily: 'Lato', fontWeight: '700'}} variant="contained" onClick={handleOpen}>Start Quiz</Button>
                        <Link to="/reviewsession">
                        <Button style={{borderRadius: '20px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', border: '.5px solid #D9D9D9', backgroundColor: 'white', color: 'black', fontFamily: 'Lato', fontWeight: '700'}} variant="contained">Start Review Session</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ borderRadius: '20px', fontFamily: 'Lato' }}>
                <DialogTitle sx={{ marginBottom: 5 }}>
                    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', fontFamily: 'Lato', fontWeight: '700' }}>
                        Choose Your Difficulty Level
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ textAlign: 'center' }}>
                        {/* Easy Difficulty */}
                        <Grid item>
                            <Card style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '280px',  // Fixed height
                                width: '200px',   // Fixed width
                                justifyContent: 'space-between',
                                borderRadius: '15px',  // Rounded corners
                                margin: '0 auto',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  // Subtle shadow
                                transition: 'transform 0.3s, box-shadow 0.3s',  // Smooth transition
                            }}
                                  className="quiz-card" // Adding class for hover effect
                            >
                                <CardContent style={{ textAlign: 'center', flexGrow: 1, fontFamily: 'Lato' }}>
                                    <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>Easy</Typography>
                                    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                                        <img src="/easyquiz.png" alt="Easy Quiz Icon" style={{ width: '70px', height: '70px' }} />
                                    </Box>
                                    <Typography variant="body2" align="center">
                                        Straightforward questions, ideal for beginners.
                                    </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="/quizsession"
                                    style={{
                                        margin: '10px auto',
                                        backgroundColor: '#f0e68c',
                                        color: 'black',
                                        borderRadius: '20px',
                                        textTransform: 'none', // Prevents uppercase transformation
                                        fontSize: '16px' // Adjust the font size as needed
                                    }}
                                    className="quiz-button"
                                >
                                    Let's Begin
                                </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Medium Difficulty */}
                        <Grid item>
                            <Card style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '280px',  // Fixed height
                                width: '200px',   // Fixed width
                                justifyContent: 'space-between',
                                borderRadius: '15px',
                                margin: '0 auto',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s, box-shadow 0.3s',

                            }}
                                  className="quiz-card"
                            >
                                <CardContent style={{ textAlign: 'center', flexGrow: 1, fontFamily: 'Lato' }}>
                                    <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>Medium</Typography>
                                    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                                        <img src="/mediumquiz.png" alt="Medium Quiz Icon" style={{ width: '70px', height: '70px' }} />
                                    </Box>
                                    <Typography variant="body2" align="center">
                                        Requires some knowledge, insight, and thought to answer.
                                    </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="/quizsession"
                                    style={{
                                        margin: '10px auto',
                                        backgroundColor: '#f0e68c',
                                        color: 'black',
                                        borderRadius: '20px',
                                        textTransform: 'none', // Prevents uppercase transformation
                                        fontSize: '16px' // Adjust the font size as needed
                                    }}
                                    className="quiz-button"
                                >
                                    Let's Begin
                                </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Hard Difficulty */}
                        <Grid item>
                            <Card style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '280px',  // Fixed height
                                width: '200px',   // Fixed width
                                justifyContent: 'space-between',
                                borderRadius: '15px',
                                margin: '0 auto',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s, box-shadow 0.3s',

                            }}
                                  className="quiz-card"
                            >
                                <CardContent style={{ textAlign: 'center', flexGrow: 1, fontFamily: 'Lato' }}>
                                    <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>Hard</Typography>
                                    <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                                        <img src="/hardquiz.png" alt="Hard Quiz Icon" style={{ width: '70px', height: '70px' }} />
                                    </Box>
                                    <Typography variant="body2" align="center">
                                        Challenging questions that test in-depth understanding.
                                    </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to="/quizsession"
                                    style={{
                                        margin: '10px auto',
                                        backgroundColor: '#f0e68c',
                                        color: 'black',
                                        borderRadius: '20px',
                                        textTransform: 'none', // Prevents uppercase transformation
                                        fontSize: '16px' // Adjust the font size as needed
                                    }}
                                    className="quiz-button"
                                >
                                    Let's Begin
                                </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Align dropdown and button with difficulty cards */}
                    <Grid container spacing={3} alignItems="right" sx={{ marginTop: '18px', textAlign: 'center',marginBottom: '18px'}}>

                        {/* Choose no. of Questions aligned with Easy card */}
                        <Grid item xs={12} sm={5} sx={{ textAlign: 'left' }}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="questions-select-label"
                                    sx={{
                                        color: '#B18A00',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                    }}
                                >
                                    Choose no. of Questions
                                </InputLabel>
                                <Select
                                    labelId="questions-select-label"
                                    id="questions-select"
                                    value={selectedQuestions}
                                    onChange={handleQuestionChange}
                                    sx={{
                                        borderRadius: '10px',
                                        fontSize: '1rem',
                                        '& .MuiSelect-icon': { color: 'black' },
                                        '& .MuiSelect-select': { color: 'black' },
                                        '& .MuiInputLabel-root': { color: '#B18A00', fontWeight: 'bold' },
                                    }}
                                >
                                    <MenuItem value={5}>5 Questions</MenuItem>
                                    <MenuItem value={10}>10 Questions</MenuItem>
                                    <MenuItem value={15}>15 Questions</MenuItem>
                                    <MenuItem value={20}>20 Questions</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Let's Begin Button aligned with Hard card */}
                        <Grid item xs={10} sm={2} sx={{ textAlign: 'right' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/quizsession"
                                disabled={!selectedDifficulty}  // Disable if no difficulty is selected
                                sx={{
                                    margin: '10px auto',
                                    backgroundColor: selectedDifficulty ? '#FFDD66' : 'rgba(255, 221, 102, 0.5)',  // Faded yellow when disabled
                                    color: 'black',
                                    borderRadius: '10px',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    '&:hover': {
                                        backgroundColor: selectedDifficulty ? '#FFDD66' : 'rgba(255, 221, 102, 0.5)', // Prevent hover effect if disabled
                                    },
                                    '&:disabled': {
                                        backgroundColor: 'rgba(255, 221, 102, 0.5)',  // Faded yellow when disabled
                                        color: 'black',
                                    },
                                }}
                            >
                                Let's Begin
                            </Button>
                        </Grid>

                    </Grid>

                </DialogContent>
            </Dialog>

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