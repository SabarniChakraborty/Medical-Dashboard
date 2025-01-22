import React from "react";
import { Box, Grid, Typography, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import Testimonial from "../Testimonial";
import History from "../cms/history";


const doctors = [
    {
      name: "Dr. Michael Harris",
      position: "Chief Surgeon",
      image: "/doctor1.png", // Correct image path
    },
    {
      name: "Dr. Albert Dupont",
      position: "Orthopedic Specialist",
      image: "/doctor2.png", // Correct image path
    },
    {
      name: "Dr. Jenny Watson",
      position: "Pediatrician",
      image: "/doctor4.png", // Correct image path
    },
    {
      name: "Dr. Kate Howston",
      position: "Cardiologist",
      image: "/doctor3.png", // Correct image path
    },
  ];
  




const Team = () => {
  return (
    <Box sx={{ py: 8, textAlign: "center", backgroundColor: "#f9f9f9" , padding: 4, marginBottom: 4 }}>
      <Typography variant="h4" gutterBottom>
        <b>Meet Our Team</b>
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={6}>
        Our dedicated doctors are here to provide you with the best medical care.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {doctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
                boxShadow: 3, 
                borderRadius: 2, 
                overflow: "hidden",
                 marginLeft: 4, 
                 marginRight: 4 , 
                 marginBottom: 4 ,
            
                 }}>
              <CardMedia
                component="img"
                alt={doctor.name}
                height="300"
                image={doctor.image}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {doctor.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" mb={2}>
                  {doctor.position}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <IconButton color="primary">
                    <Facebook />
                  </IconButton>
                  <IconButton color="primary">
                    <Twitter />
                  </IconButton>
                  <IconButton color="primary">
                    <Instagram />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <History/>
      <Testimonial/>
    </Box>
    
  );
};

export default Team;
