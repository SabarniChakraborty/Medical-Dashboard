import React from "react";
import { Box, Grid, TextField, Button, Typography, Container } from "@mui/material";
import Image from "next/image";
import contactIllustration from "/public/contact.jpg"; // Replace with your image path

const ContactPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingY: 4,
      }}
    >
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Left Side Image */}
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            sx={{
              padding: { xs: 2, md: 4 },
              textAlign: "center",
            }}
          >
            <Image
              src={contactIllustration}
              alt="Contact Illustration"
              layout="responsive"
              width={500}
              height={500}
              style={{
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>

        {/* Right Side Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: { xs: 3, md: 4 },
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <form action="https://getform.io/f/blllmlxb" method="POST">
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                textAlign="center"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  marginBottom: { xs: 2, md: 4 },
                }}
              >
                Contact Us
              </Typography>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                margin="normal"
                required
                InputProps={{
                  style: { fontSize: "0.9rem" },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                margin="normal"
                type="email"
                required
                InputProps={{
                  style: { fontSize: "0.9rem" },
                }}
              />
              <TextField
                fullWidth
                label="Phone No"
                name="phone"
                variant="outlined"
                margin="normal"
                type="tel"
                required
                InputProps={{
                  style: { fontSize: "0.9rem" },
                }}
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                required
                InputProps={{
                  style: { fontSize: "0.9rem" },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#007bff",
                  fontSize: "0.9rem",
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
