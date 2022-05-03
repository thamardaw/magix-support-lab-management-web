import { Box, Divider, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackButton, DetailsRow } from "../../components";

const PatientDetails = () => {
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
        <DetailsRow name="Age" value="18" />
        <DetailsRow name="Contact Details" value="09123456789" />
        <DetailsRow name="Gender" value="male" />
        <DetailsRow name="Date Of Birth" value="2002-2-2" />
        <DetailsRow name="Address" value="Kamaryut" />
      </Box>
    </Box>
  );
};

export default PatientDetails;
