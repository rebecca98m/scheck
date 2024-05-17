import logo from "./img/logo/primary-logo.png";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/Pages/Layout";
import Home from "./views/Pages/Home";
import Reports from "./views/Pages/Reports";
import NoPage from "./views/Pages/NoPage";

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
