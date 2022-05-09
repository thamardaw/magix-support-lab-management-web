import { Box, Divider, Toolbar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton, LabResultForm, LabResultPreview } from "../../components";
import { labReportData, labResultData } from "../../utils/mock_data";

const LabReportForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        <Typography variant="h5">
          {location.state?.mode === "new" ? "New" : "Edit"}
        </Typography>
      </Toolbar>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "35%" },
          }}
        >
          <LabResultForm />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "65%" },
            padding: "0px 10px",
          }}
        >
          <LabResultPreview
            height="365px"
            data={{ labReport: labReportData, labResult: labResultData }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LabReportForm;
