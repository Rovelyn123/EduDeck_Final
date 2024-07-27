import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function ErrorPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh', 
                backgroundImage: 'url(/ErrorPageBG.png)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
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
                        <img src="/logo.png" alt="App Logo" style={{ width: isMobile ? 40 : 50 }} />
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: 'Poppin, sans-serif',
                                fontWeight: '600',
                                fontSize: isMobile ? '20px' : '35px',
                                color: '#8c7111',
                                ml: 1,
                            }}
                        >
                            EduDeck
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '60px' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Box textAlign="left" sx={{ ml: isMobile ? 2 : 8, mt: isMobile ? 4 : 0 }}>
                                <Typography style={{ color: '#333333' }} variant={isMobile ? "h4" : "h2"}>
                                    Ooops...
                                </Typography>
                                <Typography style={{ color: '#333333' }} variant={isMobile ? "h6" : "h4"}>
                                    Page not found
                                </Typography>
                                <Typography style={{ color: '#333333' }} variant="body1">
                                    This page you're looking for doesn't exist or an <br /> other error occurred, go back to homepage
                                </Typography>
                                <Button 
                                    style={{ 
                                        borderRadius: '2em', 
                                        marginTop: '1em', 
                                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', 
                                        color: '#333333', 
                                        backgroundColor: '#FFD234', 
                                        width: '10em',
                                        border: '.5px solid #D9D9D9'
                                    }} 
                                    component={Link} 
                                    to="/" 
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    Go back
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img src="/ErrorPage.png" alt="Error Page" style={{ width: isMobile ? '90%' : '110%', marginRight: isMobile ? 0 : '3em'}} />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default ErrorPage;
