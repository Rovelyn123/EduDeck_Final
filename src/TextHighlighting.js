// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {Box, Grid, Typography, SwipeableDrawer, useMediaQuery, useTheme, AppBar, Toolbar, IconButton, Divider,Button } from "@mui/material";
// import { AccountCircle, NotificationsNone, ZoomIn, ZoomOut, MoreHoriz,
//   BorderColor as BorderColorIcon,
//   ContentPasteSearch as ContentPasteSearchIcon,
//   ZoomIn as ZoomInIcon,
//   ZoomOut as ZoomOutIcon,
//   MoreHoriz as MoreHorizIcon
// } from "@mui/icons-material";

// function TextHighlighting() {
//   const [isBoxVisible, setIsBoxVisible] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMediumScreen = useMediaQuery('(max-width:1219px)');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileNames, setFileNames] = useState([]);
//   const [pdfURL, setPdfURL] = useState(null);
//   const userid = localStorage.getItem('userid');
//   const documentID = localStorage.getItem('documentID');

//   useEffect(() => {
//     const fetchFileNames = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/document/files/${userid}`); // Adjust the endpoint
//         setFileNames(response.data);
//       } catch (error) {
//         console.error("Error fetching file names:", error);
//       }
//     };
//     fetchFileNames();
//   }, [userid]);

//   const toggleDrawer = (open) => (event) => {
//     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setIsBoxVisible(open);
//   };

//   const handlePdfClick = async (fileName) => { 
//     try {
//       console.log('fileName:', fileName);
//       const response = await axios.get(`http://localhost:8080/api/document/files/contentByName/${fileName}`, { responseType: 'blob' });
//       const url = URL.createObjectURL(response.data);
//       setPdfURL(url);
//     } catch (error) {
//       console.error('Error loading PDF:', error);
//     }
//   };
  

//   const renderFileNames = () => {
//     return fileNames.map((file, index) => (
//       <Grid item xs={12} style={{ marginTop: isMobile ? 25 : 40 }} key={index}>
//         <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//           <Button style={{
//             textTransform: 'none',
//             backgroundColor: selectedFile === file.documentTitle ? 'rgba(255, 210, 52, 0.3)' : 'transparent',
//             color: selectedFile === file.documentTitle ? '#B18A00' : '#332D2D',
//             boxShadow: selectedFile === file.documentTitle ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
//             width: '100%', justifyContent: 'center'
//           }}
//             onClick={() => handlePdfClick(file.documentTitle)}>
//             <Typography variant='h6' title={file.documentTitle} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.documentTitle}</Typography>
//           </Button>
//         </Box>
//       </Grid>
//     ));
//   };  

//   const renderPdfEmbed = () => {
//     return pdfURL && (
//       <Box style={{ width: '98%', height: '98%', overflow: 'auto' }}>
//         <embed type="application/pdf" width="100%" height="100%" src={pdfURL} />
//       </Box>
//     );
//   };

//   const drawerContent = (
//     <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//       <Grid container>
//         <Grid item xs={12}>
//           <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//             <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 18 }}>
//               Documents
//             </Typography>
//             <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
//           </Box>
//         </Grid>
//         <Box style={{ overflow: 'auto', maxHeight: '45vh' }}>
//           <Grid container>
//             {renderFileNames()}
//           </Grid>
//         </Box>
//       </Grid>
//     </Box>
//   );

