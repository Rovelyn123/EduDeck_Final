import React, { useState, useEffect } from 'react';
import './DashboardUI.css';
import { Typography, Divider, Button, Dialog, DialogActions, DialogContentText,
    DialogContent, TextField, DialogTitle, IconButton, Box, Toolbar, Grid, useMediaQuery} from '@mui/material';
import { AccountCircle, NotificationsNone, Score } from "@mui/icons-material";
import NavigationBarUI from './NavigationBarUI';
import { Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios"; 
import '@fontsource/lato';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Brush } from 'recharts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import BASE_URL from "./config.js";

// Function to calculate target score based on total questions
const calculateTargetScore = (totalQuestions) => {
  if (totalQuestions >= 30) return 22; // or 18, adjust if needed
  if (totalQuestions >= 20) return 15; // or 12
  if (totalQuestions >= 10) return 8; // or 6
  if (totalQuestions >= 5) return 3; // or 2
  return Math.floor(totalQuestions * 0.5); // Default 50% if no specific case
};

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
    const [targetScore, setTargetScore] = useState(20); 
    const [open, setOpen] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [id, setId] = useState(1);
    const [newQuestion, setNewQuestion] = useState(''); // Use the entered username
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [dailyScores, setDailyScores] = useState([]);
    const [weeklyScores, setWeeklyScores] = useState([]);
    const [recentQuizzes, setRecentQuizzes] = useState([]);
    const [radarData, setRadarData] = useState([]);
    const cardColors = ['#FAD34B', '#FFE070', '#FFEBA6']; 
    const userid = localStorage.getItem('userid');
    const [percentage, setPercentage] = useState(0);
    // const [totalQuestions, setTotalQuestions] = useState(0);
    const [quizTitle, setQuizTitle] = useState('');  // Store quiz title

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

    useEffect(() => {
      // Example: Fetching total questions from localStorage or API
      const fetchedTotalQuestions = parseInt(localStorage.getItem('totalQuestions'), 10) || 0;
      setTotalQuestions(fetchedTotalQuestions);
      
      const calculatedScore = calculateTargetScore(fetchedTotalQuestions);
      setTargetScore(calculatedScore);

      // Optional: Fetch or calculate current score if needed
      const currentScore = parseInt(localStorage.getItem('correctAnswers'), 10) || 0;
      setScore(currentScore);
  }, []);
    
   // const percentage = targetScore > 0 ? Math.min((score / targetScore) * 100, 100) : 0;
  const { correctAnswers, wrongAnswers, detailedResults } = location.state || { correctAnswers: 0, wrongAnswers: 0, detailedResults: [] };



  // Retrieve the percentage from localStorage when the component mounts
  useEffect(() => {
    const storedPercentage = localStorage.getItem('quizPercentage');
    const storedTotalQuestions = localStorage.getItem('totalQuestions');
    const storedScore = localStorage.getItem('correctAnswers');
    const storedQuizTitle = localStorage.getItem('quizTitle');
    const storedTargetScore = localStorage.getItem('targetScore');

    if (storedPercentage) setPercentage(parseFloat(storedPercentage));
    if (storedTotalQuestions) setTotalQuestions(parseInt(storedTotalQuestions));
    if (storedScore) setScore(parseInt(storedScore));
    if (storedQuizTitle) setQuizTitle(storedQuizTitle);  // Retrieve quiz title
    if (storedTargetScore) setTargetScore(parseInt(storedTargetScore));
  }, []);

  useEffect(() => {
    const storedQuizTitle = localStorage.getItem('quizTitle');
    if (storedQuizTitle) {
      setQuizTitle(storedQuizTitle);  // Set the title from localStorage
    }
  }, []);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [averageTimes, setAverageTimes] = useState({
      multiple_choice: 0,
      truefalse: 0,
      short_answer: 0,
    });
  
    useEffect(() => {
      const storedAverageTimes = JSON.parse(localStorage.getItem('averageTimes'));
      if (storedAverageTimes) {
        setAverageTimes(storedAverageTimes);
      }
    }, []);

    const defaultSubjects = [
      { subject: 'Math', averageScore: 0 },
      { subject: 'Science', averageScore: 0 },
      { subject: 'Language', averageScore: 0 },
      { subject: 'Business', averageScore: 0 },
      { subject: 'Engineering', averageScore: 0 },
      { subject: 'Social Studies', averageScore: 0 },
    ];

    // const weekData = [
    //   { Week: 'Sun', GeneralScore: 50, Series2: 24 },
    //   { Week: 'Mon', GeneralScore: 30, Series2: 13 },
    //   { Week: 'Tue', GeneralScore: 40, Series2: 98 },
    //   { Week: 'wed', GeneralScore: 27, Series2: 39 },
    //   { Week: 'Thu', GeneralScore: 18, Series2: 48 },
    //   { Week: 'Fri', GeneralScore: 23, Series2: 38 },
    //   { Week: 'Sat', GeneralScore: 34, Series2: 43 },
    //   // Add more data points as needed
    // ];
  //   useEffect(() => {
  //     // Fetch daily scores array from localStorage or initialize empty array if not present
  //     const storedDailyScores = JSON.parse(localStorage.getItem('dailyScores')) || [];
  //     setDailyScores(storedDailyScores);

  //     // Example of storing today’s score
  //     const storedScore = localStorage.getItem('correctAnswers');
  //     const date = new Date().toLocaleDateString('en-US', { weekday: 'short' });
      
  //     if (storedScore) {
  //         const updatedScores = [...storedDailyScores, { Week: date, GeneralScore: parseInt(storedScore) }];
  //         setDailyScores(updatedScores);
  //         localStorage.setItem('dailyScores', JSON.stringify(updatedScores));
  //     }
  // }, []);

