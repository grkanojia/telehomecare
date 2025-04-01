import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const ConsultationBookingPage = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Basic validation
    if (!formData.date || !formData.time || !formData.description) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      // Replace the URL below with your actual API Gateway endpoint
      const apiEndpoint =
        "https://vqof15c9xc.execute-api.us-east-1.amazonaws.com/dev";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.error || "Booking failed. Please try again.");
      }

      setSuccess("Your consultation has been booked successfully!");
      setFormData({ date: "", time: "", description: "" });
    } catch (err) {
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Book a Virtual Consultation
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Date"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={handleChange}
        />
        <TextField
          label="Time"
          name="time"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={formData.time}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          type="text"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Consultation"}
        </Button>
      </Box>
    </Container>
  );
};

export default ConsultationBookingPage;
