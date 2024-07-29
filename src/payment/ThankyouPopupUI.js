import React from "react";
import { Box, Typography, Button, Backdrop } from "@mui/material";

const ThankyouPopupUI = ({ open, handleClose }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(2px)", // Add blur effect here
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
          width: { xs: "75%", md: "40%" },
          height: { xs: "auto", md: "auto" },
          borderRadius: "2em",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
          padding: { xs: "20px", md: "30px" },
          zIndex: 1301, // Ensure it is above the backdrop
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
      >
        <Typography
          sx={{
            color: "#000000",
            fontSize: { xs: "1.5em", md: "2em" },
            fontWeight: "bolder",
            textAlign: "center",
            marginBottom: { xs: "20px", md: "30px" },
          }}
        >
          Thank You for Your Purchase!
        </Typography>
        <Typography
          sx={{
            color: "#000000",
            fontSize: { xs: "1em", md: "1em" },
            textAlign: "center",
            marginBottom: { xs: "20px", md: "15px" },
          }}
        >
          Excel in your courses with a calm mind.
        </Typography>
        <Typography
          sx={{
            color: "#000000",
            fontSize: { xs: "1em", md: "1em" },
            textAlign: "center",
            marginBottom: { xs: "20px", md: "30px" },
          }}
        >
          Thanks for choosing EduDeck Plus!
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
          onClick={handleClose}
        >
          OK
        </Button>
      </Box>
    </Backdrop>
  );
};

export default ThankyouPopupUI;
