import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header"; // Reusable Header Component
import Footer from "../../components/Footer"; // Reusable Footer Component

function Order() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const { isAuthenticated, jwtToken } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated]);

  async function loadOrders() {
    try {
      const response = await axios.get("http://localhost:8081/orders", config);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-[90%] max-w-4xl">
          <h1 className="text-3xl font-semibold mb-5 text-center text-gray-900">
            Orders
          </h1>

          {/* Add Order Link */}
          <div className="mb-6 text-center">
            <Link
              to="/order/create"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add Order
            </Link>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-gray-800 font-semibold">
                    Order ID
                  </th>
                  <th className="px-4 py-2 text-gray-800 font-semibold">
                    Order Date and Time
                  </th>
                  <th className="px-4 py-2 text-gray-800 font-semibold">
                    Total Amount (Rs.)
                  </th>
                  <th className="px-4 py-2 text-gray-800 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="px-4 py-2 text-gray-700">{order.id}</td>
                      <td className="px-4 py-2 text-gray-700">
                        {order.orderDateTime.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        Rs. {order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-center text-gray-700">
                        {/* Add actions like View/Edit/Delete if needed */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-4 text-gray-700 text-center"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Order;
