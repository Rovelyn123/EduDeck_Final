import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Typography, SwipeableDrawer, useMediaQuery, useTheme, Divider, Button, IconButton, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { AccountCircle, NotificationsNone, AddCircleOutline } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
function FlashcardAnalytics() {
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


  const handleQuestionChange = (event) => {
    setCurrentQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setCurrentAnswer(event.target.value);
  };

  const data = [
    { questions: 'What is React?', difficulty: 'Easy', reviewCount: 5, memorizedHits: 3, successRate: '90%' },
    { questions: 'What is a hook?', difficulty: 'Medium', reviewCount: 10, memorizedHits: 7, successRate: '85%' },
    { questions: 'Explain JSX.', difficulty: 'Easy', reviewCount: 2, memorizedHits: 2, successRate: '95%' },
    { questions: 'What is a component?', difficulty: 'Medium', reviewCount: 8, memorizedHits: 6, successRate: '80%' },
    { questions: 'State vs Props?', difficulty: 'Hard', reviewCount: 15, memorizedHits: 10, successRate: '70%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
    { questions: 'Lifecycle methods?', difficulty: 'Medium', reviewCount: 7, memorizedHits: 5, successRate: '85%' },
  ];

  const ScrollableGrid = ({ data }) => {
    return (
        <TableContainer component={Paper} style={{ maxHeight: 660 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 400, textAlign: 'center' }}>Questions</TableCell>
                <TableCell style={{ minWidth: 80, textAlign: 'center' }}>Difficulty</TableCell>
                <TableCell style={{ minWidth: 80, textAlign: 'center' }}>Review Count</TableCell>
                <TableCell style={{ minWidth: 80, textAlign: 'center' }}>Memorized Hits</TableCell>
                <TableCell style={{ minWidth: 80, textAlign: 'center' }}>Success Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.questions}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.difficulty}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.reviewCount}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.memorizedHits}</TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.successRate}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
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
                    >Flashcard Progress
                    </Typography>
                    </Box>

		            <Box style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '60px', width: '1100px', position: 'absolute', marginTop: '25px', marginLeft: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1px' }}>
                      <Typography style={{  fontSize: '30px', color: '#332D2D', justifyContent: 'center', marginTop: '7px' }}
                      >Flashcard Progress
                      </Typography>

                    </Box>
                      <Box
                          style={{
                            background: 'white',
                            borderRadius: '15px',
                            textAlign: 'center',
                            height: '690px',
                            width: '1400px',
                            position: 'absolute',
                            marginTop: '3%',
                            marginLeft: '-5%',
                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                          }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '12px' }}>
                          <Typography sx={{ fontSize: '30px', color: '#332D2D' }}>
                            {selectedFile}
                          </Typography>
                        </Box>
                        <ScrollableGrid data={data} />
                      </Box>

                    </Box>
            </Box>
        )}
      </div>
    </>
  );
}

export default FlashcardAnalytics;