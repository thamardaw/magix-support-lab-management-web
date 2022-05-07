import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledBox = styled(Box)(({ theme }) => ({
  // "&::-webkit-scrollbar": {
  //   width: "4px",
  // },
  // "&::-webkit-scrollbar-track": {
  //   boxShadow: alpha(theme.palette.primary.light, 0.15),
  //   borderRadius: "10px",
  // },
  // "&::-webkit-scrollbar-thumb": {
  //   backgroundColor: alpha(theme.palette.primary.light, 0.25),
  // },
}));

const ParameterForm = ({ height }) => {
  return (
    <StyledBox sx={{ height: height, overflowY: "scroll" }}>
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
        <Typography variant="p">Result Type</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            select
            fullWidth
            name="result_type"
            size="small"
            margin="dense"
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="number">Number</MenuItem>
          </TextField>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="p">Result Default Text</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            name="result_default_text"
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
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "45%", textTransform: "none" }}
        >
          Add Range
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "10px 0px",
          height: "150px",
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
          padding: "10px 0px",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" fullWidth>
          Save
        </Button>
      </Box>
    </StyledBox>
  );
};

export default ParameterForm;
