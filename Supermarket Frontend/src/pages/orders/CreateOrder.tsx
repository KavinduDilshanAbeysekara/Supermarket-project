import { useEffect, useState } from "react";
import ProductType from "../../types/ProductType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import jsPDF from "jspdf";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function CreateOrder() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { isAuthenticated, jwtToken } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(function () {
    async function loadProducts() {
      try {
        if (isAuthenticated) {
          const response = await axios.get("http://localhost:8081/products", config);
          setProducts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
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
      await axios.post(
        "http://localhost:8081/orders",
        {
          productIds: productIds,
        },
        config
      );

      navigate("/order"); // Navigate to orders page
    } catch (error) {
      console.log(error);
    }
  }

  // Generate PDF for the bill
  function generatePDF() {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Order Bill", 10, 10);

    // Table Header
    doc.setFontSize(12);
    doc.text("ID", 10, 20);
    doc.text("Description", 50, 20);
    doc.text("Price", 160, 20);

    // Table Content
    let yPosition = 30;
    orderedProducts.forEach((product) => {
      doc.text(product.id.toString(), 10, yPosition);
      doc.text(product.name, 50, yPosition);
      doc.text(`Rs. ${product.price}`, 160, yPosition, { align: "right" });
      yPosition += 10;
    });

    // Total
    doc.text("Total:", 10, yPosition);
    doc.text(`Rs. ${total}`, 160, yPosition, { align: "right" });

    // Save the PDF
    doc.save("order_bill.pdf");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex justify-center bg-gray-50 py-5">
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
                      <tr key={product.id} className="border-t text-gray-950 border-slate-200 hover:bg-gray-50">
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

              {/* Buttons */}
              <div className="mt-6 text-center space-x-4">
                <button
                  type="button"
                  className="py-3 px-6 bg-slate-800 text-white rounded-lg hover:bg-slate-950"
                  onClick={saveOrder}
                >
                  Save Order
                </button>
                <button
                  type="button"
                  className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={generatePDF}
                >
                  Print Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CreateOrder;
