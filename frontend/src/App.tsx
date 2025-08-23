// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
