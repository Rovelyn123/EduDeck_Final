import React from "react";
import { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./flashcardmgt.css";
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, DialogContentText, Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";


import Grid from '@mui/material/Grid';
import { SwipeableDrawer, useMediaQuery, useTheme, Divider} from "@mui/material";
import { AccountCircle, NotificationsNone, AddCircleOutline } from "@mui/icons-material";

function FlashcardManagement() {
  const userid = localStorage.getItem('userid');

  const [clickedDeck, setClickedDeck] = useState(null);
    const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
    const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    const [isAddFlashcardPopupOpen, setAddFlashcardPopupOpen] = useState(false);
    const [deckTitles, setDeckTitles] = useState([]);
    const [flashcards, setFlashcards] = useState({});
    const [newDeckTitle, setNewDeckTitle] = useState("");
    const [newDeckDescription, setNewDeckDescription] = useState("");
    const [updatedDeckTitle, setUpdatedDeckTitle] = useState("");
    const [newFront, setNewFront] = useState("");
    const [newBack, setNewBack] = useState("");
    const [currentDeck, setCurrentDeck] = useState("");

    const BASE_URL = 'http://localhost:8080/FlashcardDeck';

    useEffect(() => {
      const fetchDecks = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/decks/getAllFlashcardDecks");
          setDeckTitles(response.data.map(deck => deck.title));
        } catch (error) {
          console.error("Error fetching decks:", error);
        }
      };
  
      fetchDecks();
    }, []);

    const createDeck = async () => {
      try {
          const response = await axios.post(`${BASE_URL}/insertDeck`, { title: newDeckTitle, desc: 'Description' });
          setDeckTitles([...deckTitles, response.data.title]);
          setNewDeckTitle("");
          setDeckAddedConfirmationOpen(true);
      } catch (error) {
          console.error('Error creating deck:', error);
      }
  };
  
    useEffect(() => {
      if (clickedDeck !== null) {
        setCurrentDeck(deckTitles[clickedDeck]);
      }
    }, [clickedDeck, deckTitles]);

    const openAddFlashcardPopup = () => setAddFlashcardPopupOpen(true);
    const closeAddFlashcardPopup = () => setAddFlashcardPopupOpen(false);
  
    const handleAddFlashcard = () => {
      if (newFront.trim() !== "" && newBack.trim() !== "") {
        const currentDeck = deckTitles[clickedDeck];
        setFlashcards((prevFlashcards) => ({
          ...prevFlashcards,
          [currentDeck]: [
            ...(prevFlashcards[currentDeck] || []), // Handle the case when the deck is undefined
            { front: newFront, back: newBack },
          ],
        }));
        setNewFront("");
        setNewBack("");
        closeAddFlashcardPopup();
        setConfirmationDialog(true);
      }
    };

    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const closeConfirmationDialog = () => setConfirmationDialog(false);
    
  const openCreatePopup = () => setCreatePopupOpen(true);
  const closeCreatePopup = () => setCreatePopupOpen(false);

  const openUpdatePopup = () => {
    setUpdatedDeckTitle(deckTitles[clickedDeck]);
    setUpdatePopupOpen(true);
  };
  const closeUpdatePopup = () => setUpdatePopupOpen(false);

  const openDeletePopup = () => setDeletePopupOpen(true);
  const closeDeletePopup = () => setDeletePopupOpen(false);

  const [isDeckAddedConfirmationOpen, setDeckAddedConfirmationOpen] = useState(false);

  const handleCreateDeck = async () => {
    if (newDeckTitle.trim() !== "") {
        try {
            const response = await axios.post(`${BASE_URL}/insertDeck`, { title: newDeckTitle, desc: newDeckDescription });
            setDeckTitles([...deckTitles, response.data.title]);
            setNewDeckTitle("");
            setNewDeckDescription("");
            closeCreatePopup();
            setDeckAddedConfirmationOpen(true);
        } catch (error) {
            console.error('Error creating deck:', error);
        }
    }
};

const [isDeckUpdatedConfirmationOpen, setDeckUpdatedConfirmationOpen] = useState(false);

const handleUpdateDeck = async () => {
  if (updatedDeckTitle.trim() !== "") {
      try {
          const response = await axios.put(`${BASE_URL}/updateDeck/${clickedDeck}`, {
              title: updatedDeckTitle,
              desc: newDeckDescription,  // You may want to pass the updated description as well
          });
          setDeckTitles((prevTitles) => {
              const updatedTitles = [...prevTitles];
              updatedTitles[clickedDeck] = response.data.title;
              return updatedTitles;
          });
          closeUpdatePopup();
          setDeckUpdatedConfirmationOpen(true);
      } catch (error) {
          console.error('Error updating deck:', error);
      }
  }
};

