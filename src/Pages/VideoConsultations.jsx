import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import BookingDialog from "../components/BookingDialog";
import heroImage from "../assets/images/hero-image-videoconsultation.jpg";

const VideoConsultations = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    description: "",
  });
  const [error, setError] = useState("");

  // Hardcoded doctor email (you can change this if needed)
  const doctorEmail = "grkanojia22@gmail.com";
  const patientEmail = localStorage.getItem("userEmail"); // Get patient email from localStorage

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(), // Ensure no extra spaces
    }));
  };

  // Open booking dialog
  const handleOpen = () => setOpen(true);

  // Close booking dialog
  const handleClose = () => setOpen(false);

  // Submit appointment booking request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.date || !formData.time || !formData.description) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (!patientEmail) {
      setError("User email not found. Please sign in again.");
      setLoading(false);
      return;
    }

    try {
      const apiEndpoint =
        "https://nhs9753pd8.execute-api.us-east-1.amazonaws.com/dev1/consultations";

      const requestBody = JSON.stringify({
        ...formData,
        doctorEmail,
        patientEmail,
      });

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Booking failed. Please try again.");
      }

      alert("✅ Consultation booked successfully!");
      setLoading(false);
      handleClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          py: 10,
          textAlign: "center",
        }}
      >
        <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", py: 10 }}>
          <Container maxWidth="md">
            <Typography variant="h2" gutterBottom>
              Video Consultations
            </Typography>
            <Typography variant="h5">
              Book appointments with our healthcare professionals for video
              consultations.
            </Typography>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Doctors
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Dr. ABC</Typography>
                <Typography variant="body2" color="textSecondary">
                  General Practitioner
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={handleOpen}
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Appointment"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Booking Dialog Component */}
        <BookingDialog
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          formData={formData}
          error={error}
        />
      </Container>
    </>
  );
};

export default VideoConsultations;
