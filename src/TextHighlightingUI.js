import React, { useState, useEffect } from "react";
import axios from "axios";
import {Box, Grid, Typography, SwipeableDrawer, useMediaQuery, useTheme, AppBar, Toolbar, IconButton, Divider,Button } from "@mui/material";
import { AccountCircle, NotificationsNone, ZoomIn, ZoomOut, MoreHoriz,
  BorderColor as BorderColorIcon,
  ContentPasteSearch as ContentPasteSearchIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  MoreHoriz as MoreHorizIcon
} from "@mui/icons-material";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import { GlobalWorkerOptions } from 'pdfjs-dist';
GlobalWorkerOptions.workerSrc = '/path/to/pdf.worker.js';



function TextHighlightingUI() {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery('(max-width:1219px)');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [fileURL, setFileURL] = useState(null);
  const userid = localStorage.getItem('userid');

  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/document/files/${userid}`);
        setFileNames(response.data);
      } catch (error) {
        console.error("Error fetching file names:", error);
      }
    };
    fetchFileNames();
  }, [userid]);

  useEffect(() => {
    // Load the selected file from local storage
    const storedDocumentID = localStorage.getItem('selectedDocumentID');
    const storedDocumentTitle = localStorage.getItem('selectedDocumentTitle');

    if (storedDocumentID && storedDocumentTitle) {
      handleDocumentClick(storedDocumentID, storedDocumentTitle);
    }
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsBoxVisible(open);
  };

  const handleDocumentClick = async (documentID, documentTitle) => {
    try {
      setSelectedFile(documentTitle);
      localStorage.setItem('selectedDocumentID', documentID);
      localStorage.setItem('selectedDocumentTitle', documentTitle);
      
      const response = await axios.get(`http://localhost:8080/api/document/files/content/${documentID}`, { responseType: 'blob' });
      const fileBlob = response.data;
      const fileType = getFileType(documentTitle);

      if (fileType === 'pdf') {
        const pdfUrl = URL.createObjectURL(fileBlob);
        setFileURL(pdfUrl);

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const numPages = pdf.numPages;

        let pdfText = "";
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          textContent.items.forEach(item => {
            pdfText += item.str + " ";
          });
        }

        // Here you can implement the logic to highlight text in the PDF view
        console.log(pdfText); // For demonstration
      } else if (fileType === 'docx') {
        const arrayBuffer = await fileBlob.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
        const html = result.value;

        // Display the HTML in an iframe or a div
        setFileURL("data:text/html;charset=utf-8," + encodeURIComponent(html));

        // logic to highlight text
        document.getElementById('doc-content').innerHTML = html;
      } else if (fileType === 'jpeg' || fileType === 'png') {
        const imageUrl = URL.createObjectURL(fileBlob);
        setFileURL(imageUrl);

        // Here you can implement the logic to highlight text in the image view
        console.log('Image loaded:', imageUrl); // For demonstration
      } else {
        console.error('Unsupported file type:', fileType);
      }
    } catch (error) {
      console.error('Error loading document:', error);
    }
  };

  const renderFileNames = () => {
    return fileNames.map((file, index) => (
      <Grid item xs={12} style={{ marginTop: isMobile ? 25 : 40 }} key={index}>
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <Button style={{
            textTransform: 'none',
            backgroundColor: selectedFile === file.documentTitle ? 'rgba(255, 210, 52, 0.3)' : 'transparent',
            color: selectedFile === file.documentTitle ? '#B18A00' : '#332D2D',
            boxShadow: selectedFile === file.documentTitle ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
            width: '100%', justifyContent: 'center'
          }}
            onClick={() => handleDocumentClick(file.documentID, file.documentTitle)}>
            <Typography variant='h6' title={file.documentTitle} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.documentTitle}</Typography>
          </Button>
        </Box>
      </Grid>
    ));
  };

  const getFileType = (fileName) => {
    if (!fileName) {
      return 'unsupported'; // Handle the case where fileName is null or undefined
    }
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'pdf';
      case 'docx':
        return 'docx';
      case 'jpeg':
      case 'jpg':
        return 'jpeg';
      case 'png':
        return 'png';
      // Add support for other file types if needed
      default:
        return 'unsupported';
    }
  };

  const renderFileEmbed = () => {
    return fileURL && (
      <Box style={{ width: '98%', height: '98%', overflow: 'auto' }}>
        {getFileType(selectedFile) === 'pdf' ? (
          <iframe title="PDF Viewer" style={{ width: '100%', height: '100%' }} src={fileURL}></iframe>
        ) : getFileType(selectedFile) === 'docx' ? (
          <div id="doc-content" style={{ width: '100%', height: '100%' }}></div>
        ) : (getFileType(selectedFile) === 'jpeg' || getFileType(selectedFile) === 'png') ? (
          <img src={fileURL} alt="Image Viewer" style={{ width: '100%', height: '100%' }} />
        ) : null}
      </Box>
    );
  };

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString();
      if (selectedText) {
        console.log('Highlighted text:', selectedText);
  
        const range = selection.getRangeAt(0);
        const startContainer = range.startContainer;
        const endContainer = range.endContainer;
  
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
  
        const wrapRangeTextNodes = (range, span) => {
          const fragment = range.cloneContents();
          const walker = document.createTreeWalker(
            fragment,
            NodeFilter.SHOW_TEXT,
            null,
            false
          );
  
          let node;
          const nodesToWrap = [];
          while ((node = walker.nextNode())) {
            nodesToWrap.push(node);
          }
  
          nodesToWrap.forEach((textNode) => {
            const newSpan = span.cloneNode(true);
            textNode.parentNode.replaceChild(newSpan, textNode);
            newSpan.appendChild(textNode);
          });
  
          range.deleteContents();
          range.insertNode(fragment);
        };
  
        try {
          if (startContainer === endContainer && startContainer.nodeType === Node.TEXT_NODE) {
            range.surroundContents(span);
          } else {
            wrapRangeTextNodes(range, span);
          }
          setHighlightedSegments((prevSegments) => [...prevSegments, selectedText]);
        } catch (error) {
          console.error('Error highlighting text:', error);
        }
  
        selection.removeAllRanges();
      }
    };
  
    window.addEventListener('mouseup', handleSelection);
    window.addEventListener('touchend', handleSelection);
  
    return () => {
      window.removeEventListener('mouseup', handleSelection);
      window.removeEventListener('touchend', handleSelection);
    };
  }, []);
  
  
  

  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [deckId, setDeckId] = useState('');
  const [deckCreated, setDeckCreated] = useState(false);
  const [highlightedSegments, setHighlightedSegments] = useState([]);

  const navigate = useNavigate();

  const getHighlightedText = () => {
    return highlightedSegments.join(' ');
  };

  const handleGenerateClick = async (index) => {
    try {
      setLoading(true);
      const documentID = localStorage.getItem('selectedDocumentID');
      const documentTitle = localStorage.getItem('selectedDocumentTitle');
      const userId = localStorage.getItem('userid');
      console.log("Creating flashcard deck with title:", documentTitle);
      const createDeckResponse = await axios.post('http://localhost:8080/api/decks/createFlashcardDeck', {
        title: documentTitle,
        user: {
          userid: userId
        }
      });
      const newDeckId = createDeckResponse.data.deckId;
      setDeckId(newDeckId);
      setDeckCreated(true);
  
      const highlightedText = getHighlightedText();
      if (!highlightedText) {
        throw new Error("No text highlighted");
      }
  
      await axios.post(`http://localhost:8080/generate-flashcards/${newDeckId}`, highlightedText, {
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      setLoading(false);
      navigate('/flashcardsmgt');
    } catch (error) {
      console.error('Error in handleGenerateClick:', error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
  };
  

  const drawerContent = (
    <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
      <Grid container>
        <Grid item xs={12}>
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 18 }}>
              Documents
            </Typography>
            <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
          </Box>
        </Grid>
        <Box style={{ overflow: 'auto', maxHeight: '45vh' }}>
          <Grid container>
            {renderFileNames()}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );

  const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, },
    loadingText: { color: 'white', fontSize: '24px', fontWeight: 'bold', },
  };

  return (
    <>
    {loading && (
        <div style={styles.overlay}>
          <div style={styles.loadingText}>Generating flashcards...</div>
        </div>
      )}
      <div style={{ backgroundImage: 'url(/crystalbackground.png)', minheight: '100vh', overflow: 'hidden' }}>
        <AppBar position="sticky" style={{ backgroundColor: 'transparent', boxShadow: 'none', justifyContent: 'center' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 0, paddingLeft: 0 }}>
            <Box display={'flex'} style={{ width: isMobile ? 50 : 230, backgroundColor: 'tranparent', alignItems: 'center', marginLeft: 0 }}>
              <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} />
              {!isMobile && (
                <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00' }}>
                  EduDeck
                </Typography>
              )}
            </Box>
            <Box style={{ display: 'flex', backgroundColor: 'white', width: isMobile ? 250 : isMediumScreen ? 700 : 870, justifyContent: 'center', margin: 'auto', borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              <Typography variant={isMobile ? "body1" : "h4"} style={{ fontFamily: "Roboto Condensed", color: '#332D2D', justifyContent: 'center', textAlign: 'center' }}>
                Document Text Highlighting
              </Typography>
            </Box>
            <Box style={{ display: "flex", width: isMobile ? 60 : 150, justifyContent: isMobile ? 'space-between' : 'space-evenly', marginRight: isMobile ? '-0.5rem' : 0, marginTop: isMobile ? '0.2rem' : '0.5rem' }} >
              <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
              <Link to="/profilesettings" style={{textDecorationLine: 'none'}}>
                     <Box style={{ background: '#D0BF81', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem'}}>
                        <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
                            <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
                            </IconButton>
                      </Box>
              </Link>
              </Box>

            </Box>
          </Toolbar>
        </AppBar>
        {isMobile ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '94vh' }}>
            <SwipeableDrawer
              anchor="left"
              open={isBoxVisible}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              transitionDuration={{ enter: 500, exit: 500 }}
              SlideProps={{ direction: "right" }}
              PaperProps={{ style: { backgroundColor: 'transparent', height: '50vh', overflow: 'hidden', top: '25vh', borderRadius: 10 } }}
              BackdropProps={{ invisible: true }}
            >
              {drawerContent}
            </SwipeableDrawer>
            {!isBoxVisible && (
              <Box sx={{ position: 'fixed', left: 0, top: '50%', backgroundColor: 'gold', height: 30, width: 10 }} onClick={toggleDrawer(true)} />
            )}
          </Box>
        ) : (
          <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-67px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
            <Grid container >
              <Grid item xs={12} >
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 30 }}>
                    Documents
                  </Typography>
                  <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
                </Box>
              </Grid>
              <Box style={{ overflow: 'auto', maxHeight: '60vh' }}>
                <Grid container>
                  {renderFileNames()}
                </Grid>
              </Box>
            </Grid>
            <Button onClick={handleGenerateClick} style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              <Typography style={{ color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '1.5em', textTransform: 'none' }}>
                Generate Flashcard
              </Typography>
            </Button>
          </Box>
        )}

        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? '90%' : '56%',  marginLeft: isMobile ? 18 : isMediumScreen ? 295 : 350, }}>
          <Box style={{ width: '90vw', height: '85vh', border: '1px solid black', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', backgroundColor: 'white', padding: 10, overflow: 'hidden', marginTop: isMobile ? -900 : -580 }}>
            {renderFileEmbed()}
          </Box>
        </Box>
      </div>
    </>
  );
}

export default TextHighlightingUI;
