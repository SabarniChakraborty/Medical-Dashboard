

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Grid,
//   Container,
// } from "@mui/material";
// import { supabase } from "@/lib/supabaseClient"; // Import Supabase client
// import { useRouter } from "next/router"; // Import useRouter

// const AddDoctor = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     designation: "",
//     fees: "",
//     visiting_hours: "",
//     photo: null,
//   });

//   const router = useRouter(); // Initialize useRouter

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, photo: file });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.designation || !formData.fees || !formData.visiting_hours || !formData.photo) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       const photoFile = formData.photo;
//       const fileName = `${Date.now()}_${photoFile.name}`;
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from("medical dashboard") // Ensure you have a "photos" bucket in Supabase Storage
//         .upload(fileName, photoFile);

//       if (uploadError) throw uploadError;

//       const photoUrl = supabase.storage
//         .from("medical dashboard")
//         .getPublicUrl(fileName).data.publicUrl;

//       const { data, error } = await supabase.from("doctors").insert([{
//         name: formData.name,
//         designation: formData.designation,
//         fees: parseFloat(formData.fees),
//         visiting_hours: formData.visiting_hours,
//         photo_url: photoUrl, // Save the photo URL
//       }]);

//       if (error) throw error;

//       alert("Doctor added successfully!");

//       // Redirect to ShowDoctors page
//       router.push("/cms/show-doctors");
//     } catch (err) {
//       console.error("Error:", err.message);
//       alert("Error adding doctor.");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           padding: 4,
//           backgroundColor: "#fff",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           boxShadow: 3,
//           borderRadius: 2,
//           marginTop: 4,
//         }}
//       >
//         <Typography variant="h4" gutterBottom color="primary">
//           Add a New Doctor
//         </Typography>

//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             width: "100%",
//             marginBottom: 4,
//           }}
//         >
//           <TextField
//             label="Name"
//             variant="outlined"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             fullWidth
//             required
//             sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
//           />
//           <TextField
//             label="Designation"
//             variant="outlined"
//             name="designation"
//             value={formData.designation}
//             onChange={handleInputChange}
//             fullWidth
//             required
//             sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
//           />
//           <TextField
//             label="Fees"
//             variant="outlined"
//             name="fees"
//             value={formData.fees}
//             onChange={handleInputChange}
//             type="number"
//             fullWidth
//             required
//             sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
//           />
//           <TextField
//             label="Visiting Hours"
//             variant="outlined"
//             name="visiting_hours"
//             value={formData.visiting_hours}
//             onChange={handleInputChange}
//             fullWidth
//             required
//             sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
//           />

//           <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
//             Upload Photo
//             <input
//               type="file"
//               hidden
//               accept="image/*"
//               onChange={handlePhotoUpload}
//               required
//             />
//           </Button>
//           {formData.photo && (
//             <Typography variant="body2" sx={{ marginTop: 1 }}>
//               {formData.photo.name}
//             </Typography>
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{ marginTop: 3 }}
//           >
//             Submit
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default AddDoctor;




import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client
import { useRouter } from "next/router"; // Import useRouter

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    fees: "",
    visiting_hours: "",
    photo: null,
    photoPreview: null, // Added for preview
  });

  const router = useRouter(); // Initialize useRouter

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: file,
        photoPreview: URL.createObjectURL(file), // Set preview URL
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.designation || !formData.fees || !formData.visiting_hours || !formData.photo) {
      alert("All fields are required!");
      return;
    }

    try {
      const photoFile = formData.photo;
      const fileName = `${Date.now()}_${photoFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("medical dashboard") // Ensure you have a "photos" bucket in Supabase Storage
        .upload(fileName, photoFile);

      if (uploadError) throw uploadError;

      const photoUrl = supabase.storage
        .from("medical dashboard")
        .getPublicUrl(fileName).data.publicUrl;

      const { data, error } = await supabase.from("doctors").insert([{
        name: formData.name,
        designation: formData.designation,
        fees: parseFloat(formData.fees),
        visiting_hours: formData.visiting_hours,
        photo_url: photoUrl, // Save the photo URL
      }]);

      if (error) throw error;

      alert("Doctor added successfully!");

      // Redirect to ShowDoctors page
      router.push("/cms/show-doctors");
    } catch (err) {
      console.error("Error:", err.message);
      alert("Error adding doctor.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 3,
          borderRadius: 2,
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Add a New Doctor
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            marginBottom: 4,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
          <TextField
            label="Designation"
            variant="outlined"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
          <TextField
            label="Fees"
            variant="outlined"
            name="fees"
            value={formData.fees}
            onChange={handleInputChange}
            type="number"
            fullWidth
            required
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
          <TextField
            label="Visiting Hours"
            variant="outlined"
            name="visiting_hours"
            value={formData.visiting_hours}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />

          <Button variant="contained" component="label" sx={{ marginTop: 2 , }}>
            Upload Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoUpload}
              required
            />
          </Button>

          {formData.photoPreview && (
            <Box
              sx={{
                marginTop: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Photo Preview:
              </Typography>
              <Box
                component="img"
                src={formData.photoPreview}
                alt="Preview"
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 400,
                  objectFit: "cover",
                  borderRadius: 2,
                  border: "1px solid #ddd",
                }}
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddDoctor;

