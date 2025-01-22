import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "@/lib/supabaseClient";

import { useRouter } from "next/router";
import { useAuthStore } from "@/lib/useAuthStore"; // for role base access//



// Styled Card for better visuals and consistent sizing
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
  },
}));

const CardImage = styled(CardMedia)({
  height: "250px",
  width: "100%",
  objectFit: "cover",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
});

const ShowDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [view, setView] = useState("card"); // Default view is card view
  const [editDoctor, setEditDoctor] = useState(null); // Holds the doctor being edited
  const [openEditDialog, setOpenEditDialog] = useState(false); // Controls the edit dialog

  const { userRole } = useAuthStore();
  const router = useRouter();


  // Fetch all doctors from Supabase
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase.from("doctors").select("*");
      if (error) {
        console.error("Error fetching doctors:", error.message);
      } else {
        setDoctors(data);
      }
    };

    fetchDoctors();
  }, []);

  // Delete a doctor by ID
  const handleDelete = async (id) => {
    const { error } = await supabase.from("doctors").delete().eq("id", id);
    if (error) {
      console.error("Error deleting doctor:", error.message);
    } else {
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
      alert("Doctor deleted successfully!");
    }
  };

  // Open the edit dialog
  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setOpenEditDialog(true);
  };

  // Save the edited doctor
  const handleSaveEdit = async () => {
    const { error } = await supabase
      .from("doctors")
      .update({
        name: editDoctor.name,
        designation: editDoctor.designation,
        fees: editDoctor.fees,
        visiting_hours: editDoctor.visiting_hours,

      })
      .eq("id", editDoctor.id);

    if (error) {
      console.error("Error updating doctor:", error.message);
    } else {
      setDoctors(
        doctors.map((doctor) =>
          doctor.id === editDoctor.id ? editDoctor : doctor
        )
      );
      setOpenEditDialog(false);
      alert("Doctor updated successfully!");
    }
  };

  return (
    <Box 
    sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      overflow: "hidden",
     }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 4, fontWeight: "bold" }}
      >
        All Doctors
      </Typography>

      {/* Toggle View Buttons */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Button
          variant={view === "card" ? "contained" : "outlined"}
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={() => setView("card")}
        >
          Card View
        </Button>
        <Button
          variant={view === "table" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setView("table")}
        >
          Table View
        </Button>
      </Box>

      {/* Card View */}
      {view === "card" && (
        <Grid container spacing={4}>
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={3} key={doctor.id}>
              <StyledCard>
                {doctor.photo_url && (
                  <CardImage
                    component="img"
                    image={doctor.photo_url} // Display the doctor's photo
                    alt={doctor.name}
                    sx={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                )}
                <CardContent sx={{ flex: "1 1 auto" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                   Title :  {doctor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      height: "2em",
                    }}
                  >
                    {doctor.designation}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: 1 }}
                  >
                    Visiting Hours: {doctor.visiting_hours}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ marginTop: 1, fontWeight: "bold" }}
                  >
                    ₹{doctor.fees}
                  </Typography>

                  <Box sx={{ marginTop: 2 }}>

                    {/* {/ role base selection /} */}
                    {userRole === "admin" ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={() =>
                          router.push(`/cms/details-doctors?id=${doctor.id}`)
                        }
                      >
                        Read More
                      </Button>
                    ): userRole === "user" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={() =>
                          router.push(`/cms/user/booking-doctors?id=${doctor.id}`)
                        }
                      >
                        Book Now
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={() =>
                          router.push(`/auth/login`)
                        }
                      >
                        Login to Book
                      </Button>
                    )}

                    {/* <Link href={`/cms/details-doctors/${doctor.id}`} passHref>
                       <Button variant="outlined" color="primary">
                            Read More
                       </Button>
                    </Link> */}

                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Table View */}
      {view === "table" && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell><strong>Fees</strong></TableCell>
                <TableCell><strong>Visiting Hours</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.designation}</TableCell>
                  <TableCell>₹{doctor.fees}</TableCell>
                  <TableCell>{doctor.visiting_hours}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(doctor)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(doctor.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={editDoctor?.name || ""}
            onChange={(e) =>
              setEditDoctor({ ...editDoctor, name: e.target.value })
            }
            sx={{ marginBottom: 2 , marginTop: 3}}
          />
          <TextField
            fullWidth
            label="Designation"
            value={editDoctor?.designation || ""}
            onChange={(e) =>
              setEditDoctor({ ...editDoctor, designation: e.target.value })
            }
            sx={{ marginBottom: 2 , marginTop: 3}}
          />
          <TextField
            fullWidth
            label="Fees"
            value={editDoctor?.fees || ""}
            onChange={(e) =>
              setEditDoctor({ ...editDoctor, fees: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Visiting Hours"
            value={editDoctor?.visiting_hours || ""}
            onChange={(e) =>
              setEditDoctor({ ...editDoctor, visiting_hours: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShowDoctors;








