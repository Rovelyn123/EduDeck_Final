import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ThankyouPopup = ({ open, handleClose }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#FFFFFF",
        width: { xs: "90%", md: "50%" },
        height: { xs: "auto", md: "auto" },
        borderRadius: "3em",
        boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: { xs: "20px", md: "30px" },
        zIndex: 1300,
      }}
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
          fontSize: { xs: "1em", md: "1.5em" },
          textAlign: "center",
          marginBottom: { xs: "20px", md: "15px" },
        }}
      >
        Excel in your courses with a calm mind.
      </Typography>
      <Typography
        sx={{
          color: "#000000",
          fontSize: { xs: "1em", md: "1.5em" },
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
  );
};

export default ThankyouPopup;
