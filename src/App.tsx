import Index from "./pages/Index";
import WalletContextProvider from "./contexts/WalletContext";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <WalletContextProvider>
      <Index />
      <Toaster />
    </WalletContextProvider>
  );
}

export default App;