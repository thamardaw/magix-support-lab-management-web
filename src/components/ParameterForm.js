import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ParameterForm = ({ mode }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Parameter Name</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            name="parameter_name"
            size="small"
            margin="dense"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Unit</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField fullWidth name="unit" size="small" margin="dense" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Range</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            name="lower_limit"
            placeholder="Lower Limit"
            size="small"
            margin="dense"
            sx={{ width: "45%" }}
          />
          <TextField
            name="upper_limit"
            placeholder="Upper Limit"
            size="small"
            margin="dense"
            sx={{ width: "45%" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Remark</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            name="lower_limit"
            placeholder="Low"
            size="small"
            margin="dense"
            sx={{ width: "30%" }}
          />
          <TextField
            name="upper_limit"
            placeholder="Normal"
            size="small"
            margin="dense"
            sx={{ width: "30%" }}
          />
          <TextField
            name="upper_limit"
            placeholder="High"
            size="small"
            margin="dense"
            sx={{ width: "30%" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "10px 0px",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "45%", textTransform: "none" }}
        >
          Add Range
        </Button>
        <Button
          variant="contained"
          sx={{ width: "45%", textTransform: "none" }}
        >
          Add Parameter
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "10px 0px",
          height: "200px",
          overflowY: "scroll",
          border: "1px solid #ccc",
        }}
      >
        <List>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary="0-100"
              secondary="Low Remark, Normal Remark, High Remark"
            />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary="0-100"
              secondary="Low Remark, Normal Remark, High Remark"
            />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary="0-100"
              secondary="Low Remark, Normal Remark, High Remark"
            />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary="0-100"
              secondary="Low Remark, Normal Remark, High Remark"
            />
          </ListItem>
        </List>
      </Box>
      <Box
        sx={{
          display: mode === "new" ? "flex" : "none",
          padding: "10px 0px",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" fullWidth>
          Save
        </Button>
      </Box>
    </>
  );
};

export default ParameterForm;
