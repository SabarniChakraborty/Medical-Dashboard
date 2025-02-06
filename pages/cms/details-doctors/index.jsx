import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Grid, Typography, Button, Card, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useForm } from "react-hook-form"; // Import React Hook Form
import { supabase } from "@/lib/supabaseClient";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const DoctorDetails = () => {
  const [doctor, setDoctor] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  // Initialize form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();



  const allowedDesignations = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Psychiatrist",
    "Dentist",
    "Orthopedic Surgeon",
    "Ophthalmologist",
    "Gynecologist",
    "ENT Specialist",
  ];

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching doctor details:", error.message);
        toast.error("Failed to fetch doctor details.");
      } else {
        setDoctor(data);
        // Pre-fill form fields when data is loaded
        setValue("name", data.name);
        setValue("designation", data.designation);
        setValue("fees", data.fees);
        setValue("visiting_hours", data.visiting_hours);
      }
    };

    fetchDoctorDetails();
  }, [id, setValue]);

  if (!doctor) {
    return <Typography>Loading...</Typography>;
  }

  // Delete doctor
  const handleDelete = async () => {
    const { error } = await supabase.from("doctors").delete().eq("id", doctor.id);
    if (error) {
      console.error("Error deleting doctor:", error.message);
      toast.error("Error deleting doctor.");
    } else {
      toast.success("Doctor deleted successfully!");
      router.push("/cms/show-doctors");
    }
  };

  // Open edit dialog
  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  // Save edited doctor details
  const onSubmit = async (data) => {
    const { error } = await supabase
      .from("doctors")
      .update({
        name: data.name,
        designation: data.designation,
        fees: data.fees,
        visiting_hours: data.visiting_hours,
      })
      .eq("id", doctor.id);

    if (error) {
      console.error("Error updating doctor:", error.message);
      toast.error("Error updating doctor.");
    } else {
      setDoctor(data);
      setOpenEditDialog(false);
      toast.success("Doctor updated successfully!");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>{doctor.name}</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          {doctor.photo_url && (
            <Card sx={{ height: "100%" }}>
              <CardMedia component="img" image={doctor.photo_url} alt={doctor.name} sx={{ height: 500, objectFit: "cover" }} />
            </Card>
          )}
        </Grid>

        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Designation: {doctor.designation}</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>Fees: ₹{doctor.fees}</Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>Visiting Hours: {doctor.visiting_hours}</Typography>
            </CardContent>
          </Card>

          <Box sx={{ marginTop: 2, display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleEdit} startIcon={<EditIcon />}>
              Edit
            </Button>

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


      {/* Edit Dialog with Validation */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="Designation"
              variant="outlined"
              {...register("designation", {
                required: "Designation is required",
                validate: (value) =>
                  allowedDesignations.includes(value) || "Invalid designation",
              })}
              fullWidth
              error={!!errors.designation}
              helperText={errors.designation?.message}
              sx={{ backgroundColor: "#f9f9f9", borderRadius: 1, marginBottom: 2 }}
            />
          

            <TextField
              fullWidth
              label="Fees"
              type="number"
              {...register("fees", {
                required: "Fees is required",
                min: { value: 0, message: "Fees must be a positive number" }
              })}
              error={!!errors.fees}
              helperText={errors.fees?.message}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              fullWidth
              label="Visiting Hours"
              {...register("visiting_hours", { required: "Visiting hours are required" })}
              error={!!errors.visiting_hours}
              helperText={errors.visiting_hours?.message}
              sx={{ marginBottom: 2 }}
            />

            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DoctorDetails;
