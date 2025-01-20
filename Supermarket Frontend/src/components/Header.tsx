// File: src/components/Header.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { logout } = useAuth();

  return (
    <header className="bg-blue-800 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            Supermarket Billing System
          </Link>
        </h1>
        <nav className="flex space-x-4">
          <Link
            to="/product"
            className="px-4 py-2 rounded hover:bg-blue-600"
          >
            Products
          </Link>
          <Link
            to="/category"
            className="px-4 py-2 rounded hover:bg-blue-600"
          >
            Categories
          </Link>
          <Link
            to="/order"
            className="px-4 py-2 rounded hover:bg-blue-600"
          >
            Orders
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
