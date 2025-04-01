// src/Pages/VideoLibrary.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import videos from "../data/videos"; // Import your video data
import VideoPlayer from "../components/VideoPlayer"; // Import the VideoPlayer component

const VideoLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentVideo, setCurrentVideo] = useState(null);

  // Filter videos based on search term (case insensitive)
  const filteredVideos = videos.filter((video) => {
    const term = searchTerm.toLowerCase();
    return (
      video.title.toLowerCase().includes(term) ||
      video.description.toLowerCase().includes(term)
    );
  });

  const handlePlayVideo = (videoUrl) => {
    // Open video in a modal by setting currentVideo URL
    setCurrentVideo(videoUrl);
  };

  const handleClosePlayer = () => {
    setCurrentVideo(null);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Caregiving Video Library
      </Typography>

      {/* Search Bar */}
      <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search Videos"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500 }}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <Grid item key={video.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={video.thumbnail}
                  alt={video.title}
                  sx={{ height: 180 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handlePlayVideo(video.videoUrl)}
                  >
                    Play Video
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No videos found.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          More videos coming soon!
        </Typography>
      </Box>

      {/* Conditionally render the VideoPlayer modal if a video is selected */}
      {currentVideo && (
        <VideoPlayer videoUrl={currentVideo} onClose={handleClosePlayer} />
      )}
    </Container>
  );
};

export default VideoLibrary;
