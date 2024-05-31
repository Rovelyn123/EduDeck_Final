import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Login from './Login';
import QuizSession from './QuizSession';
import AboutUs from './AboutUs';
import FlashcardManagement from './FlashcardManagement';
import FlashcardProgress from './FlashcardProgress';
import Pricing from './Pricing';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import App from './App';
import FlashcardAnalytics from "./FlashcardAnalytics";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    {/* <App /> */}
      <HomePage/>
    {/* <QuizSession/> */}
    {/* <Dashboard/> */}
    {/* <UploadDocument/> */}
    {/* <FlashcardProgress/> */}
    {/* <App /> */}
    {/* <LearningSession/> */}
    {/* <AboutAcadZen/> */}
    {/* <AboutUs/> */}
    {/* <Pricing/> */}
    {/* </BrowserRouter> */}
      {/* <AdminFlashcardAnalytics/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
