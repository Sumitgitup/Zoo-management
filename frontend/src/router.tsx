import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Enclosure from "./pages/Enclosure";
import SafariZone from "./pages/eclosure-folder/SafariZone";
import BirdSanctuary from "./pages/eclosure-folder/BirdSanctuary";
import ReptileHouse from "./pages/eclosure-folder/ReptileHouse";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animals" element={<Animals />} />
      <Route path="/enclosure" element={<Enclosure />} />
      <Route path="/enclosure/safari-zone" element={<SafariZone />} />
      <Route path="/enclosure/bird-sanctuary" element={<BirdSanctuary />} />
      <Route path="/enclosure/reptile-house" element={<ReptileHouse />} />
      {/* <Route path="*" element={<Error_page />} /> */}
    </Routes>
  );
};

export default AppRoutes;