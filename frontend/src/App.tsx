// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./router";
import { ScrollToTop } from "./components/common/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
