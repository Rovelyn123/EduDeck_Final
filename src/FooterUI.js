import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid, IconButton, Divider} from "@mui/material";
import "./Footer.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LanguageIcon from '@mui/icons-material/Language';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function FooterUI() {

    const handleButtonClick = () => {
        window.scrollTo(0,0);
    };

    const handleParagraphClick = (item) => {
        console.log(`Clicked on ${item}`);
    };

    const footerStyle = {
        width: '100%',
        backgroundColor: '#fff',
        borderTop: '1px solid #C8C8C8',
        zIndex: 1000,
        overflowY: 'auto',
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
        <footer style={footerStyle}>
            <div className="AppInfo">
                <div className="grid-item">
                    <h2>About</h2>
                    <div className="button-container">
                        <Link to="/aboutus"><Button onClick={handleButtonClick}>About us</Button></Link>
                        <Link to="/aboutedudeck"><Button onClick={handleButtonClick}>About EduDeck</Button></Link>
                        <Button>Get the app</Button>
                    </div>
                </div>

                <div className="grid-item">
                    <h2>For Students</h2>
                    <div className="button-container">
                        <Button>Flashcards</Button>
                        <Button>Quiz</Button>
                        <Button>Learn</Button>
                    </div>
                </div>

                <div className="grid-item">
                    <h2>Resources</h2>
                    <div className="button-container">
                        <Button>Terms</Button>
                        <Button>Guidelines</Button>
                        <Button>Honor code</Button>
                    </div>
                </div>
            </div>

            <div className="footer">
    <Divider style={{ marginBottom: '16px', backgroundColor: '#C8C8C8' }} />
    <Grid container spacing={4} justifyContent="center">
    <Grid item>
        <IconButton onClick={() => handleParagraphClick('Icon 1')}>
        <InstagramIcon style={{fontSize: isMobile ? '30px' : '50px', color: 'black'}}/>
        </IconButton>
    </Grid>
    <Grid item>
        <IconButton onClick={() => handleParagraphClick('Icon 2')}>
        <FacebookIcon style={{fontSize: isMobile ? '30px' : '50px', color: 'black'}} />
        </IconButton>
    </Grid>
    <Grid item>
        <IconButton onClick={() => handleParagraphClick('Icon 3')}>
        <XIcon style={{fontSize: isMobile ? '30px' : '50px', color: 'black'}} />
        </IconButton>
    </Grid>
    </Grid>
        <Typography variant="small" mt={2} style={{fontSize: isMobile ? '12px' : '16px', fontFamily: 'Lato'}}>
            Privacy Policy &nbsp; | &nbsp; Cookie Policy &nbsp; | &nbsp; Legal Notice &nbsp; | &nbsp; Accessibility Policy &nbsp; | &nbsp; Cookie Settings
        </Typography>
        <Typography variant="body2" mt={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Lato'}}>
            <LanguageIcon style={{ marginRight: '6px' }} />
            <strong>Philippines - English</strong>
        </Typography>
        <Typography variant="body2" mt={2} style={{fontSize: isMobile ? '12px' : '16px', fontFamily: 'Lato'}}>
            © 2024 EduDeck Inc.
        </Typography>
</div>
        </footer>
        </>
    );
}

export default FooterUI;