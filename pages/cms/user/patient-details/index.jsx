import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import { supabase } from "@/lib/supabaseClient";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { jsPDF } from "jspdf"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDownload, FaFilePdf } from 'react-icons/fa'; // Import icons from react-icons

const PatientDetails = () => {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();
  const { id } = router.query; 

  useEffect(() => {
    if (id) {
      fetchAppointments();
    }
  }, [id]);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("doctor_bookings")
      .select("*")
      .eq("doctor_id", id);

    if (error) {
      console.error("Error fetching appointments:", error.message);
      toast.error("Failed to load appointments.");
    } else {
      setAppointments(data);
    }
  };

  const generateAndUploadPDF = async (appointment) => {
    try {
      const doc = new jsPDF();
      doc.text("Appointment Details", 10, 10);
      doc.text(`Doctor: ${appointment.doctor_name}`, 10, 20);
      doc.text(`Patient: ${appointment.patient_name}`, 10, 30);
      doc.text(`Department: ${appointment.department}`, 10, 40);
      doc.text(`Symptoms: ${appointment.symptoms || "N/A"}`, 10, 50);
      doc.text(`Appointment Time: ${appointment.appointment_time}`, 10, 60);
      doc.text(`Phone: ${appointment.phone_number}`, 10, 70);
      doc.text(`Gender: ${appointment.gender}`, 10, 80);

      const pdfBlob = doc.output("blob");

      const filePath = `appointments/${appointment.id}_appointment.pdf`;
      const { error } = await supabase.storage
        .from("appointment pdf")
        .upload(filePath, pdfBlob, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      await supabase
        .from("doctor_bookings")
        .update({ file_path: filePath })
        .eq("id", appointment.id);

      toast.success("PDF generated and uploaded successfully!");
      fetchAppointments(); // Refresh the list to show download button
    } catch (err) {
      console.error("Error generating/uploading PDF:", err.message);
      toast.error("Failed to generate or upload PDF.");
    }
  };

  const downloadFile = async (filePath) => {
    const { data, error } = await supabase.storage
      .from("appointment pdf")
      .download(filePath);

    if (error) {
      console.error("Error downloading file:", error.message);
      toast.error("Failed to download file.");
    } else {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = filePath.split("/").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("File downloaded successfully!");
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        color="primary"
        fontWeight="bold"
      >
        Appointment Details
      </Typography>

      {appointments.length === 0 ? (
        <Typography variant="h6" textAlign="center" color="textSecondary">
          No appointments found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {appointments.map((appointment) => (
            <Grid item xs={12} key={appointment.id}>
              <Card sx={{ boxShadow: 3, backgroundColor: "#f9f9f9" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    Doctor: {appointment.doctor_name}
                  </Typography>
                  <Typography variant="body1">
                    Patient: {appointment.patient_name}
                  </Typography>
                  <Typography variant="body2">
                    Department: {appointment.department}
                  </Typography>
                  <Typography variant="body2">
                    Symptoms: {appointment.symptoms || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    Appointment Time: {appointment.appointment_time}
                  </Typography>
                  <Typography variant="body2">
                    Phone: {appointment.phone_number}
                  </Typography>
                  <Typography variant="body2">
                    Gender: {appointment.gender}
                  </Typography>

                  {/* Box to align buttons to the right */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                    {/* Generate PDF Button with icon only */}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => generateAndUploadPDF(appointment)}
                      startIcon={<FaFilePdf />}  // Add the PDF icon
                      sx={{ minWidth: 40, padding: 1, marginLeft: 1 }}  // Adjust size and margin
                    />

                    {/* Download PDF Button with icon only */}
                    {appointment.file_path && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => downloadFile(appointment.file_path)}
                        startIcon={<FaDownload />}  // Add the Download icon
                        sx={{ minWidth: 40, padding: 1, marginLeft: 1 }}  // Adjust size and margin
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <ToastContainer />
    </Container>
  );
};

export default PatientDetails;
