import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

/* NOT IN USE */
const NewTestDialog = ({ isOpen, handleClose, callback }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: "center" }}>Create New Test</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
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

export default NewTestDialog;
