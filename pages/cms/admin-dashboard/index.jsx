import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, IconButton } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; // Add Doctor
import PeopleIcon from "@mui/icons-material/People"; // User Details
import VisibilityIcon from "@mui/icons-material/Visibility"; // Show Doctors
import AssessmentIcon from "@mui/icons-material/Assessment"; // Analytics

const AdminDashboard = () => {
  const router = useRouter();

  // Navigation function
  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        gap: 4,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Admin Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 5,
        }}
      >
        {/* Add Doctor */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/cms/add-doctors")}
        >
          <IconButton color="primary" sx={{ fontSize: 60 }}>
            <LocalHospitalIcon fontSize="large" />
          </IconButton>
          <Typography>Add Doctor</Typography>
        </Box>

        {/* User Details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/cms/show-bookings")}
        >
          <IconButton color="secondary" sx={{ fontSize: 60 }}>
            <PeopleIcon fontSize="large" />
          </IconButton>
          <Typography>User Details</Typography>
        </Box>

        {/* Show Doctors */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/cms/show-doctors")}
        >
          <IconButton color="success" sx={{ fontSize: 60 }}>
            <VisibilityIcon fontSize="large" />
          </IconButton>
          <Typography>Show Doctors</Typography>
        </Box>

        {/* Analytics */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => handleNavigation("/cms/user/analytics")}
        >
          <IconButton color="info" sx={{ fontSize: 60 }}>
            <AssessmentIcon fontSize="large" />
          </IconButton>
          <Typography>Analytics</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
