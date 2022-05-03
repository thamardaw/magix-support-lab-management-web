import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { Appbar, Footer, ResponsiveDrawer } from "../components";
import { Patient } from "./Patient";
import { TestCategory } from "./TestCategory";

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
          <Route path="*" element={<Navigate to="patient" replace />} />
        </Routes>
        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
