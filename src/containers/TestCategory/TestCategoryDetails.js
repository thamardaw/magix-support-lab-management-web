import { Box, Divider, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackButton, DetailsRow } from "../../components";

const TestCategoryDetails = () => {
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
        <DetailsRow name="ID" value="1" />
        <DetailsRow name="Name" value="Aung Aung" />
      </Box>
    </Box>
  );
};

export default TestCategoryDetails;
