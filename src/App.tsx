import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import { Routes, Route, Outlet, Link } from "react-router-dom";
import NoMatch from "./components/pages/NoMatch";
import Home from "./components/pages/Home";
import Layout from "./components/pages/Layout";
import Dashboard from "./components/pages/Dashboard";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
