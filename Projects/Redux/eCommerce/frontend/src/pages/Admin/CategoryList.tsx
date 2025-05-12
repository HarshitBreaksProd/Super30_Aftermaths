import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useListCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

const CategoryList = () => {
  const {
    data: categoryList,
    error: errorWhileFetching,
    isLoading: isfetchingCategories,
  } = useListCategoriesQuery({});

  const [editCategoryId, setEditCategoryId] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");

  const [newCategoryName, setNewCategoryName] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [deleteCategory, { isLoading: deleteCategoryLoading }] =
    useDeleteCategoryMutation();

  const deleteHandler = async (categoryId: string) => {
    console.log(categoryId);
    if (window.confirm("Are You Sure")) {
      try {
        await deleteCategory({ categoryId });
        toast.success("Category Deleted Successfully");
      } catch (err) {
        console.error(err);
        toast.error(
          err?.data?.message ||
            err?.data ||
            err?.error ||
            "Error Updating Category"
        );
      }
    }
  };

  const startEdit = (id: string, name: string) => {
    setEditCategoryId(id);
    setEditCategoryName(name);
  };

  const [updateCategory, { isLoading: updateCategoryLoading }] =
    useUpdateCategoryMutation();

  const updateHandler = async (categoryId: string) => {
    if (!editCategoryName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: categoryId,
        data: {
          name: editCategoryName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setEditCategoryId("");
        setEditCategoryName("");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.data?.message ||
          err?.data ||
          err?.error ||
          "Error Updating Category"
      );
    }
  };

  const [createCategory, { isLoading: createCategoryLoading }] =
    useCreateCategoryMutation();

  const createHandler = async () => {
    if (!newCategoryName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({
        name: newCategoryName,
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is created`);
        setNewCategoryName("");
        setShowCreateForm(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.data?.message ||
          err?.data ||
          err?.error ||
          "Error Updating Category"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createHandler();
    setShowCreateForm(false);
  };

  return (
    <div className="flex justify-center min-h-screen w-full pl-[6%] pr-[2%] py-12 bg-neutral-950 text-white ">
      {showCreateForm && (
        <div className="fixed flex justify-center items-center inset-0 h-screen w-full bg-neutral-950/90">
          <div className="-translate-y-10 min-w-96 space-y-5 border px-8 pt-5 pb-10 rounded-2xl border-neutral-400 bg-neutral-950">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-xl tracking-wide">Create Category</h1>
              <button
                onClick={() => setShowCreateForm(false)}
                className="hover:cursor-pointer"
              >
                <FaTimes color="red" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1 px-2">
              <label className="">Name</label>
              <input
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="border border-neutral-600 rounded px-2 py-1"
              />
              <button
                type="submit"
                className="bg-teal-600 text-black rounded py-1 mt-3 hover:cursor-pointer"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="w-full">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-medium text-3xl">Categories</h1>
          <div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-black rounded hover:cursor-pointer hover:bg-teal-500 transition-colors duration-300"
            >
              <AiOutlinePlus />
              Add Category
            </button>
          </div>
        </div>

        <div>
          {isfetchingCategories ? (
            <AiOutlineLoading className="animate-spin" />
          ) : errorWhileFetching ? (
            <p className="text-red-400">
              Error Occurred While Fetching Categories
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryList?.map(
                  (category: { _id: string; name: string }) => (
                    <tr key={category._id}>
                      <td className="px-4 py-2 text-left border border-neutral-800">
                        {category._id}
                      </td>
                      <td className="px-4 py-2 text-left border border-neutral-800">
                        {editCategoryId === category._id ? (
                          <input
                            className="border border-neutral-400 rounded px-2 py-1"
                            placeholder="Category Name"
                            value={editCategoryName}
                            onChange={(e) => {
                              setEditCategoryName(e.target.value);
                            }}
                          />
                        ) : (
                          category.name
                        )}
                      </td>
                      <td className="px-4 py-2 space-x-5 border border-neutral-800">
                        {editCategoryId === category._id ? (
                          <button
                            className="text-green-400 px-2 py-1 hover:cursor-pointer rounded"
                            onClick={() => updateHandler(category._id)}
                          >
                            {editCategoryId === category._id &&
                            updateCategoryLoading ? (
                              <AiOutlineLoading className="animate-spin" />
                            ) : (
                              <FaSave />
                            )}
                          </button>
                        ) : (
                          <button
                            className="text-orange-400 px-2 py-1 hover:cursor-pointer rounded"
                            onClick={() =>
                              startEdit(category._id, category.name)
                            }
                          >
                            <FaEdit />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            deleteHandler(category._id);
                          }}
                          className="text-red-500 px-2 py-1 hover:cursor-pointer rounded"
                        >
                          {deleteCategoryLoading ? (
                            <AiOutlineLoading className="animate-spin" />
                          ) : (
                            <FaTrash />
                          )}
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

export default CategoryList;
