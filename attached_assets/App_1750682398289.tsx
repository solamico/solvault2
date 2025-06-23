
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WalletContextProvider from "./contexts/WalletContext";

function App() {
  return (
    <WalletContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </WalletContextProvider>
  );
}

export default App;
