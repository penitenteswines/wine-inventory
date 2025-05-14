import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderManagementPage = () => {
  const [products, setProducts] = useState([]); // Productos disponibles en el inventario
  const [selectedProducts, setSelectedProducts] = useState([]); // Productos seleccionados para el pedido
  const [search, setSearch] = useState(""); // Valor de búsqueda
  const [orderSummary, setOrderSummary] = useState({ totalUnits: 0, totalPrice: 0 }); // Resumen del pedido

  // Obtener productos del backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/inventory", {
          params: { search },
        });
        setProducts(response.data.items || []);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        toast.error("Error al cargar los productos.", { position: "top-center" });
      }
    };

    fetchProducts();
  }, [search]);

  // Calcular el resumen del pedido (cantidad total de unidades y precio total)
  useEffect(() => {
    const totalUnits = selectedProducts.reduce((acc, product) => acc + product.quantity, 0);
    const totalPrice = selectedProducts.reduce((acc, product) => acc + product.quantity * product.price, 0);
    setOrderSummary({ totalUnits, totalPrice });
  }, [selectedProducts]);

  // Agregar un producto al pedido
  const handleAddToOrder = (product) => {
    const existing = selectedProducts.find((p) => p.productId === product._id);
    if (existing) {
      setSelectedProducts(selectedProducts.map((p) =>
        p.productId === product._id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          productId: product._id,
          name: product.name,
          bodega: product.bodega,
          varietal: product.varietal,
          stock: product.stock,
          price: product.costo,
          quantity: 1,
        },
      ]);
    }
  };

  // Eliminar un producto del pedido
  const handleRemoveFromOrder = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.productId !== productId));
  };

  // Actualizar la cantidad de un producto seleccionado
  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return; // Evitar cantidades inválidas
    setSelectedProducts(selectedProducts.map((p) =>
      p.productId === productId ? { ...p, quantity } : p
    ));
  };

  // Guardar el pedido en el backend
  const handleSaveOrder = async () => {
    try {
      await axios.post("http://localhost:5000/orders", { products: selectedProducts });
      toast.success("Pedido guardado exitosamente.", { position: "top-center" });
      setSelectedProducts([]); // Limpiar el pedido después de guardarlo
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      toast.error("Error al guardar el pedido. Inténtalo nuevamente.", { position: "top-center" });
    }
  };

  return (
    <div className="container mt-3">
      <h2>Gestión de Pedidos</h2>

      {/* Barra de búsqueda */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabla de productos disponibles */}
      <div className="mb-4">
        <h4>Productos Disponibles</h4>
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
              <th>Precio</th>
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
                  <td>{product.stock}</td>
                  <td>${product.costo.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAddToOrder(product)}
                    >
                      Agregar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tabla de productos seleccionados */}
      <div className="mb-4">
        <h4>Pedido Actual</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.length > 0 ? (
              selectedProducts.map((product) => (
                <tr key={product.productId}>
                  <td>{product.name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={product.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(product.productId, parseInt(e.target.value, 10))
                      }
                    />
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>${(product.quantity * product.price).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveFromOrder(product.productId)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay productos seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Resumen del pedido */}
      <div className="mb-4">
        <h4>Resumen del Pedido</h4>
        <p><strong>Total de Unidades:</strong> {orderSummary.totalUnits}</p>
        <p><strong>Total del Pedido:</strong> ${orderSummary.totalPrice.toFixed(2)}</p>
      </div>

      {/* Botones de acción */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-success me-2" onClick={handleSaveOrder}>
          Guardar Pedido
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default OrderManagementPage;