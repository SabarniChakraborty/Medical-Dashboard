// pages/_app.js
import { Toaster } from 'react-hot-toast';

import Header from "@/layout/header";
import { Box } from "@mui/material";
import "@/styles/globals.css";
import Footer from '@/layout/footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Header/>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures full height of the page
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
      
      <Footer/> {/* Footer will be visible at the bottom of every page */}
    </Box>
    </>
  );
}

export default MyApp;
