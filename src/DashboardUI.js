import React, { useState, useEffect } from 'react';
//import './DashboardUI.css';
import { Typography, Divider, Button, Dialog, DialogActions, DialogContentText,
    DialogContent, TextField, DialogTitle, IconButton, Box, Toolbar, Grid} from '@mui/material';
import { AccountCircle, NotificationsNone, Score } from "@mui/icons-material";
import NavigationBarUI from './NavigationBarUI';
import { Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios"; 
import '@fontsource/lato';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import BASE_URL from "./config.js";

const DashboardUI = ({onLogout}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState([]);
    const [enteredUsername, setEnteredUsername] = useState(""); // Use the entered username
    const [userName, setUserName] = useState(""); // Set a default value
    const [documentCount, setDocumentCount] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [streak, setStreak] = useState(0);
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const todayIndex = new Date().getDay();
    const [recentFlashcardTitle, setRecentFlashcardTitle] = useState('');
    const [totalQuestions, setTotalQuestions] = useState(0); 
    const [score, setScore] = useState(0); 
    const [targetScore, setTargetScore] = useState(0); 
    const [open, setOpen] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [id, setId] = useState(1);
    const [newQuestion, setNewQuestion] = useState(''); // Use the entered username
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const [recentQuizzes, setRecentQuizzes] = useState([]);
    const cardColors = ['#FAD34B', '#FFE070', '#FFEBA6']; 
    const userid = localStorage.getItem('userid');

    useEffect(() => {
        const quizzes = JSON.parse(localStorage.getItem('recentQuizzes')) || [];
        setRecentQuizzes(quizzes);
    }, []);
  
    const [recentActivities, setRecentActivities] = useState([]);
    const colors = ['#F9D556', '#FF9D33']; 
    

    useEffect(() => {
      const userId = localStorage.getItem('userid');  // Get the current user ID
      if (userId) {
          // Fetch all users' activities
          const allUserActivities = JSON.parse(localStorage.getItem('recentActivities')) || {};
          
          // Get the current user's activities
          const userActivities = allUserActivities[userId] || [];
          
          setRecentActivities(userActivities);  // Set the current user's recent activities
      } else {
          setRecentActivities([]);  // Clear activities if no user is logged in
      }
  }, []);  
  

    useEffect(() => {
        const savedStreak = parseInt(localStorage.getItem('streak'), 10);
        const lastActiveDate = localStorage.getItem('lastActiveDate');
        const currentDate = new Date().toISOString().split('T')[0];

        if (lastActiveDate !== currentDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const formattedYesterday = yesterday.toISOString().split('T')[0];

            if (lastActiveDate === formattedYesterday) {
                setStreak(savedStreak + 1);
                localStorage.setItem('streak', (savedStreak + 1).toString());
            } else {
                setStreak(1);
                localStorage.setItem('streak', '1');
            }

            localStorage.setItem('lastActiveDate', currentDate);
        } else if (!isNaN(savedStreak) && savedStreak > 0) {
            setStreak(savedStreak);
        }
    }, []);

    // useEffect(() => {
    //   const fetchRecentQuizActivity = async () => {
    //     try {
    //       setLoading(true);
    //       console.log("Fetching flashcard with ID:", id);
    
    //       // API call to fetch flashcard data
    //       const response = await axios.get(`http://localhost:8080/api/flashcards/getFlashcardById/${id}`);
    
    //       // Check if response data structure matches expected fields
    //       console.log("Response data:", response.data);
    
    //       const data = response.data;
    //       setRecentFlashcardTitle(data.title); // Make sure 'title' exists in the response
    //       setTotalQuestions(data.totalQuestions); // Ensure 'totalQuestions' exists in the response
    //       setScore(data.score); // Ensure 'score' exists in the response
    //     } catch (err) {
    //       console.error("API fetch error:", err);
    //       setError('Failed to fetch recent quiz activity.');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    
    //   if (id) {
    //     fetchRecentQuizActivity(); // Fetch data only if ID exists
    //   }
    // }, [id]);
    
    
    const handleTargetScoreChange = (event) => {
      setTargetScore(event.target.value);
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const weekData = [
      { Week: 'Sun', GeneralScore: 50, Series2: 24 },
      { Week: 'Mon', GeneralScore: 30, Series2: 13 },
      { Week: 'Tue', GeneralScore: 40, Series2: 98 },
      { Week: 'wed', GeneralScore: 27, Series2: 39 },
      { Week: 'Thu', GeneralScore: 18, Series2: 48 },
      { Week: 'Fri', GeneralScore: 23, Series2: 38 },
      { Week: 'Sat', GeneralScore: 34, Series2: 43 },
      // Add more data points as needed
    ];
    // useEffect(() => {
    //   const fetchQuizScores = async () => {
    //     try {
    //       setLoading(true);
    //       // Fetch recent quiz activity data
    //       const response = await axios.get(`http://localhost:8080/api/flashcards/getFlashcardById/${id}`);
          
    //       const quizData = response.data; // Assuming quizData contains the scores per week
  
    //       // Create data points for the week based on quizData. 
    //       // Example assumes you have the score data structured by day.
    //       const weekData = [
    //         { Week: 'Sun', GeneralScore: quizData.scores.Sunday || 0 }, 
    //         { Week: 'Mon', GeneralScore: quizData.scores.Monday || 0 },
    //         { Week: 'Tue', GeneralScore: quizData.scores.Tuesday || 0 },
    //         { Week: 'Wed', GeneralScore: quizData.scores.Wednesday || 0 },
    //         { Week: 'Thu', GeneralScore: quizData.scores.Thursday || 0 },
    //         { Week: 'Fri', GeneralScore: quizData.scores.Friday || 0 },
    //         { Week: 'Sat', GeneralScore: quizData.scores.Saturday || 0 }
    //       ];
  
    //       // Set the data state for the chart
    //       setData(weekData);
    //     } catch (err) {
    //       console.error('Error fetching quiz scores:', err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   if (id) {
    //     fetchQuizScores(); // Fetch data only if `id` exists
    //   }
    // }, [id]);

    const pieData = [
      { name: 'Multiple Choice', value: 400 },
      { name: 'True or False', value: 300 },
      { name: 'Short Answer', value: 300 },
      { name: 'Essay', value: 200 },
    ];
    
    const radarData = [
      { subject: 'Math', A: 120 },
      { subject: 'Science', A: 98 },
      { subject: 'History', A: 86 },
      // etc.
    ];
    
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#969696'];

    // display flashcards
    useEffect(() => {
      const deckId = 1; // or however you get the deckId from your app
      console.log('Deck ID:', deckId);  // Verify if this is valid

      const fetchFlashcards = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/flashcards/deck/${deckId}`); // ari karyme di ma fetch ambot if sakto ba na pag call hahaha http://localhost:8080/api/decks/getFlashcardDeckById/${deckId}
          setFlashcards(response.data);
        } catch (error) {
          console.error('Error fetching flashcards', error);
        }
      };
    
      fetchFlashcards();
    }, []);
    
    

    useEffect(() => {
      const userid = localStorage.getItem('userid');
  
      axios.get(`${BASE_URL}/api/document/files/${userid}`)
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
      // Retrieve userid from localStorage
      const storeduserid = localStorage.getItem('userid');
      console.log(storeduserid); // Use this userid as needed
      // Retrieve username from localStorage
      const storedUsername = localStorage.getItem('username');
      setUserName(storedUsername || "Guest");
      console.log(storedUsername);
      // setUserName(newEnteredUsername || "Guest");
  
      axios.get(`${BASE_URL}/user/getAllUsers`)
          .then(response => {
              setUserData(response.data);
          })
          .catch(error => {
              console.error('There was an error retrieving the user data!', error);
          });
  
  }, [location.pathname, location.state?.enteredUsername]);

    useEffect(() => {
    const fetchProfilePicture = () => {
        // Retrieve the user number
        const userid = localStorage.getItem('userid');

        // Check if the user has uploaded a profile picture
        axios.get(`${BASE_URL}/user/getProfilePicture/${userid}`, { responseType: 'blob' }) // Specify responseType as 'blob'
            .then((response) => {
                // If the response is successful and contains data, set the selected image
                if (response.data && response.data.size > 0) {
                    const imageURL = URL.createObjectURL(response.data);
                    setSelectedImage(imageURL);
                } else {
                    // If no picture is found or the response is empty, set the selected image to null to display the default AccountCircle icon
                    setSelectedImage(null);
                }
            })
            .catch((error) => {
                // If there's an error (e.g., no profile picture found), set the selected image to null to display the default AccountCircle icon
                console.log("Error fetching profile picture:", error);
                setSelectedImage(null);
            });
    };

    fetchProfilePicture();
}, [location.pathname, location.state?.enteredUsername]);
        
    return (
        <>
            <Box
            sx={{
              backgroundImage: `url('/crystalbackground.png')`,
              backgroundSize: 'cover',
              minHeight: { xs: '200vh', md: '100vh', },
              overflow: { xs: 'scroll', md: 'hidden' },
            }}
          >
          <NavigationBarUI/>
            <div>
            <Toolbar style={{ position: "absolute", top: 0,  right: 0 }}>
        
                <div style={{ marginLeft: "1em"}}>
                  <Typography variant="h4" sx={{textAlign: { xs: 'center', md: 'left' },
                                        fontSize: { xs: '.9em', md: '1em' },
                                        fontFamily: 'Lato', fontWeight: 'bold',
                                        position: 'absolute',
                                        top: { xs: '17%', md: '10%' },
                                        left: { xs: '2%', md: '-70%' },
                                        transform: { xs: 'translateX(-50%)', md: 'none' },
                                    }} > Welcome Back,
                  </Typography>
                  
                  <Box
                    sx={{
                        fontWeight: 'bold',
                        fontFamily: 'Lato',
                        fontSize: '1.8em',
                        marginRight: { xs: 'auto', md: 'auto' }, 
                        position: 'absolute', 
                        top: { xs: '35%', md: '40%' }, 
                        left: { xs: '1%', md: '-42%' }, 
                        transform: { xs: 'translateX(-50%)', md: 'translateX(-50%)' }, 
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    {userName}!
                </Box>                
                </div>

                <Box
                  style={{
                    background: "transparent",
                    borderRadius: "45px",
                    padding: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "6px",
                    marginLeft: "20px",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      style={{
                        background: "white",
                        borderRadius: "100%",
                        padding: "5px",
                        marginRight: "15px",
                        boxShadow: "inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)",
                      }}
                    >
                      {selectedImage === null ? (
                        <Box
                        sx={{
                          top: { xs: '1.3%', md: '2.5%' },
                          marginLeft: { xs: '50%', md: '2%' },
                          transform: { xs: 'translateX(-50%)', md: 'none' },
                          background: '#D0BF81', borderRadius: '50px', width: '39px', height: '39px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    }}
                        >
                          <IconButton
                            style={{ padding: "0" }}
                            onClick={() => navigate("/profilesettings")}
                          >
                            <AccountCircle
                              style={{
                                fontSize: "45px",
                                color: "white",
                                marginLeft: "1px",
                              }}
                            />
                          </IconButton>
                        </Box>
                      ) : (
                          <Button
                          component={Link}
                          to="/profilesettings"
                            variant="contained"
                            color="primary"
                            style={{
                              background: "white",
                              borderRadius: "50%",
                              width: "20%",
                              height: "45px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                              margin: 0,
                            }}
                          >
                            <img
                              src={selectedImage}
                              alt="User Avatar"
                              style={{
                                width: "80%",
                                height: "100%",
                                objectFit: "fill",
                                borderRadius: "100%",
                              }}
                            />
                          </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Toolbar>

            </div>
            
            <Box sx={{
                width: {xs: '83.5%', md:'55%'},
                height: {xs: '26%', md:'21%'},
                backgroundColor: '#FFD234', position: 'absolute',
                top: {xs: '25%', md: '13%'},
                marginLeft: {xs: '50%', md: '47%'},
                transform: 'translate(-50%, -50%)',
                borderRadius: '7px', overflow: 'hidden',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                }}>

            <Typography variant="h4" sx={{ 
                textAlign: 'center', fontSize: '1.3em', position: 'absolute',fontWeight: 'bold', 
                top:{xs: '.5em', md: '.2em'}, 
                left: {xs: '3em', md: '10em'}, fontFamily: 'Lato',
                }}>Recent Quiz Activity
            </Typography>

          <Box sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: '.5em',
            position: 'absolute',
            p: 2,
            boxSizing: 'border-box',
            width: { xs: '85%', md: '80%' },
            height: { xs: '65%', md: '60%' },
            top: { xs: '25%', md: '30%' },
            left: { xs: '7%', md: '2%' },
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
          }}>
            {/* Flashcard Title */}
            <Typography sx={{ fontFamily: 'Lato', position: 'absolute', top: { xs: '1em', md: '1em' }, left: { xs: '1em', md: '1em' }, fontSize: '1em', fontWeight: 'bold' }}>
              Rizal's Lovers
              {recentFlashcardTitle}
            </Typography>
            {/* Total Questions */}
            <Typography sx={{ fontFamily: 'Lato', position: 'absolute', top: '3em', left: '3em', fontSize: '.8em', fontWeight: 'bold' }}>
              Total Questions: {totalQuestions}
            </Typography>
            {/* Score */}
            <Typography sx={{ fontFamily: 'Lato', position: 'absolute', top: '4.5em', left: '3.1em', fontSize: '.8em', fontWeight: 'bold' }}>
              Score: {score}%
            </Typography>

            <Box sx={{
              display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', position: 'absolute', bottom: 0, right: 0, p: 2, width: '100%', boxSizing: 'border-box'
            }}>
              <Button 
                onClick={handleClickOpen}
                style={{
                  background: '#FFE793',
                  width: '12em',
                  height: '2.2em',
                  fontSize: '.75em',
                  color: '#000000',
                  position: 'relative',
                  borderRadius: '.5em',
                  marginBottom: '.1em',
                  marginRight: '1em'
                }}
                sx={{
                  '@media (max-width: 600px)': { width: '17em', height: '3em', fontSize: '.75em' }
                }}>
                Target Score: {targetScore}%
              </Button>

            <Button style={{
                background: '#FFE793',
                width: '8em',
                height: '2.2em',
                fontSize: '.75em',
                color: '#000000',
                position: 'relative',
                borderRadius: '.5em',
                marginBottom: '.1em'
              }}
              sx={{
                '@media (max-width: 600px)': { width: '17em', height: '3em', fontSize: '.75em' }
              }}>
              {score >= targetScore ? 'FAILED!' : 'PASSED!'}
            </Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Target Score</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter your desired target score.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Target Score"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={targetScore}
                  onChange={handleTargetScoreChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          </Box>

          <Box
            sx={{
              width: { xs: '90%', md: '52%' },
              height: { xs: 'auto', md: 'auto' },
              padding: '20px',
              position: 'absolute',
              top: { xs: '38%', md: '22%' },
              left: { xs: '.5%', md: '18%' },
            }}
          >
            <Grid
              container
              spacing={2}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="center"
              alignItems="center"
            >
              {/* Pie Chart Section */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '7px',
                    borderColor: 'lightgray',
                    borderStyle: 'solid',
                    borderWidth: '1.5px',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    height: { xs: '20vh', md: '29vh' },
                    width: { xs: '88.5%', md: '90%' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography align="center" gutterBottom>
                    Average Time Spent Per Question Type
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="40%"
                        labelLine={true}
                        label={({ name, x, y, fill, cx }) => (
                          <text
                            x={x}
                            y={y}
                            fill={fill}
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                            style={{
                              fontSize: '12px',
                              fontWeight: 'bold',
                              fontFamily: 'Lato',
                              fill: '#333',
                            }}
                          >
                            {name}
                          </text>
                        )}
                        outerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <Box sx={{ marginTop: 2 }}>
                    <Legend />
                  </Box>
                </Box>
              </Grid>

              {/* Radar Chart Section */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '7px',
                    borderColor: 'lightgray',
                    borderStyle: 'solid',
                    borderWidth: '1.5px',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    height: { xs: 'auto', md: '29vh' },
                    width: { xs: '88.5%', md: '100%' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography align="center" gutterBottom>
                    Performance by Subject/Question
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#969696" strokeDasharray="6 6" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                          fill: '#555',
                          fontSize: 12,
                          fontWeight: 'bold',
                          fontFamily: 'Lato',
                        }}
                      />
                      <PolarRadiusAxis
                        angle={50}
                        domain={[0, 150]}
                        tick={{ fill: '#555', fontSize: 10 }}
                      />
                      <Radar
                        name="Arthur"
                        dataKey="A"
                        stroke="#969696"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          </Box>


            <Box sx={{
                    width: { xs: '75%', md: '52%' },
                    height: { xs: 'auto', md: 'auto' }, backgroundColor: 'white', position: 'absolute',
                    top: { xs: '98%', md: '62%' },
                    left: { xs: '50%', md: '47%' },
                    transform: 'translateX(-50%)',
                    borderRadius: '7px', padding: '20px',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center'
                }}>

                <Grid container spacing={2} sx={{ width: '100%' }}>
                <ResponsiveContainer width="100%" height={130}>
                <LineChart data={weekData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#969696" strokeDasharray="3 3" />
                  <XAxis dataKey="Week" stroke="#555" tick={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'Lato'  }} />
                  <YAxis stroke="#555" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '8px', border: '1px solid #ddd' }}
                    labelStyle={{ fontWeight: 'bold', color: '#333' }} 
                  />
                  <Legend verticalAlign="top" height={20} wrapperStyle={{ paddingBottom: '5px' }} />
                  <Line type="monotone" dataKey="GeneralScore" stroke="#FFD234" strokeWidth={3} dot={{ r: 5 }} />
                  
                </LineChart>
              </ResponsiveContainer>
                </Grid>

                 {/* <Grid container spacing={2} sx={{ width: '100%' }}>
                  {loading ? (
                    <p>Loading chart...</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={130}>
                      <LineChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid stroke="#969696" strokeDasharray="3 3" />
                        <XAxis dataKey="Week" stroke="#555" tick={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'Lato' }} />
                        <YAxis stroke="#555" tick={{ fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '8px', border: '1px solid #ddd' }}
                          labelStyle={{ fontWeight: 'bold', color: '#333' }}
                        />
                        <Legend verticalAlign="top" height={20} wrapperStyle={{ paddingBottom: '5px' }} />
                        <Line type="monotone" dataKey="GeneralScore" stroke="#FFD234" strokeWidth={3} dot={{ r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </Grid> */}

              </Box>
              
        <Box sx={{
            width: { xs: '73.5%', md: '52%' },
            height: { xs: '15%', md: '8%' }, backgroundColor: 'white', borderColor: '#FAC712', borderStyle: 'solid', borderWidth: '3px',
            position: 'absolute',
            top: { xs: '117%', md: '87%' },
            left: { xs: '50%', md: '47%' },
            transform: 'translateX(-50%)', borderRadius: '7px', padding: '10px 20px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)', display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' },
        }}>
            <img src="fire.png" alt="file" style={{ width: '3em', marginRight: '1em', marginBottom: { xs: '1em', md: 0 } }}/>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'baseline' }, }}>
                <Typography sx={{
                    fontSize: { xs: '1em', md: '1.5em' },
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    marginBottom: { xs: '0.5em', md: 0 },
                    marginRight: { xs: 0, md: '1em' },
                }}>{streak} DAYS</Typography>
                <Typography sx={{fontSize: { xs: '0.8em', md: '1em' }, color: '#989A9B', }}> CURRENT STREAK </Typography>
            </Box>
            <Typography sx={{
                fontSize: { xs: '1em', md: '1.2em' }, fontFamily: 'Lato',
                textAlign: 'center',
                marginTop: { xs: '1em', md: 0 }
            }}>
                {daysOfWeek.map((day, index) => (
                    <span key={index} style={{ color: todayIndex === index ? 'red' : 'inherit' }}>
                        {day}&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                ))}
            </Typography>
             {/* <Button variant="contained" color="primary" onClick={handleActivityComplete} sx={{ marginTop: { xs: '1em', md: 0 } }}>
                Mark Activity Complete
            </Button> */}
        </Box>

              <Box sx={{
                width: { xs: '85%', md: '21.5%' },
                height: { xs: '60vh', md: '87%' },  
                maxHeight: '87%',
                backgroundColor: 'white',
                position: { xs: 'absolute', md: 'absolute' }, 
                top: { xs: '138%', md: '55%' }, 
                left: { xs: '8%', md: '87%' }, 
                transform: { xs: 'none', md: 'translate(-50%, -50%)' }, 
                borderRadius: '7px',
                padding: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                overflowY: 'auto',  
              }}>
                <Typography variant="h4" sx={{
                  textAlign: 'center',
                  fontSize: { xs: '1.2em', md: '1.3em' },
                  position: 'sticky',
                  top: '0',
                  backgroundColor: 'white',
                  zIndex: 1,
                  width: '100%',
                  py: 2,
                  fontFamily: 'Lato',
                }}>
                  Recent Flashcard Activity
                </Typography>


                  {/* Flashcard Boxes */}
                  {recentActivities.length > 0 ? (
                   recentActivities.map((activity, index) => (
                    <Box key={index} sx={{
                      backgroundColor: cardColors[index % cardColors.length],
                      width: { xs: '80%', md: '80%' },  
                      height: 'auto',  
                      borderRadius: '10px',
                      padding: '20px',
                      mb: { xs: 2, md: 3 }, 
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '10px', 
                      position: 'relative',
                    }}>

{/* <h2>{flashcard.question}</h2>
<p>{flashcard.answer}</p> */}
                      {/* Flashcard Title and Author */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Typography sx={{
                          fontSize: { xs: '1.2em', md: '1.2em' }, 
                          fontWeight: 'bold',
                          color: '#333',
                          mb: 1,
                        }}>
                          {activity.deckTitle}
                        </Typography>
                        <Typography sx={{
                          fontSize: { xs: '0.9em', md: '1em' },
                          color: '#666',
                          fontStyle: 'italic',
                        }}>
                          Reviewed on: {new Date(activity.timestamp).toLocaleString()}
                        </Typography>
                      </Box>

                      {/* Card Count Button */}
                      <Button component={Link} to="/flashcardsmgt"
                      sx={{
                        background: '#FFffff',
                        width: { xs: '100%', md: '9em' }, 
                        height: '2.5em',
                        fontSize: { xs: '0.9em', md: '1em' }, 
                        fontWeight: 'bold',
                        color: '#000000',
                        borderRadius: '8px',
                        alignSelf: 'center', 
                        mt: 2,  
                        '&:hover': {
                          backgroundColor: '#FFB400',
                        },
                      }}>
                        {activity.flashcardCount} cards
                      </Button>
                    </Box>
                   ))
                  ):(
                    <Typography variant="body1">
                        No recent activity.
                    </Typography>
                )}
              </Box>

        </Box>
      </>
    );

}


export default DashboardUI;



// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import { Typography, Divider, Button, Dialog, DialogActions, 
//     DialogContent, TextField, DialogTitle, IconButton, Box, Toolbar} from '@mui/material';
// import { AccountCircle, NotificationsNone } from "@mui/icons-material";
// import NavigationBar from './NavigationBar';
// import { Link, useLocation, useNavigate} from "react-router-dom";
// import axios from "axios";

// const Dashboard = ({onLogout}) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [userData, setUserData] = useState([]);
//     const [enteredUsername, setEnteredUsername] = useState(""); // Use the entered username
//     const [userName, setUserName] = useState(""); // Set a default value
//     const [documentCount, setDocumentCount] = useState(0);
//     const [selectedImage, setSelectedImage] = useState(null);

//     useEffect(() => {
//       const userid = localStorage.getItem('userid');
  
//       axios.get(`http://localhost:8080/api/document/files/${userid}`)
//           .then(response => {
//               setUserData(response.data);
//               setDocumentCount(response.data.length);
//           })
//           .catch(error => {
//               console.error('Error retrieving documents!', error);
//           });
  
//       // Extract entered username from location state
//       const newEnteredUsername = location.state?.enteredUsername || "";
//       setEnteredUsername(newEnteredUsername);
//       // Retrieve userid from localStorage
//       const storeduserid = localStorage.getItem('userid');
//       console.log(storeduserid); // Use this userid as needed
//       // Retrieve username from localStorage
//       const storedUsername = localStorage.getItem('username');
//       setUserName(storedUsername || "Guest");
//       console.log(storedUsername);
//       // setUserName(newEnteredUsername || "Guest");
  
//       axios.get('http://localhost:8080/user/getAllUsers')
//           .then(response => {
//               setUserData(response.data);
//           })
//           .catch(error => {
//               console.error('There was an error retrieving the user data!', error);
//           });
  
//   }, [location.pathname, location.state?.enteredUsername]);

//     useEffect(() => {
//     const fetchProfilePicture = () => {
//         // Retrieve the user number
//         const userid = localStorage.getItem('userid');

//         // Check if the user has uploaded a profile picture
//         axios.get(`http://localhost:8080/user/getProfilePicture/${userid}`, { responseType: 'blob' }) // Specify responseType as 'blob'
//             .then((response) => {
//                 // If the response is successful and contains data, set the selected image
//                 if (response.data && response.data.size > 0) {
//                     const imageURL = URL.createObjectURL(response.data);
//                     setSelectedImage(imageURL);
//                 } else {
//                     // If no picture is found or the response is empty, set the selected image to null to display the default AccountCircle icon
//                     setSelectedImage(null);
//                 }
//             })
//             .catch((error) => {
//                 // If there's an error (e.g., no profile picture found), set the selected image to null to display the default AccountCircle icon
//                 console.log("Error fetching profile picture:", error);
//                 setSelectedImage(null);
//             });
//     };

//     fetchProfilePicture();
// }, [location.pathname, location.state?.enteredUsername]);
        
//     return (
//         <>
//             <div
//             style={{
//               backgroundImage: `url('/crystalbackground.png')`,
//               minHeight: '100vh',
//               overflow: 'hidden',
//             }}
//           >
//           <NavigationBar/>
//             <div>
//             <Toolbar style={{ position: "absolute", top: 0,  right: 0 }}>
        
//                 <div style={{ marginLeft: "1em"}}>
//                   <div style={{ fontFamily: 'Roboto Condensed', fontWeight: 'bold', fontSize: '1em'}}>Welcome Back,</div>
//                   <div style={{ fontWeight: 'bold', fontSize: '1.8em'}}>{userName}!</div>
//                 </div>

//                 <Box
//                   style={{
//                     background: "transparent",
//                     borderRadius: "45px",
//                     padding: "5px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     marginTop: "6px",
//                     marginLeft: "20px",
//                   }}
//                 >
//                   <Box display="flex" alignItems="center">
//                     <Box
//                       style={{
//                         background: "white",
//                         borderRadius: "100%",
//                         padding: "5px",
//                         marginRight: "15px",
//                         boxShadow: "inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)",
//                       }}
//                     >
//                       {selectedImage === null ? (
//                         <Box
//                           style={{
//                             background: "#D0BF81",
//                             borderRadius: "50%",
//                             width: "45px",
//                             height: "45px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                           }}
//                         >
//                           <IconButton
//                             style={{ padding: "0" }}
//                             onClick={() => navigate("/profilesettings")}
//                           >
//                             <AccountCircle
//                               style={{
//                                 fontSize: "45px",
//                                 color: "white",
//                                 marginLeft: "1px",
//                               }}
//                             />
//                           </IconButton>
//                         </Box>
//                       ) : (
//                           <Button
//                           component={Link}
//                           to="/profilesettings"
//                             variant="contained"
//                             color="primary"
//                             style={{
//                               background: "white",
//                               borderRadius: "50%",
//                               width: "20%",
//                               height: "45px",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               padding: 0,
//                               margin: 0,
//                             }}
//                           >
//                             <img
//                               src={selectedImage}
//                               alt="User Avatar"
//                               style={{
//                                 width: "80%",
//                                 height: "100%",
//                                 objectFit: "fill",
//                                 borderRadius: "100%",
//                               }}
//                             />
//                           </Button>
//                       )}
//                     </Box>
//                     <Box
//                       style={{
//                         background: "white",
//                         borderRadius: "100%",
//                         padding: "5px",
//                         marginRight: "40px",
//                         boxShadow: "inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)",
//                       }}
//                     >
//                       <Box
//                         style={{
//                           background: "white",
//                           borderRadius: "100%",
//                           width: "45px",
//                           height: "45px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <IconButton style={{ padding: "0" }}>
//                           <NotificationsNone
//                             style={{
//                               fontSize: "45px",
//                               color: "black",
//                               marginLeft: "1px",
//                             }}
//                           />
//                         </IconButton>
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Toolbar>

//             </div>
            
//             <div
//               style={{
//                 width: "47.7em",
//                 height: "10em",
//                 backgroundColor: "#FFD234",
//                 position: "absolute",
//                 top: "10em",
//                 marginLeft: "43.1em",
//                 transform: "translate(-50%, -50%)",
//                 borderRadius: "7px",
//                 overflow: "hidden",
//                 boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
//                 marginTop: '20px'
//               }}
//             >
//               <Typography
//                 variant="h4"
//                 style={{
//                   textAlign: "center",
//                   fontSize: "1.3em",
//                   position: "absolute",
//                   top: ".7em",
//                   left: "10em",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Recent Quiz Activity
//               </Typography>

//               <Box
//                 style={{
//                   backgroundColor: "#FFFFFF",
//                   width: "35em",
//                   height: "6em",
//                   borderRadius: ".5em",
//                   position: "absolute",
//                   top: "3em",
//                   left: "1em",
//                   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <Button
//                   style={{
//                     background: "#FFE793",
//                     width: "12em",
//                     height: "2.2em",
//                     fontSize: "1em",
//                     color: "#000000",
//                     position: "absolute",
//                     top: "3em",
//                     marginLeft: "12em",
//                     borderRadius: ".5em",
//                   }}
//                 >
//                   Target Score: 60%
//                 </Button>
//                 <Button
//                   style={{
//                     background: "#FFE793",
//                     width: "8em",
//                     height: "2.2em",
//                     fontSize: "1em",
//                     color: "#000000",
//                     position: "absolute",
//                     top: "3em",
//                     marginLeft: "25em",
//                     borderRadius: ".5em",
//                   }}
//                 >
//                   PASSED!
//                 </Button>
//               </Box>
//             </div>

//             <div>
//             <Typography variant="h4" style={{ border: 'black', textAlign: 'left', fontSize: '1.3em', position: 'absolute', top: '9em', left: '12em', fontSize: '2em'}}>Elevate your learning 
//             </Typography>
//             <Typography variant="h4" style={{ textAlign: 'center', fontSize: '1em', position: 'absolute', top:'21em', left: '24em' }}>subscribe today, unlocking a world of interactive study materials</Typography>
//             <Box style={{backgroundColor: "#FFFFFF", width: '8em', height: '6.5em', borderRadius: '.5em', position: 'absolute', top: '17em', left: '54em', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
//               <img src="dart.png" alt="dart" style={{width: '85%', height: '85%', }} />
//             </Box>
//             </div>

//             <div style={{
//                     width: '45.5em',
//                     height: '8.5em',
//                     backgroundColor: 'white', 
//                     position: 'absolute', 
//                     top: '30.2em', 
//                     marginLeft: '43.2em', 
//                     transform: 'translate(-50%, -50%)', 
//                     borderRadius: '7px', 
//                     padding: '20px', 
//                     boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
//                     display: 'flex',
//                     flexDirection: 'column',
//                 }}>
//                     <Typography variant="h4" style={{ textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', }}>Document Upload Status</Typography>
//                     <div style={{background: '#FFE793', width: '40em', height: '6em', fontSize: '.5em', color: '#000000', 
//                       position: 'absolute', top: '7em', marginLeft: '1em', borderRadius: '1em',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
//                       <div style={{ display: 'flex', alignItems: 'center' }}>
//                           <div style={{ position: 'relative', textAlign: 'center', marginLeft: 55, marginTop: 8}}>
//                               <span style={{ color: 'black', position: 'absolute', top: '1em', left: '50%', transform: 'translateX(-50%)', fontSize: '1.8em', fontWeight: 'bold' }}>{documentCount}</span>
//                               <img src="file.png" alt="file" style={{ width: '5em' }} />
//                           </div>
//                           <span style={{ marginLeft: '3em', fontSize: '.5em', fontWeight: 'bold', marginTop: 5}}>DOCUMENT UPLOADED</span>
//                       </div>
//                   </div>
//                     <Button style={{background: '#FFE793', width: '40em', height: '6em', fontSize: '.5em', color: '#000000', 
//                                 position: 'absolute', top: '7em', marginLeft: '50em', borderRadius: '1em',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
//                             Documents uploaded
//                     <img src="file.png" alt="file" style={{width:'5em', position: 'absolute', left: '7em' }} /> 
//                     </Button>
//                     <Button style={{background: '#FFE793', width: '40em', height: '6em', fontSize: '.5em', color: '#000000', 
//                                 position: 'absolute', top: '14em', marginLeft: '1em', borderRadius: '1em',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
//                             Documents uploaded
//                     <img src="file.png" alt="file" style={{width:'5em', position: 'absolute', left: '7em' }} /> 
//                     </Button>
//                     <Button style={{background: '#FFE793', width: '40em', height: '6em', fontSize: '.5em', color: '#000000', 
//                                 position: 'absolute', top: '14em', marginLeft: '50em', borderRadius: '1em',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
//                             Documents uploaded
//                     <img src="file.png" alt="file" style={{width:'5em', position: 'absolute', left: '7em' }} /> 
//                     </Button>
                   
//                 </div>

//                 <div style={{
//                      width: '45.5em',
//                      height: '5em',
//                      backgroundColor: 'white', 
//                      borderColor: '#FAC712', 
//                      borderStyle: 'solid', 
//                      borderWidth: '3px', 
//                      position: 'absolute', 
//                      top: '40.5em', 
//                      marginLeft: '43.2em', 
//                      transform: 'translate(-50%, -50%)', 
//                      borderRadius: '7px', 
//                      padding: '20px', 
//                      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
//                      display: 'flex',
//                      flexDirection: 'column',
//                 }}>
//                     <img src="fire.png" alt="file" style={{width:'5em', position: 'absolute', left: '5em', top:'.5em' }} /> 
//                     <Typography style={{position:'absolute', top:'2em', left:'11em', fontSize:'1.2em', color:'#989A9B'}} >CURRENT STREAK</Typography>
//                     <Typography style={{position:'absolute', top:'2em', left:'7.5em', fontSize:'2em', fontWeight:'bold'}} >3 DAYS</Typography>
//                     <Typography style={{position:'absolute', top:'2em', left:'25em', fontSize:'1.2em'}}>
//                     M&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&nbsp;W&nbsp;&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&nbsp;F&nbsp;&nbsp;&nbsp;&nbsp;S&nbsp;&nbsp;&nbsp;&nbsp;S
//                     </Typography>

//                 </div>
              
//                 <div style={{
//                     width: '20em',
//                     height: '39.2em',
//                     backgroundColor: 'white',
//                     position: 'absolute',
//                     top: '24.7em',
//                     left: '79em',
//                     transform: 'translate(-50%, -50%)',
//                     borderRadius: '7px',
//                     padding: '10px',
//                     boxSizing: 'border-box',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
//                     marginTop: '20px'
//                 }}>
                 
//                 <Typography variant="h4" style={{ textAlign: 'center', fontSize: '1.3em', position: 'absolute', top:'1.3em' }}>Recent Flashcard Activity</Typography>

//                  <Box style={{backgroundColor: "#FFE793", width: '17.8em', height: '10em', borderRadius: '.5em', position: 'absolute', top: '5em', 
//                                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
//                             <Button style={{background: '#FFD234', width: '8em', height: '2.2em', fontSize: '1em', fontWeight: 'bold', color: '#FFFFFF', 
//                                 position: 'absolute', top: '7em', marginLeft: '5em', borderRadius: '.5em'}}>
//                             cards
//                             </Button>
//                 </Box>
//                 <Box style={{backgroundColor: "#FFE793", width: '17.8em', height: '10em', borderRadius: '.5em', position: 'absolute', top: '16em', 
//                                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
//                             <Button style={{background: '#FFD234', width: '8em', height: '2.2em', fontSize: '1em', fontWeight: 'bold', color: '#FFFFFF', 
//                                 position: 'absolute', top: '7em', marginLeft: '5em', borderRadius: '.5em'}}>
//                             cards
//                             </Button>
//                 </Box>
//                 <Box style={{backgroundColor: "#FFE793", width: '17.8em', height: '10em', borderRadius: '.5em', position: 'absolute', top: '27em', 
//                                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
//                             <Button style={{background: '#FFD234', width: '8em', height: '2.2em', fontSize: '1em', fontWeight: 'bold', color: '#FFFFFF', 
//                                 position: 'absolute', top: '7em', marginLeft: '5em', borderRadius: '.5em'}}>
//                             cards
//                             </Button>
//                 </Box>
       
//                 </div>

//         </div>
//       </>
//     );

// }


// export default Dashboard;