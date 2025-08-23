import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Dashboard from "./pages/Admin/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animals" element={<Animals />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      
    </Routes>
  );
};
export default AppRoutes;
