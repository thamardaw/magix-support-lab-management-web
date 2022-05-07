import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const NewLabReportDialog = ({ isOpen, handleClose, callback }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: "center" }}>Create New Report</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Patient"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          label="Doctor Name"
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          label="Sample ID"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          label="Sample Type"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          disableElevation
          variant="outlined"
          sx={{ width: "40%" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          disableElevation
          variant="contained"
          sx={{ width: "40%" }}
          onClick={callback}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewLabReportDialog;