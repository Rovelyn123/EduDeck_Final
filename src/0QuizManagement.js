
import React from "react";
import { useState, useEffect } from "react";
//import { Box, IconButton } from '@material-ui/core';
//import HomeIcon from '@material-ui/icons/Home';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./quizmgt.css";
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, DialogContentText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function QuizManagement(){
    const navigate = useNavigate();

    const [clickedQuiz, setClickedQuiz] = useState(null);
    const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
    const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    const [isAddQuestionPopupOpen, setAddQuestionPopupOpen] = useState(false);
  
    const [quizTitles, setQuizTitles] = useState([
      'Rizal\'s Lovers',
      'UML2',
      'Scope Management',
    ]);
  
    const [questions, setQuestions] = useState({
      'Rizal\'s Lovers': [
        { question: 'Who was Jose Rizal’s puppy love?', answer: '____________' },
        { question: 'Unfortunately, _______’s mother disapproved of her daughter’s relationship with Rizal, who was then a known filibustero.', answer: '____________' },
        { question: 'Who was Jose Rizal’s true love in exile?', answer: '____________' },
        { question: 'A tall girl from Pagsanjan. Rizal sent her love notes written in invisible ink.', answer: '____________' },
        { question: 'Leonor believed that Rizal had already forgotten her, sadly consenting to marry the Englishman _____, her mother\'s choice.', answer: '____________' },
        { question: 'A Japanese samurai\'s daughter who taught Rizal the Japanese art of painting known as sumie.', answer: '____________' },
        { question: 'Their love affair unfortunately did not end in marriage. Rizal\'s because Rizal refused to be converted to the Protestant faith.', answer: '____________' },
        { question: 'A blue eye and buxom girl was the oldest of the three Beckett daughters. She fell in love with Rizal.', answer: '____________' }
        
      ],
      'UML2': [
        { question: 'What is UML2?', answer: '____________' },
        { question: 'Name two types of UML diagrams used to represent the structural aspects of a system.', answer: '____________' },
        { question: 'Define Use Case.', answer: '____________' },
      ],
      'Scope Management': [
        { question: 'What is the purpose of a Project Scope Statement in scope management?', answer: '____________' },
        { question: 'In scope definition, _______________ engages relevant parties to gather expectations and requirements, contributing to a comprehensive and accurate definition of the project scope.', answer: '____________' },
        { question: 'Scope Verification involves formal acceptance and thorough examination to confirm that project deliverables meet specified requirements and criteria, serving the purpose of ________________________________ in project management.', answer: '____________' },
      ]
      // Add other quizzes with their questions here
    });
  
    const [newQuizTitle, setNewQuizTitle] = useState("");
    const [updatedQuizTitle, setUpdatedQuizTitle] = useState("");
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [currentQuiz, setCurrentQuiz] = useState("");
  
    useEffect(() => {
      if (clickedQuiz !== null) {
        setCurrentQuiz(quizTitles[clickedQuiz]);
      }
    }, [clickedQuiz, quizTitles]);
  
    const openAddQuestionPopup = () => setAddQuestionPopupOpen(true);
    const closeAddQuestionPopup = () => setAddQuestionPopupOpen(false);
  
    const handleAddQuestion = () => {
      if (newQuestion.trim() !== "" && newAnswer.trim() !== "") {
        const currentQuiz = quizTitles[clickedQuiz];
        setQuestions((prevQuestions) => ({
          ...prevQuestions,
          [currentQuiz]: [
            ...(prevQuestions[currentQuiz] || []), // Handle the case when the quiz is undefined
            { question: newQuestion, answer: newAnswer },
          ],
        }));
        setNewQuestion("");
        setNewAnswer("");
        closeAddQuestionPopup();
        setConfirmationDialog(true);
      }
    };

    const [confirmationDialog, setConfirmationDialog] = useState(false);
    const closeConfirmationDialog = () => setConfirmationDialog(false);
    
  const openCreatePopup = () => setCreatePopupOpen(true);
  const closeCreatePopup = () => setCreatePopupOpen(false);

  const openUpdatePopup = () => {
    setUpdatedQuizTitle(quizTitles[clickedQuiz]);
    setUpdatePopupOpen(true);
  };
  const closeUpdatePopup = () => setUpdatePopupOpen(false);

  const openDeletePopup = () => setDeletePopupOpen(true);
  const closeDeletePopup = () => setDeletePopupOpen(false);

  const handleCreateQuiz = () => {
    if (newQuizTitle.trim() !== "") {
      setQuizTitles([...quizTitles, newQuizTitle]);
      setQuestions({
        ...questions,
        [newQuizTitle]: [] // Initialize with an empty array of questions for the new quiz
      });
      setNewQuizTitle("");
      closeCreatePopup();
    }
  };

  const handleUpdateQuiz = () => {
    if (updatedQuizTitle.trim() !== "") {
      const updatedQuizzes = [...quizTitles];
      updatedQuizzes[clickedQuiz] = updatedQuizTitle;
      setQuizTitles(updatedQuizzes);
      closeUpdatePopup();
    }
  };

  

  const handleDeleteQuiz = () => {
    const updatedQuizzes = quizTitles.filter((_, index) => index !== clickedQuiz);
    setQuizTitles(updatedQuizzes);
    setClickedQuiz(null);
    closeDeletePopup();
  };


  useEffect(() => {
    if (clickedQuiz !== null) {
      setCurrentQuiz(quizTitles[clickedQuiz]);
    }
  }, [clickedQuiz, quizTitles]);

  
  const [editedQuestion, setEditedQuestion] = useState("");
const [editedAnswer, setEditedAnswer] = useState("");
const [isEditQuestionPopupOpen, setEditQuestionPopupOpen] = useState(false);
const [editedQuestionIndex, setEditedQuestionIndex] = useState(null);


  const handleEditQuestion = (index) => {
    const currentQuiz = quizTitles[clickedQuiz];
    const selectedQuestion = questions[currentQuiz][index];
    setEditedQuestion(selectedQuestion.question);
    setEditedAnswer(selectedQuestion.answer);
    setEditedQuestionIndex(index);
    setEditQuestionPopupOpen(true);
  };
  
  const closeEditQuestionPopup = () => {
    setEditQuestionPopupOpen(false);
    setEditedQuestion("");
    setEditedAnswer("");
  };
  
  const handleConfirmEditQuestion = () => {
    const currentQuiz = quizTitles[clickedQuiz];
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions[currentQuiz]];
      updatedQuestions[editedQuestionIndex] = { question: editedQuestion, answer: editedAnswer };
      return { ...prevQuestions, [currentQuiz]: updatedQuestions };
    });
    closeEditQuestionPopup();
    setEditedQuestionIndex(null);
  };
  

  const handleDeleteQuestion = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");
    if (confirmDelete) {
      const currentQuiz = quizTitles[clickedQuiz];
      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions[currentQuiz].filter((_, i) => i !== index);
        return { ...prevQuestions, [currentQuiz]: updatedQuestions };
      });
    }
  };
  

    return(
        <div className="wrapper">
                <div className="quizzesnav">
                    <div className="quizzes-list">
                        <div style={{display:'flex', justifyContent: 'center'}}>
                                <img src= "/logo.png" alt="App Logo" style={{width: 50}}/>
                            <Typography variant="h3" style={{fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '30px',color: '#B18A00'}}
                            >EduDeck
                            </Typography>
                        </div>
                        <div className="quizzes-heading">Quizzes</div>
                        {/*
                        <div className="quiz-title">Rizal's Lovers</div>
                        <div className="quiz-title">UML2</div>
                        <div className="quiz-title">Scope Management</div> */}

                        {quizTitles.map((title, index) => (
                                    <button
                                    key={index}
                                    className={`quiz-title ${clickedQuiz === index ? 'quiz-title-clicked' : ''}`}
                                    onClick={() => setClickedQuiz(index)}
                                    >
                                    {title}
                                    </button>
                                ))}
                    </div>
                    <button className="btnYellow" onClick={openCreatePopup}>Create New Quiz</button>
                    <Dialog open={isCreatePopupOpen} onClose={closeCreatePopup}>
                        <DialogTitle>Create New Quiz</DialogTitle>
                        <DialogContent>
                            <TextField
                            label="Quiz Title"
                            value={newQuizTitle}
                            onChange={(e) => setNewQuizTitle(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeCreatePopup}>Cancel</Button>
                            <Button onClick={handleCreateQuiz}>Create</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div className="header">
                <div className="heading">Document to Quiz Generator</div>

                <div style={{ answerground: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '70px'}}>
                    <div style={{ answerground: '#FAC712', borderRadius: '10px', width: '50px', height: '50px'}}>
                        {/* <IconButton color="black" style={{ fontSize: '45px'}}>
                        <HomeIcon style={{ fontSize: '80%', width: '100%'}} />
                        </IconButton> */}
                    </div>
                </div>
                </div>
                

                
                <div className="selected-quiz">
                {clickedQuiz !== null ? (
                    <div>
                    <div style={{ display: "flex", padding: "10px", margin: "10px", justifyContent: "center", alignItems: "center"}}>
                        <button className="btnGray" style={{marginRight:"50px"}} onClick={openAddQuestionPopup}>Add Question</button>
                        <Dialog open={isAddQuestionPopupOpen} onClose={closeAddQuestionPopup}>
                            <DialogTitle>Add Question to {currentQuiz}</DialogTitle>
                            <DialogContent>
                            <TextField label="Question" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                            <TextField label="Answer" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={closeAddQuestionPopup}>Cancel</Button>
                            <Button onClick={handleAddQuestion}>Add</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog open={confirmationDialog} onClose={closeConfirmationDialog}>
                            <DialogTitle>Question Added</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                The new quiz has been successfully added to {currentQuiz}.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeConfirmationDialog}>OK</Button>
                            </DialogActions>
                        </Dialog>
                        <div className="quiz-title">
                            {quizTitles[clickedQuiz]}
                        </div>
                        

                        <IconButton onClick={openUpdatePopup}>
                            <EditIcon />
                        </IconButton>
                        <Dialog open={isUpdatePopupOpen} onClose={closeUpdatePopup}>
                            <DialogTitle>Update Quiz</DialogTitle>
                            <DialogContent>
                            <TextField
                                label="Quiz Title"
                                value={updatedQuizTitle}
                                onChange={(e) => setUpdatedQuizTitle(e.target.value)}
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={closeUpdatePopup}>Cancel</Button>
                            <Button onClick={handleUpdateQuiz}>Update</Button>
                            </DialogActions>
                        </Dialog>

                        <div className="actionButtons">
                        
                        <button className="btnGray"style={{marginLeft:"50px"}}>Sort</button>
                        <button className="btnGray">Filter</button>
                        </div>
                        
                    </div>
                

                    <div className="questions-of-selected-quiz">
                        {questions[quizTitles[clickedQuiz]] && questions[quizTitles[clickedQuiz]].length > 0 ? (
                            questions[quizTitles[clickedQuiz]].map((quiz, index) => (
                            <div key={index} className="quiz">
                                <h3>
                                    {" "}
                                    <span style={{ float: "right" }}>
                                        {/* Edit Icon */}
                                        <IconButton onClick={() => handleEditQuestion(index)}>
                                        <EditIcon />
                                        </IconButton>
                                        {/* Delete Icon */}
                                        <IconButton onClick={() => handleDeleteQuestion(index)}>
                                        <DeleteIcon />
                                        </IconButton>
                                    </span>
                                </h3>
                                {quiz.question}
                              <br/> <br/> {quiz.answer}
                            </div>
                            ))
                        ) : (
                            <div style={{ alignItems: "center", textAlign: "center", padding: "20px" }}>
                            No questions to show.
                            </div>
                        )}
                    </div>

                </div>
                ) : (
                    <div style={{ alignItems: "center",textAlign: "center", padding: "20px" }}>
                    Select a quiz to view.
                    </div>
                )}
                </div>
                

                

                <div className="buttons">
                    {/* <button className="btnYellow">Save Changes</button> */}
                    <br/>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                      <button className="btnWhite"onClick={() => navigate("/quizsession")}>Start Quiz Session</button>
                    
                    <button className="btnWhite" onClick={openDeletePopup} disabled={clickedQuiz === null}>Delete Quiz</button>
                    <Dialog open={isDeletePopupOpen} onClose={closeDeletePopup}>
                        <DialogTitle>Delete Quiz</DialogTitle>
                        <DialogContent>
                            <Typography>Are you sure you want to delete this quiz?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeDeletePopup}>Cancel</Button>
                            <Button onClick={handleDeleteQuiz}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                    </div>
                </div>
              
        </div>
    )
}