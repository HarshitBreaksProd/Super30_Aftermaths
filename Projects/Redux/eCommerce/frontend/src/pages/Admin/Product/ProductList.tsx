import { useState } from "react";
import { useGetProductsQuery } from "../../../redux/api/productApiSlice";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";

const ProductList = () => {
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const {
    data: products,
    isFetching: isFetchingProducts,
    error: errorWhileFetching,
  } = useGetProductsQuery({});

  console.log(products);

  const handleSubmit = () => {};

  return (
    <div className="flex justify-center min-h-screen w-full pl-[6%] pr-[2%] py-12 bg-neutral-950 text-white ">
      {showCreateForm && (
        <div className="fixed flex justify-center items-center inset-0 h-screen w-full bg-neutral-950/90">
          <div className="-translate-y-10 min-w-96 space-y-5 border px-8 pt-5 pb-10 rounded-2xl border-neutral-400 bg-neutral-950">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-xl tracking-wide">Create Product</h1>
              <button
                onClick={() => setShowCreateForm(false)}
                className="hover:cursor-pointer"
              >
                <FaTimes color="red" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1 px-2">
              {/* <label className="">Name</label>
              <input
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="border border-neutral-600 rounded px-2 py-1"
              />
              <button
                type="submit"
                className="bg-teal-600 text-black rounded py-1 mt-3 hover:cursor-pointer"
              >
                Create
              </button> */}
            </form>
          </div>
        </div>
      )}
      <div className="w-full">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-medium text-3xl">Products</h1>
          <div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-black rounded hover:cursor-pointer hover:bg-teal-500 transition-colors duration-300"
            >
              <AiOutlinePlus />
              Add Product
            </button>
          </div>
        </div>

        <div>
          {isFetchingProducts ? (
            <AiOutlineLoading className="animate-spin" />
          ) : errorWhileFetching ? (
            <p className="text-red-400">
              Error Occurred While Fetching Products
            </p>
          ) : (
            <table className="w-full pr-10 mt-10">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xl border border-neutral-700">
                    Id
                  </th>
                  <th className="px-4 py-2 text-left text-xl border border-neutral-700">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xl border border-neutral-700">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-xl border border-neutral-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.products?.map(
                  (product: { _id: string; name: string; brand: string }) => (
                    <tr key={product._id}>
                      <td className="px-4 py-2 text-left border border-neutral-800">
                        {product._id}
                      </td>
                      <td className="px-4 py-2 text-left border border-neutral-800">
                        {product.name}
                      </td>
                      <td className="px-4 py-2 text-left border border-neutral-800">
                        {product.brand}
                      </td>
                      <td className="px-4 py-2 space-x-5 border border-neutral-800">
                        <button
                          className="text-green-400 px-2 py-1 hover:cursor-pointer rounded"
                          onClick={() => {}}
                        >
                          <FaSave />
                        </button>
                        <button
                          className="text-orange-400 px-2 py-1 hover:cursor-pointer rounded"
                          onClick={() => {}}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {}}
                          className="text-red-500 px-2 py-1 hover:cursor-pointer rounded"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
