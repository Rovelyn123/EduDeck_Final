import React from "react";
import "./Pricing.css";
import { Toolbar, Typography, Button, Box, IconButton} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import GradingIcon from '@mui/icons-material/Grading';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SpaIcon from '@mui/icons-material/Spa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from "@mui/icons-material/Home";
import { useState, useEffect} from "react";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";

function Pricing() {

  const location = useLocation();

  const [userData, setUserData] = useState([]);

  const [overviewClicked, setOverviewClicked] = useState(false);
  const [documentClicked, setDocumentClicked] = useState(false);
  const [dreamboardClicked, setDreamboardClicked] = useState(false);
  const [mentalHealthClicked, setMentalHealthClicked] = useState(false);
  const [pricingClicked, setPricingClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);
  const [contactUsClicked, setContactUsClicked] = useState(false);

  const [enteredUsername, setEnteredUsername] = useState(""); // Use the entered username
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if the current location is /dashboard and set the Overview button state accordingly
    setOverviewClicked(location.pathname === "/dashboard");
    setDocumentClicked(location.pathname === "/uploaddocument");
    setDreamboardClicked(location.pathname === "/dreamboard");
    setMentalHealthClicked(location.pathname === "/mentalhealth");
    setPricingClicked(location.pathname === "/pricing");
    setSettingClicked(location.pathname === "/profilesettings")
    setContactUsClicked(location.pathname === "/contactus");
    
    // Extract entered username from location state
    const newEnteredUsername = location.state?.enteredUsername || "";
    setEnteredUsername(newEnteredUsername);
    // Retrieve userno from localStorage
    const storedUserNo = localStorage.getItem('userno');
    console.log(storedUserNo); // Use this userno as needed
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    setUserName(storedUsername || "Guest");
    console.log(storedUsername);
    // setUserName(newEnteredUsername || "Guest");

    axios.get('http://localhost:8080/api/user/getAllUser')
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error('There was an error retrieving the user data!', error);
    });
  }, [location.pathname, location.state?.enteredUsername]);

  const handleButtonClick = (button) => {
    switch (button) {
      case 'overview':
        setOverviewClicked(true);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'document':
        setOverviewClicked(false);
        setDocumentClicked(true);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'dreamboard':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(true);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'mentalHealth':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(true);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'price':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(true);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'setting':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(true);
        setContactUsClicked(false);
        break;
      case 'contactUs':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="welcome-back-page">
    <div style={{backgroundColor: '#F5D56E', minHeight: '100vh', position: 'relative'}}>
        <Box style={{ background: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', position: 'absolute', top: '35px', right: '100px'}}>
              <Box style={{ background: '#FAC712', borderRadius: '10px', width: '50px', height: '50px' }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}> 
                          <IconButton color="black" style={{ fontSize: '45px' }}>
                              <HomeIcon style={{ fontSize: '80%', width: '100%' }} />
                            </IconButton>
                    </Link>

              </Box>
        </Box>
             <Box style={{ width: '430px', height: '70px', position: 'absolute', top: '15%', left: '55%', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: 'translate(-50%, -50%)', 
                  backgroundColor: 'white'}} > 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '45px', marginRight: '12px'}}>AcadZen</Typography> 
                    <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#332D2D', fontSize: '45px'}}>Plus</Typography>
              </Box>
              <div style={{width: '430px', height: '70px', position: 'absolute', top: '25%', left: '55%', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: 'translate(-50%, -50%)'}} > 
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bold', color: '#332D2D', fontSize: '25px', textAlign: 'center'}}>Excel in your courses using our latest set of study resources.
</Typography>
<Box style={{backgroundColor: '#FAC712', padding: '10px', borderRadius: '15px', position: 'absolute', top: '120px', right: '500px', zIndex: '5',
            fontFamily: 'Inter', fontWeight: 'bold', width: '95px'}}>
      BEST DEAL!</Box>
<Box style={{ width: '400px', height: '300px', backgroundColor: '#FFFFFF', margin: '20px auto', borderRadius: '20px', border: '1.5px solid black',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', position: 'absolute', top: '300px', left: '10px', transform: 'translate(-50%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px 30px 60px 30px'}}> 
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '40px', textAlign: 'left', marginBottom: '25px', marginTop: '20px'}}>Annual </Typography>
              <Typography style={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: '22px', textAlign: 'left'}}>Free 7-day trial then</Typography>
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '32px', textAlign: 'left'}}>₱300.00</Typography>
              <Typography style={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: '15px', textAlign: 'left'}}>Which is ₱25.00/ month</Typography>
              <Button style={{background: '#FAC712', fontFamily: 'Inter', fontSize: '20px', fontWeight: 'bold', color: '#555245', marginTop: '70px',marginLeft: '15px',
                              textTransform: 'none', padding: '10px', borderRadius: '10px', width: '370px'}}>
                Start your free trial now</Button> 
              </Box>
