import { useEffect, useState } from "react";
import ProductType from "../types/ProductType";
import axios from "axios";
import CategoryType from "../types/CategoryType";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Product() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0.0);
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [productEditing, setProductEditing] = useState<ProductType | null>(null);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function loadProducts() {
    const response = await axios.get("http://localhost:8081/products", config);
    setProducts(response.data);
  }

  async function loadCategories() {
    const response = await axios.get("http://localhost:8081/categories", config);
    setCategories(response.data);
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
      loadCategories();
    }
  }, [isAuthenticated]);

  function handleProductName(event: any) {
    setProductName(event.target.value);
  }

  function handlePrice(event: any) {
    setPrice(Number(event.target.value));
  }

  function handleDescription(event: any) {
    setDescription(event.target.value);
  }

  function handleCategoryId(event: any) {
    setCategoryId(Number(event.target.value));
  }

  async function handleSubmit() {
    const data = {
      name: productName,
      price: price,
      description: description,
      categoryId: categoryId,
    };

    try {
      await axios.post("http://localhost:8081/products", data, config);
      loadProducts();
      setProductName("");
      setPrice(0);
      setDescription("");
      setCategoryId(undefined);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateProduct() {
    const data = {
      name: productName,
      price: price,
      description: description,
      categoryId: categoryId,
    };

    try {
      await axios.put(`http://localhost:8081/products/${productEditing?.id}`, data, config);
      setProductEditing(null);
      loadProducts();
      setProductName("");
      setPrice(0);
      setDescription("");
      setCategoryId(undefined);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(productId: number) {
    try {
      await axios.delete(`http://localhost:8081/products/${productId}`, config);
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount);
  }

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
              to="/"
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/product"
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-300"
            >
              Products
            </Link>
            <Link
              to="/category"
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-300"
            >
              Categories
            </Link>
            <Link
              to="/order"
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-300"
            >
              Orders
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center p-6">
        <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-[90%] max-w-4xl">
          <h1 className="text-3xl font-semibold mb-5 text-center text-gray-900">
            Products
          </h1>

          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-gray-300 text-gray-900">
              <tr>
                <th className="p-2">Product ID</th>
                <th className="p-2">Product Name</th>
                <th className="p-2">Product Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="odd:bg-white even:bg-gray-50 text-gray-800"
                >
                  <td className="p-2">{product.id}</td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{formatCurrency(product.price)}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => {
                        setProductEditing(product);
                        setProductName(product.name);
                        setPrice(product.price);
                        setDescription(product.description);
                        setCategoryId(product.category?.id);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
              Add / Edit Product
            </h2>
            <form className="grid gap-4">
              <div>
                <label className="block text-gray-800 mb-1">Product Name</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={productName}
                  onChange={handleProductName}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-1">Price</label>
                <input
                  type="number"
                  className="w-full border rounded-md p-2"
                  value={price}
                  onChange={handlePrice}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-1">Description</label>
                <input
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={description}
                  onChange={handleDescription}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-1">Category</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={categoryId}
                  onChange={handleCategoryId}
                  required
                >
                  <option value="">Please select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {productEditing ? (
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={updateProduct}
                >
                  Update Product
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Create Product
                </button>
              )}
            </form>
          </div>
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

export default Product;
