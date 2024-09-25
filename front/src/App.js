import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./views/Pages/Layout";
import Home from "./views/Pages/Home";
import Reports from "./views/Pages/Reports";
import NoPage from "./views/Pages/NoPage";
import Login from "./views/Pages/Login";
import AuthProvider from "./Controller/Login/AuthProvider";
import PrivateRoute from "./views/components/PrivateRoute";
import User from "./views/Pages/User";
import NewReport from "./views/Pages/NewReport";
import Report from "./views/Pages/Report";
import Projects from "./views/Pages/Projects";
import NewProject from "./views/Pages/NewProject";
import Project from "./views/Pages/Project";
import Connect from "./views/Pages/Connect";
import Signup from "./views/Pages/Signup"

function App() {

  return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<PrivateRoute />}>
                        <Route index element={<Home />} />
                        <Route path="reports" element={<Reports />} />
                        <Route path="reports/new" element={<NewReport />} />
                        <Route path="reports/new/:projectid" element={<NewReport />} />
                        <Route path="reports/details/:id" element={<Report />}/>
                        <Route path="projects" element={<Projects />} />
                        <Route path="projects/new" element={<NewProject />} />
                        <Route path="projects/details/:id" element={<Project />}/>
                        <Route path="projects/details/:id/connect" element={<Connect />}/>
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="user" element={<User />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
  );
}

export default App;
