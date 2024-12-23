import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close'; 
import '@fontsource/lato/400.css'; // Import Lato for regular weight

// Define the steps for your stepper
const steps = [
  'Overview',
  'Document to Flashcards',
  'Text Highlighting',
  'Flashcard Management',
  'Quiz',
  'Learning Session',
];

export default function NavBarStepperUI() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // If it's the last step, mark it as completed and reset
      setCompleted({ ...completed, [activeStep]: true });
      setActiveStep(0); 
      setCompleted({}); // Reset completed
      return; 
    }

    // Otherwise, proceed to the next step
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ maxWidth: '100%', width: '100%', position: 'relative' }}> 
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              <Typography sx={{ fontFamily: 'Lato' }}>{label}</Typography> 
            </StepButton>
          </Step>   
        ))}
      </Stepper>

      <div>
        {/* Step Content */}
        {activeStep === 0 && (
          <div style={{marginTop: '2%'}}>
            <Box sx={{ mb: 5 }}> 
            <img
              src="overviewUI.png" // Replace with the actual path to your image
              alt="EduDeck Image"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '800px',  // Set a max-width to control the image size
                display: 'block',   // Makes it a block-level element for centering
                margin: '0 auto',   // Centers the image horizontally
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' 
              }}
            />
            </Box>
            <Typography sx={{ mt: 2, mb: 1, py: 1, fontFamily: 'Lato' }}>
              EduDeck is an innovative web platform created to help college students thrive both academically and personally. We recognize the challenges that come with college life and are here to support you in navigating them with confidence and ease.
            </Typography>
            <Typography sx={{ mt: 2, mb: 1, fontFamily: 'Lato' }}>
              Beyond the Basics:
            </Typography>
            <List sx={{ mt: 1 }}>
              <ListItem>
                <ListItemText primary={<Typography sx={{ fontFamily: 'Lato' }}>Personalized Support: EduDeck recognizes that every student is unique. Our platform adapts to your individual needs and learning style, providing tailored guidance and resources.</Typography>} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Typography sx={{ fontFamily: 'Lato' }}>Academic Excellence: Stay on top of your studies with powerful features:</Typography>} />
              </ListItem>
              <List sx={{ ml: 4, pl: 0 }}> 
                <ListItem>
                  <ListItemText primary={<Typography sx={{ fontFamily: 'Lato' }}>Flashcard Creation & Review: Master your course material through spaced repetition and personalized flashcards.</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Typography sx={{ fontFamily: 'Lato' }}>Analytics Dashboard: Track your progress, identify areas for improvement, and stay motivated.</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Typography sx={{ fontFamily: 'Lato' }}>Streak Tracker: Celebrate your consistency and build momentum with our streak tracking feature.</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<Typography sx={{ fontFamily: 'Lato' }}>Recent Flashcards: Quickly revisit previously learned concepts for effective retention.</Typography>} />
                </ListItem>
              </List> 
            </List>
          </div>
        )} 
        {activeStep === 1 && (
          <div style={{marginTop: '2%'}}>
            {/* Add space at the top of this description */}
            <Box sx={{ mt: 2   }}> {/* Use mt: 2 for margin-top */}
              <Typography sx={{ mt: 2, mb: 1, fontFamily: 'Lato' }}>
              Upload a Document: Click the "Browse" button to select the file you want to upload. Once you've chosen the desired file, click "Open," and then select "Upload Document."
              View Uploaded Documents: After the upload is complete, you’ll see your document listed in the uploaded documents section.
              </Typography>
              <img
              src="DTF1.png" // Replace with the actual path to your image
              alt="EduDeck Image"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '800px',  // Set a max-width to control the image size
                display: 'block',   // Makes it a block-level element for centering
                margin: '0 auto',   // Centers the image horizontally
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' 
              }}
            />
              <Typography sx={{ fontFamily: 'Lato' }}>
              Manage Your Documents: You can click on the document to create flashcards from it. Additionally, you have the options to edit or delete the file as needed.
              </Typography>
              <img
              src="DTF2.png" // Replace with the actual path to your image
              alt="EduDeck Image"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '800px',  // Set a max-width to control the image size
                display: 'block',   // Makes it a block-level element for centering
                margin: '0 auto',   // Centers the image horizontally
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' 
              }}
            />
              <Typography sx={{ fontFamily: 'Lato' }}>
              Highlight Text: To highlight specific topics for inclusion in your flashcards, use the text highlighting feature. This allows you to mark important sections of the document.
              </Typography>
            </Box>
          </div>
        )}
        {activeStep === 2 && (
          <div style={{ marginTop: '2%' }}>
          {/* Add space at the top of this description */}
          <Box sx={{ mt: 2 }}> {/* Use mt: 2 for margin-top */}
          <Typography sx={{ mt: 2, mb: 1, fontFamily: 'Lato' }}>
              Text highlighting allows you to mark important passages or key information within documents or study materials. This feature is useful for emphasizing critical points, identifying key terms, or organizing information visually.
            </Typography>
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Highlight Text Feature:
            </Typography>
            <Typography sx={{ mb: 1, fontFamily: 'Lato' }}>
              To efficiently create flashcards based on important material, you can use the text highlighting feature. This tool allows you to mark key sections or concepts within a document that you want to focus on later when creating flashcards.
            </Typography>
            <img
              src="TH.png" // Replace with the actual path to your image
              alt="EduDeck Image"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '800px',  // Set a max-width to control the image size
                display: 'block',   // Makes it a block-level element for centering
                margin: '0 auto',   // Centers the image horizontally
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' 
              }}
            />
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              How It Works:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Selecting Text: Simply select the portion of the text that you find relevant or important (e.g., a definition, formula, or fact).</Typography></li>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Highlighting: Once selected, use the highlighting option to visually mark the text. This helps draw attention to important points when reviewing the document again.</Typography></li>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Organization: Highlighted text can serve as a starting point for creating questions and answers in your flashcards, making it easier to identify key topics without manually searching for information later.</Typography></li>
            </ul>
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Benefits of Using the Highlight Feature:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Efficient Flashcard Creation: By highlighting crucial content, you can streamline the process of building your flashcards. After marking important sections, you can quickly transfer them into question-answer format, ensuring you don’t miss critical material.</Typography></li>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Focus on Key Information: Instead of reading through entire documents again, your highlights act as a quick reference to the most relevant information. This allows you to focus your attention on high-priority topics.</Typography></li>
            </ul>
          </Box>
        </div>        
        )}
        {activeStep === 3 && (
          <div style={{ marginTop: '2%' }}>
          {/* Add space at the top of this description */}
          <Box sx={{ mt: 2 }}> {/* Use mt: 2 for margin-top */}
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Flashcard Management Feature:
            </Typography>
            <Typography sx={{ mb: 1, fontFamily: 'Lato' }}>
              In the flashcard management system, you have a variety of tools at your disposal to create and manage your study materials.
            </Typography>
            <img
              src="DTF4.png" // Replace with the actual path to your image
              alt="EduDeck Image"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '800px',  // Set a max-width to control the image size
                display: 'block',   // Makes it a block-level element for centering
                margin: '0 auto',   // Centers the image horizontally
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' 
              }}
            />
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Create and Delete Decks:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Creating a Deck: You can start by creating a new deck to organize your flashcards. Each deck can be customized to cover specific topics or subjects (e.g., "History Terms," "Math Formulas").</Typography></li>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Deleting a Deck: If you no longer need a deck, you can delete it. Be cautious, as this will remove all flashcards within that deck permanently.</Typography></li>
            </ul>
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Adding and Deleting Questions:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Add Questions: Once your deck is created, you can populate it with flashcards. Each flashcard consists of a question and an answer. You can add as many questions as needed to ensure comprehensive coverage of the topic.</Typography></li>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Delete Questions: If certain questions are no longer relevant or necessary, you can easily delete them from the deck.</Typography></li>
            </ul>
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Editing Flashcards:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Edit Questions and Answers: At any point, you can modify the content of your flashcards. You can edit both the question and the answer to fix mistakes, add details, or improve clarity.</Typography></li>
            </ul>
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Quiz and Learning Sessions:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Start Quiz: Once your deck is ready, you can test your knowledge by starting a quiz session. This feature allows you to review the questions and answer them one by one, helping reinforce what you've learned.</Typography></li>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Learning Session: In addition to quizzes, you can engage in a learning session. This feature is designed to help you study the flashcards in a more structured way, potentially using methods like spaced repetition to optimize retention.</Typography></li>
            </ul>
          </Box>
        </div>        
        )}
        {activeStep === 4 && (
          <div style={{ marginTop: '2%' }}>
          <Box sx={{ mt: 2 }}> {/* Use mt: 2 for margin-top */}
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Quiz Feature:
            </Typography>
            <Typography sx={{ mb: 1, fontFamily: 'Lato' }}>
              In the flashcard management system, the quiz feature allows you to test your knowledge with customizable options.
            </Typography>
            <img
              src="Q.png" // Replace with the actual path to your image
              alt="EduDeck Image"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '800px',  // Set a max-width to control the image size
                display: 'block',   // Makes it a block-level element for centering
                margin: '0 auto',   // Centers the image horizontally
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' 
              }}
            />
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Choose Difficulty Level:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Difficulty Settings: You can select the level of difficulty for your quiz—Easy, Medium, or Hard.</Typography></li>
              <li><Typography sx={{ fontFamily: 'Lato' }}>AI-Generated Quiz: Based on your chosen difficulty, the system's AI will generate questions that match the desired challenge level. For example:</Typography></li>
              <ul>
                <li><Typography sx={{ fontFamily: 'Lato' }}>Easy: Questions with basic or foundational concepts.</Typography></li>
                <li><Typography sx={{ fontFamily: 'Lato' }}>Medium: Questions with moderate complexity.</Typography></li>
                <li><Typography sx={{ fontFamily: 'Lato' }}>Hard: More challenging questions that may involve advanced concepts or detailed information.</Typography></li>
              </ul>
            </ul>
            <img
              src="QN.png" // Replace with the actual path to your image
              alt="EduDeck Image"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '800px',  // Set a max-width to control the image size
                display: 'block',   // Makes it a block-level element for centering
                margin: '0 auto',   // Centers the image horizontally
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' 
              }}
            />
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Select Number of Questions:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Customizable Question Count: You also have the option to choose how many questions will be included in the quiz. This flexibility allows you to adjust the quiz length based on your available study time or how deeply you want to test your knowledge.</Typography></li>
            </ul>
          </Box>
        </div>
        
        )}
        {activeStep === 5 && (
          <div style={{ marginTop: '2%' }}>
          {/* Add space at the top of this description */}
          <Box sx={{ mt: 2 }}> {/* Use mt: 2 for margin-top */}
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Learning Session:
            </Typography>
            <Typography sx={{ mb: 1, fontFamily: 'Lato' }}>
              The learning session feature allows you to study and reinforce your knowledge through flashcards, with additional options to customize your learning experience.
            </Typography>
            <img
              src="LS.png" // Replace with the actual path to your image
              alt="EduDeck Image"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '800px',  // Set a max-width to control the image size
                display: 'block',   // Makes it a block-level element for centering
                margin: '0 auto',   // Centers the image horizontally
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' 
              }}
            />
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Study Your Deck:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Learning Your Deck: In a learning session, you can go through all the flashcards in a selected deck. This helps you review the material in a structured way, ensuring you're familiar with all the important topics.</Typography></li>
            </ul>
            <img
              src="LS1.png" // Replace with the actual path to your image
              alt="EduDeck Image"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxWidth: '800px',  // Set a max-width to control the image size
                display: 'block',   // Makes it a block-level element for centering
                margin: '0 auto',   // Centers the image horizontally
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)' 
              }}
            />
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Mark Cards as Memorized:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Memorization Progress: After completing a flashcard, you can mark it as memorized. This helps you track which concepts you've already mastered and which ones might need more attention.</Typography></li>
            </ul>
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Review Unmemorized Cards:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Focus on Unmemorized Cards: Once you've marked some cards as memorized, you can opt to review only the unmemorized flashcards. This focused review helps you reinforce the material you still need to learn.</Typography></li>
            </ul>
            <Typography sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontFamily: 'Lato' }}>
              Additional Options:
            </Typography>
            <ul>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Start Quiz: If you'd like to test your knowledge, you can switch to the quiz mode to challenge yourself based on the deck you've been studying.</Typography></li>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Restart Flashcard Session: You can also choose to restart the session, allowing you to go through the flashcards again from the beginning.</Typography></li>
              <li><Typography sx={{ fontFamily: 'Lato' }}>Select a Different Deck: If you want to study a different topic, you can select another flashcard deck and start a new learning session with that deck.</Typography></li>
            </ul>
          </Box>
        </div>        
        )}

        {/* Navigation Buttons Container (sticky at the bottom) */}
        <Box 
          className="sticky-nav" 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            pt: 2, 
            mb: 2, 
            position: 'sticky', 
            bottom: -20, // Sticky at the bottom
            backgroundColor: 'white', 
            zIndex: 10, 
            width: '100%' // Make the navigation buttons fill the container width
          }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1, fontFamily: 'Lato' }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {/* Dynamically change the button text based on the active step */}
          <Button onClick={handleNext} sx={{ mr: 1, fontFamily: 'Lato' }}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>

        {/* Reset Button (Only visible when all steps are completed) */}
        {allStepsCompleted() ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset} sx={{ fontFamily: 'Lato' }}>Reset</Button>
          </Box>
        ) : null}
      </div>
    </Box>
  );
}