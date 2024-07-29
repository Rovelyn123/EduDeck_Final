import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, SwipeableDrawer, useMediaQuery, useTheme, Divider, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

function ScrollableNavUI() {
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery('(max-width:1219px)');
    const fileNames = ["File name 1", "File name 2", "File name 3", "File name 312133", "File name 1131313", "File name 2131e1e1", "File name 313e13e1sdsdsdse", "File name ddfdfasdfadfadfaf1", "File name fafaf2", "File name 3gsfgsgs"]; // Replace this with your array of file names
    const [selectedFile, setSelectedFile] = useState(null);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsBoxVisible(open);
    };

    const drawerContent = (
        <Box sx={{ width: { xs: '50vw', sm: 230 }, height: '100vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
            <Grid container>
                <Grid item xs={12}>
                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography marginTop={2} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 18 }}>
                            Documents
                        </Typography>
                        <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
                    </Box>
                </Grid>
                <Box style={{ overflow: 'auto', maxHeight: '60vh', width: '100%' }}>
                    <Grid container>
                        {fileNames.map((fileName, index) => (
                            <Grid item xs={12} style={{ marginTop: isMobile ? 20 : 40 }} key={index}>
                                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                    <Button style={{
                                        textTransform: 'none', backgroundColor: selectedFile === fileName ? 'rgba(255, 210, 52, 0.3)' : 'transparent',
                                        color: selectedFile === fileName ? '#B18A00' : '#332D2D', boxShadow: selectedFile === fileName ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                                        width: '100%', justifyContent: 'center'
                                    }}
                                            onClick={() => setSelectedFile(fileName)}>
                                        <Typography variant='body1' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fileName}</Typography>
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Grid>
            <Button style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                <Typography style={{ color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '20px', textTransform: 'none' }}>
                    Create New Deck
                </Typography>
            </Button>
        </Box>
    );

    return (
        <>
            <div style={{ backgroundImage: 'url(/crystalbackground.png)', minHeight: '100vh', overflow: 'hidden' }}>
                <Box style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}>
                    <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} />
                    {!isMobile && (
                        <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00', marginLeft: 10 }}>
                            EduDeck
                        </Typography>
                    )}
                    {isMobile && (
                        <IconButton onClick={toggleDrawer(true)} style={{ marginLeft: 'auto' }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                </Box>
                {isMobile ? (
                    <SwipeableDrawer
                        anchor="left"
                        open={isBoxVisible}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        transitionDuration={{ enter: 500, exit: 500 }}
                        SlideProps={{ direction: "right" }}
                        PaperProps={{ style: { backgroundColor: 'transparent', height: '100vh', overflow: 'hidden' } }}
                        BackdropProps={{ invisible: true }}
                    >
                        {drawerContent}
                    </SwipeableDrawer>
                ) : (
                    <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 30 }}>
                                        Documents
                                    </Typography>
                                    <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
                                </Box>
                            </Grid>
                            <Box style={{ overflow: 'auto', maxHeight: '60vh', width: '100%' }}>
                                <Grid container>
                                    {fileNames.map((fileName, index) => (
                                        <Grid item xs={12} style={{ marginTop: isMobile ? 25 : 40 }} key={index}>
                                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                                <Button style={{
                                                    textTransform: 'none', backgroundColor: selectedFile === fileName ? 'rgba(255, 210, 52, 0.3)' : 'transparent',
                                                    color: selectedFile === fileName ? '#B18A00' : '#332D2D', boxShadow: selectedFile === fileName ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
                                                    width: '100%', justifyContent: 'center'
                                                }}
                                                        onClick={() => setSelectedFile(fileName)}>
                                                    <Typography title={fileName} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fileName}</Typography>
                                                </Button>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>
                        <Button style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                            <Typography style={{ color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '20px', textTransform: 'none' }}>
                                Create New Deck
                            </Typography>
                        </Button>
                    </Box>
                )}
            </div>
        </>
    );
}

export default ScrollableNavUI;
