import { Box, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackButton, LabResultPreview } from "../../components";
import { labReportData, labResultData } from "../../utils/mock_data";

const LabReportDetails = () => {
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
      <LabResultPreview
        isPreview={false}
        data={{ labReport: labReportData, labResult: labResultData }}
      />
    </Box>
  );
};

export default LabReportDetails;
