import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, AlertColor, Fab, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BrandService } from "../../services/BrandService";

export default function AddBrand({ refreshPage }: { refreshPage: () => void }) {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState("");
  const [year, setYear] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [logo, setLogo] = React.useState("");

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
    const cigaretteService = new BrandService();
    const response = await cigaretteService.postBrand(
      name,
      description,
      country,
      year,
      logo
    );

    if (response.id != null) {
      setMessage("Brand added successfully");
      setSeverity("success");
      setOpenSnackbar(true);
    } else if (response.status === 400) {
      const msg = Object.values(response.errors).join(", ");

      setMessage(msg == null ? "Brand could not be added" : msg);
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
        <DialogTitle>Add Brand</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the forms to add a brand.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="select-name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="select-country"
            label="Country"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="select-description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="select-logo"
            label="Logo"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setLogo(event.target.value);
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              id="select-year"
              label="Year"
              type="number"
              onChange={(event) => {
                setYear(Number(event.target.value));
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
