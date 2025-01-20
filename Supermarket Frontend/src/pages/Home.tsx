import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineShoppingCart, AiOutlineTags, AiOutlineUnorderedList } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

function Home() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-blue-800">
            Supermarket Billing System
          </h1>
          <nav className="space-x-4">
            <Link
              to="/product"
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-300"
            >
              Product
            </Link>
            <Link
              to="/category"
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-300"
            >
              Category
            </Link>
            <Link
              to="/order"
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-300"
            >
              Order
            </Link>
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 font-medium transition duration-300"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-lg text-center mb-8 w-full max-w-4xl">
          <h2 className="text-4xl font-bold mb-2">Welcome!</h2>
          <p className="text-lg">Manage products, categories, and orders seamlessly!</p>
        </div>

        {/* Navigation Section */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 max-w-4xl">
          <Link
            to="/product"
            className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <AiOutlineShoppingCart className="text-blue-600 text-5xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Product</h3>
          </Link>
          <Link
            to="/category"
            className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <AiOutlineTags className="text-green-600 text-5xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Category</h3>
          </Link>
          <Link
            to="/order"
            className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <AiOutlineUnorderedList className="text-yellow-600 text-5xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Order</h3>
          </Link>
          <button
            className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
            onClick={logout}
          >
            <FiLogOut className="text-red-600 text-5xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Logout</h3>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} Supermarket Billing System. All rights reserved.
          </p>
          <nav className="flex space-x-4 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Home;
