import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
// import './Testimonial.css';
import { Avatar, Container, Grid, Paper, Typography  } from '@mui/material';
import styled from '@emotion/styled';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';



const testimonials = [
  {
    id: 1,
    name: "Dr. Kristen Morres",
    title: "Physician",
    quote: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
    image: "https://webthemez.com/demo/gogym-single-page-bootstrap-4-template/assets/img/ava/img2.jpg",
  },
  {
    id: 2,
    name: "Dr. James Vintel",
    title: "Pediatrician",
    quote: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.",
    image: "https://webthemez.com/demo/gogym-single-page-bootstrap-4-template/assets/img/ava/img3.jpg",
  }
]

// Styled components for the design
const QuoteBox = styled(Paper)({
  position: 'relative',
  padding: '24px', // theme.spacing(3) is approximately 24px
  paddingBottom: '40px', // theme.spacing(5) is approximately 40px
  borderRadius: '8px', // theme.spacing(1) is approximately 8px
  backgroundColor: '#f9f9f9',
  maxWidth: '500px',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', // theme.shadows[3] equivalent
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -15,
    left: '20%',
    borderWidth: '15px',
    borderStyle: 'solid',
    borderColor: '#f9f9f9 transparent transparent transparent',
  },
});

const QuoteIcon = styled(FormatQuoteIcon)({
  color: '#2979ff',
  fontSize: '2rem',
  marginRight: '16px', // theme.spacing(1) is approximately 16px
});

const AuthorContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
});
 
const Testimonial = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once on scroll
    });
  }, []);

  return (
    <Container style={{ marginTop: '100px', marginBottom: '50px' }}>
      <Grid style={{ marginBottom: '50px' }}>
        <Typography variant="h3" component="div" style={{ marginTop: '50px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
          Testimonials
        </Typography>
        <Typography variant="p" component="div" style={{ marginTop: '50px', marginBottom: '30px', textAlign: 'center', fontWeight: 'semibold' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Typography>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        {
          testimonials.map((testimonial, i)=> {
            return (
              <Grid item xs={12} md={6} sm={12} key={i}>
                <QuoteBox elevation={3}>
                  <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                    <QuoteIcon style={{
                        transform: 'scaleX(-1) rotate(0deg)', // Combine transformations
                        marginRight: '8px',
                        marginTop: '-80px', // Adjust this value to control the height
                      }} 
                    />
                    {testimonial.quote}
                  </Typography>
                </QuoteBox>
                <AuthorContainer>
                  <Avatar
                    alt="Kristen Morres"
                    src={testimonial.image} // Replace with the actual path to the image
                    style={{ width: 50, height: 50, marginRight: '8px' }}
                  />
                  <div>
                    <Typography variant="subtitle1" component="div">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {testimonial.title}
                    </Typography>
                  </div>
                </AuthorContainer>
              </Grid>
            )
          })
        }
      </Grid>
    </Container>
  );
};

export default Testimonial;
