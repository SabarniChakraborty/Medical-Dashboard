

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
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    control,
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

  const [photoPreview, setPhotoPreview] = useState(null);
  const router = useRouter();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("photo", file); // Update file in React Hook Form
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const { name, designation, fees, visiting_hours, photo } = data;
      const fileName = `${Date.now()}_${photo.name}`;

      const { error: uploadError } = await supabase.storage
        .from("medical dashboard")
        .upload(fileName, photo);

      if (uploadError) throw uploadError;

      const photoUrl = supabase.storage
        .from("medical dashboard")
        .getPublicUrl(fileName).data.publicUrl;

      const { error } = await supabase.from("doctors").insert([{
        name,
        designation,
        fees: parseFloat(fees),
        visiting_hours,
        photo_url: photoUrl,
      }]);

      if (error) throw error;

      toast.success("Doctor added successfully!");
      setTimeout(() => router.push("/cms/show-doctors"), 1500);
    } catch (err) {
      console.error("Error:", err.message);
      toast.error("Error adding doctor.");
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
          onSubmit={handleSubmit(onSubmit)}
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
            {...register("name", { required: "Name is required" })}
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
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
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />


          <TextField
            label="Fees"
            variant="outlined"
            type="number"
            {...register("fees", {
              required: "Fees are required",
              min: { value: 0, message: "Fees must be positive" },
            })}
            fullWidth
            error={!!errors.fees}
            helperText={errors.fees?.message}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />

          <TextField
            label="Visiting Hours"
            variant="outlined"
            {...register("visiting_hours", {
              required: "Visiting hours are required",
              // pattern: {
              //   value: /^[0-9]{2}:[0-9]{2} - [0-9]{2}:[0-9]{2}$/,
              //   message: "Format: HH:MM - HH:MM",
              // },
            })}
            fullWidth
            error={!!errors.visiting_hours}
            helperText={errors.visiting_hours?.message}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />

          <Controller
            name="photo"
            control={control}
            rules={{ required: "Photo is required" }}
            render={({ field }) => (
              <>
                <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                      handlePhotoUpload(e);
                    }}
                  />
                </Button>
                {errors.photo && (
                  <Typography variant="body2" color="error">
                    {errors.photo.message}
                  </Typography>
                )}
              </>
            )}
          />

          {photoPreview && (
            <Box sx={{ marginTop: 2, textAlign: "center" }}>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                Photo Preview:
              </Typography>
              <Box
                component="img"
                src={photoPreview}
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

          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 3 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddDoctor;
