import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { Appbar, Footer, ResponsiveDrawer } from "../components";
import { LabTest } from "./LabTest";
import { Patient } from "./Patient";
import { TestCategory } from "./TestCategory";
import { LabReport } from "./LabReport";

const drawerWidth = 240;

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar drawerWidth={drawerWidth} />
      <ResponsiveDrawer drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          // width: "100%",
        }}
      >
        <Toolbar />
        <Routes>
          <Route path={`patient/*`} element={<Patient />} />
          <Route path={`test_category/*`} element={<TestCategory />} />
          <Route path={`lab_test/*`} element={<LabTest />} />
          <Route path={`lab_report/*`} element={<LabReport />} />
          <Route path="*" element={<Navigate to="patient" replace />} />
        </Routes>
        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
