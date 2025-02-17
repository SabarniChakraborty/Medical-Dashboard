import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form

const ShowBooking = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(); // Use react-hook-form

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase.from("doctor_bookings").select("*");
        if (error) throw error;
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
    // Set default values for the form
    setValue("patient_name", appointment.patient_name);
    setValue("phone_number", appointment.phone_number);
    setValue("email", appointment.email);
    setValue("department", appointment.department);
    setValue("symptoms", appointment.symptoms);
    setValue("gender", appointment.gender);
    setValue("appointment_time", appointment.appointment_time);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const handleSave = async (data) => {
    try {
      const { error } = await supabase
        .from("doctor_bookings")
        .update({
          patient_name: data.patient_name,
          phone_number: data.phone_number,
          email: data.email,
          department: data.department,
          symptoms: data.symptoms,
          gender: data.gender,
          appointment_time: data.appointment_time,
        })
        .eq("id", selectedAppointment.id);

      if (error) throw error;

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === selectedAppointment.id ? { ...appointment, ...data } : appointment
        )
      );

      toast.success("Appointment updated successfully!");
      handleCloseDialog();
    } catch (err) {
      console.error("Error updating appointment:", err.message);
      toast.error("Failed to update the appointment.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("doctor_bookings").delete().eq("id", id);
      if (error) throw error;

      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );

      toast.success("Appointment deleted successfully!");
    } catch (err) {
      console.error("Error deleting appointment:", err.message);
      toast.error("Failed to delete the appointment.");
    }
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontWeight: "bold" }}>
        All Appointments
      </Typography>
      <Grid container spacing={3}>
        {appointments.map((appointment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ boxShadow: 3, padding: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1 }}>
                  {appointment.patient_name}
                </Typography>
                <Typography variant="body2">Phone: {appointment.phone_number}</Typography>
                <Typography variant="body2">Email: {appointment.email}</Typography>
                <Typography variant="body2">Department: {appointment.department}</Typography>
                <Typography variant="body2">Symptoms: {appointment.symptoms}</Typography>
                <Typography variant="body2">Gender: {appointment.gender}</Typography>
                <Typography variant="body2">Time: {appointment.appointment_time}</Typography>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 2 }}>
                  <IconButton color="primary" onClick={() => handleEdit(appointment)} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(appointment.id)} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedAppointment && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{ fontWeight: "bold" }}>Edit Appointment</DialogTitle>
          <DialogContent sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit(handleSave)}>
              <TextField
                fullWidth
                label="Patient Name"
                {...register("patient_name", { required: "Patient name is required" })}
                error={!!errors.patient_name}
                helperText={errors.patient_name ? errors.patient_name.message : ""}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                {...register("phone_number", { required: "Phone number is required" })}
                error={!!errors.phone_number}
                helperText={errors.phone_number ? errors.phone_number.message : ""}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                {...register("email", { 
                  required: "Email is required", 
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Department"
                {...register("department", { required: "Department is required" })}
                error={!!errors.department}
                helperText={errors.department ? errors.department.message : ""}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Symptoms"
                {...register("symptoms", { required: "Symptoms are required" })}
                error={!!errors.symptoms}
                helperText={errors.symptoms ? errors.symptoms.message : ""}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Gender"
                {...register("gender", { required: "Gender is required" })}
                error={!!errors.gender}
                helperText={errors.gender ? errors.gender.message : ""}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Appointment Time"
                {...register("appointment_time", { required: "Appointment time is required" })}
                error={!!errors.appointment_time}
                helperText={errors.appointment_time ? errors.appointment_time.message : ""}
                sx={{ marginBottom: 2 }}
              />
              <DialogActions sx={{ padding: 3 }}>
                <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default ShowBooking;
