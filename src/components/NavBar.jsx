import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getCurrentUser, signOut } from "aws-amplify/auth"; // ✅ Import AWS Cognito functions

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check if the user is logged in when the Navbar loads
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser(); // ✅ Check if a user is logged in
        console.log("✅ User is logged in:", user);
        setIsAuthenticated(true);
      } catch {
        console.log("🔴 No user logged in");
        setIsAuthenticated(false);
      }
    };
    checkUser();
  }, []);

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      await signOut(); // ✅ Log out from AWS Cognito
      setIsAuthenticated(false);
      localStorage.removeItem("userRole"); // ✅ Clear role on logout
      navigate("/signin"); // Redirect to Sign In after logout
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          TeleHomeCare
        </Typography>

        {/* ✅ Show these buttons if the user is NOT logged in */}
        {!isAuthenticated ? (
          <>
            <Button color="inherit" component={RouterLink} to="/signin">
              Sign In
            </Button>
            <Button color="inherit" component={RouterLink} to="/signup">
              Sign Up
            </Button>
          </>
        ) : (
          <>
            {/* ✅ Show these buttons if the user is logged in */}
            <Button color="inherit" component={RouterLink} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
