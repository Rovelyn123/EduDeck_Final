// Dashboard.js
import React, { useEffect, useState } from "react";
import { Box, Button, Toolbar, Typography} from "@mui/material";
import "./Dashboard.css";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GradingIcon from '@mui/icons-material/Grading';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SpaIcon from '@mui/icons-material/Spa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
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
  const [userName, setUserName] = useState(""); // Set a default value

  const [documentCount, setDocumentCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Check if the current location is /dashboard and set the Overview button state accordingly
    setOverviewClicked(location.pathname === "/dashboard");
    setDocumentClicked(location.pathname === "/uploaddocument");
    setDreamboardClicked(location.pathname === "/dreamboard");
    setMentalHealthClicked(location.pathname === "/mentalhealth");
    setPricingClicked(location.pathname === "/pricing");
    setSettingClicked(location.pathname === "/profilesettings")
    setContactUsClicked(location.pathname === "/contactus");

    const userno = localStorage.getItem('userno');

    axios.get(`http://localhost:8080/api/document/files/${userno}`)
        .then(response => {
            setUserData(response.data);
            setDocumentCount(response.data.length);
        })
        .catch(error => {
            console.error('Error retrieving documents!', error);
        });
    
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

    const fetchProfilePicture = () => {
      fetch(`http://localhost:8080/api/profile/getProfilePicture/${userno}`)
          .then((response) => response.blob())
          .then((blob) => {
              // Set the selected image for display
              setSelectedImage(URL.createObjectURL(blob));
          })
          .catch((error) => console.error("Error:", error));
    };

    fetchProfilePicture();

  }, [location.pathname, location.state?.enteredUsername]);

  const convertToCSV = (data) => {

    if (!data || data.length === 0) {
      return '';
    }

    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
  
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = (''+row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
  
    return csvRows.join('\n');
  };
  
  const csvData = convertToCSV(userData);

  const downloadLink = document.createElement('a');
  downloadLink.href = `data:text/csv;charset=utf-8,${encodeURI(csvData)}`;
  downloadLink.download = 'userData.csv';

  const handleDownload = () => {
    downloadLink.click();
  };

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
    <div className="dashboard">
      <div className="navcontainer">
        <div className="dashboardlogo">
          <Toolbar>
            <img
              src="logo.png"
              alt="AcadZen Logo"
              style={{ width: '80px' }}
            />
            <Typography style={{ fontWeight: 'bold', color: '#8C7111', fontSize: '40px' }}>AcadZen</Typography>
          </Toolbar>
        </div>
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
      <div className="namecontainer">
        <Toolbar style={{ margin: '10px' }}>
          <Link to='/profilesettings'>
          <Button
            variant="contained"
            color="primary"
            // onClick={handleImageButtonClick}
            style={{
              borderRadius: '50%', // Make the button circular
              width: '75px',
              height: '68px',
              padding: 0,
              // marginTop:'20px',
              backgroundColor: 'white'
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="User Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            ) : (
              // <Logout />
              <></>
            )}
          </Button>
          </Link>
          <div style={{ marginLeft: '20px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>
              Welcome Back,
            </Typography>
            <Typography variant="h3" style={{ fontWeight: 'bold', fontFamily: 'Montserrat' }}>
              {userName}
            </Typography>
            
          </div>
        </Toolbar>
        <div className="quizact">
          <h3>Recent Quiz Activity</h3>
          <div className="insidequizdiv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}></div>
          {/* <div className="dluserinfodiv">
            <Button 
              color="inherit"
              type="submit"
              variant="contained"
              style={{ fontSize:'12px', width: '200px', borderRadius: '10px', backgroundColor: '#FAC712', color: 'black', fontWeight: 'bold', height:'40px', marginTop:'5px' }}
              onClick={handleDownload}>Download User Data
            </Button></div> */}
        </div>
          <div className="recentdiv" style={{ display: 'flex', flexDirection: 'space-between'}}>
          <h3>Recent Flashcards</h3>
          </div>
          <div className="uploadstatus" style={{ display: 'flex', flexDirection: 'space-between'}}>
            <h3>Upload Status</h3>
            <div className="uploadstatus1" style={{ display: 'flex', flexDirection: 'column', alignItems:'center'}}>
              <Typography variant="h8" style={{fontWeight:'bold'}}>
              {documentCount}
              </Typography>
              <Typography variant="h8" style={{fontWeight:'bold'}}>
              Documents Uploaded
              </Typography>
            </div>
            <div className="uploadstatus2" style={{ display: 'flex', flexDirection: 'space-between', alignItems:'start'}}>
              <h4>Documents in Queue</h4>
            </div>
            <div className="uploadstatus3" style={{ display: 'flex', flexDirection: 'space-between', alignItems:'start'}}>
              <h4>Documents Converted</h4>
            </div>
            <div className="uploadstatus4" style={{ display: 'flex', flexDirection: 'space-between', alignItems:'start'}}>
              <h4>Conversion Errors</h4>
            </div>
          </div>
          
          <div className="currentstreakdiv" style={{ display: 'flex', flexDirection: 'space-between', alignItems: 'center' }}></div>
          <div className="mottocontainer">
              <img src="/quote.png" alt="Quote for to day" style={{ width: '100%', marginTop: '55px' }} />
          </div>
          <div className="dreamboardnote">
              <h3 style={{margin: '30px 0px 30px 0px', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '22px'}}>DREAMBOARD</h3>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <div className="smallest">Box3</div>
                <div className="smaller"></div>
                <div className="box">Class of 2025 Graduate</div>
                <div className="smaller">Box2</div>
                <div className="smallest">Box3</div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
