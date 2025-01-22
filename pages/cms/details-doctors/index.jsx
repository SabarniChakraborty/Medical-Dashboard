
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Grid, Typography, Button, Card, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { supabase } from "@/lib/supabaseClient"; // Your Supabase client
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DoctorDetails = () => {
  const [doctor, setDoctor] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false); // Controls the edit dialog
  const router = useRouter();
  const { id } = router.query; // Get doctor id from the URL

  // Fetch doctor details based on the id from the URL
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!id) return; // Do nothing if id is not available

      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching doctor details:", error.message);
      } else {
        setDoctor(data);
        setEditDoctor(data); // Set the doctor details in editDoctor for the dialog
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (!doctor) {
    return <Typography>Loading...</Typography>; // Show loading state until data is fetched
  }

  // Delete a doctor by ID
  const handleDelete = async () => {
    const { error } = await supabase.from("doctors").delete().eq("id", doctor.id);
    if (error) {
      console.error("Error deleting doctor:", error.message);
    } else {
      alert("Doctor deleted successfully!");
      router.push("/cms/show-doctors"); // Redirect to the doctors list page after deletion
    }
  };

  // Open the edit dialog and set the doctor to be edited
  const handleEdit = () => {
    setEditDoctor(doctor); // Set the current doctor details in the dialog form
    setOpenEditDialog(true);
  };

  // Save the edited doctor details
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
      // Update the UI with the new doctor details
      setDoctor(editDoctor);
      setOpenEditDialog(false);
      alert("Doctor updated successfully!");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>{doctor.name}</Typography>

      <Grid container spacing={4}>
        {/* Left Section (Image) */}
        <Grid item xs={12} sm={4}>
          {doctor.photo_url && (
            <Card sx={{ height: "100%" }}>
              <CardMedia component="img" image={doctor.photo_url} alt={doctor.name} sx={{ height: 500, objectFit: "cover" }} />
            </Card>
          )}
        </Grid>

        {/* Right Section (Doctor Details) */}
        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Designation: {doctor.designation}</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>Fees: ₹{doctor.fees}</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>Visiting Hours: {doctor.visiting_hours}</Typography>

              {/* Additional details */}
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Detailed bio and other information about the doctor can be added here.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, culpa! In dolorum odio quo natus consectetur quaerat excepturi nulla architecto, asperiores unde officia optio atque quidem distinctio, error voluptatem earum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non perferendis sint repudiandae odio minima est pariatur porro similique, rerum soluta iste illo provident. Ex consectetur accusantium velit aut architecto ut?Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium enim laudantium in ipsam fuga, laboriosam ipsum, perferendis error, quidem suscipit iusto ducimus expedita possimus magni cum adipisci autem atque. Maxime!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Blanditiis praesentium, expedita iusto accusantium facilis obcaecati, dolorem aperiam \
                modi maxime voluptatum veniam? Voluptatibus harum error cupiditate qui eveniet suscipit maiores corporis!
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro impedit esse 
                labore numquam ducimus tempora expedita, fugiat in aspernatur. Provident hic eos iure nobis atque, tempore similique numquam neque fuga?
              </Typography>
            </CardContent>
          </Card>

          {/* Action Buttons: Edit and Delete */}
          <Box sx={{ marginTop: 2, display: "flex", gap: 2 }}>
            {/* Edit Button */}
            <Button variant="contained" color="primary" onClick={handleEdit} startIcon={<EditIcon />}>
              Edit
            </Button>

            {/* Delete Button */}
            <Button variant="contained" color="secondary" onClick={handleDelete} startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Button variant="outlined" color="secondary" onClick={() => router.push("/cms/show-doctors")}>
              Back to Doctors List
            </Button>
          </Box>
        </Grid>
      </Grid>

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
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Designation"
            value={editDoctor?.designation || ""}
            onChange={(e) =>
              setEditDoctor({ ...editDoctor, designation: e.target.value })
            }
            sx={{ marginBottom: 2 }}
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

export default DoctorDetails;
