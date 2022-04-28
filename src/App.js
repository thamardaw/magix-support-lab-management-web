import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Dashboard, Login, ResetPassword, Signup } from "./containers";
import PrivateRoute from "./hocs/PrivateRoute";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
