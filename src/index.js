import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Assuming you have an App component

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

// Find the root element in your HTML
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render your React app
root.render(<App />);
