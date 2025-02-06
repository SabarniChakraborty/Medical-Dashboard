import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Container,
} from "@mui/material";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"];
const genders = ["Male", "Female", "Other"];

const BookDoctor = () => {
  const router = useRouter();
  const { id } = router.query;

  const [doctorDetails, setDoctorDetails] = useState({});
  const [userEmail, setUserEmail] = useState("");


  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    email: "",
    symptoms: "",
    department: "",
    gender: "",
    time: "",
    doctor_id: "",
    doctor_name: "",
  });

  useEffect(() => {
    if (id) {
      fetchDoctorDetails();
    }
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      setUserEmail(data.user.email);
      setFormData((prev) => ({
        ...prev,
        email: data.user.email, // Pre-fill email field
      }));
    } else {
      console.error("Error fetching user:", error?.message);
    }
  };

  const fetchDoctorDetails = async () => {
    const { data: doctorData, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching doctor details:", error.message);
      return;
    }

    setDoctorDetails(doctorData);
    setFormData((prev) => ({
      ...prev,
      doctor_id: doctorData.id, // Set doctor_id when details are fetched
      doctor_name: doctorData.name, // Set doctor_name when details are fetched
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.department ||
      !formData.gender ||
      !formData.time
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const { data, error } = await supabase.from("doctor_bookings").insert([
        {
          patient_name: formData.patientName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          symptoms: formData.symptoms,
          department: formData.department,
          gender: formData.gender,
          appointment_time: formData.time,
          doctor_id: formData.doctor_id,
          doctor_name: doctorDetails.name,
        },
      ]);

      if (error) throw error;

      toast.success("Doctor appointment booked successfully!");

      // setTimeout(() => {
      //   router.push("/cms/user/patient-details");
      // }, 2000);

      setFormData({
        patientName: "",
        phoneNumber: "",
        email: userEmail,
        symptoms: "",
        department: "",
        gender: "",
        time: "",
        doctor_id: "",
        // doctor_name: userName
      });
    } catch (err) {
      console.error("Error booking doctor:", err.message);
      alert("Error booking doctor.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#fff",
          boxShadow: 3,
          borderRadius: 2,
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          color="primary"
          fontWeight="bold"
        >
          Book a Doctor Appointment
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                variant="outlined"
                disabled // Disables the field
                helperText="Email cannot be changed" // Shows a message below the input
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Doctor Name"
                name="doctor_name"
                value={formData.doctor_name}
                variant="outlined"
                disabled // Disables the field
                helperText="Doctor name cannot be changed" // Shows a message below the input
              />
            </Grid>



            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                variant="outlined"
              >
                {departments.map((dept, index) => (
                  <MenuItem key={index} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                variant="outlined"
              >
                {genders.map((gen, index) => (
                  <MenuItem key={index} value={gen}>
                    {gen}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Appointment Time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                type="time"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() =>
                  router.push(`/cms/user/patient-details?id=${doctorDetails.id}`)
                }
                type="submit"
                variant="contained"
                fullWidth>
                Book Appointment
              </Button>

            </Grid>
          </Grid>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default BookDoctor;
