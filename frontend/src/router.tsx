import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Animals from "./pages/Animals";
import Enclosure from "./pages/Enclosure";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animals" element={<Animals />} />
      <Route path="/enclosure" element={<Enclosure />} />
      {/* <Route path="*" element={<Error_page />} /> */}
    </Routes>
  );
};
export default AppRoutes;
