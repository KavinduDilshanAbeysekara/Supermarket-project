import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import { useAuth } from "../context/AuthContext";

function Category() {
  const { isAuthenticated, jwtToken } = useAuth();

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  async function loadCategories() {
    const response = await axios.get("http://localhost:8081/categories", config);
    setCategories(response.data);
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        loadCategories();
      }
    },
    [isAuthenticated]
  );

  function handleCategoryName(event: any) {
    setCategoryName(event.target.value);
  }

  async function handleSubmit() {
    const data = {
      name: categoryName,
    };
    await axios.post("http://localhost:8081/categories", data, config);
    loadCategories();
    setCategoryName(""); // Clear input after submission
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 w-[90%] max-w-4xl">
        <h1 className="text-3xl font-semibold mb-5 text-center text-gray-900">
          Categories
        </h1>

        {/* Display Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {categories &&
            categories.map(function (category: CategoryType) {
              return (
                <div
                  key={category.id}
                  className="text-gray-800 border border-gray-300 rounded-lg p-3 shadow-md text-center"
                >
                  {category.name}
                </div>
              );
            })}
        </div>

        {/* Create Category Form */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
            Create Category
          </h2>
          <form className="grid gap-4">
            <div>
              <label className="text-gray-800 mb-1 block">Category Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={categoryName}
                onChange={handleCategoryName}
                required
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Create Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Category;
