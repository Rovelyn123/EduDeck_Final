import React from "react";
import { Box, Typography, Button, Backdrop } from "@mui/material";

const PurchasePopout = ({ isSuccess, popoutOpen, handleClosePopOut}) => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(5px)",
                position: "fixed",
                top: 0,
                left: 0,
                width: '100vw',     // Full width
                height: '100vh',   // Full height
            }}
            open={popoutOpen}  // Use the prop to control visibility
            onClick={handleClosePopOut}
        >
            <Box
                sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#FFFFFF",
                    width: { xs: "50%", md: "30%" },
                    height: { xs: "auto", md: "auto" },
                    borderRadius: "1em",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                    padding: { xs: "20px", md: "30px" },
                    zIndex: 1301, // Ensure it is above the backdrop
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
            >
                {/* Conditionally render message based on payment status */}
                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: { xs: "1.5em", md: "2em" },
                        fontWeight: "bolder",
                        textAlign: "center",
                        marginBottom: { xs: "20px", md: "30px" },
                    }}
                >
                    {isSuccess ? "Payment Successful!" : "Payment Failed or Cancelled!"}
                </Typography>

                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: { xs: "1em", md: "1em" },
                        textAlign: "center",
                        marginBottom: { xs: "20px", md: "15px" },
                    }}
                >
                    {isSuccess
                        ? "Excel in your courses with a calm mind."
                        : "Something went wrong. Please try again."}
                </Typography>

                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: { xs: "1em", md: "1em" },
                        textAlign: "center",
                        marginBottom: { xs: "20px", md: "30px" },
                    }}
                >
                    {isSuccess ? "Thanks for choosing EduDeck Plus!" : "Please check your payment details."}
                </Typography>

                <Button
                    sx={{
                        background: "#FFD234",
                        width: { xs: "90%", md: "20em" },
                        fontSize: { xs: "1em", md: "1em" },
                        fontWeight: "bold",
                        color: "#000000",
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "10px",
                    }}
                    onClick={handleClosePopOut}
                >
                    OK
                </Button>
            </Box>
        </Backdrop>
    );
};

export default PurchasePopout;
