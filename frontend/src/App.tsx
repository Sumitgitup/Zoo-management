import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollToTop } from "./components/common/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <AppRoutes />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
