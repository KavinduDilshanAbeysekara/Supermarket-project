import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-blue-800 text-white p-4 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-center">Supermarket Billing System</h1>
        <p className="text-center text-lg">Welcome to the Supermarket Billing System!</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        <Link
          to="/profile"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
        >
          Profile
        </Link>
        <Link
          to="/product"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
        >
          Product
        </Link>
        <Link
          to="/category"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
        >
          Category
        </Link>
        <Link
          to="/order"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
        >
          Order
        </Link>
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
