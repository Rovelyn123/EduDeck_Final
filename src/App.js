// import React, { useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./Login";
// import SignUp from "./Signup";
// import HomePage from "./HomePage";
// import AboutUs from "./AboutUs";
// import Dashboard from "./Dashboard"
// // import Profile from "./Profile"
// import AboutEduDeck from "./AboutEduDeck";
// import UploadDocument from "./UploadDocument";
// import TextHighlighting from "./TextHighlighting";
// import OrderSummary from "./Summary";
// import Billing from "./Billing";
// import Payment from "./Payment";
// import Pricing from "./Pricing";
// import Thankyou from "./Thankyou";
// import AdminDashboard from "./AdminDashboard";
// import AdminUserDashboard from "./AdminUserManagement";
// import { useState } from "react";
// import FlashcardManagement from "./FlashcardManagement";
// import ReviewFlashcardsSession from "./ReviewSession";
// import FlashcardProgress from "./FlashcardProgress";
// import QuizSession from "./QuizSession";
// import QuizManagement from "./QuizManagement";
// import GenerateFlashcards from "./GenerateFlashcards";
// import QuizAnalytics from "./QuizAnalytics";
// import QuizAnalytics from "./QuizAnalytics";
// import AdminFlashcardAnalytics from "./AdminFlashcardAnalytics";
// import AdminAnalyticsMonitoring from "./AdminAnalyticsMonitoring";
// import AdminSecurityMeasure from "./AdminSecurityMeasure";
// import AdminSystemConfig from "./AdminSystemConfig";
// import Quiz from "./Quiz";
// import QuizSummary from "./QuizSummary";

// function App() {

//   return (
//     <div >
//       <Router>
//         <Routes>
//           <Route
//             path="/"
//             element={<HomePage/>}
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/aboutus" element={<AboutUs />} />
//           <Route path="/aboutedudeck" element={<AboutEduDeck />} />
//           <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
//           {/* <Route path="/profile" element={user ? <Profile/> : <Login />} /> */}
//           {/* <Route path="/texthighlighting" element={user ? <TextHighlighting /> : <Login />} />  */}
//           <Route path="/UploadDocument" element={user ? <UploadDocument /> : <Login />} /> 
//           <Route path="/generateflashcards" element={user ? <GenerateFlashcards /> : <Login />} /> 
//           <Route path="/flashcardmanagement" element={user ? <FlashcardManagement /> : <Login />} /> 
//           <Route path="/reviewsession" element={user ? <ReviewFlashcardsSession /> : <Login />} /> 
//           {/* <Route path="/flashcardanalytics" element={user ? <FlashcardProgress /> : <Login />} /> 
//           <Route path="/quizmanagement" element={user ? <QuizManagement /> : <Login />} /> 
//           <Route path="/quizsession" element={user ? <QuizSession /> : <Login />} /> 
//           <Route path="/quizanalytics" element={user ? <QuizAnalytics /> : <Login />} /> 
//           <Route path="/quizanalytics2" element={user ? <QuizAnalytics /> : <Login />} />  */}
//           {/* <Route path="/flashcardanalytics2" element={user ? <AdminFlashcardAnalytics /> : <Login />} />
//           <Route path="/ordersummary" element={<OrderSummary />} />
//           <Route path="/billing" element={<Billing />} />
//           <Route path="/payment" element={<Payment />} /> */}
//           <Route path="/pricing" element={<Pricing />} />
//           {/* <Route path="/thankyou" element={<Thankyou />} />
//           <Route path="/admindashboard" element={user ? <AdminDashboard /> : <Login />} /> 
//           <Route path="/adminusermgt" element={user ? <AdminUserDashboard /> : <Login />} /> 
//           <Route path="/analyticsmonitoring" element={user ? <AdminAnalyticsMonitoring /> : <Login />} />
//           <Route path="/securitymeasure" element={user ? <AdminSecurityMeasure /> : <Login />} />
//           <Route path="/systemconfig" element={user ? <AdminSystemConfig /> : <Login />} />  */}

//           <Route path="/quiz" element={user ? <Quiz /> : <Login />} /> 
//           <Route path="/quizsummary" element={user ? <QuizSummary /> : <Login />} /> 
//           <Route path="*" element={<div>
//             <h1>404 - Page Not Found</h1>
//             <p>Sorry, the page you are looking for does not exist.</p>
//           </div>}/>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;