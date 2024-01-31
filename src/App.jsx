import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "./modules/auth/components/Login";
import Signup from "./modules/auth/components/Signup";
import Home from "./modules/home/components/Home";
import withAuthentication from "../hoc/withAuthentication";
import withoutAuthentication from "../hoc/withoutAuthentication";
import MainLayout from "../MainLayout";

function App() {
  const UnAuthenticatedApp = () => {
    return <Outlet />;
  };

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/*" element={withAuthentication(MainLayout)}>
              <Route path={"home"} element={<Home />} />
            </Route>
            <Route element={withoutAuthentication(UnAuthenticatedApp)}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
