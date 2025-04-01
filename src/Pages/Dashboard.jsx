import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  "https://ikdsg0taw4.execute-api.us-east-1.amazonaws.com/dev";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "";
    const storedEmail = localStorage.getItem("userEmail") || "";

    setRole(storedRole);
    setUserEmail(storedEmail);

    if (!storedEmail) {
      setError("❌ User email not found. Please sign in again.");
      return;
    }

    // Fetch appointments for both doctor or patient/caregiver
    fetchAppointments(storedEmail);
  }, []);

  // Fetch appointments from the backend, passing userEmail in the request body
  const fetchAppointments = async (email) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/getAppointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch appointments (Status: ${response.status})`
        );
      }

      const data = await response.json();
      console.log("✅ Retrieved Appointments:", data);

      // Safely set appointments to empty array if undefined
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Start a video call for the selected appointment
  // This navigates to /video-call/:appointmentId, where your Jitsi or other video call logic runs
  const startVideoCall = (appointment) => {
    navigate(`/video-call/${appointment.appointmentId}`);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to TeleHomeCare Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your role: {role}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <>
          {/* Doctor Dashboard */}
          {role === "doctor" && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Scheduled Consultations
              </Typography>
              {appointments.length > 0 ? (
                <Grid container spacing={2}>
                  {appointments.map((appointment) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={appointment.appointmentId}
                    >
                      <Card sx={{ p: 2 }}>
                        <CardContent>
                          <Typography variant="h6">
                            Patient: {appointment.patientEmail}
                          </Typography>
                          <Typography variant="body2">
                            Date: {appointment.date}
                            <br />
                            Time: {appointment.time}
                            <br />
                            Description: {appointment.description}
                            <br />
                            Booked At: {appointment.bookedAt}
                          </Typography>
                        </CardContent>
                        <Button
                          variant="contained"
                          sx={{ mt: 2 }}
                          onClick={() => navigate("/doctor-consultations")}
                        >
                          View Details
                        </Button>
                        {/* Video Call Button */}
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2, ml: 2 }}
                          onClick={() => startVideoCall(appointment)}
                        >
                          Start Video Call
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1">
                  No scheduled consultations.
                </Typography>
              )}
            </Box>
          )}

          {/* Patient & Caregiver Dashboard */}
          {(role === "patient" || role === "caregiver") && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Your Appointments
              </Typography>
              {appointments.length > 0 ? (
                <Grid container spacing={2}>
                  {appointments.map((appointment) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={appointment.appointmentId}
                    >
                      <Card sx={{ p: 2 }}>
                        <CardContent>
                          <Typography variant="h6">
                            Doctor: {appointment.doctorEmail}
                          </Typography>
                          <Typography variant="body2">
                            Date: {appointment.date}
                            <br />
                            Time: {appointment.time}
                            <br />
                            Description: {appointment.description}
                            <br />
                            Booked At: {appointment.bookedAt}
                          </Typography>
                        </CardContent>
                        <Button
                          variant="contained"
                          sx={{ mt: 2 }}
                          onClick={() => navigate("/consultations")}
                        >
                          View Details
                        </Button>
                        {/* Video Call Button */}
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2, ml: 2 }}
                          onClick={() => startVideoCall(appointment)}
                        >
                          Start Video Call
                        </Button>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1">
                  No appointments scheduled.
                </Typography>
              )}
            </Box>
          )}

          {/* Additional Features for patient/caregiver */}
          {(role === "patient" || role === "caregiver") && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Features
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/videos")}
                >
                  Video Library
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/consultations")}
                >
                  Book Consultation
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}

      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/profile")}
        >
          Manage Profile
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