//   return (
//     <>
//       <div style={{ backgroundImage: 'url(/crystalbackground.png)', minheight: '100vh', overflow: 'hidden' }}>
//         <AppBar position="sticky" style={{ backgroundColor: 'transparent', boxShadow: 'none', justifyContent: 'center' }}>
//           <Toolbar style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 0, paddingLeft: 0 }}>
//             <Box display={'flex'} style={{ width: isMobile ? 50 : 230, backgroundColor: 'tranparent', alignItems: 'center', marginLeft: 0 }}>
//               <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} />
//               {!isMobile && (
//                 <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00' }}>
//                   EduDeck
//                 </Typography>
//               )}
//             </Box>
//             <Box style={{ display: 'flex', backgroundColor: 'white', width: isMobile ? 250 : isMediumScreen ? 700 : 870, justifyContent: 'center', margin: 'auto', borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//               <Typography variant={isMobile ? "body1" : "h4"} style={{ fontFamily: "Roboto Condensed", color: '#332D2D', justifyContent: 'center', textAlign: 'center' }}>
//                 Document Text Highlighting
//               </Typography>
//             </Box>
//             <Box style={{ display: "flex", width: isMobile ? 60 : 150, justifyContent: isMobile ? 'space-between' : 'space-evenly', marginRight: isMobile ? '-0.5rem' : 0, marginTop: isMobile ? '0.2rem' : '0.5rem' }} >
//               <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
//                 <Box style={{ background: '#D0BF81', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem' }}>
//                   <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
//                     <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
//                   </IconButton>
//                 </Box>
//               </Box>
//               <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
//                 <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem' }}>
//                   <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
//                     <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Box>
//           </Toolbar>
//         </AppBar>
//         {isMobile ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '94vh' }}>
//             <SwipeableDrawer
//               anchor="left"
//               open={isBoxVisible}
//               onClose={toggleDrawer(false)}
//               onOpen={toggleDrawer(true)}
//               transitionDuration={{ enter: 500, exit: 500 }}
//               SlideProps={{ direction: "right" }}
//               PaperProps={{ style: { backgroundColor: 'transparent', height: '50vh', overflow: 'hidden', top: '25vh', borderRadius: 10 } }}
//               BackdropProps={{ invisible: true }}
//             >
//               {drawerContent}
//             </SwipeableDrawer>
//             {!isBoxVisible && (
//               <Box sx={{ position: 'fixed', left: 0, top: '50%', backgroundColor: 'gold', height: 30, width: 10 }} onClick={toggleDrawer(true)} />
//             )}
//           </Box>
//         ) : (
//           <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-67px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//             <Grid container >
//               <Grid item xs={12} >
//                 <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//                   <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 30 }}>
//                     Documents
//                   </Typography>
//                   <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
//                 </Box>
//               </Grid>
//               <Box style={{ overflow: 'auto', maxHeight: '60vh' }}>
//                 <Grid container>
//                   {renderFileNames()}
//                 </Grid>
//               </Box>
//             </Grid>
//             <Button style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//               <Typography style={{ color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '1.5em', textTransform: 'none' }}>
//                 Generate Flashcard
//               </Typography>
//             </Button>
//           </Box>
//         )}
//         <Box style={{ backgroundColor: 'white', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? '90%' : '56%', height: isMobile ? 770 : 770, marginLeft: isMobile ? 18 : isMediumScreen ? 295 : 350, position: 'absolute', top: 60 }}>
//           {renderPdfEmbed()}
//         </Box>
//         <Box style={{
//           display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? '95%' : '3.5%', height: isMobile ? 60 : 420, backgroundColor: 'white', marginLeft: isMobile ? 12 : isMediumScreen ? 295 : 500, position: 'absolute', top: isMobile ? 730 : 200, right: 10, borderRadius: isMobile ? 0 : 50, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
//           border: '1px solid black', display: 'flex', flexDirection: 'column'
//         }}>
//           <IconButton style={{ margin: '10px' }}>
//             <BorderColorIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <ContentPasteSearchIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <ZoomInIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <ZoomOutIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <MoreHorizIcon fontSize='large' />
//           </IconButton>
//         </Box>
//       </div>
//     </>
//   );
// }

