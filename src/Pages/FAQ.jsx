import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "To book an appointment, go to the 'Book Consultation' section, select a doctor, choose a date and time, and confirm your booking.",
    },
    {
      question: "How do I start a video consultation?",
      answer:
        "Click on 'Start Video Call' from your dashboard under scheduled consultations. This will open a Jitsi video call link.",
    },
    {
      question: "Why can't I see my scheduled appointments?",
      answer:
        "Ensure you're logged in with the correct email. If issues persist, refresh the page or contact support.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we follow industry-standard security protocols to protect your data, including encrypted communication and secure storage.",
    },
    {
      question: "Can I reschedule or cancel an appointment?",
      answer:
        "Currently, rescheduling or canceling is not available through the dashboard. Please contact support for modifications.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach out via email at support@telehomecare.com or call our helpline available on the contact page.",
    },
  ];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        FAQs & Self-Help Guides
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQ;
