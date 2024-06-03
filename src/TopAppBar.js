import React from "react";
import { AppBar, Toolbar, Typography, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const TopAppBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <AppBar
      position="fixed"
      style={{
        background: 'none',
        boxShadow: 'none',
        padding: '10px',
        marginTop: '10px'
      }}
    >
      <Toolbar style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
        <Box style={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
          <img src="/logo.png" alt="App Logo" style={{ width: 70 }} />
          <Typography
            variant="h4"
            style={{
              fontFamily: 'Poppin, sans-serif',
              fontWeight: '600',
              fontSize: '30px',
              color: '#B18A00',
              marginLeft: '10px'
            }}
          >
            EduDeck
          </Typography>
        </Box>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexGrow: 1,
            marginLeft: '3em',
            width: 'auto'
          }}
        >
          <Box
            style={{
              background: 'white',
              borderRadius: '10px',
              textAlign: 'center',
              height: isMobile ? '30px' : '40px',
              width: isMobile ? '100%' : 'calc(100% - 150px)',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontFamily: "Roboto Condensed",
                fontSize: isMobile ? '20px' : '30px',
                color: '#332D2D',
                textAlign: 'center',
                lineHeight: isMobile ? '30px' : '40px',
              }}
            >
              Learning Session
            </Typography>
          </Box>
        </Box>
        {!isMobile && (
          <Box
            style={{
              display: 'flex',
              background: 'white',
              borderRadius: '10px',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '70px',
            }}
          >
          </Box>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default TopAppBar;
