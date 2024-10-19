import React, { useState, useEffect } from "react";
import axios from "axios";
import {Box, Grid, Typography, SwipeableDrawer, useMediaQuery, useTheme, AppBar, Toolbar, IconButton, Divider,Button } from "@mui/material";
import { AccountCircle, NotificationsNone} from "@mui/icons-material";
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import JSZip from "jszip";
import { GlobalWorkerOptions } from 'pdfjs-dist';
import BASE_URL from "./config";
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
  const [selectedDocumentID, setSelectedDocumentID] = useState(null);
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/document/files/${userid}`);
        setFileNames(response.data);
      } catch (error) {
        console.error("Error fetching file names:", error);
      }
    };
    fetchFileNames();
  }, [userid]);

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


  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsBoxVisible(open);
  };

  // Function to handle file selection and fetch its content
  const handleDocumentClick = async (documentID, documentTitle) => {
    try {
        setSelectedFile(documentTitle);  
        setSelectedDocumentID(documentID); 

        const response = await axios.get(`${BASE_URL}/api/document/files/content/${documentID}`, { responseType: 'blob' });
        const fileBlob = response.data;
        const fileType = getFileType(documentTitle);

        if (fileType === 'pdf') {
            const pdfUrl = URL.createObjectURL(fileBlob);
            setFileURL(pdfUrl);

            const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
            let pdfText = "";
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                textContent.items.forEach(item => {
                    pdfText += item.str + " ";
                });
            }
            console.log(pdfText);
        } else if (fileType === 'docx') {
            const arrayBuffer = await fileBlob.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
            setFileURL("data:text/html;charset=utf-8," + encodeURIComponent(result.value));
            document.getElementById('doc-content').innerHTML = result.value;
        } else if (fileType === 'pptx') {
            const arrayBuffer = await fileBlob.arrayBuffer();
            const zip = await JSZip.loadAsync(arrayBuffer);
            const slideFiles = Object.keys(zip.files).filter(file => file.startsWith("ppt/slides/slide") && file.endsWith(".xml"));
            const slides = await Promise.all(slideFiles.map(file => zip.files[file].async("string")));

            let slideHTML = "";
            slides.forEach((slide, index) => {
                const formattedSlide = slide.replace(/<[^>]*>/g, ' ').trim();
                slideHTML += `<div class="slide"><h3>Slide ${index + 1}</h3><p>${formattedSlide}</p></div>`;
            });
            setFileURL("data:text/html;charset=utf-8," + encodeURIComponent(slideHTML));
            document.getElementById("pptx-content").innerHTML = slideHTML;
        } else if (fileType === 'jpeg' || fileType === 'png') {
            const imageUrl = URL.createObjectURL(fileBlob);
            setFileURL(imageUrl);
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
      return 'unsupported';
    }
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'pdf';
      case 'docx':
        return 'docx';
      case 'pptx':
        return 'pptx';
      case 'ppt':
        return 'ppt';
      case 'jpeg':
      case 'jpg':
        return 'jpeg';
      case 'png':
        return 'png';
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
        ) : getFileType(selectedFile) === 'pptx' ? (
          <div id="pptx-content" style={{ width: "100%", height: "100%" }}></div>
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
      const documentID = selectedDocumentID;
      const documentTitle = selectedFile;
      const userId = localStorage.getItem('userid');

      if (!documentID || !documentTitle) {
        throw new Error("No document selected");
    }

    console.log("Creating flashcard deck with title:", documentTitle);

      const createDeckResponse = await axios.post(`${BASE_URL}/api/decks/createFlashcardDeck`, {
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
  
      await axios.post(`${BASE_URL}/generate-flashcards/${newDeckId}`, highlightedText, {
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
            <Link to="/dashboard" style={{textDecorationLine: 'none'}}>
            <Box display={'flex'} style={{ width: isMobile ? 50 : 230, backgroundColor: 'tranparent', alignItems: 'center', marginLeft: 0 }}>
              <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} />
              {!isMobile && (
                <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00' }}>
                  EduDeck
                </Typography>
              )}
            </Box>
            </Link>
            <Box style={{ display: 'flex', backgroundColor: 'white', width: isMobile ? 250 : isMediumScreen ? 700 : 870, justifyContent: 'center', margin: 'auto', borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              <Typography variant={isMobile ? "body1" : "h4"} style={{ fontFamily: "Roboto Condensed", color: '#332D2D', justifyContent: 'center', textAlign: 'center' }}>
                Document Text Highlighting
              </Typography>
            </Box>
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