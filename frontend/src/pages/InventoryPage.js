import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InventoryPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:5000/inventory/${id}`);
        alert("Producto eliminado exitosamente");
        setItems(items.filter((item) => item.id !== id)); // Actualizar la lista local
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Error al eliminar el producto");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Inventario</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/add")}
      >
        Agregar Producto
      </button>

      {items.length > 0 ? (
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Bodega</th>
              <th>Nombre</th>
              <th>Varietal</th>
              <th>Tipo de Vino</th>
              <th>Volumen</th>
              <th>Año</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.bodega}</td>
                <td>{item.name}</td>
                <td>{item.varietal}</td>
                <td>{item.tipoDeVino}</td>
                <td>{item.volumen} ml</td>
                <td>{item.año}</td>
                <td>{item.stock}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => navigate(`/details/${item.id}`)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/edit/${item.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)} // Usar la función handleDelete
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No hay productos en el inventario.</p>
      )}
    </div>
  );
}

export default InventoryPage;