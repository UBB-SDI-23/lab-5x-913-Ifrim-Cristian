import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { Brand } from "../../models/brand";
import { BrandService } from "../../services/BrandService";
import {
  Alert,
  AlertColor,
  Fab,
  FormControlLabel,
  Snackbar,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CigaretteService } from "../../services/CigaretteService";

function BrandSelect({
  handleChange,
}: {
  handleChange: (value: number | null) => void;
}) {
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    let ignore = false;
    const brandService = new BrandService();

    async function startFetching() {
      const json = await brandService.getBrandsByName(name);
      if (!ignore) {
        setBrands(json);
      }
    }

    startFetching();
  }, [name]);

  const getBrandNames = () => {
    const brandNames: string[] = [];
    brands.forEach((brand) => {
      brandNames.push(brand.name);
    });
    return brandNames;
  };

  return (
    <Autocomplete
      id="brand-select-demo"
      options={getBrandNames()}
      value={selectedBrand}
      onChange={(event: any, newValue: string | null) => {
        const selectBrand = brands.find((brand) => brand.name === newValue);
        setSelectedBrand(newValue);
        handleChange(selectBrand == null ? 0 : selectBrand.id);
      }}
      inputValue={name}
      onInputChange={(event, newInputValue) => {
        setName(newInputValue);
      }}
      autoHighlight
      getOptionLabel={(option) => option}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Choose a brand"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default function AddCigarette({
  refreshPage,
}: {
  refreshPage: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const [brandId, setBrandId] = React.useState<number>(0);
  const [model, setModel] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [nicotineQuantity, setNicotineQuantity] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [heated, setHeated] = React.useState<boolean>(false);

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
    const cigaretteService = new CigaretteService();
    const response = await cigaretteService.postCigarette(
      brandId,
      model,
      type,
      heated,
      nicotineQuantity,
      price
    );

    if (response.id != null) {
      setMessage("Cigarette added successfully");
      setSeverity("success");
      setOpenSnackbar(true);
    } else if (response.status === 400) {
      const msg = Object.values(response.errors).join(", ");
      
      setMessage(msg == null ? "Cigarette could not be added" : msg);
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
          {message}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Cigarette</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the forms to add a cigarette.
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <BrandSelect
            handleChange={(value: number | null) => {
              if (value) {
                setBrandId(value);
              }
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="select-model"
            label="Model"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setModel(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="select-type"
            label="Type"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setType(event.target.value);
            }}
          />

          <FormControlLabel
            control={
              <Switch
                onChange={(event) => {
                  setHeated(event.target.checked);
                }}
              />
            }
            label="Heated"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              id="select-nicotine-quantity"
              label="Nicotine Quantity"
              type="number"
              onChange={(event) => {
                setNicotineQuantity(Number(event.target.value));
              }}
            />
            <TextField
              id="select-price"
              label="Price"
              type="number"
              onChange={(event) => {
                setPrice(Number(event.target.value));
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
