import React, { useState, useCallback } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signUp } from "aws-amplify/auth"; // Import signUp from Amplify
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Validate form before sign-up
  const validateForm = () => {
    const { email, password, confirmPassword, role } = formData;
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError(
        "Password must include at least one uppercase letter and one number."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!role) {
      setError("Please select a role.");
      return false;
    }
    return true;
  };

  // Handle user sign-up
  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const { email, password, role } = formData;

      try {
        // Sign up new user with the custom attribute "custom:role"
        const result = await signUp({
          username: email,
          password,
          attributes: { email, "custom:role": role },
        });
        console.log("Sign-up successful:", result);
        // Redirect to email verification page
        navigate(`/verify-email?email=${encodeURIComponent(email)}`);
      } catch (err) {
        console.error("Sign-up error:", err);
        setError(err.message || "Sign-up failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData, navigate]
  );

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
          Sign Up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                required
                fullWidth
                name="role"
                value={formData.role}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="caregiver">Caregiver</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
