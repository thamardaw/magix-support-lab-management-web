import { LoadingButton } from "@mui/lab";
import { Box, Divider, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  BackButton,
  LabReportSubForm,
  LabResultForm,
  LabResultPreview,
  TabPanel,
} from "../../components";
import { useAxios } from "../../hooks";
import labReportSubFormAtom from "../../recoil/labReportSubForm";
import labResultFormAtom from "../../recoil/labResultForm";

const LabReportForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const location = useLocation();
  const [tab, setTab] = useState(0);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const labResultDetails = useRecoilValue(labResultFormAtom);
  const labReportSubDetails = useRecoilValue(labReportSubFormAtom);
  const resetLabResultFrom = useResetRecoilState(labResultFormAtom);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const onSave = () => {
    if (tab === 0) {
      if (id) updateHeader();
      else createNewHeader();
    } else {
      if (labResultDetails?.id) updateLabResult();
      else createNewLabResult();
    }
  };

  const getData = async () => {
    if (id) {
      const res = await api.get(`/api/lab_reports/${id}`);
      if (res.status === 200) {
        setData(res.data);
      }
    }
    return;
  };

  const createNewHeader = async () => {
    setIsLoading(true);
    if (labReportSubDetails?.currentPatient) {
      const res = await api.post("/api/lab_reports/", {
        ...labReportSubDetails,
        patient_id: labReportSubDetails?.currentPatient?.id,
      });
      if (res.status === 200) {
        navigate(`${res.data.id}`, { replace: true, state: { mode: "new" } });
      }
    }
    setIsLoading(false);
    return;
  };

  const updateHeader = async () => {
    setIsLoading(true);
    if (labReportSubDetails?.currentPatient) {
      await api.put(`/api/lab_reports/${id}/`, {
        ...labReportSubDetails,
        patient_id: labReportSubDetails?.currentPatient?.id,
      });
    }
    setIsLoading(false);
    return;
  };

  const createNewLabResult = async () => {
    setIsLoading(true);
    const res = await api.post(`/api/lab_reports/result/${id}`, {
      ...labResultDetails,
      parameter_name: labResultDetails?.currentParameter?.name,
      parameter_id: labResultDetails?.currentParameter?.id,
      test_name: labResultDetails?.currentParameter?.lab_test_?.name,
      unit: labResultDetails?.currentParameter?.unit,
      lower_limit: labResultDetails?.lower_limit || null,
      upper_limit: labResultDetails?.upper_limit || null,
    });
    if (res.status === 200) {
      getData();
      resetLabResultFrom();
    }
    setIsLoading(false);
  };

  const updateLabResult = async () => {
    setIsLoading(true);
    const res = await api.put(
      `/api/lab_reports/result/${labResultDetails?.id}`,
      {
        ...labResultDetails,
        parameter_name: labResultDetails?.currentParameter?.name,
        parameter_id: labResultDetails?.currentParameter?.id,
        test_name: labResultDetails?.currentParameter?.lab_test_?.name,
        unit: labResultDetails?.currentParameter?.unit,
        lower_limit: labResultDetails?.lower_limit || null,
        upper_limit: labResultDetails?.upper_limit || null,
      }
    );
    if (res.status === 200) {
      getData();
      resetLabResultFrom();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) setTab(1);
  }, [id]);

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
        <BackButton
          backFunction={() => {
            if (location.state?.mode === "new")
              navigate("/dashboard/lab_report");
            else navigate(-1);
          }}
        />
        <Typography variant="h5">
          {location.state?.mode === "new" ? "New" : "Edit"}
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ flexDirection: "column" }}>
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
            <Tabs
              value={tab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Header" sx={{ textTransform: "none" }} />
              <Tab
                label="Lab Result"
                sx={{ textTransform: "none" }}
                disabled={id === undefined}
              />
            </Tabs>
            <TabPanel
              value={tab}
              index={0}
              style={{ padding: "10px", height: "390px", overflowY: "auto" }}
            >
              <LabReportSubForm id={id} />
            </TabPanel>
            <TabPanel
              value={tab}
              index={1}
              style={{ padding: "10px", height: "390px", overflowY: "auto" }}
            >
              <LabResultForm refreshData={getData} />
            </TabPanel>
            <Box sx={{ padding: "5px 10px" }}>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                fullWidth
                onClick={onSave}
              >
                Save
              </LoadingButton>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
            }}
          >
            <LabResultPreview
              height="440px"
              data={{ labReport: data, labResult: data.lab_results }}
              enableDelete={true}
              refreshData={getData}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LabReportForm;