// export default TextHighlighting;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {Box, Grid, Typography, SwipeableDrawer, useMediaQuery, useTheme, AppBar, Toolbar, IconButton, Divider,Button } from "@mui/material";
// import { AccountCircle, NotificationsNone, ZoomIn, ZoomOut, MoreHoriz,
//   BorderColor as BorderColorIcon,
//   ContentPasteSearch as ContentPasteSearchIcon,
//   ZoomIn as ZoomInIcon,
//   ZoomOut as ZoomOutIcon,
//   MoreHoriz as MoreHorizIcon
// } from "@mui/icons-material";

// function TextHighlighting() {
//   const [isBoxVisible, setIsBoxVisible] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMediumScreen = useMediaQuery('(max-width:1219px)');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileNames, setFileNames] = useState([]);
//   const [pdfURL, setPdfURL] = useState(null);
//   const userid = localStorage.getItem('userid');
//   const documentID = localStorage.getItem('documentID');

//   useEffect(() => {
//     const fetchFileNames = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/document/files/${userid}`); // Adjust the endpoint
//         setFileNames(response.data);
//       } catch (error) {
//         console.error("Error fetching file names:", error);
//       }
//     };
//     fetchFileNames();
//   }, [userid]);

//   const toggleDrawer = (open) => (event) => {
//     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setIsBoxVisible(open);
//   };

//   const handleDocumentClick = async (fileName) => {
//     try {
//         // Fetch the file content based on the file extension
//         const response = fileName.endsWith('.pdf') 
//             ? await axios.get(`http://localhost:8080/api/document/files/pdf/${fileName}`, { responseType: 'blob' })
//             : await axios.get(`http://localhost:8080/api/document/files/docx/${fileName}`, { responseType: 'blob' });

//         // Set the appropriate URL for viewing based on the file type
//         const url = URL.createObjectURL(response.data);
//         setPdfURL(url);
//     } catch (error) {
//         console.error('Error loading document:', error);
//     }
// };

// const renderFileNames = () => {
//     return fileNames.map((file, index) => (
//         <Grid item xs={12} style={{ marginTop: isMobile ? 25 : 40 }} key={index}>
//             <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//                 <Button style={{
//                     textTransform: 'none',
//                     backgroundColor: selectedFile === file.documentTitle ? 'rgba(255, 210, 52, 0.3)' : 'transparent',
//                     color: selectedFile === file.documentTitle ? '#B18A00' : '#332D2D',
//                     boxShadow: selectedFile === file.documentTitle ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
//                     width: '100%', justifyContent: 'center'
//                 }}
//                     onClick={() => handleDocumentClick(file.documentTitle)}>
//                     <Typography variant='h6' title={file.documentTitle} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.documentTitle}</Typography>
//                 </Button>
//             </Box>
//         </Grid>
//     ));
// };

// const getFileType = (fileName) => {
//   if (!fileName) {
//       return 'unsupported'; // Handle the case where fileName is null or undefined
//   }
//   const extension = fileName.split('.').pop().toLowerCase();
//   switch (extension) {
//       case 'pdf':
//           return 'pdf';
//       case 'docx':
//           return 'docx';
//       // Add support for other file types if needed
//       default:
//           return 'unsupported';
//   }
// };

// const renderPdfEmbed = () => {
//   return pdfURL && (
//       <Box style={{ width: '98%', height: '98%', overflow: 'auto' }}>
//           {getFileType(selectedFile) === 'pdf' ? (
//               <iframe title="PDF Viewer" style={{ width: '100%', height: '100%' }} src={pdfURL}></iframe>
//           ) : (
//               <iframe title="DOCX Viewer" style={{ width: '100%', height: '100%' }} src={pdfURL}></iframe>
//           )}
//       </Box>
//   );
// };



//   const drawerContent = (
//     <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//       <Grid container>
//         <Grid item xs={12}>
//           <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//             <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 18 }}>
//               Documents
//             </Typography>
//             <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
//           </Box>
//         </Grid>
//         <Box style={{ overflow: 'auto', maxHeight: '45vh' }}>
//           <Grid container>
//             {renderFileNames()}
//           </Grid>
//         </Box>
//       </Grid>
//     </Box>
//   );

//   return (
//     <>
//       <div style={{ backgroundImage: 'url(/crystalbackground.png)', minheight: '100vh', overflow: 'hidden' }}>
//         <AppBar position="sticky" style={{ backgroundColor: 'transparent', boxShadow: 'none', justifyContent: 'center' }}>
//           <Toolbar style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 0, paddingLeft: 0 }}>
//             <Box display={'flex'} style={{ width: isMobile ? 50 : 230, backgroundColor: 'tranparent', alignItems: 'center', marginLeft: 0 }}>
//               <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} />
//               {!isMobile && (
//                 <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00' }}>
//                   EduDeck
//                 </Typography>
//               )}
//             </Box>
//             <Box style={{ display: 'flex', backgroundColor: 'white', width: isMobile ? 250 : isMediumScreen ? 700 : 870, justifyContent: 'center', margin: 'auto', borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//               <Typography variant={isMobile ? "body1" : "h4"} style={{ fontFamily: "Roboto Condensed", color: '#332D2D', justifyContent: 'center', textAlign: 'center' }}>
//                 Document Text Highlighting
//               </Typography>
//             </Box>
//             <Box style={{ display: "flex", width: isMobile ? 60 : 150, justifyContent: isMobile ? 'space-between' : 'space-evenly', marginRight: isMobile ? '-0.5rem' : 0, marginTop: isMobile ? '0.2rem' : '0.5rem' }} >
//               <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
//                 <Box style={{ background: '#D0BF81', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem' }}>
//                   <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
//                     <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
//                   </IconButton>
//                 </Box>
//               </Box>
//               <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
//                 <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem' }}>
//                   <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
//                     <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Box>
//           </Toolbar>
//         </AppBar>
//         {isMobile ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '94vh' }}>
//             <SwipeableDrawer
//               anchor="left"
//               open={isBoxVisible}
//               onClose={toggleDrawer(false)}
//               onOpen={toggleDrawer(true)}
//               transitionDuration={{ enter: 500, exit: 500 }}
//               SlideProps={{ direction: "right" }}
//               PaperProps={{ style: { backgroundColor: 'transparent', height: '50vh', overflow: 'hidden', top: '25vh', borderRadius: 10 } }}
//               BackdropProps={{ invisible: true }}
//             >
//               {drawerContent}
//             </SwipeableDrawer>
//             {!isBoxVisible && (
//               <Box sx={{ position: 'fixed', left: 0, top: '50%', backgroundColor: 'gold', height: 30, width: 10 }} onClick={toggleDrawer(true)} />
//             )}
//           </Box>
//         ) : (
//           <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-67px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//             <Grid container >
//               <Grid item xs={12} >
//                 <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//                   <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 30 }}>
//                     Documents
//                   </Typography>
//                   <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
//                 </Box>
//               </Grid>
//               <Box style={{ overflow: 'auto', maxHeight: '60vh' }}>
//                 <Grid container>
//                   {renderFileNames()}
//                 </Grid>
//               </Box>
//             </Grid>
//             <Button style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//               <Typography style={{ color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '1.5em', textTransform: 'none' }}>
//                 Generate Flashcard
//               </Typography>
//             </Button>
//           </Box>
//         )}
//         <Box style={{ backgroundColor: 'white', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? '90%' : '56%', height: isMobile ? 770 : 770, marginLeft: isMobile ? 18 : isMediumScreen ? 295 : 350, position: 'absolute', top: 60 }}>
//           {renderPdfEmbed()}
//         </Box>
//         <Box style={{
//           display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? '95%' : '3.5%', height: isMobile ? 60 : 420, backgroundColor: 'white', marginLeft: isMobile ? 12 : isMediumScreen ? 295 : 500, position: 'absolute', top: isMobile ? 730 : 200, right: 10, borderRadius: isMobile ? 0 : 50, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
//           border: '1px solid black', display: 'flex', flexDirection: 'column'
//         }}>
//           <IconButton style={{ margin: '10px' }}>
//             <BorderColorIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <ContentPasteSearchIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <ZoomInIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <ZoomOutIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <MoreHorizIcon fontSize='large' />
//           </IconButton>
//         </Box>
//       </div>
//     </>
//   );
// }

