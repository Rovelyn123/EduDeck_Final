import React, { useRef, useState, useEffect } from "react";
import "./UploadDocument.css";
import {AppBar, Toolbar, Typography, IconButton, Box, Button, useMediaQuery, useTheme  } from "@mui/material";
import {AccountCircle, NotificationsNone} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function UploadDocument() {
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

    const { files, user } = uploadedFiles;

    const userid = localStorage.getItem('userid');

        // Fetch uploaded files from the backend when the component mounts
        const fetchUploadedFiles = async () => {
            console.log(userid);
            try {
                // Fetch uploaded files
                const filesResponse = await fetch(`http://localhost:8080/api/document/files/${userid}`);
                if (!filesResponse.ok) {
                    throw new Error('Failed to fetch uploaded files.');
                }
                const filesData = await filesResponse.json();
        
                // Filter out deleted files (isDeleted = 0)
                const filteredFiles = filesData.filter(file => file.isDeleted !== 1);
        
                setUploadedFiles(prevFiles => {
                    Cookies.set('uploadedFiles', JSON.stringify(filteredFiles));
                    localStorage.setItem("uploadedFiles", JSON.stringify(filteredFiles));
                    return filteredFiles || [];
                });
            } catch (error) {
                console.error(error.message);
            }
        };
        
    
        useEffect(() => {
            // Fetch uploaded files from the backend when the component mounts and when the page is refreshed
            fetchUploadedFiles();
        }, []);
        useEffect(() => {
            // Load uploaded files from localStorage when the component mounts
            const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
            setUploadedFiles(storedFiles);
        }, []);

        // Save uploaded files to localStorage whenever the uploadedFiles state changes
        useEffect(() => {
            localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
        }, [uploadedFiles]);


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
    
            if (['pdf', 'docx', 'pptx', 'jpeg', 'png', 'jpg'].includes(fileType)) {
                try {
                    console.log(userid);

                    const formData = new FormData();
                    formData.append('document', new Blob([JSON.stringify({ documentTitle: selectedFile.name, fileType: fileType, isDeleted: 0, isDeleted: 0 })], { type: 'application/json' }));
                    formData.append('file', selectedFile);
    
                    const response = await fetch(`http://localhost:8080/api/document/upload/${userid}`, {
                        method: 'POST',
                        body: formData,
                        headers: {},
                    });
    
                    if (!response.ok) {
                        throw new Error('File upload failed. Please try again.');
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
                        autoClose: 500,
                    });
                } catch (error) {
                    toast.error(error.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000,
                    });
                    setSelectedFile(null);
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
                `http://localhost:8080/api/document/update/${documentID}`,
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
        if (file) {
            console.log("Replacement File Selected:", file.name);
            console.log("File Size:", formatFileSize(file.size));
        }
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

      // Delete using confirmation modal

      const handleDeleteClick = (documentID) => {
        // Set the document ID to be deleted
        setDocumentToDelete(documentID);

        // Set the confirmation callback and display the modal
        setConfirmationCallback(() => () => handleDeleteConfirmation(documentID));
        setShowConfirmation(true);
    };

      const handleDeleteConfirmation = async (documentID) => {
        try {
            
            const response = await fetch(`http://localhost:8080/api/document/delete/${documentID}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete document. Please try again.');
            }
    
            // Fetch the updated files after successful soft deletion
            const updatedFiles = await fetchUploadedFiles();

            setUploadedFiles(prevFiles => {
            // Update the state using the functional form
            const filteredFiles = updatedFiles && updatedFiles.filter(file => file.isDeleted !== 1);

            if (filteredFiles) {
                Cookies.set('uploadedFiles', JSON.stringify(filteredFiles));
                localStorage.setItem("uploadedFiles", JSON.stringify(filteredFiles));
            }
        
            return filteredFiles || prevFiles;  // Return prevFiles if filteredFiles is undefined

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

    const handleGenerateClick = async (index) => {
        try {
            setLoading(true);
            // Get the document ID of the file at the given index
            const documentID = uploadedFiles[index]?.documentID;
            const documentTitle = uploadedFiles[index]?.documentTitle;
            
            const userId = localStorage.getItem('userid');
            const createDeckResponse = await axios.post('http://localhost:8080/api/decks/createFlashcardDeck', {
                title: documentTitle,
                user: {
                userid: userId
                }
            });
            const newDeckId = createDeckResponse.data.deckId;
            setDeckId(newDeckId);
            setDeckCreated(true);

            const extractTextResponse = await axios.get(`http://localhost:8080/textextractor/document/${documentID}`);
            setExtractedText(extractTextResponse.data);
      
            await axios.post(`http://localhost:8080/generate-flashcards/${newDeckId}`, extractTextResponse.data, {
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

    const styles = {
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        },
        loadingText: {
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        },
      };

    // Add ToastContainer at the root level of your component tree
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
                        <Box display={'flex'} style={{ width: isMobile ? 50 : 230, backgroundColor: 'tranparent', alignItems: 'center', marginLeft: 0 }}>
                        <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 60 }} />
                        {!isMobile && (
                            <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00' }}>
                            EduDeck
                            </Typography>
                        )}
                        </Box>
                    </Link>
                        <Box style={{display: 'flex',backgroundColor: 'white', width: isMobile ? 250 : isMediumScreen ? 700 : 870, justifyContent: 'center', margin: 'auto', borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
                        <Typography variant= {isMobile ? "body1" : "h4"} style={{ fontFamily: "Roboto Condensed", color: '#332D2D', justifyContent: 'center', textAlign: 'center' }}>
                            Document Text Highlighting
                        </Typography>
                        </Box>
                        <Box style={{display: "flex", width: isMobile ? 60 : 150, justifyContent: isMobile ? 'space-between' : 'space-evenly', marginRight: isMobile ? '-0.5rem' : 0, marginTop: isMobile ? '0.2rem' : '0.5rem'}} >
                            <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                            <Link to="/profilesettings" style={{textDecorationLine: 'none'}}>
                            <Box style={{ background: '#D0BF81', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem'}}>
                                <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
                                <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
                                </IconButton>
                            </Box>
                            </Link>
                            </Box>
                            {/* <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                            <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem' }}>
                                <IconButton color="white" style={{ fontSize: isMobile ? '22.5px': '45px', padding: '0' }}>
                                <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
                                </IconButton>
                            </Box>
                            </Box> */}
                    </Box>
                    </Toolbar>
                </AppBar>

                    <div className="upload-content">

                        <div className="left-panel">
                            {/* File preview or document icon */}
                            {selectedFile ? (
                                <div style={{ marginBottom: '10px', width: '100%' }}>
                                    {getFileType(selectedFile.name) === 'pdf' ? (
                                       <img
                                       src="/PDF.png"
                                       alt="pdf Icon"
                                       style={{ width: '40%', height: '300px' }}
                                        />
                                    ) : getFileType(selectedFile.name) === 'docx' ? (
                                        // Displaying a placeholder icon for DOCX files
                                        <img
                                            src="/docx.png"
                                            alt="DOCX Icon"
                                            style={{ width: '40%', height: '300px' }}
                                        />
                                    ) : getFileType(selectedFile.name) === 'pptx' ? (
                                        // Displaying a placeholder icon for PPT files
                                        <img
                                            src="/pptx.png"
                                            alt="PPT Icon"
                                            style={{ width: '40%', height: '300px' }}
                                        />
                                    ) : getFileType(selectedFile.name) === 'jpeg' || 'jpg' ? (
                                        // Displaying a placeholder icon for TXT files
                                        <img
                                            src="/jpg.png"
                                            alt="jpg Icon"
                                            style={{ width: '40%', height: '300px' }}
                                        />
                                    ) : getFileType(selectedFile.name) === 'png' ? (
                                        // Displaying a placeholder icon for TXT files
                                        <img
                                            src="/png.jpg"
                                            alt="png Icon"
                                            style={{ width: '40%', height: '300px' }}
                                        />
                                    
                                    ): (
                                        // Displaying an image for unsupported file types
                                        <img
                                            src="/error.png"
                                            alt="error Icon"
                                            style={{ width: '40%', height: '300px' }}
                                        />
                                    )}
                                </div>
                            ) : (
                                <img
                                    src="/document icon.png"
                                    alt="Document Icon"
                                    style={{ width: 100, marginTop: '130px', marginBottom: '30px' }}
                                />
                            )}

                            {/* Display file name or Supported document types */}
                            {selectedFile ? (
                                <Typography
                                    variant="h4"
                                    style={{fontFamily: 'Roboto Condensed',fontSize: '20px',color: 'black',textAlign: 'center',fontWeight: 'bold',fontStyle: 'italic', marginTop: '15px',}}>
                                    {selectedFile.name}
                                </Typography>
                            ) : (
                                <Typography
                                    variant="h4"
                                    style={{fontFamily: 'Roboto Condensed', fontSize: '20px', color: 'black', textAlign: 'center', fontWeight: 'bold', marginTop: '10px'}}>
                                    Supported document types: PDF, DOCX, PPTX, PNG, JPEG
                                </Typography>
                            )}

                            {/* Browse Button */}
                            <div style={{ marginTop: '70px' }}>
                                <Button style={{ background: '#FAC712', width: '230px', height: '45px', borderRadius: '10px' }} onClick={handleBrowseClick}>
                                    <Typography style={{ fontSize: '20px', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#332D2D', textTransform: 'none' }}>
                                        Browse
                                    </Typography>
                                </Button>
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>

                            {/* Upload Document Button */}
                            <Button sx={{ background: '#FAC712', width: '230px', height: '45px', borderRadius: '10px', marginTop: { xs: '780px', md: '150px' } }} onClick={handleUploadClick}>
                                <Typography style={{ fontSize: '20px', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#332D2D', textTransform: 'none' }}>
                                    Upload Document
                                </Typography>
                            </Button>
                            <Link to="/TextHighlighting" style={{ textDecoration: 'none' }}>
                            <Button sx={{ background: '#FAC712', width: '230px', height: '45px', borderRadius: '10px', marginTop: { xs: '20px', md: '30px' }, marginLeft: { xs: '4px', md: '2px' } }}>
                                <Typography style={{ fontSize: '20px', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#332D2D', textTransform: 'none' }} 
                               >
                                    Text Highlighting
                                </Typography>
                            </Button>
                            </Link>
                        </div>

                        {/* Right Panel for Displaying Uploaded Files */}
                        <div className="right-panel">
                        <Typography variant="h4" style={{ fontFamily: 'Roboto Condensed', fontSize: '30px', color: '#332D2D', textAlign: 'left', margin: '0px 10px 5px 10px' }}>
                            Uploaded Documents
                        </Typography>
                        <div className='uploadedFilePanel'>
                            {uploadedFiles.length > 0 ? (
                            uploadedFiles
                            .filter(file => file.isDeleted !== 1) // Filter out deleted files
                            .map((file, index) => (
                                <div key={file.documentID} className="fileComponents" >
                                {/* File icon based on the file type */}
                                {file.fileType === 'pdf' && <img src="/pdf.png" alt="PDF Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                {file.fileType === 'docx' && <img src="/docxIcon.png" alt="DOCX Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                {file.fileType === 'pptx' && <img src="/pptx.png" alt="PPT Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                {file.fileType === 'txt' && <img src="/txtIcon.png" alt="TXT Icon" style={{ width: '55px', margin: '8px 10px 8px 15px' }} />}
                                {(file.fileType === 'jpeg' || file.fileType === 'jpg') && <img src="/jpg.png" alt="jpg Icon" style={{ width: '60px', margin: '5px 10px 5px 15px' }} />}
                                {file.fileType === 'png' && <img src="/png.jpg" alt="png Icon" style={{ width: '55px', margin: '8px 10px 8px 15px' }} />}

                                {/* Display file information */}
                                {file.documentTitle && file.fileSize && (
                                    <div style={{ margin: '10px' }}>
                                    <Typography variant="h6" style={{ fontFamily: 'Roboto Condensed', fontWeight: 'bold' }}>{file.documentTitle}</Typography>
                                    <Typography variant="body2">{file.fileSize}</Typography>
                                    {/* Add other file information as needed */}
                                    </div>
                                )}
                                <div className="file-actions">
                                        <IconButton onClick={() => handleGenerateClick(index)}>
                                            <img src="/convertIcon.png" alt="Generate Icon" style={{ width: '24px', height: '24px' }} />
                                        </IconButton>
                                        {editIndex === index ? (
                                            <div>
                                                {/* Display selected file */}
                                                {editStates[editIndex]?.newFile && (
                                                    <Typography
                                                        variant="h5"
                                                        style={{fontFamily: 'Roboto Condensed', fontSize: '18px', color: 'black', textAlign: 'center', fontWeight: 'bold', marginTop: '15px'}}>
                                                        Selected File: {editStates[editIndex].newFile.name}
                                                    </Typography>
                                                )}

                                                {/* Input field for new file name */}
                                                <Box className="inputContainer">
                                                    <label htmlFor={`newFileNameInput-${file.documentID}`}>
                                                        New File Name: &nbsp;
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={`newFileNameInput-${file.documentID}`}
                                                        placeholder="Enter new file name"
                                                        value={newFileName}
                                                        onChange={(e) => setNewFileName(e.target.value)}
                                                        style={{ marginRight: '10px' }}
                                                    />

                                                    {/* Input field for choosing a new file */}
                                                    <label htmlFor={`fileInput-${file.documentID}`}>
                                                        <br /> Choose New File:
                                                        <IconButton component="span">
                                                                    <ChangeCircleIcon />
                                                                </IconButton>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        onChange={handleFileReplaceChange}
                                                        id={`fileInput-${file.documentID}`}
                                                        style={{ display: 'none' }}

                                                    />
                                                    
                                                    <IconButton
                                                        style={{ marginRight: '5px', background: '#9CCC65' }}
                                                        onClick={() => handleNewFileName(index)} // Updated function name
                                                    >
                                                        <SaveIcon />
                                                    </IconButton>
                                                    <IconButton style={{ background: '#EF5350' }} onClick={() => handleCancelEdit(index)}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Box>
                                            </div>
                                        ) : (
                                            <div>
                                                <IconButton onClick={() => handleEditClick(index)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </div>
                                            
                                        )}
                                        <IconButton onClick={() => handleDeleteClick(file.documentID)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                
                            ))
                            ) : (
                            <p>No uploaded files available.</p>
                            )}

                            {showConfirmation && (
                                <div className="confirmation-modal">
                                    <h1 style={{ margin: '10px 10px 20px 50px', fontWeight: 'bold', fontFamily: "Roboto", fontSize: "30px"}}>Delete?</h1>
                                    <p style={{fontFamily: "Roboto", fontSize: "20px", marginRight: "20px"}}>Deleting this document will erase all data permanently <br /> Are you sure? This cannot be undone</p>
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

export default UploadDocument;