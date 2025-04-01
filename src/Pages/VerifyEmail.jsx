import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { confirmSignUp } from "aws-amplify/auth"; // ✅ Correct AWS Cognito import
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL query params
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/signup"); // Redirect if no email is found
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await confirmSignUp({ username: email, confirmationCode: code }); // ✅ Confirm sign-up in Cognito
      navigate("/signin"); // Redirect to sign-in page after successful verification
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify Your Email
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleVerify} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            label="Verification Code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
