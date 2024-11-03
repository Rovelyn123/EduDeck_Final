import React, {useEffect, useState} from "react";
import { AppBar, Toolbar, Typography, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import '@fontsource/lato';
import axios from "axios";
import BASE_URL from "./config";

const TopAppBarUI = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
    const userId = localStorage.getItem('userid');
    const [subscription, setSubscription] = useState('Free Plan');
    const [email, setEmail] = useState('');



    //Subscription Fetch
    const fetchEmail = async () => {


        try {
            const response = await axios.get(`${BASE_URL}/user/getEmail/${userId}`);
            setEmail(response.data); // Set the email from the response
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };
    // Fetch email when the component mounts
    useEffect(() => {
        fetchEmail();
    }, [userId]);

    const fetchSubscription = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/subscription`, {
                email: email // Send the email in the request body
            });
            console.log('Subscription response:', response.data); // Log the response data

            if (response.data.active) {
                setSubscription('EduDeck Plus');
            } else {
                setSubscription('Free Plan');
            }
        } catch (error) {
            console.error('Error fetching subscription:', error);
            // Optionally handle error state
        }
    };



    useEffect(() => {
        if (email) {
            fetchSubscription();
        }
    }, [email]);

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
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <Box style={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
          <img src="/logo.png" alt="App Logo" style={{ width: 70 }} />
          <Typography
            variant="h4"
            style={{
              fontFamily: 'Lato',
              fontWeight: '900',
              fontSize: '30px',
              color: '#B18A00',
              marginLeft: '10px'
            }}
          >
            EduDeck {subscription === 'EduDeck Plus' ? (
              <sup style={{ color: 'black', fontSize: '0.5em' }}>Plus</sup>
          ) : (
              <sup style={{ fontSize: '0.5em', color: '#888' }}>Free</sup>
          )}
          </Typography>
        </Box>
      </Link>
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
                fontFamily: "Lato",
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

export default TopAppBarUI;
