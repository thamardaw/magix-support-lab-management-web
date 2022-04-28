import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Login, ResetPassword, Signup } from "./containers";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/resetPassword" component={ResetPassword} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
