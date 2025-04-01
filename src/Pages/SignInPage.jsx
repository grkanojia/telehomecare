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
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  signIn,
  fetchUserAttributes,
  signOut,
  getCurrentUser,
} from "aws-amplify/auth"; // Your existing Amplify import
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update form data on change
  const handleChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // Handle user sign-in
  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        console.log("🟢 Signing out any existing session...");
        await signOut(); // Clear any existing session

        // Lowercase the email
        const lowerEmail = formData.email.toLowerCase();
        console.log("🟢 Attempting sign-in with email:", lowerEmail);

        await signIn({ username: lowerEmail, password: formData.password });
        console.log("✅ Sign-in successful!");

        // Fetch current user and attributes
        const user = await getCurrentUser();
        console.log("✅ Current User:", user);

        const attributes = await fetchUserAttributes(user);
        console.log("✅ Retrieved User Attributes:", attributes);

        // Retrieve the custom role
        const role = attributes["custom:role"] || attributes["role"];
        if (!role) {
          console.error("❌ Error: User role not found in attributes");
          setError(
            "Authentication error: Role not found. Please contact support."
          );
          return;
        }
        console.log("✅ User role detected:", role);

        // Store the role AND the lowercased email in localStorage
        localStorage.setItem("userRole", role);
        localStorage.setItem("userEmail", lowerEmail);

        // Redirect to dashboard
        window.location.href = "/dashboard";
      } catch (err) {
        console.error("❌ AWS Cognito Sign-in Error:", err);
        if (err.code === "UserNotFoundException") {
          setError("User does not exist. Please sign up first.");
        } else if (err.code === "NotAuthorizedException") {
          setError("Incorrect email or password.");
        } else if (err.code === "UserNotConfirmedException") {
          setError(
            "Account not confirmed. Please check your email for a verification link."
          );
        } else {
          setError(`Sign-in failed: ${err.message}`);
        }
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
          Sign In
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            autoFocus
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