// export default TextHighlighting;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {Box, Grid, Typography, SwipeableDrawer, useMediaQuery, useTheme, AppBar, Toolbar, IconButton, Divider,Button } from "@mui/material";
// import { AccountCircle, NotificationsNone, ZoomIn, ZoomOut, MoreHoriz,
//   BorderColor as BorderColorIcon,
//   ContentPasteSearch as ContentPasteSearchIcon,
//   ZoomIn as ZoomInIcon,
//   ZoomOut as ZoomOutIcon,
//   MoreHoriz as MoreHorizIcon
// } from "@mui/icons-material";
// import * as pdfjsLib from "pdfjs-dist";
// import mammoth from "mammoth";
// import { GlobalWorkerOptions } from 'pdfjs-dist';
// GlobalWorkerOptions.workerSrc = 'path/to/pdf.worker.js';

// function TextHighlighting() {
//   const [isBoxVisible, setIsBoxVisible] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isMediumScreen = useMediaQuery('(max-width:1219px)');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileNames, setFileNames] = useState([]);
//   const [pdfURL, setPdfURL] = useState(null);
//   const userid = localStorage.getItem('userid');
//   const documentID = localStorage.getItem('documentID');

//   useEffect(() => {
//     const fetchFileNames = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/document/files/${userid}`); // Adjust the endpoint
//         setFileNames(response.data);
//       } catch (error) {
//         console.error("Error fetching file names:", error);
//       }
//     };
//     fetchFileNames();
//   }, [userid]);

//   const toggleDrawer = (open) => (event) => {
//     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setIsBoxVisible(open);
//   };

//   const handleDocumentClick = async (fileName) => {
//     try {
//       // Determine the file type based on the file extension
//       const fileType = getFileType(fileName);
  
//       if (fileType === 'pdf') {
//         // Handle PDF files
//         const response = await axios.get(`http://localhost:8080/api/document/files/pdf/${fileName}`, { responseType: 'blob' });
//         const pdfBlob = response.data;
  
//         const pdfUrl = URL.createObjectURL(pdfBlob);
//         setPdfURL(pdfUrl);
  
//         const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
//         const numPages = pdf.numPages;
  
//         let pdfText = "";
  
//         for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//           const page = await pdf.getPage(pageNum);
//           const textContent = await page.getTextContent();
//           textContent.items.forEach(item => {
//             pdfText += item.str + " ";
//           });
//         }
  
//         // Here you can implement the logic to highlight text in the PDF view
//         console.log(pdfText); // For demonstration
//       } else if (fileType === 'docx') {
//         // Handle DOCX files
//         const response = await axios.get(`http://localhost:8080/api/document/files/docx/${fileName}`, { responseType: 'blob' });
//         const docxBlob = response.data;
  
//         const arrayBuffer = await docxBlob.arrayBuffer();
//         const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
//         const html = result.value;
  
//         // Display the HTML in an iframe or a div
//         setPdfURL("data:text/html;charset=utf-8," + encodeURIComponent(html));
  
//         // Here you can implement the logic to highlight text in the HTML view
//         console.log(html); // For demonstration
//       } else {
//         console.error('Unsupported file type:', fileType);
//       }
//     } catch (error) {
//       console.error('Error loading document:', error);
//     }
//   };  

