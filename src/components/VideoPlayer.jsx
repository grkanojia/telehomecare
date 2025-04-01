// src/Components/VideoPlayer.jsx
import React from "react";
import ReactPlayer from "react-player";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const VideoPlayer = ({ videoUrl, onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300, // make sure it overlays other content
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "#fff",
        }}
        onClick={onClose}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <ReactPlayer url={videoUrl} controls={true} width="80%" height="80%" />
    </Box>
  );
};

export default VideoPlayer;
