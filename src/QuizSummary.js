import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { Toolbar, Typography, Divider, Button, Dialog, DialogActions, 
    DialogContent, TextField, DialogTitle, IconButton, Box} from '@mui/material';
import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';



function Quiz() {
    // const [correctAnswers, setCorrectAnswers] = useState(0);
    // const [wrongAnswers, setWrongAnswers] = useState(0);

    

    // const questions = [
    //     { question: "What is the capital of France?", answer: "Paris" },
    //     { question: "What is the capital of Brazil?", answer: "Brasília" },
    //     { question: "What is the capital of the Philippines?", answer: "Manila" },
    //     // Add more questions and answers as needed
    // ];
    // const checkAnswers = (userAnswers) => {
    //     let correctCount = 0;
    //     let wrongCount = 0;

    //     userAnswers.forEach((answer, index) => {
    //         if (answer.toLowerCase() === questions[index].answer.toLowerCase()) {
    //             correctCount++;
    //         } else {
    //             wrongCount++;
    //         }
    //     });

    //     setCorrectAnswers(correctCount);
    //     setWrongAnswers(wrongCount);
    // };
   
return (
    <div className="lsbody" >
            <div style={{width: '14.5em', height: '3em', padding: '.5em'}}>
                        <img src="logo.png" alt="Logo" style={{
                            width: '5.5%', height: '9%', position: 'absolute',
                            top: '8.5%', left: '4.5%', transform: 'translate(-50%, -50%)'
                        }}/>
                        <Typography variant="h3" style={{
                            fontFamily: 'Poppin, sans-serif', fontWeight: '650',
                            fontSize: '2em', color: '#B18A00', position: 'absolute', top: '8.5%', left: '11.5%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            EduDeck</Typography>
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

                    <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '60px', width: '1100px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', position: 'absolute', marginTop: '25px', marginLeft: '20%' }}>
                                <Typography style={{  fontSize: '30px', color: '#332D2D', justifyContent: 'center', marginTop: '7px' }}
                                >Test Quiz
                                </Typography>
                    </div>
            </div>

            <div>
        <Box style={{backgroundColor: "#FFD234", width: '83em', height: '33em', marginLeft: '14.5em', marginTop: '7em', borderRadius: '1em', }}></Box>
        <Box style={{backgroundColor: "#FFFFFF", width: '80em', height: '30em', marginLeft: '16em', borderRadius: '1em', position: 'absolute', top: '12.5em', }}></Box>
        {/* <Typography style={{color: '#43A047', fontSize: '30px', fontWeight: 'bolder', position: 'absolute', top: '9em', marginLeft: '29em',}}>Correct</Typography>
        <Typography style={{color: '#D32F2F', fontSize: '30px', fontWeight: 'bolder', position: 'absolute', top: '11em', marginLeft: '29.1em',}}>Wrong</Typography> */}
                <Typography style={{ color: '#43A047', fontSize: '30px', fontWeight: 'bolder', position: 'absolute', top: '9em', marginLeft: '29em' }}>
                    Correct:  
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {correctAnswers} */}
                </Typography>
                <Typography style={{ color: '#D32F2F', fontSize: '30px', fontWeight: 'bolder', position: 'absolute', top: '11em', marginLeft: '29.1em' }}>
                    Wrong: 
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {wrongAnswers} */}
                </Typography>
        <img src="partypopper.png" alt="popper" style={{
                            width: '13%', height: '25%', position: 'absolute',
                            top: '53%', left: '78%', transform: 'translate(-50%, -50%)'
                        }}/>
        <Typography style={{color: '#000000', fontSize: '30px', fontWeight: 'bolder', position: 'absolute', top: '14em', marginLeft: '29.1em',}}>You're excelling! Stay <br/> dedicated to mastering <br/> those complex terms.</Typography>
        <Button style={{background: '#FFFFFF', width: '14em', height: '6%', fontWeight: 'bold', color: '#000000', position: 'absolute', top: '43em', marginLeft: '57em', borderRadius: '10px', boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)'}}>OK</Button>

            
        </div>
           


    </div>
);

}

export default Quiz;