import React from "react";
// import "./Pricing.css";
import { Toolbar, Typography, Button, Box, IconButton} from "@mui/material";
// import { Link, useLocation } from "react-router-dom";
// import { useState, useEffect} from "react";

// import axios from "axios";
// import zIndex from "@mui/material/styles/zIndex";
import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import NavigationBar from "./NavigationBar";


function handleButtonClick1() {
    window.location.href = "https://buy.stripe.com/test_3cs2b92ML4IT8NO4gg";
}

function handleButtonClick() {
    window.location.href = "https://buy.stripe.com/test_5kAaHFfzx3EP1lm7st";
}

function Pricing() {

    // const [settingClicked, setSettingClicked] = useState(false);
    // const handleButtonClick = (button) => {
    //     if (button === 'setting') {
    //         setSettingClicked(true);
    //     }
    // }

  return (
    <>
    <div style={{ backgroundColor: "#F5D56E", position: "relative", width: "100vw", height: "100vh" }}>
        <div
          style={{
            backgroundImage: `url('/pricebg.png')`,
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <NavigationBar/>

        <Toolbar style={{ position: "absolute", top: 0, right: 0 }}>
                      
                        <Box style={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                            <Box style={{ background: '#D0BF81', borderRadius: '50px', width: '45px', height: '45px' }}>
                                <IconButton color="white" style={{ fontSize: '45px', padding: '0'}}>
                                    <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box style={{ background: 'white', borderRadius: '50px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '40px', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                            <Box style={{ background: 'white', borderRadius: '50px', width: '45px', height: '45px' }}>
                                <IconButton style={{ fontSize: '45px', padding: '0'}}>
                                    <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
              
        
             <Box style={{ width: '430px', height: '70px', position: 'absolute', top: '15%', left: '60%', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: 'translate(-60%, -50%)', 
                  backgroundColor: 'white'}} > 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '45px', marginRight: '12px'}}>EduDeck</Typography> 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#332D2D', fontSize: '45px'}}>Plus</Typography>
              </Box>
              <div style={{width: '430px', height: '70px', position: 'absolute', top: '25%', left: '60%', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: 'translate(-60%, -50%)'}} > 
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#332D2D', fontSize: '25px', textAlign: 'center'}}>Excel in your courses using our latest set of study resources.
</Typography>
<Box style={{backgroundColor: '#FAC712', padding: '10px', borderRadius: '15px', position: 'absolute', top: '120px', right: '600px', zIndex: '5',
            fontFamily: 'Inter', fontWeight: 'bold', width: '95px'}}>
      BEST DEAL!</Box>
<Box style={{ width: '400px', height: '300px', backgroundColor: '#FFFFFF', margin: '20px auto', borderRadius: '20px', border: '1.5px solid black',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', position: 'absolute', top: '300px', left: '10px', transform: 'translate(-65%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px 30px 60px 30px'}}> 
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '40px', textAlign: 'left', marginBottom: '25px', marginTop: '20px'}}>Annual </Typography>
              <Typography style={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: '22px', textAlign: 'left'}}>Free 7-day trial then</Typography>
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '32px', textAlign: 'left'}}>₱300.00</Typography>
              <Typography style={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: '15px', textAlign: 'left'}}>Which is ₱25.00/ month</Typography>
              <Button style={{background: '#FAC712', fontFamily: 'Inter', fontSize: '20px', fontWeight: 'bold', color: '#555245', marginTop: '70px',marginLeft: '15px',
                              textTransform: 'none', padding: '10px', borderRadius: '10px', width: '370px'}}onClick={handleButtonClick1}>
                Start your free trial now</Button> 
              </Box>
<Box style={{ width: '400px', height: '300px', backgroundColor: '#FFFFFF', margin: '20px auto',borderRadius: '20px', border: '1.5px solid black',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', position: 'absolute', top: '300px', left: '500px', transform: 'translate(-60%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px'}}> 
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '40px', textAlign: 'left', marginBottom: '25px'}}>Monthly </Typography>
              <Typography style={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: '22px', textAlign: 'left'}}>Amount billed today</Typography>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '32px', textAlign: 'left', marginRight: '10px'}}>₱30.00</Typography>
              <Typography style={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: '15px', textAlign: 'left'}}> / month</Typography>
              </div>
    <Button
        style={{
            background: '#332D2D', fontFamily: 'Inter', fontSize: '20px', fontWeight: 'bold', color: '#FAC712', marginTop: '70px', marginLeft: '15px', textTransform: 'none', padding: '10px', borderRadius: '10px', width: '370px'
    }}
        onClick={handleButtonClick}>
        Start your free trial now
    </Button>
              </Box>
              </div>

    </div>
    </div>
    </>
  );
}

export default Pricing;