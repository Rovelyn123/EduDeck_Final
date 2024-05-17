import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, SwipeableDrawer, Divider, Grid } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import UploadDocument from './UploadDocument';
import { useParams } from 'react-router-dom';

function TextHighlighting() {
  const [fileNames, setFileNames] = useState([]);
  const [pdfURL, setPdfURL] = useState('');
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [highlights, setHighlights] = useState({});
  const { documentID, fileType } = useParams(); // Assuming you have set up react-router-dom

  useEffect(() => {
    fetchFileNames();
  }, []);

  const fetchFileNames = async () => {
    try {
      const response = await axios.get('/api/document/files');
      setFileNames(response.data);
    } catch (error) {
      console.error('Error fetching file names:', error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setBoxVisible(open);
  };

  const handlePdfClick = async (fileName) => {
    try {
      const response = await axios.get(`/api/pdf/view/${fileName}`, {
        responseType: 'arraybuffer'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfURL(url);
      setBoxVisible(false);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const handleHighlight = (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText) {
      const newHighlights = { ...highlights, [selectedText]: selectedText };
      setHighlights(newHighlights);
      // Save highlights to backend
      axios.post(`/api/pdf/highlight/${documentID}`, newHighlights)
        .then(response => {
          console.log('Highlights saved:', response.data);
        })
        .catch(error => {
          console.error('Error saving highlights:', error);
        });
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <AccountCircle />
          </IconButton>
          <Typography variant="h6">
            Text Highlighting
          </Typography>
          <Button color="inherit" onClick={toggleDrawer(true)}>Upload</Button>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={isBoxVisible}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box width={250} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <UploadDocument />
          <Divider />
          {fileNames.map((fileName, index) => (
            <div key={index}>
              <Button onClick={() => handlePdfClick(fileName)}>{fileName}</Button>
            </div>
          ))}
        </Box>
      </SwipeableDrawer>
      <Box m={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <embed src={pdfURL} width="100%" height="600px" type="application/pdf" onMouseUp={handleHighlight} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default TextHighlighting;
