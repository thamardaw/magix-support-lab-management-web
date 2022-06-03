import { Box, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BackButton, DeleteDialog, LabResultPreview } from "../../components";
import { useReactToPrint } from "react-to-print";
import { useAxios } from "../../hooks";

const LabReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const reportRef = useRef();
  const api = useAxios({ autoSnackbar: true });
  const [data, setData] = useState({});
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handlePrint = useReactToPrint({
    pageStyle:
      "@media print { body { -webkit-print-color-adjust: exact; } @page { size: A4; margin: 200mm !important }}",
    content: () => reportRef.current,
    onAfterPrint: () => {
      setIsPrintMode(false);
      if (location.state?.goBack)
        navigate("/dashboard/lab_report/form", { state: { mode: "new" } });
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

  const deleteItem = async () => {
    const res = await api.delete(`/api/lab_reports/${parseInt(id)}`);
    if (res.status === 200) {
      setOpenDeleteDialog(false);
      navigate("dashboard/lab_report", {
        replace: true,
      });
    }
  };

  useEffect(() => {
    if (isPrintMode) {
      handlePrint();
    }
    // eslint-disable-next-line
  }, [isPrintMode]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
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
            onClick={() => setIsPrintMode(true)}
          >
            Print
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ marginRight: "5px" }}
            onClick={() => navigate(`/dashboard/lab_report/form/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ marginRight: "5px" }}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </Button>
        </Toolbar>
        <LabResultPreview
          ref={reportRef}
          isPreview={false}
          data={{ labReport: data, labResult: data.lab_results }}
          isPrintMode={isPrintMode}
        />
      </Box>
      <DeleteDialog
        isOpen={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        callback={() => {
          deleteItem();
        }}
      />
    </>
  );
};

export default LabReportDetails;