// const renderFileNames = () => {
//     return fileNames.map((file, index) => (
//         <Grid item xs={12} style={{ marginTop: isMobile ? 25 : 40 }} key={index}>
//             <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//                 <Button style={{
//                     textTransform: 'none',
//                     backgroundColor: selectedFile === file.documentTitle ? 'rgba(255, 210, 52, 0.3)' : 'transparent',
//                     color: selectedFile === file.documentTitle ? '#B18A00' : '#332D2D',
//                     boxShadow: selectedFile === file.documentTitle ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
//                     width: '100%', justifyContent: 'center'
//                 }}
//                     onClick={() => handleDocumentClick(file.documentTitle)}>
//                     <Typography variant='h6' title={file.documentTitle} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.documentTitle}</Typography>
//                 </Button>
//             </Box>
//         </Grid>
//     ));
// };

// const getFileType = (fileName) => {
//   if (!fileName) {
//       return 'unsupported'; // Handle the case where fileName is null or undefined
//   }
//   const extension = fileName.split('.').pop().toLowerCase();
//   switch (extension) {
//       case 'pdf':
//           return 'pdf';
//       case 'docx':
//           return 'docx';
//       // Add support for other file types if needed
//       default:
//           return 'unsupported';
//   }
// };

// const renderPdfEmbed = () => {
//   return pdfURL && (
//       <Box style={{ width: '98%', height: '98%', overflow: 'auto' }}>
//           {getFileType(selectedFile) === 'pdf' ? (
//               <iframe title="PDF Viewer" style={{ width: '100%', height: '100%' }} src={pdfURL}></iframe>
//           ) : (
//               <iframe title="DOCX Viewer" style={{ width: '100%', height: '100%' }} src={pdfURL}></iframe>
//           )}
//       </Box>
//   );
// };



//   const drawerContent = (
//     <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-64px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//       <Grid container>
//         <Grid item xs={12}>
//           <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//             <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 18 }}>
//               Documents
//             </Typography>
//             <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
//           </Box>
//         </Grid>
//         <Box style={{ overflow: 'auto', maxHeight: '45vh' }}>
//           <Grid container>
//             {renderFileNames()}
//           </Grid>
//         </Box>
//       </Grid>
//     </Box>
//   );

