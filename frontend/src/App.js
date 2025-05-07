import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;