import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Typography, SwipeableDrawer, useMediaQuery, useTheme, Divider, Button, IconButton, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { AccountCircle, NotificationsNone, AddCircleOutline } from "@mui/icons-material";

function QuizManagementUI() {
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
                  Quizzes
                </Typography>
                <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10}} />
              </Box>
            </Grid>
            <Box style={{ overflow: 'auto', maxHeight: '45vh' }}>
            <Grid container>
            {fileNames.map((fileName, index) => (
                <Grid item xs={12} style={{marginTop: isMobile ? 20 : 40}} key={index}>
                  <Box style= {{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <Button style={{textTransform: 'none', backgroundColor: selectedFile === fileName ? 'rgba(255, 210, 52, 0.3)' : 'transparent', color: selectedFile === fileName ? '#B18A00' : '#332D2D', boxShadow: selectedFile === fileName ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                    width: '100%', justifyContent: 'center'}}
                    onClick={() => setSelectedFile(fileName)}>
                    <Typography variant= 'body1' style={{ overflow: 'hidden', textOverflow: 'clip', whiteSpace: 'nowrap' }}>{fileName}</Typography>
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

  const handleAddQuestion = () => {
    setShowBox(true);
//     if (currentQuestion !== '' && currentAnswer !== '') {
//         setQuestions([...questions, { question: currentQuestion, answer: currentAnswer }]);
//         setCurrentQuestion('');
//         setCurrentAnswer('');
//         
//     }
 };

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
                  Quizzes
                </Typography>
                <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10}} />
              </Box>
            </Grid>
            <Box style={{ overflow: 'auto', maxHeight: '60vh' }}>
            <Grid container>
            {fileNames.map((fileName, index) => (
                <Grid item xs={12} style={{marginTop: isMobile ? 25 : 40}} key={index}>
                  <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Button style={{textTransform: 'none', backgroundColor: selectedFile === fileName ? 'rgba(255, 210, 52, 0.3)' : 'transparent', color: selectedFile === fileName ? '#B18A00' : '#332D2D', boxShadow: selectedFile === fileName ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                    width: '100%', justifyContent: 'center'}}
                    onClick={() => setSelectedFile(fileName)}>
                    <Typography variant= 'h6' title={fileName} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fileName}</Typography>
                    </Button>
                  </Box>
                </Grid>
                    ))}
              </Grid>
            </Box>
          </Grid>
                <Button style={{backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                    <Typography style={{color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '1.5em', textTransform: 'none'}}>
                      Generate Flashcard
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
                    >Document to Quiz Converter
                    </Typography>
                    </Box>

		            <Box style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '550px', width: '1400px', position: 'absolute', marginTop: '7%', marginLeft: '100%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '12px' }}>
                    <Typography sx={{ fontSize: '30px', color: '#332D2D' }}>
                        {selectedFile}
                    </Typography>
                    </Box>
                    
                    <Box sx={{ position: 'fixed', top: '130px', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '10px', paddingLeft: '20px' }}>
                        <Button sx={{ backgroundColor: '#D9D9D9', color: '#000000', marginRight: '15px', width: '10%', height: '7%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px', }}
                        onClick={handleAddQuestion}>
                            + Add Question
                        </Button>
                    </Box>
                    {showBox && (
                     <Box sx={{ position: 'fixed', top: '200px', left: '310px', width: '75%', height: '20%', backgroundColor: '#FFD234', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px', padding: '20px' }}>
     
                    {/* {questions.map((item, index) => (
                        <Box key={index} sx={{ position: 'fixed', top: `${200 + index * 150}px`, left: '310px', width: '75%', height: '20%', backgroundColor: '#FFD234', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px', padding: '20px' }}>
                            <div>
                                <h3>Question:</h3>
                                <p>{item.question}</p>
                                <h3>Answer:</h3>
                                <p>{item.answer}</p>
                            </div>
                        </Box>
                    ))} */}
                    {showBox && (
                     <Box sx={{ position: 'fixed', top: '200px', left: '310px', width: '75%', height: '20%', backgroundColor: '#FFD234', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px', padding: '20px' }}>
                      <div>
                        <h3>Question:</h3>
                        <p>What is the capital of France?</p>
                        <h3>Answer:</h3>
                        <p>Paris</p>
                      </div>
                      </Box>
                    )}
            
                      </Box>
                    )}

                    </Box>
                    
                    <Box sx={{ position: 'fixed', bottom: '5px', marginLeft: '1700px', width: '100%', height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button sx={{ backgroundColor: '#FFFFFF', color: '#000000', marginRight: '20px', width: '17%', height: '30%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}
                        onClick={()=> handleClickOpen('Start Test quiz')}>
                        Start Test Quiz
                        </Button>
                        <Button sx={{ backgroundColor: '#FFD234', color: '#000000', marginRight: '20px', width: '17%', height: '30%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}
                        onClick={() => handleSaveChanges('Save Changes')}
                        >
                        Save Changes
                        </Button>
                        <Button sx={{ backgroundColor: '#FFFFFF', color: '#000000', width: '17%', height: '30%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', borderRadius: '8px' }}
                        onClick={() => handleClickOpen('Delete Quiz')}>
                        Delete Quiz
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
        )}
      </div>
    </>
  );
}

export default QuizManagementUI;