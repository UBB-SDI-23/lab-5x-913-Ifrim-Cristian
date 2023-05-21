import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Alert, AlertColor, Fab, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ClientService } from "../../services/ClientService";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AddClient({
  refreshPage,
}: {
  refreshPage: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [secondName, setSecondName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);
  const [password, setPassword] = React.useState("");

  const [message, setMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [severity, setSeverity] = React.useState<AlertColor>("success");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleAdd = async () => {
    const clientService = new ClientService();
    const response = await clientService.postClient(
      firstName,
      secondName,
      email,
      dateOfBirth,
      password
    );

    if (response.id != null) {
      setMessage("Cigarette added successfully");
      setSeverity("success");
      setOpenSnackbar(true);
    } else if (response.status === 400) {
      const msg = Object.values(response.errors).join(", ");
      
      setMessage(msg == null ? "Client could not be added" : msg);
      setSeverity("error");
      setOpenSnackbar(true);
    } else {
      setMessage(response.statusText + " " + response.status);
      setSeverity("error");
      setOpenSnackbar(true);
    }

    refreshPage();
    setOpen(false);
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          Status: {message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the forms to add a clients.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="select-firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="select-secondName"
            label="Second Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setSecondName(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="select-email"
            label="E-mail"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birthday"
              value={dateOfBirth}
              sx={{ width: "100%" }}
              onChange={(newValue) => setDateOfBirth(newValue)}
            />
          </LocalizationProvider>

          <TextField
            autoFocus
            margin="dense"
            id="select-password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
