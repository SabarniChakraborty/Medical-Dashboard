
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/lib/useAuthStore"; // Zustand store for auth state
import toast from "react-hot-toast";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

const Header = () => {
  const router = useRouter();
  const { userRole, setUserId, setUserRole } = useAuthStore();

  // State for modal and drawer
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Check for small screens
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to logout!");
      return;
    }

    // Clear user-related data
    setUserId(null);
    setUserRole(null);

    // Redirect to login page
    toast.success("Logged out successfully!");
    router.push("/");
  };

  // const handleOpenModal = () => {
  //   setOpenModal(true);
  // };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEmail("");
    setPassword("");
  };

  const handleAdminLogin = async () => {
    setLoading(true);
    try {
      // Authenticate the admin
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check admin role
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("email", email)
        .single();

      if (userError || userData.role !== "admin") {
        toast.error("Access restricted to admin only!");
        return;
      }

      // Save admin info to Zustand store
      setUserId(data.user.id);
      setUserRole(userData.role);

      toast.success("Welcome, Admin!");
      handleCloseModal(); // Close the modal

      // Redirect to the `show-bookings` page
      router.push("/cms/show-bookings");
    } catch (err) {
      toast.error("Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  // Drawer content for small screens
  const drawerContent = (
    <Box
      sx={{
        width: 250,
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
    >
      <List>
        <ListItem button onClick={() => router.push("/")}>
          <ListItemText primary="Home" />
        </ListItem>

        {userRole === "admin" ? (
          <Button color="inherit" onClick={() => router.push("/cms/admin-dashboard")}>
          Admin Dashboard
        </Button>
        
        ) : (
          <ListItem button onClick={() => router.push("/cms/show-doctors")}>
            <ListItemText primary="Services" />
          </ListItem>
        )}


        <ListItem button onClick={() => router.push("/contact")}>
          <ListItemText primary="Contact" />
        </ListItem>


        <ListItem button onClick={() => router.push("/about")}>
          <ListItemText primary="About" />
        </ListItem>


        {userRole ? (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button onClick={() => router.push("/auth/login")}>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#f5f5f5", color: "black", overflow: "hidden" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* {/ Logo /} */}
          <Typography
            variant="h6"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            Medical Dashboard
          </Typography>

          {/* {/ Navigation /} */}
          {isSmallScreen ? (
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              edge="end"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box>
              <Button color="inherit" onClick={() => router.push("/")}>
                Home
              </Button>



              {userRole === "admin" ? (
               <Button color="inherit" onClick={() => router.push("/cms/admin-dashboard")}>
               Admin Dashboard
             </Button>
             
              ) : (
                <Button color="inherit" onClick={() => router.push("/cms/show-doctors")}>
                  Services
                </Button>

              )}


              <Button color="inherit" onClick={() => router.push("/contact")}>
                Contact
              </Button>

              {/* {userRole === "user" && (
                <Button color="inherit" onClick={() => router.push("/cms/user-profile")}>
                  Profile
                </Button>
              )} */}


              <Button color="inherit" onClick={() => router.push("/about")}>
                About
              </Button>


              {userRole ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* {/ Drawer for Small creens /} */} 
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>




      {/* ////// dialog button////////////// */}
      {/* <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Admin Actions</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                handleCloseModal();
                router.push("/cms/show-bookings");
              }}
            >
              User Details
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                handleCloseModal();
                router.push("/cms/add-doctors");
              }}
            >
              Add Doctor
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}

    </>
  );
};

export default Header;
