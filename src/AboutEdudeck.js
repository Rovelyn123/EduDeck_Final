import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, ButtonGroup} from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function AboutAcadZen() {

    // when button is clicked, the screen/scroll view is on the top para nice haha
    const handleButtonClick = () => {
        window.scrollTo(0,0);
      };

    // kani kay para clickable lang icons 
    const handleParagraphClick = (item) => {
        console.log(`Clicked on ${item}`);
      };

    return (
        <>
       <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div
                    style={{
                        display: 'grid',
                        backgroundImage: `url('/WebApp bg.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        height: 'auto',
                        width: 'auto',
                        paddingBottom: '70px',
                    }}
                >
        <AppBar position="sticky" sx={{background: 'white'}}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Link to="/" style={{textDecoration: 'none'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', margin: '0 0 0 -0.7rem '}}>
                        <Box sx={{height: { xs: '35px', sm: '52px' }, width: 'auto'}}>
                        <img src='logo.png' alt='logo' className='logo' style={{height: '100%', width: 'auto'}} />
                    </Box>
                    <Typography sx={{color: "#8c7111", fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: { xs: '1.2em', sm: '1.8em' }, display: { xs: "none", sm: "block" }}}>
                        EduDeck
                    </Typography>
                    </Box>
                    </Link>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <ButtonGroup color="secondary" variant="text" aria-label="Button group">
                        <Link to="/signup" style={{ textDecoration: 'none' }}><Button sx={{color: '#8C7111', fontWeight: 'bold', fontSize: { xs: '0.8em', sm: '1em' }}}>Signup</Button></Link>
                        <Link to="/Login" style={{ textDecoration: 'none' }}>   <Button sx={{color: '#8C7111', fontWeight: 'bold', fontSize: { xs: '0.8em', sm: '1em' }}}>Login</Button></Link>
                    </ButtonGroup>
                    </Box>
                </Toolbar>
            </AppBar>
                <div style={{margin: '0 60px 0 60px'}}>
                    <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginTop: '100px'}}>
                        About EduDeck
                    </Typography>
                    <Typography sx={{fontFamily: 'Inter', fontSize: '28px', textAlign: 'center', marginTop: '40px'}}>
                    EduDeck is a revolutionary web application designed to empower college students to excel acadically and personally. 
                    We understand the challenges of college life, and we’re here to help you navigate them <br/> with ease and efficiency.
                    </Typography>           
                </div>
        <div style={{marginTop: '60px'}}>
            <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px'}}>
                Our Features
            </Typography>
            <Box display="flex" justifyContent="center">
                <Box
                    width={320}
                    height={350}
                    bgcolor="#332D2D"
                    marginRight={15}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Typography variant="body1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '23px', textAlign: 'left', margin: '0px 15px 20px 20px'}}> 
                    <strong>Document-to-Flashcard Conversion</strong> <br/> 
                        Our AI-powered tool transforms your academic documents (PDF, PPT, DOC) into flashcards, 
                        making study preparation efficient and effective.
                    </Typography>
                </Box>

                <Box
                    width={320}
                    height={350}
                    bgcolor="#332D2D"
                    marginRight={15}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Typography variant="body1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '23px', textAlign: 'left', margin: '0px 15px 20px 20px'}}> 
                    <strong>Dreamboard</strong> <br/> 
                     Visualize your goals and track your progress with our interactive dreamboard. It’s a powerful tool for motivation and personal growth.
                    </Typography>
                </Box>

                <Box
                    width={320}
                    height={350}
                    bgcolor="#332D2D"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="#fff"
                    fontWeight="bold"
                    borderRadius={2}
                    boxShadow= '0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                >
                    <Typography variant="body1" sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '23px', textAlign: 'left', margin: '0px 15px 20px 20px'}}> 
                    <strong>Mental Health Reminders & Quotes</strong> <br/>
                    We care about your well-being. Our platform sends you regular reminders and motivational quotes to keep you inspired and mentally healthy.
                    </Typography>
                </Box>
            </Box>
        </div>

            <div style={{margin: '70px 60px 0 60px'}}>
                <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '32px', fontWeight: 'bold', textAlign: 'center'}}>
                    Our Vision
                </Typography>
                <Typography sx={{fontFamily: 'Inter', fontSize: '28px', textAlign: 'center', marginTop: '30px'}}> 
                At EduDeck, we believe in holistic growth and well-being. We aim to provide a user-friendly hub that fosters academic excellence, personal development, and mental health.
                We’re not just another educational platform; <br/>we’re a community committed to helping you thrive during your college journey.
                </Typography>   
            </div>
        </div>

        <Footer/>
        </div>
        </>
    );
}

export default AboutAcadZen;