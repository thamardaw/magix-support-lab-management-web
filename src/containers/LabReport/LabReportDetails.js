import { Box, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton, LabResultPreview } from "../../components";
import { useReactToPrint } from "react-to-print";
import { useAxios } from "../../hooks";

const LabReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reportRef = useRef();
  const api = useAxios({ autoSnackbar: true });
  const [data, setData] = useState({});
  // const [isPrintMode, setIsPrintMode] = useState(false);

  const handlePrint = useReactToPrint({
    pageStyle:
      "@media print { body { -webkit-print-color-adjust: exact; } @page { size: A4; margin: 200mm !important }}",
    content: () => reportRef.current,
    onAfterPrint: () => {
      // setIsPrintMode(false);
    },
    onBeforeGetContent: () => {
      // setIsPrintMode(true);
    },
  });

  const getData = async () => {
    if (id) {
      const res = await api.get(`/api/lab_reports/${id}`);
      if (res.status === 200) {
        setData(res.data);
      }
    }
    return;
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

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
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Details
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ marginRight: "5px" }}
          onClick={handlePrint}
        >
          Print
        </Button>
      </Toolbar>
      <LabResultPreview
        ref={reportRef}
        isPreview={false}
        data={{ labReport: data, labResult: data.lab_results }}
      />
    </Box>
  );
};

export default LabReportDetails;
