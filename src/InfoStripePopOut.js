import React from "react";
import { Backdrop, Box, DialogContent, DialogTitle, DialogActions, Button, Typography } from '@mui/material';

const InfoStripePopOut = ({ open, handleClose, dialogContent, handleProceed }) => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(5px)",
                position: "fixed",
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
            }}
            open={open}
            onClick={handleClose}
        >
            <Box
                sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#FFFFFF",
                    width: { xs: "70%", md: "30%" },
                    height: { xs: "auto", md: "auto" },
                    borderRadius: "1em",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                    padding: { xs: "20px", md: "30px" },
                    zIndex: 1301,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <DialogTitle
                    sx={{
                        color: "#000000",
                        fontSize: { xs: "1.3em", md: "1.8em" },
                        fontWeight: "bolder",
                        textAlign: "center",
                        marginBottom: "-50px",
                    }}
                >
                    Important Information
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center" }}>
                    <img
                        src="/Stripe.png"
                        alt="Stripe Logo"
                        style={{
                            width: "100%",  // Set the width to 100% to take the full width of its container
                            maxWidth: "250px",  // Limit the maximum width to 250px
                            height: "auto",  // Automatically adjust height to maintain the aspect ratio
                            display: "block",
                            margin: "0 auto",
                            marginBottom: "-35px"
                        }}
                    />

                    <Typography
                        sx={{
                            color: "#000000",
                            fontSize: {xs: "1em", md: "1.1em"},
                            textAlign: "center",
                            marginBottom:'5px',
                        }}
                    >
                        {dialogContent}
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            background: "#ddd",
                            fontSize: { xs: "1em", md: "1.2em" },
                            color: "#000",
                            borderRadius: "10px",
                            padding: "10px 50px",
                            marginRight: "10px",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleProceed(); // Call the passed handleProceed function
                            handleClose(); // Optionally close the modal after proceeding
                        }}
                        autoFocus
                        sx={{
                            background: "#FFD234",
                            fontSize: { xs: "1em", md: "1.2em" },
                            color: "#000",
                            borderRadius: "10px",
                            padding: "10px 50px",
                        }}
                    >
                        Proceed
                    </Button>
                </DialogActions>
            </Box>

        </Backdrop>
    );
};

export default InfoStripePopOut;
