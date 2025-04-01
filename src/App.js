import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import VideoLibrary from "./Pages/VideoLibrary";
import VideoPlayer from "./components/VideoPlayer";
import VideoConsultation from "./Pages/VideoConsultations";
import VerifyEmail from "./Pages/VerifyEmail";
import Dashboard from "./Pages/Dashboard";
import DoctorDashboard from "./Pages/DoctorDashboard";
import VideoCall from "./Pages/VideoCall";
import FAQ from "./Pages/FAQ";

// Import other pages and components

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/videos" element={<VideoLibrary />} />
        <Route path="/videos/:videoName" element={<VideoPlayer />} />
        <Route path="/video-call/:roomId" element={<VideoCall />} />
        <Route path="/consultations" element={<VideoConsultation />} />
        <Route path="/faq" element={<FAQ />} />;
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
