import { Box, Divider, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  BackButton,
  LabReportSubForm,
  LabResultForm,
  LabResultPreview,
  TabPanel,
} from "../../components";
import { useAxios } from "../../hooks";

const LabReportForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useAxios({ autoSnackbar: true });
  const location = useLocation();
  const [tab, setTab] = useState(0);
  const [data, setData] = useState({});

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
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

  useEffect(() => {
    if (id) setTab(1);
  }, [id]);

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
        <Typography variant="h5">
          {location.state?.mode === "new" ? "New" : "Edit"}
        </Typography>
      </Toolbar>
      <Divider />
      <Box sx={{ flexDirection: "column" }}>
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
        <TabPanel value={tab} index={0} style={{ padding: "10px" }}>
          <LabReportSubForm id={id} />
        </TabPanel>
        <TabPanel value={tab} index={1} style={{ padding: "10px" }}>
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
              <LabResultForm id={id} refreshData={getData} />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "65%" },
                padding: "0px 10px",
              }}
            >
              <LabResultPreview
                height="375px"
                data={{ labReport: data, labResult: data.lab_results }}
                enableDelete={true}
                refreshData={getData}
              />
            </Box>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default LabReportForm;
