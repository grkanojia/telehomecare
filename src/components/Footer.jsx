import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box sx={{ bgcolor: "primary.main", color: "#fff", py: 2, mt: "auto" }}>
    <Typography variant="body1" align="center">
      &copy; {new Date().getFullYear()} TeleHomeCare. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;