//   useEffect(() => {
//     // Get or initialize the weekly scores from localStorage
//     const storedWeeklyScores = JSON.parse(localStorage.getItem('weeklyScores')) || [
//         { Week: 'Sun', GeneralScore: 0, count: 0 },
//         { Week: 'Mon', GeneralScore: 0, count: 0 },
//         { Week: 'Tue', GeneralScore: 0, count: 0 },
//         { Week: 'Wed', GeneralScore: 0, count: 0 },
//         { Week: 'Thu', GeneralScore: 0, count: 0 },
//         { Week: 'Fri', GeneralScore: 0, count: 0 },
//         { Week: 'Sat', GeneralScore: 0, count: 0 },
//     ];

//     // Example of retrieving today's score from localStorage
//     const storedScore = localStorage.getItem('correctAnswers');
//     const date = new Date();
//     const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

//     if (storedScore) {
//         // Find the correct weekday entry
//         const updatedScores = storedWeeklyScores.map((day) => {
//             if (day.Week === dayOfWeek) {
//                 // Update score and count for averaging
//                 const newTotalScore = day.GeneralScore * day.count + parseInt(storedScore);
//                 const newCount = day.count + 1;
//                 return { ...day, GeneralScore: newTotalScore / newCount, count: newCount };
//             }
//             return day;
//         });

//         // Update state and save to localStorage
//         setWeeklyScores(updatedScores);
//         localStorage.setItem('weeklyScores', JSON.stringify(updatedScores));
//     }
// }, []);

