import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useTheme } from "@mui/material/styles";

function AboutAcadZen() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleButtonClick = () => {
        window.scrollTo(0, 0);
    };

    const handleParagraphClick = (item) => {
        console.log(`Clicked on ${item}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div
                style={{
                    display: 'grid',
                    backgroundImage: `url('/WebApp bg.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: 'auto',
                    width: '100%',
                    paddingBottom: isMobile ? '50px' : '70px',
                }}
            >
                <AppBar position="fixed" style={{ background: 'white' }}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/logo.png" alt="App Logo" style={{ width: isMobile ? 40 : 60 }} />
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: 'Poppin, sans-serif',
                                    fontWeight: '600',
                                    fontSize: isMobile ? '25px' : '35px',
                                    color: '#8c7111',
                                    ml: isMobile ? 1 : 2,
                                }}
                            >
                                EduDeck
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button style={{ color: '#8C7111', fontWeight: 'bold' }}>Sign up</Button>
                            <Box sx={{ marginX: '8px', color: '#8C7111' }}>|</Box>
                            <Button style={{ color: '#8C7111', fontWeight: 'bold' }}>Login</Button>
                        </div>
                    </Toolbar>
                </AppBar>

                <Box sx={{ margin: isMobile ? '20px 20px 20px 20px' : '30px 60px 30px 60px' }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '25px' : '35px', fontWeight: 'bold', textAlign: 'center', marginTop: isMobile ? '80px' : '100px' }}>
                        About EduDeck
                    </Typography>
                    <Typography sx={{ fontFamily: 'Inter', fontSize: isMobile ? '16px' : '18px', textAlign: 'center', marginTop: '20px' }}>
                        EduDeck is a revolutionary web application designed to empower college students to excel academically and personally.
                        We understand the challenges of college life, and we’re here to help you navigate them with ease and efficiency.
                    </Typography>
                </Box>

                <Box sx={{ marginTop: '40px' }} >
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '20px' : '25px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>
                        Our Features
                    </Typography>
                    <Grid container spacing={isMobile ? 3 : 5} justifyContent="center">
                        <Grid item xs={10} sm={6} md={4} sx={{ mb: isMobile ? 3 : 0, display: 'flex', justifyContent: 'center' }}>
                            <Box
                                width="80%"
                                height="100%"
                                bgcolor="#332D2D"
                                display="flex"
                                flexDirection="column"
                                color="#fff"
                                fontWeight="bold"
                                borderRadius={2}
                                boxShadow='0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                                p={2}
                            >
                                <Typography variant="body1" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '14px' : '15px', textAlign: 'left' }}>
                                    <strong>Document-to-Flashcard Conversion</strong> <br />
                                    This feature allows you to convert documents, such as notes or textbooks, into flashcards.
                                    Flashcards are a popular study tool consisting of concise information on one side (e.g., a term or concept) and additional details or definitions on the other side.
                                    By converting documents into flashcards, you can condense complex information into digestible chunks for easier memorization and review.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={10} sm={6} md={4} sx={{ mb: isMobile ? 3 : 0, display: 'flex', justifyContent: 'center' }}>
                            <Box
                                width="80%"
                                height="100%"
                                bgcolor="#332D2D"
                                display="flex"
                                flexDirection="column"
                                color="#fff"
                                fontWeight="bold"
                                borderRadius={2}
                                boxShadow='0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                                p={2}
                            >
                                <Typography variant="body1" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '14px' : '15px', textAlign: 'left' }}>
                                    <strong>AI-generated Quiz</strong> <br />
                                    With this feature, artificial intelligence (AI) technology generates customized quizzes based on the
                                    content you're studying. The AI analyzes the material and formulates questions that test your
                                    understanding of key concepts, facts, and relationships. These quizzes can help reinforce your
                                    learning, identify areas for improvement, and provide targeted practice for exams.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={10} sm={6} md={4} sx={{ mb: isMobile ? 3 : 0, display: 'flex', justifyContent: 'center' }}>
                            <Box
                                width="80%"
                                height="100%"
                                bgcolor="#332D2D"
                                display="flex"
                                flexDirection="column"
                                color="#fff"
                                fontWeight="bold"
                                borderRadius={2}
                                boxShadow='0px 10px 10px 0px rgba(0, 0, 0, 0.25)'
                                p={2}
                            >
                                <Typography variant="body1" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '14px' : '15px', textAlign: 'left' }}>
                                    <strong>Text Highlighting</strong> <br />
                                    Text highlighting allows you to mark important passages or key information within documents or study materials.
                                    This feature is useful for emphasizing critical points, identifying key terms, or organizing information visually.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ margin: isMobile ? '40px 20px 0 20px' : '70px 60px 0 60px' }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: isMobile ? '25px' : '35px', fontWeight: 'bold', textAlign: 'center' }}>
                        Our Vision
                    </Typography>
                    <Typography sx={{ fontFamily: 'Inter', fontSize: isMobile ? '16px' : '18px', textAlign: 'center', marginTop: '30px' }}>
                        At EduDeck, we believe in holistic growth and well-being. We aim to provide a user-friendly hub that fosters academic excellence, personal development, and mental health.
                        We’re not just another educational platform; we’re a community committed to helping you thrive during your college journey.
                    </Typography>
                </Box>
            </div>
            <Footer />
        </div>
    );
}

export default AboutAcadZen;
