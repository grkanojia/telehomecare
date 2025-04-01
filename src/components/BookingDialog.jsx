import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: "8px", // rounded corners
    width: "400px", // Fixed width for the dialog
    height: "400px", //height for the dialog
  },
});

const BookingDialog = ({
  open,
  handleClose,
  handleChange,
  handleSubmit,
  loading,
  formData,
  error,
}) => {
  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide the following details to book an appointment.
        </DialogContentText>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          autoFocus
          margin="dense"
          label="Date"
          type="date"
          name="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.date}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Time"
          type="time"
          name="time"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.time}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          name="description"
          fullWidth
          multiline
          rows={2}
          value={formData.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Book"}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default BookingDialog;
