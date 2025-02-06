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

const ShowBooking = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("doctor_bookings")
        .update({
          patient_name: selectedAppointment.patient_name,
          phone_number: selectedAppointment.phone_number,
          email: selectedAppointment.email,
          department: selectedAppointment.department,
          symptoms: selectedAppointment.symptoms,
          gender: selectedAppointment.gender,
          appointment_time: selectedAppointment.appointment_time,
          // doctor_name: selectedAppointment.doctor_name,
        })
        .eq("id", selectedAppointment.id);

      if (error) throw error;

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === selectedAppointment.id ? selectedAppointment : appointment
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
                {/* <Typography variant="body2">Doctor: {appointment.doctor_name}</Typography> */}

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
            <TextField
              fullWidth
              label="Patient Name"
              value={selectedAppointment.patient_name}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  patient_name: e.target.value,
                })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={selectedAppointment.phone_number}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  phone_number: e.target.value,
                })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={selectedAppointment.email}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  email: e.target.value,
                })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Department"
              value={selectedAppointment.department}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  department: e.target.value,
                })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Symptoms"
              value={selectedAppointment.symptoms}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  symptoms: e.target.value,
                })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Gender"
              value={selectedAppointment.gender}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  gender: e.target.value,
                })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Appointment Time"
              value={selectedAppointment.appointment_time}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  appointment_time: e.target.value,
                })
              }
              sx={{ marginBottom: 2 }}
            />
            {/* <TextField
              fullWidth
              label="Doctor Name"
              value={selectedAppointment.doctor_name}
              onChange={(e) =>
                setSelectedAppointment({
                  ...selectedAppointment,
                  doctor_name: e.target.value,
                })
              }
              sx={{ marginBottom: 2 }}
            /> */}
            
          </DialogContent>
          <DialogActions sx={{ padding: 3 }}>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ShowBooking;
