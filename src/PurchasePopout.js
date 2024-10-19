import React from "react";
import { Box, Typography, Button, Backdrop } from "@mui/material";
// Import your images
import successImage from "./payment/paymentsuccess.png";
import failureImage from "./payment/paymentsuccess.png";

const PurchasePopout = ({ isSuccess, popoutOpen, handleClosePopOut }) => {
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
            open={popoutOpen}
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
                    zIndex: 1301,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Conditionally render the image based on isSuccess */}
                <Box
                    component="img"
                    src={isSuccess ? successImage : failureImage}
                    alt={isSuccess ? "Success Image" : "Failure Image"}
                    sx={{
                        width: "30%",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: { xs: "20px", md: "30px" },
                        margin: "0 auto"  // Centers the image horizontally
                    }}
                />


                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: { xs: "1em", md: "1.5em" },
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: { xs: "20px", md: "30px" },
                    }}
                >
                    {isSuccess ? "Thank You for Subscribing!" : "Payment Failed or Cancelled!"}
                </Typography>

                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: { xs: "1em", md: "1em" },
                        textAlign: "center",
                        marginBottom: { xs: "15px", md: "5px" },
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