const [isDeleteFlashcardPopupOpenState, setDeleteFlashcardPopupOpenState] = useState(false);

const closeDeleteFlashcardPopup = () => setDeleteFlashcardPopupOpenState(false);
const setDeleteFlashcardPopupOpen = (isOpen) => setDeleteFlashcardPopupOpenState(isOpen);

const [isDeckDeletedConfirmationOpen, setDeckDeletedConfirmationOpen] = useState(false);


const handleConfirmDeleteDeck = () => {
  const updatedDecks = deckTitles.filter((_, index) => index !== clickedDeck);
  setDeckTitles(updatedDecks);
  setClickedDeck(null);
  closeDeletePopup();
  setDeckDeletedConfirmationOpen(true);
};


useEffect(() => {
  if (clickedDeck !== null) {
    setCurrentDeck(deckTitles[clickedDeck]);
  }
}, [clickedDeck, deckTitles]);


const [editedFront, setEditedFront] = useState("");
const [editedBack, setEditedBack] = useState("");
const [isEditFlashcardPopupOpen, setEditFlashcardPopupOpen] = useState(false);
const [editedFlashcardIndex, setEditedFlashcardIndex] = useState(null);

const [isFlashcardUpdatedConfirmationOpen, setFlashcardUpdatedConfirmationOpen] = useState(false);
const handleEditFlashcard = (index) => {
  const currentDeck = deckTitles[clickedDeck];
  const selectedFlashcard = flashcards[currentDeck][index];
  setEditedFront(selectedFlashcard.front);
  setEditedBack(selectedFlashcard.back);
  setEditedFlashcardIndex(index);
  setEditFlashcardPopupOpen(true);
};

const handleUpdateFlashcard = () => {
  const currentDeck = deckTitles[clickedDeck];
  setFlashcards((prevFlashcards) => {
    const updatedFlashcards = [...prevFlashcards[currentDeck]];
    updatedFlashcards[editedFlashcardIndex] = {
      front: editedFront,
      back: editedBack,
    };
    return { ...prevFlashcards, [currentDeck]: updatedFlashcards };
  });
  closeEditFlashcardPopup();
  setFlashcardUpdatedConfirmationOpen(true);
};



const closeEditFlashcardPopup = () => {
  setEditFlashcardPopupOpen(false);
  setEditedFront("");
  setEditedBack("");
};

const [deleteFlashcardIndex, setDeleteFlashcardIndex] = useState(null);
const [flashcardDeletedConfirmationOpen, setFlashcardDeletedConfirmationOpen] = useState(false);


const handleDeleteFlashcard = (index) => {
  setDeleteFlashcardIndex(index); // Set the index to be deleted
  setDeleteFlashcardPopupOpen(true); // Open the confirmation dialog
};

