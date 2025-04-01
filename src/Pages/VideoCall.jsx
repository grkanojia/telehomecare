import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";

const VideoCall = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomId,
        width: "100%",
        height: "90vh",
        parentNode: document.getElementById("jitsi-container"),
      };

      try {
        new window.JitsiMeetExternalAPI(domain, options);
        setLoading(false);
      } catch (err) {
        console.error("Error loading Jitsi API:", err);
        setError("Failed to load video call. Please try again.");
        setLoading(false);
      }
    } else {
      setError("Jitsi Meet API not found. Please refresh the page.");
      setLoading(false);
    }
  }, [roomId]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Video Consultation
        </Typography>
        <Typography variant="body1" color="textSecondary">
          You are now in a secure video call room.
        </Typography>
      </Box>

      {loading && (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}
      {error && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}

      <Box
        id="jitsi-container"
        sx={{
          width: "100%",
          height: "90vh",
          backgroundColor: "#000",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      />

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/dashboard")}
        >
          End Call & Return to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default VideoCall;
