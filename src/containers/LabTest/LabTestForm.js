import { Box, Divider, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  BackButton,
  LabTestSubForm,
  ParameterForm,
  ParameterFormTable,
  TabPanel,
} from "../../components";
import { useAxios } from "../../hooks";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LabTestForm = () => {
  const { id } = useParams();
  const api = useAxios({ autoSnackbar: true });
  const location = useLocation();
  const navigate = useNavigate();
  // const [expanded, setExpanded] = useState("lab_test");
  const [tab, setTab] = useState(0);
  const [parameters, setParameters] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // const handlePanelChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  const getParameterData = async () => {
    if (id) {
      const res = await api.get(`/api/parameters?lab_test_id=${id}`);
      if (res.status === 200) {
        setParameters(res.data);
      }
    }
  };

  useEffect(() => {
    if (id) setTab(1);
  }, [id]);

  useEffect(() => {
    getParameterData();
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
          <Tab label="Lab Test" sx={{ textTransform: "none" }} />
          <Tab
            label="Parameter"
            sx={{ textTransform: "none" }}
            disabled={id === undefined}
          />
        </Tabs>
        <TabPanel value={tab} index={0} style={{ padding: "10px" }}>
          <LabTestSubForm id={id} />
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
              <ParameterForm
                height={463}
                data={parameters}
                refreshData={getParameterData}
                id={id}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "65%" },
                padding: "0px 10px",
              }}
            >
              <ParameterFormTable
                // height={location.state?.mode === "new" ? 557 : 511}
                height={510}
                data={parameters}
                refreshData={getParameterData}
                enableDelete={true}
              />
            </Box>
          </Box>
        </TabPanel>
        {/* <Accordion
          expanded={expanded === "lab_test"}
          onChange={handlePanelChange("lab_test")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="p" fontWeight="bold">
              Lab Test
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LabTestSubForm id={id} />
          </AccordionDetails>
        </Accordion>
        <Accordion
          // expanded={expanded === "parameter"}
          // onChange={handlePanelChange("parameter")}
          disabled={id === undefined}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="p" fontWeight="bold">
              Parameter
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                <ParameterForm height={540} />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "65%" },
                  padding: "0px 10px",
                }}
              >
                <ParameterFormTable
                  // height={location.state?.mode === "new" ? 557 : 511}
                  height={540}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion> */}
      </Box>
    </Box>
  );
};

export default LabTestForm;
