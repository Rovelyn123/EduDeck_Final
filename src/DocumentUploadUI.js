import React, { useRef, useState, useEffect } from "react";
import "./DocumentUploadUI.css";
import {AppBar, Toolbar, Typography, IconButton, Box, Button, useMediaQuery, useTheme  } from "@mui/material";
import {AccountCircle, NotificationsNone} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; 
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '@fontsource/lato';
import BASE_URL from "./config.js";

function DocumentUploadUI() {
    const theme = useTheme();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [newFile, setNewFile] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationCallback, setConfirmationCallback] = useState(null);
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery('(max-width:1219px)');
    
    const navigate = useNavigate();
    const [deckId, setDeckId] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [deckCreated, setDeckCreated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const location = useLocation();
    const userId = localStorage.getItem('userid');
    const [subscription, setSubscription] = useState('Free Plan');
    const [email, setEmail] = useState('');
    const userid = localStorage.getItem('userid');

    //Subscription Fetch
    const fetchEmail = async () => {


        try {
            const response = await axios.get(`${BASE_URL}/user/getEmail/${userId}`);
            setEmail(response.data); // Set the email from the response
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };
    // Fetch email when the component mounts
    useEffect(() => {
        fetchEmail();
    }, [userId]);

    const fetchSubscription = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/subscription`, {
                email: email // Send the email in the request body
            });
            console.log('Subscription response:', response.data); // Log the response data

            if (response.data.active) {
                setSubscription('EduDeck Plus');
            } else {
                setSubscription('Free Plan');
            }
        } catch (error) {
            console.error('Error fetching subscription:', error);
            // Optionally handle error state
        }
    };



    useEffect(() => {
        if (email) {
            fetchSubscription();
        }
    }, [email]);

        const fetchUploadedFiles = async () => {
            try {
                const filesResponse = await fetch(`${BASE_URL}/api/document/files/${userid}`);
                if (!filesResponse.ok) {
                    throw new Error('Failed to fetch uploaded files.');
                }
                const filesData = await filesResponse.json();
                const filteredFiles = filesData.filter(file => file.isDeleted !== 1);
                setUploadedFiles(filteredFiles);
            } catch (error) {
                console.error(error.message);
            }
        };       
        
        
        useEffect(() => {
            const fetchUploadedFiles = async () => {
                try {
                    const response = await fetch(`${BASE_URL}/api/document/files/${userid}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch uploaded files.');
                    }
        
                    const filesData = await response.json();
                    const filteredFiles = filesData.filter(file => file.isDeleted !== 1);
        
                    // Update component state with the fetched data
                    setUploadedFiles(filteredFiles);
                } catch (error) {
                    console.error(error.message);
                }
            };
        
            fetchUploadedFiles();  // Fetch files when component mounts
        }, [userid]);  // Add dependencies if needed        

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

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            setSelectedFile(file);
    
            const reader = new FileReader();
            reader.onload = (event) => {
                const contentArray = new Uint8Array(event.target.result);
                // You can use contentArray if needed
            };
            reader.readAsArrayBuffer(file);
    
            setNewFile(file);
        }
    };     
    
    const formatFileSize = (size) => {
        if (typeof size !== 'number') {
            // Handle the case where size is not a valid number
            return 'Unknown size';
        }
    
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    
        let index = 0;
        while (size >= 1024 && index < units.length - 1) {
            size /= 1024;
            index++;
        }
    
        return `${size.toFixed(2)} ${units[index]}`;
    };

    const handleUploadClick = async () => {
        if (selectedFile) {
            const fileType = getFileType(selectedFile.name);
    
            if (['pdf', 'docx', 'pptx', 'jpeg', 'png', 'jpg', 'ppt'].includes(fileType)) {
                try {
                    const formData = new FormData();
                    formData.append('document', new Blob([JSON.stringify({
                        documentTitle: selectedFile.name,
                        fileType: fileType,
                        isDeleted: 0
                    })], { type: 'application/json' }));
                    formData.append('file', selectedFile);
    
                    const response = await fetch(`${BASE_URL}/api/document/upload/${userid}`, {
                        method: 'POST',
                        body: formData,
                        headers: {},
                    });
    
                    if (!response.ok) {
                        let errorMessage = 'File upload failed. Please try again.';
                        if (response.status === 413) {
                            errorMessage = 'File size too large. Please select a smaller file.';
                        } else if (response.status === 415) {
                            errorMessage = 'Unsupported file format. Please choose a supported format.';
                        }
                        throw new Error(errorMessage);
                    }
    
                    const data = await response.json();
    
                    const newFile = {
                        documentID: data.documentID,
                        documentTitle: selectedFile.name,
                        fileType: fileType,
                        fileSize: formatFileSize(selectedFile.size),
                    };
    
                    setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
                    setSelectedFile(null);
    
                    toast.success('File successfully uploaded!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000,
                    });
                } catch (error) {
                    toast.error(error.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                    setSelectedFile(null);
                    // Show retry option
                    toast.info("Please check the file and retry the upload.", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 5000,
                        onClose: () => handleBrowseClick(), // Retry when user clicks
                    });
                }
            } else {
                toast.error('Unsupported file type. Please choose a different file.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
                setSelectedFile(null);
            }
        }
    };
    
    

    const getFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        return extension;
    };

    const [editIndex, setEditIndex] = useState(null);
    const [newFileName, setNewFileName] = useState("");
    const [editStates, setEditStates] = useState([]);

    // Initialize the edit state for this index

    const handleEditClick = (index) => {
        console.log('Edit clicked for index:', index);
        setEditIndex(index);
        const file = uploadedFiles[index];
        const fileNameWithoutExtension = file.documentTitle.replace(/\.[^/.]+$/, ""); // Remove extension
        setNewFileName(fileNameWithoutExtension);
        setEditStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = {
                newFileName: fileNameWithoutExtension,
                newFile: null,
            };
            return newStates;
        });
        const fileInputId = `fileInput-${index}`;
        const fileInput = document.getElementById(fileInputId);
        if (fileInput) {
            fileInput.click();
        }
    };
    
    const [replacementFile, setReplacementFile] = useState(null);
    
    const handleNewFileName = async (index) => {
        try {
            const documentID = uploadedFiles[index]?.documentID;
            if (!documentID) {
                console.error("Document ID not found for index:", index);
                return;
            }
            if (!newFileName && !replacementFile) {
                toast.warning("Please provide a new file name", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
                return;
            }
            const file = uploadedFiles[index];
            const extension = getFileType(file.documentTitle);
            const updatedFileName = `${newFileName}.${extension}`;
            const formData = new FormData();
            formData.append('newFileName', updatedFileName);
            if (replacementFile) {
                formData.append("newFile", replacementFile);
            }
            const response = await fetch(
                `${BASE_URL}/api/document/update/${documentID}`,
                {
                    method: "PUT",
                    body: formData,
                    headers: {},
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log('Update response:', responseData);
            const newUploadedFiles = [...uploadedFiles];
            newUploadedFiles[index].documentTitle = updatedFileName;
            setUploadedFiles(newUploadedFiles);
            toast.success('File name updated successfully!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500,
            });
        } catch (error) {
            console.error('Error updating file name:', error);
            toast.error('Error updating file name: ' + error.message);
        }
    };
    
    const handleFileReplaceChange = (e) => {
        const file = e.target.files[0];
        setReplacementFile(file);
    };
    
    const handleCancelEdit = () => {
        setEditIndex(null);
        setNewFileName("");
        setNewFile(null);
        setEditStates((prevStates) => {
            const newStates = [...prevStates];
            if (editIndex !== null) {
                newStates[editIndex] = {
                    newFileName: "",
                    newFile: null,
                };
            }
            return newStates;
        });
    };
      const handleDeleteClick = (documentID) => {
        setDocumentToDelete(documentID);
        setConfirmationCallback(() => () => handleDeleteConfirmation(documentID));
        setShowConfirmation(true);
    };

      const handleDeleteConfirmation = async (documentID) => {
        try {
            const response = await fetch(`${BASE_URL}/api/document/delete/${documentID}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete document. Please try again.');
            }
            const updatedFiles = await fetchUploadedFiles();
            setUploadedFiles(prevFiles => {
            const filteredFiles = updatedFiles && updatedFiles.filter(file => file.isDeleted !== 1);

            if (filteredFiles) {
                Cookies.set('uploadedFiles', JSON.stringify(filteredFiles));
                localStorage.setItem("uploadedFiles", JSON.stringify(filteredFiles));
            } 
            return filteredFiles || prevFiles;  
        }); 
    
            toast.success('Document successfully deleted!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 500,
            });
        } catch (error) {
            console.error('Error in handleDeleteClick:', error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
        }
    };

    const SYSTEM_PROMPT = "You are to create flashcard pairs (question and answer, in json format) based on the given lesson texts to help the student user review and ace his/her exams. Design it in a way that when the user reads the question/flashcard front, they have an idea of what's the answer/flashcard back. Make the answers/flashcard back easier to understand and even give tips to the user to immediately remember the concept.";
    
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-exp-0827:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;
    
    const handleGenerateClick = async (index) => {
        try {
            setLoading(true);
    
            // 1. Get document and user info
            const documentID = uploadedFiles[index]?.documentID;
            const documentTitle = uploadedFiles[index]?.documentTitle; 
            const userId = localStorage.getItem('userid');
    
            // 2. Create deck using the document title and user ID
            const createDeckResponse = await axios.post(`${BASE_URL}/api/decks/createFlashcardDeck`, {
                title: documentTitle,
                user: {
                    userid: userId
                },
                document: {
                    documentID: documentID // Pass documentID here
                }
            });
            const newDeckId = createDeckResponse.data.deckId;
            setDeckId(newDeckId);
            setDeckCreated(true);
    
            // 3. Extract text from the uploaded document
            const extractTextResponse = await axios.get(`${BASE_URL}/textextractor/document/${documentID}`);
            const extractedText = extractTextResponse.data;
            setExtractedText(extractedText);
    
            // 4. Pass the extracted text to Gemini AI for flashcard generation
            const geminiResponse = await fetch(GEMINI_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: `${SYSTEM_PROMPT}\n${extractedText}` }],
                        },
                    ],
                }),
            });
    
            const geminiData = await geminiResponse.json();
            let flashcardContent = geminiData.candidates[0].content.parts[0].text;
    
            // 5. Clean up the response (remove code block formatting)
            flashcardContent = flashcardContent.replace(/```json\n|```/g, '').trim();
    
            // 6. Parse the cleaned JSON string
            const flashcardPairs = JSON.parse(flashcardContent);
    
            // 7. Loop through and create each flashcard
            for (let flashcard of flashcardPairs) {
                await fetch(`${BASE_URL}/api/flashcards/createFlashcard/${newDeckId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: flashcard.question,
                        answer: flashcard.answer,
                    }),
                });
            }
    
            setLoading(false);
            navigate('/flashcardsmgt');
    
        } catch (error) {
            console.error('Error in handleGenerateClick:', error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            setLoading(false);
        }
    };
    

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
            <ToastContainer />
                <div className="Upbody">
                <AppBar position="sticky" style={{backgroundColor: 'transparent', boxShadow: 'none', justifyContent: 'center'}}>
                    <Toolbar style={{marginLeft: 0, paddingLeft: 0, display: 'flex', justifyContent: 'space-between'}}>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Box display={'flex'} style={{ width: isMobile ? 50 : 250, backgroundColor: 'tranparent', alignItems: 'center', marginLeft: 0 }}>
                        <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 60 }} />
                        {!isMobile && (
                            <Typography variant="h3" style={{ fontFamily: 'Lato', fontWeight: '900', fontSize: '2em', color: '#B18A00' }}>
                                EduDeck {subscription === 'EduDeck Plus' ? (
                                <sup style={{ color: 'black', fontSize: '0.5em' }}>Plus</sup>
                            ) : (
                                <sup style={{ fontSize: '0.5em', color: '#888' }}>Free</sup>
                            )}
                            </Typography>
                        )}
                        </Box>
                    </Link>
                        <Box style={{display: 'flex',backgroundColor: 'white', width: isMobile ? 250 : isMediumScreen ? 700 : 870, justifyContent: 'center', margin: 'auto', borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                        <Typography variant= {isMobile ? "body1" : "h4"} style={{ fontFamily: "Roboto Condensed", color: '#332D2D', justifyContent: 'center', textAlign: 'center' }}>
                            File Manager
                        </Typography>
                        </Box>
                            {/* <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}> */}
                            {/* <Link to="/profilesettings" style={{textDecorationLine: 'none'}}> */}
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

                    <div className="upload-content">

                        <div className="left-panel">
                            {selectedFile ? (
                                <div style={{ marginBottom: isMobile ? '20px' : '10px', width: '100%', marginTop: isMobile ? '40px' : 'none', marginBottom: isMobile ? '30px' : 'none'}}>
                                    {getFileType(selectedFile.name) === 'pdf' ? (
                                    <img src="/PDF.png" alt="pdf Icon" style={{ width: '40%', height: isMobile ? '150px' : '270px' }} />
                                ) : getFileType(selectedFile.name) === 'docx' ? (
                                    <img src="/docx.png" alt="DOCX Icon" style={{ width: '40%', height: isMobile ? '150px' : '270px' }} />
                                ) : getFileType(selectedFile.name) === 'pptx' || getFileType(selectedFile.name) === 'ppt' ? (
                                    <img src="/pptx.png" alt="PPT Icon" style={{ width: '40%', height: isMobile ? '150px' : '270px' }} />
                                ) : getFileType(selectedFile.name) === 'jpeg' || getFileType(selectedFile.name) === 'jpg' ? (
                                    <img src="/jpg.png" alt="jpg Icon" style={{ width: '40%', height: isMobile ? '150px' : '270px' }} />
                                ) : getFileType(selectedFile.name) === 'png' ? (
                                    <img src="/png.jpg" alt="png Icon" style={{ width: '40%', height: isMobile ? '150px' : '270px' }} />
                                ) : (
                                    <img src="/error.png" alt="error Icon" style={{ width: '40%', height: isMobile ? '125px' : '270px' }} />
                                )}
                                </div>
                            ) : (
                                <img src="/document icon.png" alt="Document Icon" style={{ width: isMobile ? 80 : 100, marginTop: isMobile ? '70px' : '130px', marginBottom: '30px' }} /> 
                                )}
                            {selectedFile ? (
                                <Typography variant="h4" style={{fontFamily: 'Lato',fontSize: '20px',color: 'black',textAlign: 'center',fontWeight: 'bold',fontStyle: 'italic', marginTop: '15px',}}>
                                    {selectedFile.name}
                                </Typography>
                            ) : (
                                <Typography variant="h4" style={{fontFamily: 'Lato', fontSize: isMobile ? '15px' : '20px', color: 'black', textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
                                    Supported document types: PDF, DOCX, PPTX, PNG, JPEG
                                </Typography>
                            )}

                            <div style={{ marginTop: isMobile ? '40px' : '70px' }}>
                                <Button style={{ background: '#FAC712', width: isMobile ? '130px' : '230px', height: '45px', borderRadius: '10px' }} onClick={handleBrowseClick}>
                                    <Typography style={{ fontSize: isMobile ? '13px' : '20px', fontFamily: 'Lato', fontWeight: 'bold', color: '#332D2D', textTransform: 'none' }}>
                                        Browse
                                    </Typography>
                                </Button>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>

                            <Box display="flex" justifyContent="center" flexDirection={isMobile ? 'column' : 'row'} alignItems="center">
                            <Button
                                style={{
                                    background: '#FAC712',
                                    width: isMobile ? '130px' : '230px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    marginTop: isMobile ? '50px' : '110px',
                                    marginRight: isMobile ? '150px' : '10px',  // To ensure space between buttons on desktop
                                    marginBottom: isMobile ? '20px' : '0px', // To give space between buttons on mobile
                                }}
                                onClick={handleUploadClick}
                            >
                                <Typography
                                    style={{
                                        fontSize: isMobile ? '12px' : '20px',
                                        fontFamily: 'Lato',
                                        fontWeight: 'bold',
                                        color: '#332D2D',
                                        textTransform: 'none',
                                    }}
                                >
                                    Upload Document
                                </Typography>
                            </Button>
                            <Link to="/TextHighlighting" style={{ textDecoration: 'none' }}>
                                <Button
                                    style={{
                                        background: '#FAC712',
                                        width: isMobile ? '130px' : '230px',
                                        height: '45px',
                                        borderRadius: '10px',
                                        marginTop: isMobile ? '-110px' : '110px',
                                        marginLeft: isMobile ? '150px' : '0px',
                                    }}
                                >
                                    <Typography
                                        style={{
                                            fontSize: isMobile ? '12px' : '20px',
                                            fontFamily: 'Lato',
                                            fontWeight: 'bold',
                                            color: '#332D2D',
                                            textTransform: 'none',
                                        }}
                                    >
                                        Text Highlighting
                                    </Typography>
                                </Button>
                            </Link>
                        </Box>

                        </div>

                        {/* Right Panel for Displaying Uploaded Files */}
                        <div className="right-panel">
                            <Typography variant="h4" style={{ fontFamily: 'lato', fontSize: isMobile ? '18px' : '30px', color: '#332D2D', textAlign: 'left', margin: '0px 10px 5px 10px' }}>
                                Uploaded Documents
                            </Typography>
                            <div className="uploadedFilePanel">
                                {uploadedFiles.length > 0 ? (
                                uploadedFiles
                                    .filter(file => file.isDeleted !== 1)
                                    .map((file, index) => (
                                    <div key={file.documentID} className="fileComponents">
                                        {/* Conditionally render file icons based on screen size */}
                                        {!isMobile && (
                                        <>
                                            {file.fileType === 'pdf' && <img src="/PDF.png" alt="PDF Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                            {file.fileType === 'docx' && <img src="/docxIcon.png" alt="DOCX Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                            {(file.fileType === 'pptx' || file.fileType === 'ppt') && <img src="/pptx.png" alt="PPT Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                            {file.fileType === 'txt' && <img src="/txtIcon.png" alt="TXT Icon" style={{ width: '55px', margin: '8px 10px 8px 15px' }} />}
                                            {(file.fileType === 'jpeg' || file.fileType === 'jpg') && <img src="/jpg.png" alt="jpg Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                            {file.fileType === 'png' && <img src="/png.jpg" alt="png Icon" style={{ width: '55px', margin: '8px 10px 8px 15px' }} />}
                                        </>
                                        )}
                                        {file.documentTitle && file.fileSize && (
                                        <div style={{ margin: '10px' }}>
                                            <Typography variant= {isMobile ? 'body2' : "h6"} style={{ fontFamily: 'Lato', fontWeight: 'bold', fontSize: isMobile ? '16px' : '18px', maxWidth: isMobile ? '150px' : '380px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.documentTitle}</Typography>
                                            <Typography variant="body2">{file.fileSize}</Typography>
                                        </div>
                                        )}
                                        <div className="file-actions">
                                        <IconButton onClick={() => handleGenerateClick(index)}>
                                            <img src="/convertIcon.png" alt="Generate Icon" style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px' }} />
                                        </IconButton>
                                        {editIndex === index ? (
                                            <div className="inputContainer">
                                                <label htmlFor={`newFileNameInput-${file.documentID}`} style={{fontSize: isMobile ? '10px' : '15px'}}>
                                                New File Name:
                                                </label>
                                                <input
                                                type="text"
                                                id={`newFileNameInput-${file.documentID}`}
                                                placeholder="Enter new file name"
                                                value={newFileName}
                                                onChange={(e) => setNewFileName(e.target.value)}
                                                style={{ marginRight: '10px', width: isMobile ? '70px' : '110px'}}
                                                />
                                                <IconButton
                                                style={{ marginRight: '5px', background: '#9CCC65', width: isMobile ? '25px' : '30px', height: isMobile ? '25px' : '30px' }}
                                                onClick={() => handleNewFileName(index)} >
                                                <SaveIcon />
                                                </IconButton>
                                                <IconButton style={{ background: '#EF5350', width: isMobile ? '25px' : '30px', height: isMobile ? '25px' : '30px' }} onClick={() => handleCancelEdit(index)}>
                                                <CancelIcon />
                                                </IconButton>
                                            </div>
                                        ) : (
                                            <div>
                                            <IconButton onClick={() => handleEditClick(index)}>
                                                <EditIcon style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px' }} />
                                            </IconButton>
                                            </div>
                                        )}
                                        <IconButton onClick={() => handleDeleteClick(file.documentID)}>
                                            <DeleteIcon style={{ width: isMobile ? '20px' : '24px', height: isMobile ? '20px' : '24px' }} />
                                        </IconButton>
                                        </div>
                                    </div>
                                    ))
                                ) : (
                                <p>No uploaded files available.</p>
                                )}

                                {showConfirmation && (
                                <div className="confirmation-modal">
                                    <h1 style={{ margin: '10px 10px 20px 50px', fontWeight: 'bold', fontFamily: "Lato", fontSize: "30px" }}>Delete?</h1>
                                    <p style={{ fontFamily: "Lato", fontSize: "20px", marginRight: "20px" }}>Deleting this document will erase all data permanently <br /> Are you sure? This cannot be undone</p>
                                    <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                                    <button style={{ background: '#FAC712' }} onClick={() => { confirmationCallback(); setShowConfirmation(false); }}>Confirm</button>
                                </div>
                                )}
                            </div>
                            </div>
                        
                    </div>
            </div>
        </>
    );
}

export default DocumentUploadUI;