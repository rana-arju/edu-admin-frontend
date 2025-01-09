import MainLayout from "./components/layout/MainLayout";
import ProtectRoute from "./components/layout/ProtectRoute";

function App() {
  return (
    <ProtectRoute>
      <MainLayout />
    </ProtectRoute>
  );
}

export default App;
