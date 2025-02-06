// import React from "react";
// import { jsPDF } from "jspdf";
// import { supabase } from "@/lib/supabaseClient";
// import { Button } from "@mui/material";
// import { toast } from "react-toastify";

// const GeneratePDF = ({ appointment }) => {
//   const createAndUploadPDF = async () => {
//     // 1. Generate PDF using jsPDF
//     const doc = new jsPDF();
//     doc.text("Appointment Details", 10, 10);
//     doc.text(`Doctor: ${appointment.doctor_name}`, 10, 20);
//     doc.text(`Patient: ${appointment.patient_name}`, 10, 30);
//     doc.text(`Department: ${appointment.department}`, 10, 40);
//     doc.text(`Symptoms: ${appointment.symptoms || "N/A"}`, 10, 50);
//     doc.text(`Appointment Time: ${appointment.appointment_time}`, 10, 60);
//     doc.text(`Phone: ${appointment.phone_number}`, 10, 70);
//     doc.text(`Gender: ${appointment.gender}`, 10, 80);

//     // 2. Convert the PDF to Blob for upload
//     const pdfBlob = doc.output("blob");

//     // 3. Define the file path and upload to Supabase Storage
//     const filePath = `appointments/${appointment.id}_appointment.pdf`;
//     const { data, error } = await supabase.storage
//       .from("appointment pdf") // Replace with your bucket name
//       .upload(filePath, pdfBlob, {
//         contentType: "application/pdf",
//         upsert: true, // Overwrite if file exists
//       });

//     if (error) {
//       console.error("Error uploading PDF:", error.message);
//       toast.error("Failed to upload PDF.");
//     } else {
//       toast.success("PDF generated and uploaded successfully!");

//       // 4. Optionally, update the 'file_path' in the database for easy retrieval
//       await supabase
//         .from("doctor_bookings")
//         .update({ file_path: filePath })
//         .eq("id", appointment.id);
//     }
//   };

//   return (
//     <Button variant="contained" color="secondary" onClick={createAndUploadPDF}>
//       Generate PDF
//     </Button>
//   );
// };

// export default GeneratePDF;
