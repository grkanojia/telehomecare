import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Doctor Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome, Doctor! Here you can view your scheduled consultations,
          manage patient appointments, and access relevant resources.
        </Typography>

        {/* Example cards for upcoming appointments */}
        <Grid container spacing={4} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h5">Upcoming Appointment</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Patient: John Doe <br />
                  Date: 2025-03-05 <br />
                  Time: 2:00 PM
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/consultations")}
                >
                  Manage Appointment
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more cards as needed */}
        </Grid>
      </Box>
    </Container>
  );
};

export default DoctorDashboard;
