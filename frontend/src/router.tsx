import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnimalAdminDashboard from "./pages/Admin/Animal";
import Enclosure from "./pages/Enclosure";
import SafariZone from "./pages/eclosure-folder/SafariZone";
import BirdSanctuary from "./pages/eclosure-folder/BirdSanctuary";
import ReptileHouse from "./pages/eclosure-folder/ReptileHouse";
import Dashboard from "./pages/Admin/Dashboard";
import Pricing from "./pages/Pricing";
import Animals from "./pages/Animals";
import TicketDashboard from "./pages/Admin/Tickets";
import StaffAdminDashboard from "./pages/Admin/Staff";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animals" element={<Animals />} />
      <Route path="/enclosure" element={<Enclosure />} />
      <Route path="/enclosure/safari-zone" element={<SafariZone />} />
      <Route path="/enclosure/bird-sanctuary" element={<BirdSanctuary />} />
      <Route path="/enclosure/reptile-house" element={<ReptileHouse />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard/ticket" element={<TicketDashboard />} />
      <Route
        path="/admin/dashboard/animal"
        element={<AnimalAdminDashboard />}
      />
      <Route
        path="/admin/dashboard/staff"
        element={<StaffAdminDashboard />}
      />
      {/* <Route path="*" element={<Error_page />} /> */}
    </Routes>
  );
};

export default AppRoutes;
