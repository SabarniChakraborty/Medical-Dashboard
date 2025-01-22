import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { MdCalendarToday } from "react-icons/md";
import { useRouter } from "next/router";

const ConfirmBookingPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Redirect to the home page
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#33b5e5",
        textAlign: "center",
        // padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "50%",
          padding: 3,
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MdCalendarToday size={60} color="#33b5e5" />
      </Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "white", mb: 1 }}
      >
        Appointment Confirmation
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "white", mb: 3, maxWidth: 400 }}
      >
        Your appointment has been successfully booked. We look forward to seeing
        you!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "white", color: "#33b5e5", fontWeight: "bold" }}
        onClick={handleGoHome}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default ConfirmBookingPage;
