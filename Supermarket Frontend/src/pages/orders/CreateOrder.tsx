import { useEffect, useState } from "react";
import ProductType from "../../types/ProductType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateOrder() {
  const [products, setProducts] = useState<ProductType[]>([]);

  async function loadProducts() {
    try {
      const response = await axios.get("http://localhost:8081/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    loadProducts();
  }, []);

  const [orderedProducts, setOrderedProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(0);

  function addProductToOrder(product: ProductType) {
    const updatedOrder = [...orderedProducts, product];
    setOrderedProducts(updatedOrder);
  }

  // Calculate total when orderedProducts change
  useEffect(function () {
    let newTotal = 0;
    orderedProducts.forEach(function (product) {
      newTotal += product.price;
    });
    setTotal(newTotal);
  }, [orderedProducts]);

  const navigate = useNavigate();

  async function saveOrder() {
    const productIds = orderedProducts.map((product) => product.id);

    try {
      await axios.post("http://localhost:8081/orders", {
        productIds: productIds,
      });

      navigate("/order"); // Navigate to orders page
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-50 py-5">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-[90%] lg:w-[70%]">
        <div className="flex mb-8">
          {/* Product List Section */}
          <div className="w-[400px] border-r border-slate-200 pr-5">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Products</h2>
            <div className="space-y-3">
              {products.map(function (product) {
                return (
                  <div
                    key={product.id}
                    onClick={() => addProductToOrder(product)}
                    className="border border-slate-200 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="text-lg font-semibold text-slate-800">{product.name}</div>
                    <div className="text-sm text-slate-400">{product.category?.name}</div>
                    <div className="text-sm text-green-600 text-right">Rs. {product.price}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="flex-1 pl-5">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">New Order</h2>
            <table className="w-full table-auto border-collapse text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-slate-800">ID</th>
                  <th className="px-4 py-2 text-slate-800">Description</th>
                  <th className="px-4 py-2 text-slate-800 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderedProducts.map(function (product) {
                  return (
                    <tr key={product.id} className="border-t border-slate-200 hover:bg-gray-50">
                      <td className="px-4 py-2">{product.id}</td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2 text-right">Rs. {product.price}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={2} className="px-4 py-2 font-semibold text-slate-800">
                    <strong>Total</strong>
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-slate-800">
                    <strong>Rs. {total}</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Save Order Button */}
            <div className="mt-6 text-center">
              <button
                type="button"
                className="py-3 px-6 bg-slate-800 text-white rounded-lg hover:bg-slate-950"
                onClick={saveOrder}
              >
                Save Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
