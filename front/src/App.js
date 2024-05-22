import logo from "./img/logo/primary-logo.png";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import Layout from "./views/Pages/Layout";
import Home from "./views/Pages/Home";
import Reports from "./views/Pages/Reports";
import NoPage from "./views/Pages/NoPage";
import Login from "./views/Pages/Login";
import AuthProvider from "./Controller/Login/AuthProvider";
import PrivateRoute from "./views/components/PrivateRoute";

function App() {
  return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="reports" element={<Reports />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
  );
}

export default App;