//   return (
//     <>
//       <div style={{ backgroundImage: 'url(/crystalbackground.png)', minheight: '100vh', overflow: 'hidden' }}>
//         <AppBar position="sticky" style={{ backgroundColor: 'transparent', boxShadow: 'none', justifyContent: 'center' }}>
//           <Toolbar style={{ display: 'flex', justifyContent: 'space-between', marginLeft: 0, paddingLeft: 0 }}>
//             <Box display={'flex'} style={{ width: isMobile ? 50 : 230, backgroundColor: 'tranparent', alignItems: 'center', marginLeft: 0 }}>
//               <img src="/logo.png" alt="logo" style={{ height: isMobile ? 35 : 50 }} />
//               {!isMobile && (
//                 <Typography variant="h3" style={{ fontFamily: 'Poppin, sans-serif', fontWeight: '600', fontSize: '2em', color: '#B18A00' }}>
//                   EduDeck
//                 </Typography>
//               )}
//             </Box>
//             <Box style={{ display: 'flex', backgroundColor: 'white', width: isMobile ? 250 : isMediumScreen ? 700 : 870, justifyContent: 'center', margin: 'auto', borderRadius: 15, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//               <Typography variant={isMobile ? "body1" : "h4"} style={{ fontFamily: "Roboto Condensed", color: '#332D2D', justifyContent: 'center', textAlign: 'center' }}>
//                 Document Text Highlighting
//               </Typography>
//             </Box>
//             <Box style={{ display: "flex", width: isMobile ? 60 : 150, justifyContent: isMobile ? 'space-between' : 'space-evenly', marginRight: isMobile ? '-0.5rem' : 0, marginTop: isMobile ? '0.2rem' : '0.5rem' }} >
//               <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
//                 <Box style={{ background: '#D0BF81', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem' }}>
//                   <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
//                     <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
//                   </IconButton>
//                 </Box>
//               </Box>
//               <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
//                 <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem' }}>
//                   <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
//                     <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Box>
//           </Toolbar>
//         </AppBar>
//         {isMobile ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '94vh' }}>
//             <SwipeableDrawer
//               anchor="left"
//               open={isBoxVisible}
//               onClose={toggleDrawer(false)}
//               onOpen={toggleDrawer(true)}
//               transitionDuration={{ enter: 500, exit: 500 }}
//               SlideProps={{ direction: "right" }}
//               PaperProps={{ style: { backgroundColor: 'transparent', height: '50vh', overflow: 'hidden', top: '25vh', borderRadius: 10 } }}
//               BackdropProps={{ invisible: true }}
//             >
//               {drawerContent}
//             </SwipeableDrawer>
//             {!isBoxVisible && (
//               <Box sx={{ position: 'fixed', left: 0, top: '50%', backgroundColor: 'gold', height: 30, width: 10 }} onClick={toggleDrawer(true)} />
//             )}
//           </Box>
//         ) : (
//           <Box sx={{ width: { xs: 110, sm: 230 }, height: { xs: '80vh', sm: '100vh' }, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: '-67px', paddingTop: 0, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//             <Grid container >
//               <Grid item xs={12} >
//                 <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
//                   <Typography marginTop={13} style={{ fontFamily: 'Roboto Condensed', fontWeight: 550, fontSize: 30 }}>
//                     Documents
//                   </Typography>
//                   <Divider style={{ backgroundColor: '#BCA860', width: '80%', marginTop: 10 }} />
//                 </Box>
//               </Grid>
//               <Box style={{ overflow: 'auto', maxHeight: '60vh' }}>
//                 <Grid container>
//                   {renderFileNames()}
//                 </Grid>
//               </Box>
//             </Grid>
//             <Button style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
//               <Typography style={{ color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '1.5em', textTransform: 'none' }}>
//                 Generate Flashcard
//               </Typography>
//             </Button>
//           </Box>
//         )}
//         <Box style={{ backgroundColor: 'white', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? '90%' : '56%', height: isMobile ? 770 : 733, marginLeft: isMobile ? 18 : isMediumScreen ? 295 : 350, position: 'absolute', top: 60 }}>
//           {renderPdfEmbed()}
//         </Box>
//         <Box style={{
//           display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? '95%' : '3.5%', height: isMobile ? 60 : 420, backgroundColor: 'white', marginLeft: isMobile ? 12 : isMediumScreen ? 295 : 500, position: 'absolute', top: isMobile ? 730 : 200, right: 10, borderRadius: isMobile ? 0 : 50, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
//           border: '1px solid black', display: 'flex', flexDirection: 'column'
//         }}>
//           <IconButton style={{ margin: '10px' }}>
//             <BorderColorIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <ContentPasteSearchIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <ZoomInIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <ZoomOutIcon fontSize="large" />
//           </IconButton>
//           <IconButton style={{ margin: '10px' }}>
//             <MoreHorizIcon fontSize='large' />
//           </IconButton>
//         </Box>
//       </div>
//     </>
//   );
// }

// export default TextHighlighting;

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
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import { GlobalWorkerOptions } from 'pdfjs-dist';
GlobalWorkerOptions.workerSrc = '/path/to/pdf.worker.js';

