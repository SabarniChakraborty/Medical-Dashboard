// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Grid,
//   Typography,
//   MenuItem,
//   Container,
// } from "@mui/material";
// import { supabase } from "@/lib/supabaseClient"; // Ensure Supabase is initialized correctly

// const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"];
// const genders = ["Male", "Female", "Other"];

// const BookDoctor = () => {
//   const [formData, setFormData] = useState({
//     patientName: "",
//     phoneNumber: "",
//     email: "",
//     symptoms: "",
//     department: "",
//     gender: "",
//     time: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (
//       !formData.patientName ||
//       !formData.phoneNumber ||
//       !formData.email ||
//       !formData.department ||
//       !formData.gender ||
//       !formData.time
//     ) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       // Insert the booking details into the Supabase table
//       const { data, error } = await supabase.from("doctor_bookings").insert([
//         {
//           patient_name: formData.patientName,
//           phone_number: formData.phoneNumber,
//           email: formData.email,
//           symptoms: formData.symptoms,
//           department: formData.department,
//           gender: formData.gender,
//           appointment_time: formData.time,
//         },
//       ]);

//       if (error) throw error;

//       alert("Doctor appointment booked successfully!");
//       // Reset form
//       setFormData({
//         patientName: "",
//         phoneNumber: "",
//         email: "",
//         symptoms: "",
//         department: "",
//         gender: "",
//         time: "",
//       });
//     } catch (err) {
//       console.error("Error booking doctor:", err.message);
//       alert("Error booking doctor.");
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ marginTop: 4 }}>
//       <Box
//         sx={{
//           padding: 4,
//           backgroundColor: "#fff",
//           boxShadow: 3,
//           borderRadius: 2,
//         }}
//       >
//         <Typography
//           variant="h4"
//           textAlign="center"
//           gutterBottom
//           color="primary"
//           fontWeight="bold"
//         >
//           Book a Doctor Appointment
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Patient Name"
//                 name="patientName"
//                 value={formData.patientName}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 type="email"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Symptoms"
//                 name="symptoms"
//                 value={formData.symptoms}
//                 onChange={handleChange}
//                 multiline
//                 rows={3}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Department"
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//               >
//                 {departments.map((dept, index) => (
//                   <MenuItem key={index} value={dept}>
//                     {dept}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Gender"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//               >
//                 {genders.map((gen, index) => (
//                   <MenuItem key={index} value={gen}>
//                     {gen}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Appointment Time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 required
//                 type="time"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" fullWidth>
//                 Book Appointment
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default BookDoctor;




import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Container,
} from "@mui/material";
import { supabase } from "@/lib/supabaseClient"; // Ensure Supabase is initialized correctly
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify

const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"];
const genders = ["Male", "Female", "Other"];

const BookDoctor = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    email: "",
    symptoms: "",
    department: "",
    gender: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
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
      // Insert the booking details into the Supabase table
      const { data, error } = await supabase.from("doctor_bookings").insert([
        {
          patient_name: formData.patientName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          symptoms: formData.symptoms,
          department: formData.department,
          gender: formData.gender,
          appointment_time: formData.time,
        },
      ]);

      if (error) throw error;

      // Display success toast notification
      toast.success("Doctor appointment booked successfully!");

      // Redirect to show bookings page
      router.push("/cms/user/confirm-booking");

      // Reset form
      setFormData({
        patientName: "",
        phoneNumber: "",
        email: "",
        symptoms: "",
        department: "",
        gender: "",
        time: "",
      });
    } catch (err) {
      console.error("Error booking doctor:", err.message);
      alert("Error booking doctor.");
    }
  };

  const handleContactClick = () => {
    alert("Contact us at +91-123-456-7890 or email: support@hospital.com");
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
              <Button type="submit" variant="contained" fullWidth>
                Book Appointment
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleContactClick}
          >
            Contact Us
          </Button>
        </Box> */}
      </Box>

      {/* Toast Container */}
      <ToastContainer />
    </Container>
  );
};

export default BookDoctor;
