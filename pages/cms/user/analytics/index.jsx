import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, CartesianGrid, Legend } from "recharts";
import { supabase } from "@/lib/supabaseClient";
import { Box, Typography, Grid } from "@mui/material";
import { format } from "date-fns"; // For date formatting

const DoctorBookingChart = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [dateData, setDateData] = useState([]);

  useEffect(() => {
    fetchDoctorBookingData();
    fetchDateBookingData();
  }, []);

  // Fetch data for the first chart: Number of patients per doctor
  const fetchDoctorBookingData = async () => {
    const { data: bookings, error } = await supabase
      .from("doctor_bookings")
      .select("doctor_name");

    if (error) {
      console.error("Error fetching doctor bookings:", error.message);
      return;
    }

    const bookingCounts = bookings.reduce((acc, { doctor_name }) => {
      acc[doctor_name] = (acc[doctor_name] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(bookingCounts).map((doctor) => ({
      name: doctor,
      appointments: bookingCounts[doctor],
    }));

    setDoctorData(chartData);
  };

  // Fetch data for the second chart: Number of bookings based on date
  const fetchDateBookingData = async () => {
    const { data: bookings, error } = await supabase
      .from("doctor_bookings")
      .select("created_at"); // Use created_at for filtering by date

    if (error) {
      console.error("Error fetching bookings:", error.message);
      return;
    }

    const bookingCounts = bookings.reduce((acc, { created_at }) => {
      const date = format(new Date(created_at), "yyyy-MM-dd"); // Format date as 'YYYY-MM-DD'
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(bookingCounts).map((date) => ({
      date,
      appointments: bookingCounts[date],
    }));

    setDateData(chartData);
  };

  return (
    <Box sx={{ backgroundColor: "#fff", p: 3, borderRadius: 2 }}>
      <Typography variant="h5" textAlign="center" color="primary" fontWeight="bold" sx={{ mb: 4 }}>
        Doctor Bookings Overview
      </Typography>

      {/* Container for side-by-side layout */}
      <Grid container spacing={3}>
        {/* First Chart: Total Appointments per Doctor */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="secondary" mb={2}>
            <b>Total Appointments per Doctor</b>
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={doctorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="url(#doctorGradient)" animationDuration={1500}>
                <LabelList dataKey="appointments" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        {/* Second Chart: Total Appointments by Date */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color="secondary" mb={2}>
            <b>Total Patients by Date</b>
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="url(#dateGradient)" animationDuration={1500}>
                <LabelList dataKey="appointments" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      {/* Gradient definitions for both charts */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="doctorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1976d2" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#63a4ff" stopOpacity={0.8} />
          </linearGradient>
          <linearGradient id="dateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4caf50" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#81c784" stopOpacity={0.8} />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
};

export default DoctorBookingChart;