<Box style={{ width: '400px', height: '300px', backgroundColor: '#FFFFFF', margin: '20px auto',borderRadius: '20px', border: '1.5px solid black',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', position: 'absolute', top: '300px', left: '500px', transform: 'translate(-50%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '30px'}}> 
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '40px', textAlign: 'left', marginBottom: '25px'}}>Monthly </Typography>
              <Typography style={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: '22px', textAlign: 'left'}}>Amount billed today</Typography>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Typography style={{ fontFamily: 'Inter', fontWeight: 'bolder', color: '#B18A00', fontSize: '32px', textAlign: 'left', marginRight: '10px'}}>₱30.00</Typography>
              <Typography style={{ fontFamily: 'Inter', color: '#9FA0A0', fontSize: '15px', textAlign: 'left'}}> / month</Typography>
              </div>
              <Button style={{background: '#332D2D', fontFamily: 'Inter', fontSize: '20px', fontWeight: 'bold', color: '#FAC712', marginTop: '70px',marginLeft: '15px',
                              textTransform: 'none', padding: '10px', borderRadius: '10px', width: '370px'}}>
                Start your free trial now</Button> 
              </Box>
              </div>
        <div className="sideBar" >
              <Toolbar style={{marginTop: '25px'}}>
              <img
                    src="logo.png"
                    alt="AcadZen Logo"
                    style={{ width: '80px' }}
                  />
                  <Typography style={{ fontWeight: 'bold', color: '#8C7111', fontSize: '40px' }}>AcadZen</Typography>
            </Toolbar>
            <Toolbar>
            <Box display="flex" flexDirection="column" alignItems="center"justifyContent="flex-start" style={{ height: '50vh', marginTop:'50px' }}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <Button
                      type="submit"
                      variant={overviewClicked ? "contained" : "outlined"}
                      style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-start', 
                        fontSize: '20px',
                        paddingLeft: '10px', 
                        fontSize: '20px',
                        border:'none',
                        width: '250px',
                        borderRadius: '10px',
                        backgroundColor: overviewClicked ? 'white' : '#f7c81e',
                        color: overviewClicked ? '#8C7111' : 'black',
                        fontWeight: 'bold',
                        height: '40px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                      }}
                      onClick={() => handleButtonClick('overview')}
                    ><GradingIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Overview</Button>
                </Link>
                <Link to="/uploaddocument" style={{ textDecoration: 'none' }}>
                    <Button
                    type="submit"
                    variant={documentClicked ? "contained" : "outlined"}
                    style={{
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-start', 
                      fontSize: '20px',
                      paddingLeft: '10px',
                      fontSize: '20px',
                      border:'none',
                      width: '250px',
                      borderRadius: '10px',
                      backgroundColor: documentClicked ? 'white' : '#f7c81e',
                      color: documentClicked ? '#8C7111' : 'black',
                      fontWeight: 'bold',
                      height: '65px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                    }}
                    onClick={() => handleButtonClick('document')}
                  ><PictureAsPdfIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Document to Flashcards</Button>
                </Link>
                  <Button
                  type="submit"
                  variant={dreamboardClicked ? "contained" : "outlined"}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    fontSize: '20px',
                    paddingLeft: '10px', 
                    fontSize: '20px',
                    border:'none',
                    width: '250px',
                    borderRadius: '10px',
                    backgroundColor: dreamboardClicked ? 'white' : '#f7c81e',
                    color: dreamboardClicked ? '#8C7111' : 'black',
                    fontWeight: 'bold',
                    height: '40px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                  }}
                  onClick={() => handleButtonClick('dreamboard')}
                ><CloudQueueIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Dreamboard</Button>
                    <Button
                  type="submit"
                  variant={mentalHealthClicked ? "contained" : "outlined"}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    fontSize: '20px',
                    paddingLeft: '10px', 
                    fontSize: '20px',
                    border:'none',
                    width: '250px',
                    borderRadius: '10px',
                    backgroundColor: mentalHealthClicked ? 'white' : '#f7c81e',
                    color: mentalHealthClicked ? '#8C7111' : 'black',
                    fontWeight: 'bold',
                    height: '65px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                  }}
                  onClick={() => handleButtonClick('mentalHealth')}
                ><SpaIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Mental Health Support</Button>
                <Link to="/pricing" style={{ textDecoration: 'none' }}>
                  <Button
                  type="submit"
                  variant={pricingClicked? "contained" : "outlined"}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    fontSize: '20px',
                    paddingLeft: '10px', 
                    fontSize: '20px',
                    border:'none',
                    width: '250px',
                    borderRadius: '10px',
                    backgroundColor: pricingClicked ? 'white' : '#f7c81e',
                    color: pricingClicked ? '#8C7111' : 'black',
                    fontWeight: 'bold',
                    height: '40px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                  }}
                  onClick={() => handleButtonClick('price')}
                ><MonetizationOnIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Pricing</Button>
                </Link>
                  <Link to="/profilesettings" style={{ textDecoration: 'none' }}>
                  <Button
                  type="submit"
                  variant={settingClicked? "contained" : "outlined"}
                  style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    fontSize: '20px',
                    paddingLeft: '10px', 
                    fontSize: '20px',
                    border:'none',
                    width: '250px',
                    borderRadius: '10px',
                    backgroundColor: settingClicked ? 'white' : '#f7c81e',
                    color: settingClicked ? '#8C7111' : 'black',
                    fontWeight: 'bold',
                    height: '40px',marginBottom: '30px', fontFamily: 'Nunito Sans', textTransform: 'none', textAlign: 'left'
                  }}
                  onClick={() => handleButtonClick('setting')}
                ><SettingsIcon style={{marginRight:'25px', marginLeft: '25px'}}/> Setting</Button>
                </Link>
        </Box>
      </Toolbar>
      <div className="contactPanel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ marginBottom: '20px', width: '200px' }}>Encountering problems with our service? Reach out to our customer support team for assistance.</p>
        <Button
          color="inherit"
          type="submit"
          variant="contained"
          style={{ fontSize:'15px', width: '250px', borderRadius: '10px', backgroundColor: '#FAC712', color: 'black', fontWeight: 'bold', height:'40px' }}
        > Contact us</Button>
      </div>
        </div>

    </div>
    </div>
  );
}

export default Pricing;