function TextHighlighting() {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery('(max-width:1219px)');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [pdfURL, setPdfURL] = useState(null);
  const userid = localStorage.getItem('userid');
  const documentID = localStorage.getItem('documentID');

  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/document/files/${userid}`); // Adjust the endpoint
        setFileNames(response.data);
      } catch (error) {
        console.error("Error fetching file names:", error);
      }
    };
    fetchFileNames();
  }, [userid]);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsBoxVisible(open);
  };

  const handleDocumentClick = async (fileName) => {
    try {
      // Determine the file type based on the file extension
      const fileType = getFileType(fileName);
  
      if (fileType === 'pdf') {
        // Handle PDF files
        const response = await axios.get(`http://localhost:8080/api/document/files/pdf/${fileName}`, { responseType: 'blob' });
        const pdfBlob = response.data;
  
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfURL(pdfUrl);
  
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
        // Handle DOCX files
        const response = await axios.get(`http://localhost:8080/api/document/files/docx/${fileName}`, { responseType: 'blob' });
        const docxBlob = response.data;
  
        const arrayBuffer = await docxBlob.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
        const html = result.value;
  
        // Display the HTML in an iframe or a div
        setPdfURL("data:text/html;charset=utf-8," + encodeURIComponent(html));
  
        // Here you can implement the logic to highlight text in the HTML view
        console.log(html); // For demonstration
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
                    onClick={() => handleDocumentClick(file.documentTitle)}>
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
      // Add support for other file types if needed
      default:
          return 'unsupported';
  }
};

const renderPdfEmbed = () => {
  return pdfURL && (
      <Box style={{ width: '98%', height: '98%', overflow: 'auto' }}>
          {getFileType(selectedFile) === 'pdf' ? (
              <iframe title="PDF Viewer" style={{ width: '100%', height: '100%' }} src={pdfURL}></iframe>
          ) : (
              <iframe title="DOCX Viewer" style={{ width: '100%', height: '100%' }} src={pdfURL}></iframe>
          )}
      </Box>
  );
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

  return (
    <>
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
                <Box style={{ background: '#D0BF81', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem' }}>
                  <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
                    <AccountCircle style={{ fontSize: '100%', width: '100%', color: 'white' }} />
                  </IconButton>
                </Box>
              </Box>
              <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, padding: isMobile ? '2.5px' : '5px', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 5px 20px 0px rgba(0, 0, 0, 0.35)' }}>
                <Box style={{ background: 'white', borderRadius: isMobile ? 25 : 50, width: isMobile ? '1.4rem' : '2.8rem', height: isMobile ? '1.4rem' : '2.8rem' }}>
                  <IconButton color="white" style={{ fontSize: isMobile ? '22.5px' : '45px', padding: '0' }}>
                    <NotificationsNone style={{ fontSize: '100%', width: '100%', color: 'black' }} />
                  </IconButton>
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
            <Button style={{ backgroundColor: '#FFD234', margin: 20, width: '90%', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              <Typography style={{ color: 'black', fontFamily: 'Roboto Condensed', fontWeight: 500, fontSize: '1.5em', textTransform: 'none' }}>
                Generate Flashcard
              </Typography>
            </Button>
          </Box>
        )}
        <Box style={{ backgroundColor: 'white', border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? '90%' : '56%', height: isMobile ? 770 : 733, marginLeft: isMobile ? 18 : isMediumScreen ? 295 : 350, position: 'absolute', top: 60 }}>
          {renderPdfEmbed()}
        </Box>
        <Box style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', width: isMobile ? '95%' : '3.5%', height: isMobile ? 60 : 420, backgroundColor: 'white', marginLeft: isMobile ? 12 : isMediumScreen ? 295 : 500, position: 'absolute', top: isMobile ? 730 : 200, right: 10, borderRadius: isMobile ? 0 : 50, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          border: '1px solid black', display: 'flex', flexDirection: 'column'
        }}>
          <IconButton style={{ margin: '10px' }}>
            <BorderColorIcon fontSize="large" />
          </IconButton>
          <IconButton style={{ margin: '10px' }}>
            <ContentPasteSearchIcon fontSize="large" />
          </IconButton>
          <IconButton style={{ margin: '10px' }}>
            <ZoomInIcon fontSize="large" />
          </IconButton>
          <IconButton style={{ margin: '10px' }}>
            <ZoomOutIcon fontSize="large" />
          </IconButton>
          <IconButton style={{ margin: '10px' }}>
            <MoreHorizIcon fontSize='large' />
          </IconButton>
        </Box>
      </div>
    </>
  );
}

export default TextHighlighting;