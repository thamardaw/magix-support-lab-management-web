import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dashboard, Login, ResetPassword, Signup } from "./containers";
import { CustomSnackbar } from "./hocs/CustomSnackbar";
import PrivateRoute from "./hocs/PrivateRoute";

function App() {
  return (
    <RecoilRoot>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CustomSnackbar>
          <Router>
            <Routes>
              <Route
                path="dashboard/*"
                element={<PrivateRoute component={Dashboard} />}
              />
              {/* <Route path="dashboard/*" element={<Dashboard />} /> */}
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="resetPassword" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </Router>
        </CustomSnackbar>
      </LocalizationProvider>
    </RecoilRoot>
  );
}

export default App;
