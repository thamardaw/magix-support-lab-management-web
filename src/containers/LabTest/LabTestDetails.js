import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackButton, DetailsRow, ParameterFormTable } from "../../components";

const LabTestDetails = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          paddingLeft: "12px",
        }}
        variant="dense"
        disableGutters={true}
      >
        <BackButton backFunction={() => navigate(-1)} />
        <Typography variant="h5">Details</Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ flexDirection: "column", padding: "10px" }}>
        <DetailsRow name="Name" value="Test_Name" />
        <DetailsRow name="Category" value="Test_Category" />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
            }}
          >
            <Typography
              variant="p"
              sx={{ display: "block", fontWeight: 500, fontSize: "14px" }}
            >
              Parameter Name
            </Typography>

            <Typography
              variant="p"
              sx={{ display: "block", padding: "10px 0px", fontSize: "14px" }}
            >
              Parameter_Name
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "block", fontWeight: 500, fontSize: "14px" }}
            >
              Unit
            </Typography>
            <Typography
              variant="p"
              sx={{ display: "block", padding: "10px 0px", fontSize: "14px" }}
            >
              unit
            </Typography>
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
                <ListItem>
                  <ListItemText
                    primary="0-100"
                    secondary="Low Remark, Normal Remark, High Remark"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="0-100"
                    secondary="Low Remark, Normal Remark, High Remark"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="0-100"
                    secondary="Low Remark, Normal Remark, High Remark"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="0-100"
                    secondary="Low Remark, Normal Remark, High Remark"
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              padding: "0px 10px",
            }}
          >
            <ParameterFormTable mode="new" newHeight={325} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LabTestDetails;
