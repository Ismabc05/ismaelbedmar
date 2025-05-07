import React, { useEffect } from 'react';

export default function OrderLineList({ orders = [] }) {
  useEffect(() => {
    console.log("Orders recibidos en Frontend:", orders);
    // Para una inspección más detallada en la consola si es necesario:
    if (orders.length > 0) {
      console.log("Detalle del primer pedido:", orders[0]);
      if (orders[0].order_lines && orders[0].order_lines.length > 0) { // Asegúrate de usar la clave correcta aquí también
        console.log("Detalle de la primera línea del primer pedido:", orders[0].order_lines[0]);
      }
    }
  }, [orders]);

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => (window.location.href = "/admin/dashboard")}
          className="text-gray-800 hover:text-gray-600 transition mr-4 text-3xl"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold text-gray-800 text-center flex-grow">
          Líneas de Pedido
        </h1>
      </div>
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-4 text-left">ID Pedido</th>
            <th className="py-3 px-4 text-left">Usuario</th>
            <th className="py-3 px-4 text-left">Producto</th>
            <th className="py-3 px-4 text-left">Cantidad</th>
            <th className="py-3 px-4 text-left">Precio Unitario</th>
            <th className="py-3 px-4 text-left">Total Línea</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            // CAMBIO IMPORTANTE AQUÍ: usa order_lines si esa es la clave
            const lines = order.order_lines ?? [];

            return lines.length === 0 ? (
              <tr key={`order-${order.id}`}>
                <td colSpan="6" className="py-3 text-center">El pedido {order.id} no tiene líneas</td>
              </tr>
            ) : (
              lines.map(line => (
                <tr key={line.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  {/* Asumiendo que 'user' y 'product' se mantienen con esos nombres */}
                  <td className="py-3 px-4">{order.user ? order.user.name : 'N/A'}</td>
                  <td className="py-3 px-4">{line.product ? line.product.name : 'N/A'}</td>
                  <td className="py-3 px-4">{line.quantity}</td>
                  <td className="py-3 px-4">{line.price}</td>
                  <td className="py-3 px-4">
                    {(line.quantity * line.price).toFixed(2)}
                  </td>
                </tr>
              ))
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
