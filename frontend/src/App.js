import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import OrderManagementPage from "./pages/OrderManagementPage"; // Importa el componente correcto
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
        <Route path="/orders/create" element={<OrderManagementPage />} /> {/* Ruta para crear órdenes */}
      </Routes>
    </Router>
  );
}

export default App;