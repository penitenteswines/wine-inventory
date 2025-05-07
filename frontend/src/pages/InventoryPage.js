import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InventoryPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Para navegar entre rutas

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/inventory");
      setItems(response.data);
    } catch (error) {
      console.error("Error al cargar el inventario:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Inventario</h2>
      {/* Botón para agregar un producto */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/add")}
      >
        Agregar Producto
      </button>

      {/* Lista de productos */}
      <ul className="list-group">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.name} - {item.stock} en stock
            </li>
          ))
        ) : (
          <p>No hay productos en el inventario.</p>
        )}
      </ul>
    </div>
  );
}

export default InventoryPage;