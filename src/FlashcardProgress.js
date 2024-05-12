import React from 'react';
import './FlashcardProgress.css'; // Import your CSS file for styling
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

class FlashcardProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Rizal's Lovers", // Initial title
      lastReviewedDate: new Date().toLocaleDateString(),
      selectedDeck: null,
      flashcardData: [
        {
          question: "Who was Jose Rizal’s puppy love?",
          difficulty: "Medium",
          reviewCounts: 5,
          memorizedHits: 3,
          successRate: "60%",
        },
        {
          question: "Unfortunately, _______’s mother disapproved of her daughter’s relationship with Rizal, who was then a known filibustero.",
          difficulty: "Hard",
          reviewCounts: 8,
          memorizedHits: 6,
          successRate: "75%",
        },
        {
          question: "Who was Jose Rizal’s true love in exile?",
          difficulty: "Easy",
          reviewCounts: 3,
          memorizedHits: 2,
          successRate: "67%",
        },
        // Add more flashcard objects as needed
      ],

      "UML 2": [
        {
          question: "What does UML stand for?",
          difficulty: "Easy",
          reviewCounts: 7,
          memorizedHits: 5,
          successRate: "71%",
        },
        {
          question: "Explain the purpose of a use case diagram.",
          difficulty: "Medium",
          reviewCounts: 4,
          memorizedHits: 2,
          successRate: "50%",
        },
        // ...additional UML 2 data
      ],

      "Scope Management": [
        {
          question: "Define scope creep.",
          difficulty: "Hard",
          reviewCounts: 6,
          memorizedHits: 4,
          successRate: "67%",
        },
        {
          question: "What are the key elements of a project scope statement?",
          difficulty: "Medium",
          reviewCounts: 3,
          memorizedHits: 1,
          successRate: "33%",
        },
        // ...additional Scope Management data
      ],
    };
  }

  handleNavigationClick = (title, event) => {
    event.preventDefault();
    const selectedDeckData = this.state[title]; // Update the title based on the clicked item
    this.setState({ title, selectedDeck: title, selectedDeckData });
  };

  render() {
    let selectedTableData = this.state.flashcardData; // Default to initial flashcardData
    if (this.state.selectedDeckData) {
      selectedTableData = this.state.selectedDeckData; // Update if selectedDeckData exists
    }

    return (
      <div className="welcome-back-page">
        <AppBar style={{background: 'none', boxShadow: 'none', padding: '10px', marginTop: '10px'}}>
            <Toolbar>
                <img src= "/logo.png" alt="App Logo" style={{width: 100, marginLeft: '50px'}}/>
                <Typography variant="h3" style={{fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '40px',color: '#B18A00'}}
                >AcadZen
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px', marginLeft: '100px'}}>
                    <div style={{ background: 'white', borderRadius: '15px', textAlign: 'center', height: '55px', width: '1101px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                        <Typography variant="h4" style={{ fontFamily: "Roboto Condensed", fontSize: '35px',color: '#332D2D', textAlign: 'center', lineHeight: '55px' }}
                        >Flashcard Progress
                        </Typography>
                    </div>
                </div>
                <Box style={{ background: 'white', borderRadius: '10px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '70px'}}>
                    <Box style={{ background: '#FAC712', borderRadius: '10px', width: '50px', height: '50px'}}>
                        <IconButton color="black" style={{ fontSize: '45px'}}>
                        <HomeIcon style={{ fontSize: '80%', width: '100%'}} />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
      <div className="container">
        {/* Navigation Sidebar */}
        <div className="sidebar" style={{ textAlign: 'center' }}>
        <div className="con" style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
          <h1 style={{ fontFamily: "Roboto Condensed", fontWeight: 'bold'}}>Decks</h1>
        </div>
           <div className="navigation-decks"> 
          <ul style={{ textAlign: 'center' }}>
              <li>
                <a
                  href="Rizal's Lovers"
                  onClick={(e) => this.handleNavigationClick("Rizal's Lovers", e)}
                  className={this.state.selectedDeck === "Rizal's Lovers" ? 'selected' : ''}
                >
                  Rizal's Lovers
                </a>
              </li>
              <li>
                <a
                  href="UML 2"
                  onClick={(e) => this.handleNavigationClick("UML 2", e)}
                  className={this.state.selectedDeck === "UML 2" ? 'selected' : ''}
                >
                  UML 2
                </a>
              </li>
              <li>
                <a
                  href="Scope Management"
                  onClick={(e) => this.handleNavigationClick("Scope Management", e)}
                  className={this.state.selectedDeck === "Scope Management" ? 'selected' : ''}
                >
                  Scope Management
                </a>
              </li>
            </ul>
        </div>
        </div>

        {/* Table in the Center */}
        <div className="content-wrapper">
            <h1 style={{ textAlign: 'center', marginTop: '3px', fontFamily: "Roboto Condensed"}}>{this.state.title}</h1>
            <div className="last-reviewed">
              Last Reviewed: <span>{this.state.lastReviewedDate}</span>
            </div>
       <div className="content-inside">
        <div className="content">
          {/* Your table */}
          <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Difficulty</th>
            <th>Review Counts</th>
            <th>Memorized Hits</th>
            <th>Success Rate</th>
          </tr>
        </thead>
        <tbody>
          {selectedTableData.map((flashcard, index) => (
            <tr key={index}>
              <td>{flashcard.question}</td>
              <td>{flashcard.difficulty}</td>
              <td>{flashcard.reviewCounts}</td>
              <td>{flashcard.memorizedHits}</td>
              <td>{flashcard.successRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default FlashcardProgress;
