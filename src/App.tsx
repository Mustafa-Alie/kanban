import Layout from "@/components/layout/Layout";

import { ThemeProvider } from "@/Context/ThemeContext";
import { RefProvider } from "./Context/RefContext";

function App() {
  return (
    <ThemeProvider>
      <RefProvider>
        <Layout />
      </RefProvider>
    </ThemeProvider>
  );
}

export default App;
