import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/hero-image.jpg";
import videoLibraryImage from "../assets/images/video-library.jpg";
import virtualConsultationImage from "../assets/images/virtual-consultation.jpg";
import securePlatformImage from "../assets/images/secure-platform.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("userEmail"); // Check if the user is signed in

  const handleNavigation = (path) => {
    if (path === "/videos" || path === "/consultations") {
      if (!isLoggedIn) {
        alert("You need to be signed in to access this feature.");
        navigate("/signin");
        return;
      }
    }
    navigate(path);
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
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to TeleHomeCare
            </Typography>
            <Typography variant="h5" gutterBottom>
              Empowering caregivers and improving healthcare access in rural
              Saskatchewan.
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 2 }}
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
              <Button variant="outlined" color="inherit">
                Learn More
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Our Features
        </Typography>
        <Grid container spacing={4} mt={4}>
          {/* Feature Cards */}
          {[
            {
              image: videoLibraryImage,
              title: "Caregiving Video Library",
              description:
                "Access a curated library of caregiving videos for specific diseases",
              path: "/videos",
            },
            {
              image: virtualConsultationImage,
              title: "Video Consultations",
              description:
                "Book appointments with healthcare professionals directly through our platform.",
              path: "/consultations",
            },
            {
              image: securePlatformImage,
              title: "FAQs & Self-Help Guides",
              description:
                "A section with common questions and step-by-step guides to help users troubleshoot basic issues.",
              path: "/faq",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                onClick={() => handleNavigation(feature.path)}
                sx={{ cursor: "pointer", "&:hover": { boxShadow: 6 } }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" gutterBottom>
            Sign up now to access caregiving resources and connect with
            healthcare professionals.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/signup")}
          >
            Sign Up Now
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
