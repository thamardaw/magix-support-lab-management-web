import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Dashboard, Login, ResetPassword, Signup } from "./containers";
import { CustomSnackbar } from "./hocs/CustomSnackbar";
// import PrivateRoute from "./hocs/PrivateRoute";

function App() {
  return (
    <RecoilRoot>
      <CustomSnackbar>
        <Router>
          <Routes>
            {/* <Route
              path="/dashboard/*"
              element={<PrivateRoute component={Dashboard} />}
            /> */}
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Router>
      </CustomSnackbar>
    </RecoilRoot>
  );
}

export default App;