const handleConfirmDeleteFlashcard = () => {
  const currentDeck = deckTitles[clickedDeck];
  setFlashcards((prevFlashcards) => {
    const updatedFlashcards = prevFlashcards[currentDeck].filter((_, i) => i !== deleteFlashcardIndex);
    return { ...prevFlashcards, [currentDeck]: updatedFlashcards };
  });
  setDeleteFlashcardIndex(null); // Reset the index
  setDeleteFlashcardPopupOpen(false); // Close the confirmation dialog
};

  ///////////////////////
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery('(max-width:1219px)');
  const fileNames = ["File name 1", "File name 2", "File name 3",]; // Replace this with your array of file names
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [saveChangesOpen, setSaveChangesOpen] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [questions, setQuestions] = useState(['']);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsBoxVisible(open);
  };

  const drawerContent = (
    <Box sx={{ width: {xs: 110, sm: 230}, height: {xs: '80vh', sm: '100vh'}, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
          <Grid container >
            <Grid item xs={12} >
              <Box style= {{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Typography marginTop={13} style={{fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 18}}>
                  Decks
                </Typography>
                <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10}} />
              </Box>
            </Grid>
            <Box style={{ overflow: 'auto', maxHeight: '45vh' }}>
            <Grid container>
            {deckTitles.map((title, index) => (
                <Grid item xs={12} style={{marginTop: isMobile ? 20 : 40}} key={index}>
                  <Box style= {{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <Button style={{textTransform: 'none', backgroundColor: selectedFile === title ? 'rgba(255, 210, 52, 0.3)' : 'transparent', color: selectedFile === title ? '#B18A00' : '#332D2D', boxShadow: selectedFile === title ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                    width: '100%', justifyContent: 'center'}}
                    key={index}
                    onClick={() => setClickedDeck(index)}>
                    <Typography variant= 'body1' style={{ overflow: 'hidden', textOverflow: 'clip', whiteSpace: 'nowrap' }}>{title}</Typography>
                    </Button>
                  </Box>
                </Grid>
                    ))}
              </Grid>
            </Box>
          </Grid>
        </Box>
  );

  const handleClickOpen = (content) => {
    setDialogContent(content);
    setOpen(true);
  };

  const handleDelete = (quizName) => {
    setSelectedFile(quizName);
    setDialogContent('Deleting');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmationOpen(false);
  };

  const handleConfirm = () => {
    setConfirmationOpen(true);
  };

  const handleSaveChanges = () => {
    setSaveChangesOpen(true);
  };

//   const handleAddFlashcard = () => {
//     setShowBox(true);
// //     if (currentQuestion !== '' && currentAnswer !== '') {
// //         setQuestions([...questions, { question: currentQuestion, answer: currentAnswer }]);
// //         setCurrentQuestion('');
// //         setCurrentAnswer('');
// //         
// //     }
//  };

  const handleQuestionChange = (event) => {
    setCurrentQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setCurrentAnswer(event.target.value);
  };

  return (
    <>
      <div style={{backgroundImage: 'url(/crystalbackground.png)', minheight: '100vh', overflow: 'hidden' }}>
            <Box style={{display: 'flex', width: isMobile ? 50 : 230, backgroundColor: 'tranparent', alignItems: 'center', marginTop: 15}}>
              <img src="/logo.png" alt="logo" style={{height: isMobile ? 35 : 50}} />
              {!isMobile && (
              <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00' }}>
                EduDeck
              </Typography>
              )}
            </Box>
        {isMobile ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <SwipeableDrawer
              anchor="left"
              open={isBoxVisible}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              transitionDuration={{ enter: 500, exit: 500 }}
              SlideProps={{ direction: "right" }}
              PaperProps={{ style: { backgroundColor: 'transparent', height: '50vh', overflow: 'hidden', top: '25vh' } }}
              BackdropProps={{ invisible: true }}
            >
              {drawerContent}
            </SwipeableDrawer>
            {!isBoxVisible && (
              <Box sx={{ position: 'fixed', left: 0, top: '50%', backgroundColor: 'gold', height: 30, width: 10 }} onClick={toggleDrawer(true)} />
            )}
          </Box>
        ) : (
          <Box sx={{ width: {xs: 110, sm: 230}, height: {xs: '80vh', sm: '100vh'}, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
          <Grid container >
            <Grid item xs={12} >
            <Box style= {{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Typography marginTop={13} style={{fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 30}}>
                  Decks
                </Typography>
                <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10}} />
              </Box>
            </Grid>
            <Box style={{ overflow: 'auto', maxHeight: '60vh' }}>
            <Grid container>
            {deckTitles.map((title, index) => (
                <Grid item xs={12} style={{marginTop: isMobile ? 25 : 40}} key={index}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Button style={{textTransform: 'none', backgroundColor: selectedFile === title ? 'rgba(255, 210, 52, 0.3)' : 'transparent', color: selectedFile === title ? '#B18A00' : '#332D2D', boxShadow: selectedFile === title ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                    width: '100%', justifyContent: 'center'}}
                    key={index}
                    onClick={() => setClickedDeck(index)}>
                    <Typography variant= 'h6' title={title} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</Typography>
                    </Button>
                  </Box>
                </Grid>
                    ))}
              </Grid>
            </Box>
          </Grid>
                <Button style={{backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                    <Typography style={{color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '1.5em', textTransform: 'none'}}>
                      Create New Deck
                    </Typography>
                </Button>

                <Box style={{ position: 'absolute', top: '4%', left: '90%', background: '#D0BF81', borderRadius: '50px', width: '45px', height: '45px' }}>
                                <IconButton color="white" style={{ fontSize: '45px', padding: '0'}}>
                                    <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
                                </IconButton>
                    </Box>
                    <Box style={{position: 'absolute', top: '4%', left: '94%', background: 'white', borderRadius: '50px', width: '45px', height: '45px' }}>
                                <IconButton style={{ fontSize: '45px', padding: '0'}}>
                                    <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
                                </IconButton>
                    </Box>
                    <Box style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '60px', width: '1100px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', position: 'absolute', marginTop: '25px', marginLeft: '90%' }}>
                    <Typography style={{  fontSize: '30px', color: '#332D2D', justifyContent: 'center', marginTop: '7px' }}
                    >Document to Flashcards Converter
                    </Typography>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                      <Box sx={{ flex: 1, overflowY: 'auto' }}>
                        <div className="selected-flashcard-deck">
                    {clickedDeck !== null ? (
                        <div>
                        <div className="title-container" style={{ display: "flex", padding: "10px", margin: "10px", justifyContent: "center", alignItems: "center"}}>
                            <button className="btnGray" style={{marginRight:"50px"}} onClick={openAddFlashcardPopup}>Add Flashcard</button>
                            <Dialog open={isAddFlashcardPopupOpen} onClose={closeAddFlashcardPopup}>
                                <DialogTitle>Add Flashcard to {currentDeck}</DialogTitle>
                                <DialogContent>
                                <TextField label="Front (Question)" value={newFront} onChange={(e) => setNewFront(e.target.value)} />
                                <TextField label="Back (Answer)" value={newBack} onChange={(e) => setNewBack(e.target.value)} />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={closeAddFlashcardPopup}>Cancel</Button>
                                <Button onClick={handleAddFlashcard}>Add</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={confirmationDialog} onClose={closeConfirmationDialog}>
                                <DialogTitle>Flashcard Added</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                    The new flashcard has been successfully added to {currentDeck}.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeConfirmationDialog}>OK</Button>
                                </DialogActions>
                            </Dialog>
                            <div className="flashcard-deck-title">
                                {deckTitles[clickedDeck]}
                            </div>
                            

                            <IconButton onClick={openUpdatePopup}>
                                <EditIcon />
                            </IconButton>
                            <Dialog open={isUpdatePopupOpen} onClose={closeUpdatePopup}>
                                <DialogTitle>Update Deck</DialogTitle>
                                <DialogContent>
                                <TextField
                                    label="Deck Title"
                                    value={updatedDeckTitle}
                                    onChange={(e) => setUpdatedDeckTitle(e.target.value)}
                                />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={closeUpdatePopup}>Cancel</Button>
                                <Button onClick={handleUpdateDeck}>Update</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={isDeckUpdatedConfirmationOpen} onClose={() => setDeckUpdatedConfirmationOpen(false)}>
                                <DialogTitle>Deck Updated</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                    The deck has been successfully updated.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setDeckUpdatedConfirmationOpen(false)}>OK</Button>
                                </DialogActions>
                            </Dialog>

                            <div className="actionButtons">
                            
                            <button className="btnGray"style={{marginLeft:"50px"}}>Sort</button>
                            <button className="btnGray">Filter</button>
                            </div>
                            
                        </div>
                    

                        <div className="flashcards-of-selected-deck">
                            {flashcards[deckTitles[clickedDeck]] && flashcards[deckTitles[clickedDeck]].length > 0 ? (
                                flashcards[deckTitles[clickedDeck]].map((flashcard, index) => (
                                <div key={index} className="flashcard">
                                    <span style={{ float: "left" }}>
                                            <button className="difficulty-tag">🏷️Easy</button>
                                    </span>
                                        <span style={{ float: "right" }}>
                                            <IconButton onClick={() => handleEditFlashcard(index)}>
                                            <EditIcon />
                                            </IconButton>
                                            <Dialog open={isEditFlashcardPopupOpen} onClose={closeEditFlashcardPopup} >
                                              <DialogTitle>Edit Flashcard</DialogTitle>
                                              <DialogContent>
                                                <TextField
                                                  label="Front (Question)"
                                                  value={editedFront}
                                                  onChange={(e) => setEditedFront(e.target.value)}
                                                />
                                                <TextField
                                                  label="Back (Answer)"
                                                  value={editedBack}
                                                  onChange={(e) => setEditedBack(e.target.value)}
                                                />
                                              </DialogContent>
                                              <DialogActions>
                                                <Button onClick={closeEditFlashcardPopup}>Cancel</Button>
                                                <Button onClick={() => handleUpdateFlashcard()}>Update</Button>
                                              </DialogActions>
                                            </Dialog>
                                            <Dialog open={isFlashcardUpdatedConfirmationOpen} onClose={() => setFlashcardUpdatedConfirmationOpen(false)}>
                                              <DialogTitle>Flashcard Updated</DialogTitle>
                                              <DialogContent>
                                                <DialogContentText>
                                                  The flashcard has been successfully updated.
                                                </DialogContentText>
                                              </DialogContent>
                                              <DialogActions>
                                                <Button onClick={() => setFlashcardUpdatedConfirmationOpen(false)}>OK</Button>
                                              </DialogActions>
                                            </Dialog>


                                            
                                            <IconButton onClick={() => handleDeleteFlashcard(index)}>
                                            <DeleteIcon />
                                            </IconButton>
                                            <Dialog open={isDeleteFlashcardPopupOpenState} onClose={closeDeleteFlashcardPopup}>
                                              <DialogTitle>Delete Flashcard</DialogTitle>
                                              <DialogContent>
                                                <Typography>Are you sure you want to delete this flashcard?</Typography>
                                              </DialogContent>
                                              <DialogActions>
                                                <Button onClick={closeDeleteFlashcardPopup}>Cancel</Button>
                                                <Button onClick={handleConfirmDeleteFlashcard}>Delete</Button>
                                              </DialogActions>
                                            </Dialog>
                                            <Dialog open={flashcardDeletedConfirmationOpen} onClose={() => setFlashcardDeletedConfirmationOpen(false)}>
                                              <DialogTitle>Flashcard Deleted</DialogTitle>
                                              <DialogContent>
                                                <DialogContentText>
                                                  The flashcard has been successfully deleted.
                                                </DialogContentText>
                                              </DialogContent>
                                              <DialogActions>
                                              <Button onClick={() => setFlashcardDeletedConfirmationOpen(false)}>OK</Button>
                                            </DialogActions>
                                            </Dialog>


                                    </span>
                                    
                                    <span>
                                    <h3>Front</h3>
                                    {flashcard.front}
                                    <h3>Back</h3> {flashcard.back}
                                    </span>
                                    
                                </div>
                                ))
                            ) : (
                                <div style={{ alignItems: "center", textAlign: "center", padding: "20px" }}>
                                No flashcards to show.
                                </div>
                            )}
                        </div>

                    </div>
                    ) : (
                        <div style={{ alignItems: "center",textAlign: "center", padding: "20px" }}>
                        Select a flashcard deck to view.
                        </div>
                    )}
                        </div>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 3 }}>
                          <Button sx={{ backgroundColor: '#FFFFFF', color: '#000000', marginRight: '20px', width: '17%', height: '30%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}
                          onlick={()=> handleClickOpen('Start Review Session')}>
                          Start Review Session
                          </Button>
                          <Button sx={{ backgroundColor: '#FFD234', color: '#000000', marginRight: '20px', width: '17%', height: '30%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}
                          onClick={() => handleSaveChanges('Save Changes')}
                          >
                          Save Changes
                          </Button>
                          <Button sx={{ backgroundColor: '#FFFFFF', color: '#000000', width: '17%', height: '30%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}
                          onClick={() => handleClickOpen('Delete Deck')}>
                          Delete Deck
                          </Button>



                        <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: '#FCF7EB', height: '25%', marginTop: '3%', marginLeft:'10%' } }} maxWidth="md">
                                <DialogTitle>{dialogContent}</DialogTitle>
                                <DialogContent style={{ maxHeight: '50vh' }}>
                                  <DialogContentText>
                                    Deleting this quiz will erase all data permanently. Are you sure? This cannot be undone. {dialogContent.toLowerCase()}?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose} style={{ backgroundColor: '#D9D9D9', color: '#000000', width: '15%', height: '100%' }}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleConfirm} style={{ backgroundColor: '#FFD234', color: '#000000', width: '15%', height: '100%' }}>
                                    Confirm
                                  </Button>
                                </DialogActions>
                              </Dialog>

                              <Dialog open={confirmationOpen} onClose={handleClose} PaperProps={{ style: { backgroundColor: '#FCF7EB', marginTop: '3%', marginLeft:'10%', width: '100%'} }} >
                                <DialogTitle>Success</DialogTitle>
                                <DialogContent>
                                  <DialogContentText style={{ justifyContent: 'center', textAlign: 'center' }}>
                                  {selectedFile} quiz has been successfully deleted.
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions style={{ justifyContent: 'center' }}>
                                  <Button onClick={handleClose} style={{ backgroundColor: '#FFD234', color: '#000000'}}>
                                    OK
                                  </Button>
                                </DialogActions>
                              </Dialog>

                      </Box>
                    </Box>

            </Box>
        )}
      </div>
    </>
  );
}

export default FlashcardManagement;