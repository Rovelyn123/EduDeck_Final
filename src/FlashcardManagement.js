
import React from "react";
import { useState, useEffect } from "react";
//import { Box, IconButton } from '@material-ui/core';
//import HomeIcon from '@material-ui/icons/Home';
import HomeIcon from '@mui/icons-material/Home';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./flashcardmgt.css";
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, DialogContentText, Box } from "@mui/material";
import { Link } from "react-router-dom";


export default function FlashcardManagement(){
    const [clickedDeck, setClickedDeck] = useState(null);
    const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
    const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    const [isAddFlashcardPopupOpen, setAddFlashcardPopupOpen] = useState(false);
  
    const [deckTitles, setDeckTitles] = useState([
      'Rizal\'s Lovers',
      'UML2',
      'Scope Management',
    ]);
  
    const [flashcards, setFlashcards] = useState({
      'Rizal\'s Lovers': [
        { front: 'Who was Jose Rizal’s puppy love?', back: 'Segunda Katigbak' },
        { front: 'Unfortunately, _______’s mother disapproved of her daughter’s relationship with Rizal, who was then a known filibustero.', back: 'Leonor Rivera' },
        { front: 'Who was Jose Rizal’s true love in exile?', back: 'Josephine Bracken' }
      ],
      'UML2': [
        { front: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', back: 'Lorem ipsum' },
        { front: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', back: 'Lorem' },
      ],
    });
  
    const [newDeckTitle, setNewDeckTitle] = useState("");
    const [updatedDeckTitle, setUpdatedDeckTitle] = useState("");
    const [newFront, setNewFront] = useState("");
    const [newBack, setNewBack] = useState("");
    const [currentDeck, setCurrentDeck] = useState("");
  
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

  const handleCreateDeck = () => {
    if (newDeckTitle.trim() !== "") {
      setDeckTitles([...deckTitles, newDeckTitle]);
      setFlashcards({
        ...flashcards,
        [newDeckTitle]: [] // Initialize with an empty array of flashcards for the new deck
      });
      setNewDeckTitle("");
      closeCreatePopup();
      setDeckAddedConfirmationOpen(true);
    }
  };

  const [isDeckUpdatedConfirmationOpen, setDeckUpdatedConfirmationOpen] = useState(false);

  const handleUpdateDeck = () => {
    if (updatedDeckTitle.trim() !== "") {
      const updatedDecks = [...deckTitles];
      updatedDecks[clickedDeck] = updatedDeckTitle;
      setDeckTitles(updatedDecks);
      closeUpdatePopup();
      setDeckUpdatedConfirmationOpen(true);
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

    return(
      <>
      <div className="welcome-back-page">
        <div className="wrapper">
                <div className="decksnav">
                    <div className="decks-list">
                        <div style={{display:'flex', justifyContent: 'center'}}>
                        <img
                          src="logo.png"
                          alt="AcadZen Logo"
                          style={{ width: '80px' }}
                        />
                        <Typography style={{ fontWeight: 'bold', color: '#8C7111', fontSize: '40px' }}>AcadZen</Typography>
                        </div>
                        <div className="decks-heading">Decks</div>
                        {/*
                        <div className="deck-title">Rizal's Lovers</div>
                        <div className="deck-title">UML2</div>
                        <div className="deck-title">Scope Management</div> */}

                        {deckTitles.map((title, index) => (
                                    <button
                                    key={index}
                                    className={`deck-title ${clickedDeck === index ? 'deck-title-clicked' : ''}`}
                                    onClick={() => setClickedDeck(index)}
                                    >
                                    {title}
                                    </button>
                                ))}
                    </div>
                    <button className="btnYellow" onClick={openCreatePopup}>Create New Deck</button>
                    <Dialog open={isCreatePopupOpen} onClose={closeCreatePopup}>
                        <DialogTitle>Create New Deck</DialogTitle>
                        <DialogContent>
                            <TextField
                            label="Deck Title"
                            value={newDeckTitle}
                            onChange={(e) => setNewDeckTitle(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeCreatePopup}>Cancel</Button>
                            <Button onClick={handleCreateDeck}>Create</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={isDeckAddedConfirmationOpen} onClose={() => setDeckAddedConfirmationOpen(false)}>
                    <DialogTitle>Deck Added</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        The new deck has been successfully added.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeckAddedConfirmationOpen(false)}>OK</Button>
                    </DialogActions>
                    </Dialog> 
                </div>

                <div className="header">
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '50px' }}>
                                <div style={{ marginLeft:'100px', background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '1250px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                                    <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px', color: '#332D2D', justifyContent: 'center', marginTop: '3px' }}
                                    >Document to Flashcard Converter
                                    </Typography>
                                </div>
                            </div>
                            <Box style={{ background: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '70px' }}>
                                <Box style={{ background: '#FAC712', borderRadius: '10px', width: '50px', height: '50px' }}>
                                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                                        <IconButton color="black" style={{ fontSize: '45px' }}>
                                            <HomeIcon style={{ fontSize: '80%', width: '100%' }} />
                                        </IconButton>
                                    </Link>
                                </Box>
                            </Box>
                </div>

                
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
                

                

                <div className="buttons" >
                    <div style={{display: 'flex', alignItems: 'center',justifyContent:'center'}}>
                    <button className="btnYellow" >Save Changes</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                      <Link to='/learningsession' >
                    <button className="btnWhite">Start Learning Session</button>
                    </Link>
                    <button className="btnWhite" onClick={openDeletePopup} disabled={clickedDeck === null}>Delete Deck</button>
                    <Dialog open={isDeletePopupOpen} onClose={closeDeletePopup}>
                      <DialogTitle>Delete Deck</DialogTitle>
                      <DialogContent>
                        <Typography>Are you sure you want to delete this deck?</Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={closeDeletePopup}>Cancel</Button>
                        <Button onClick={handleConfirmDeleteDeck}>Delete</Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={isDeckDeletedConfirmationOpen} onClose={() => setDeckDeletedConfirmationOpen(false)}>
                        <DialogTitle>Deck Deleted</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            The deck has been successfully deleted.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDeckDeletedConfirmationOpen(false)}>OK</Button>
                        </DialogActions>
                    </Dialog>
                </div>
              </div>
        </div>
      </div>
      </>
    )
}