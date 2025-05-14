import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import penitentesWinesLogo from '../assets/img/penitentes.png';
import './ProductListPage.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit] = useState(10);
  const [inventorySummary, setInventorySummary] = useState({
    totalStock: 0,
    totalCost: 0,
    itemsCount: 0
  }); // Estado para el resumen del inventario
  const navigate = useNavigate();

  // Función para obtener productos desde el backend
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/inventory", {
        params: {
          search,
          page: currentPage,
          limit,
        },
      });
      setProducts(response.data.items || []);
      setTotalProducts(response.data.total || 0);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      toast.error("Error al cargar los productos.", { position: "top-center" });
      setProducts([]);
    }
  }, [search, currentPage, limit]);

  // Función para obtener el resumen del inventario
  const fetchInventorySummary = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/valorization"); // URL correcta para el resumen
      console.log("Datos del resumen del inventario:", response.data); // Log para depuración
      setInventorySummary(response.data); // Actualiza el estado del resumen del inventario
    } catch (error) {
      console.error("Error al cargar el resumen del inventario:", error.response || error.message);
      toast.error("Error al cargar el resumen del inventario.", { position: "top-center" });
    }
  }, []);

  // Usar useEffect para cargar datos cuando cambien las dependencias
  useEffect(() => {
    fetchProducts();
    fetchInventorySummary();
  }, [fetchProducts, fetchInventorySummary]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await axios.delete(`http://localhost:5000/inventory/${id}`);
      toast.success("Producto eliminado exitosamente.", { position: "top-center" });
      fetchProducts();
      fetchInventorySummary(); // Actualizar el resumen del inventario tras eliminar
    } catch (error) {
      toast.error("Error al eliminar el producto.", { position: "top-center" });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAddProduct = () => {
    navigate("/add");
  };

  const handleCreateOrder = () => {
    navigate("/orders/create"); // Navega a la pantalla de creación de órdenes
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="container mt-3">
      <div className="row d-flex align-items-center justify-content-left mb-4">
        <div className="col">
          <img src={penitentesWinesLogo} alt="Logo Penitentes Wines" className="penitentes-logo" />
        </div>
        <div className="col">
          {/* Sección de Resumen del Inventario */}
          <div className="inventory-summary mb-4 p-3">
            <h4>Resumen del Inventario</h4>
            <p><strong>Total de Unidades:</strong> {inventorySummary.totalStock}</p>
            <p><strong>Valor Total:</strong> ${inventorySummary.totalCost.toFixed(2)}</p>
            <p><strong>Productos Únicos:</strong> {inventorySummary.itemsCount}</p>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary me-2" onClick={handleAddProduct}>
          Agregar Producto
        </button>
        <button className="btn btn-secondary" onClick={handleCreateOrder}>
          Crear Orden de Pedido
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos por nombre, bodega, varietal, tipo de vino o depósito"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabla de productos */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Bodega</th>
            <th>Nombre</th>
            <th>Varietal</th>
            <th>Tipo de Vino</th>
            <th>Volumen</th>
            <th>Año</th>
            <th>Stock</th>
            <th>Costo</th>
            <th>Depósito</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.bodega}</td>
                <td>{product.name}</td>
                <td>{product.varietal}</td>
                <td>{product.tipoDeVino}</td>
                <td>{product.volumen} ml</td>
                <td>{product.año}</td>
                <td>
                  {product.stock}{" "}
                  {product.reserved > 0 && <span>({product.reserved} en pedidos)</span>}
                </td>
                <td>${product.costo.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{product.deposito}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product._id)}>
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">No se encontraron productos.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <ToastContainer />
    </div>
  );
};

export default ProductListPage;