useEffect(() => {
    // Get or initialize the weekly scores from localStorage
    const storedWeeklyScores = JSON.parse(localStorage.getItem('weeklyScores')) || [
        { Week: 'Sun', GeneralScore: 0 },
        { Week: 'Mon', GeneralScore: 0 },
        { Week: 'Tue', GeneralScore: 0 },
        { Week: 'Wed', GeneralScore: 0 },
        { Week: 'Thu', GeneralScore: 0 },
        { Week: 'Fri', GeneralScore: 0 },
        { Week: 'Sat', GeneralScore: 0 },
    ];

    // Retrieve today's score from localStorage
    // const storedScore = parseInt(localStorage.getItem('correctAnswers')) || 0;
    const storedScore = localStorage.getItem('correctAnswers');
    const date = new Date();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

    if (storedScore) {
        // Update scores by adding the new score to the current day's total
        const updatedScores = storedWeeklyScores.map((day) => {
            if (day.Week === dayOfWeek) {
              const newTotalScore = day.GeneralScore * day.count + parseInt(storedScore);
              const newCount = day.count + 1;
              return { ...day, GeneralScore: newTotalScore / newCount, count: newCount };
              // return { ...day, GeneralScore: day.GeneralScore + storedScore };
            }
            return day;
        });

        // Update state and save to localStorage
        setWeeklyScores(updatedScores);
        localStorage.setItem('weeklyScores', JSON.stringify(updatedScores));
    }
}, []);


    const pieData = [
      { name: 'Multiple Choice', value: averageTimes['multiple_choice'] },
      { name: 'True or False', value: averageTimes['true/false'] },
      { name: 'Short Answer', value: averageTimes['short_answer']}
    ];

    useEffect(() => {
      const userid = localStorage.getItem('userid');
      const fetchRadarData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/quizzes/average-scores/${userid}`);
          const fetchedRadarData = response.data.map((item) => ({
            subject: item.subject || '',
            averageScore: item.averageScore || 0, 
          }));

          const mergedRadarData = defaultSubjects.map((defaultSubject) => {
            const fetchedSubject = fetchedRadarData.find(
              (item) => item.subject === defaultSubject.subject
            );
            return fetchedSubject || defaultSubject;
          });
          setRadarData(mergedRadarData);
        } catch (error) {
          console.error('Error fetching radar data:', error);
        }
      };
  
      if (userid) {
        fetchRadarData();
      }
    }, [userid]);
    
    
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

const theme = createTheme({
  breakpoints: {
      values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
      },
  },
});

const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

        
    return (
        <>
        <Box className="body">
          <NavigationBarUI/>
            <div>
            <Toolbar style={{ position: "absolute", top: 0,  right: 0 }}>
        
                <div style={{ marginLeft: "3em"}}>
                  <Typography  className='welcome-text'
                  > Welcome Back,
                  </Typography>
                  
                  <Box className='username'>
                    {userName}!
                </Box>                
                </div>

                <Box className="outerBox1">
                  <Box display="flex" alignItems="center">
                    <Box className="innerBox1">
                      {selectedImage === null ? (
                        <Box className="iconBox1">
                          <IconButton className="iconButton1" onClick={() => navigate("/profilesettings")}>
                            <AccountCircle className="accountIcon1"/>
                          </IconButton>
                        </Box>
                      ) : (
                          <Button
                          component={Link}
                          to="/profilesettings"
                            variant="contained"
                            color="primary"
                            className="profileButton"
                            style={{
                              background: "white",
                              borderRadius: "50%",
                              width: "45%",
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
                              className="avatarImage"
                            />
                          </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Toolbar>

            </div>
            
            <Box className="containerBox1">

            <Typography variant="h4" className="container1titleText"
                >Recent Quiz Activity
            </Typography>

          <Box className="contentBox1">
            {/* Flashcard Title */}
            <Typography className="flashcardTitle1"
            > {quizTitle || 'Untitled Deck'}
            </Typography>
            {/* Total Questions */}
            <Typography className="totalQuestionsText"
            >Total Questions: {totalQuestions}
            </Typography>
            {/* Score */}
            <Typography className="scoreText"
            >Score: {score}/{totalQuestions}
              {/* {totalScore}% */}
            </Typography>


            <Box sx={{
              display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', position: 'absolute', bottom: 0, right: 0, p: 2, width: '100%', boxSizing: 'border-box'
            }}>
            </Box>

          </Box>

          <Box className="progressBox">
              <div className="progressInnerBox">
                      <CircularProgressbar
                        value={percentage}
                        text={`${Math.round(percentage)}%`}
                        styles={buildStyles({
                          textColor: isMobile ? '#ffffff' : '#FFD234',
                          pathColor: isMobile ? '#ffffff' : '#FFD234',
                          trailColor: isMobile ? '#FFD234' : '#ffffff',
                          textSize: '18px'
                        })}
                      />
                </div>
            </Box> 
      
          </Box>

          <Box className="outerBox2">
            <Grid
              container
              spacing={2}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="center"
              alignItems="center"
            >
              {/* Pie Chart Section */}
              <Grid item xs={12} md={6}>
                <Box className="chartBox1">
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
                <Box className="chartBox2">
                  <Typography align="center" gutterBottom>
                    Quiz Performance by Subject
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
                        domain={[0, 100]}
                        tick={{ fill: '#555', fontSize: 10 }}
                      />
                      <Radar
                        name="Average Score"
                        dataKey="averageScore"
                        stroke="#82ca9d"
                        strokeWidth={4}
                        fill="#82ca9d"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid>
          </Box>


            <Box className="lineChartBox">

              <Grid container spacing={2} sx={{ width: '100%' }}>
                <ResponsiveContainer width="100%" height={130}>
                    <LineChart data={weeklyScores} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid stroke="#969696" strokeDasharray="3 3" />
                        <XAxis dataKey="Week" stroke="#555" tick={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'Lato' }} />
                        <YAxis stroke="#555" tick={{ fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '8px', border: '1px solid #ddd' }}
                            labelStyle={{ fontWeight: 'bold', color: '#333' }}
                        />
                        <Legend verticalAlign="top" height={20} wrapperStyle={{ paddingBottom: '5px' }} />
                        <Line type="monotone" dataKey="GeneralScore" stroke="#FFD234" strokeWidth={3} dot={{ r: 5 }} />
                        {/* <Brush dataKey="Week" height={20} stroke="#FFD234" /> */}
                    </LineChart>
                </ResponsiveContainer>
            </Grid>

              </Box>
              
        <Box className="streakBox">
            <img src="fire.png" alt="file" style={{ width: '3em', marginRight: '1em', marginBottom: { xs: '1em', md: 0 } }}/>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'baseline' }, }}>
                <Typography className="streakDays">{streak} DAYS</Typography>
                <Typography className="streakLabel"
                // sx={{fontSize: { xs: '0.8em', md: '1em' }, color: '#989A9B', }}
                > CURRENT STREAK </Typography>
            </Box>
            <Typography className="streakDaysOfWeek">{daysOfWeek.map((day, index) => (
                    <span key={index} style={{ color: todayIndex === index ? 'red' : 'inherit' }}>
                        {day}&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                ))}
            </Typography>
             {/* <Button variant="contained" color="primary" onClick={handleActivityComplete} sx={{ marginTop: { xs: '1em', md: 0 } }}>
                Mark Activity Complete
            </Button> */}
        </Box>

              <Box className="flashcardActivityContainer">
                <Typography variant="h4" className="flashcardTitle2">
                  Recent Flashcard Activity
                </Typography>

                <Box className="flashcardList">
                  {/* Flashcard Boxes */}
                  {recentActivities.length > 0 ? (
                   recentActivities.map((activity, index) => (
                    <Box key={index} className="flashcardItem" style={{ backgroundColor: cardColors[index % cardColors.length] }}>

                      {/* Flashcard Title and Author */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Typography className="deckTitle">{activity.deckTitle}</Typography>
                        <Typography className="reviewDate">Reviewed on: {new Date(activity.timestamp).toLocaleString()}</Typography>
                        {/* <Button className="reviewButton">Review</Button> */}
                      </Box>

                      {/* Card Count Button */}
                      <Box className="cardCountButton1">
                      <Button component={Link} to="/flashcardsmgt" className="cardCountButton">
                      {activity.flashcardCount} cards
                      </Button>
                      </Box>
                    </Box>
                   ))
                  ):(
                    <Typography variant="body1">
                        No recent activity.
                    </Typography>
                )}
              </Box>
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