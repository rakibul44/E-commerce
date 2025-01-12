import { useForm } from "react-hook-form";
import { categoryApi } from "../../../redux/apis/categoryApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useBaseRoute from "../../../hooks/useBaseRoute";

const AddCategory = () => {
  const { register, handleSubmit, formState: { errors }, reset} = useForm();
  const [ createCategory ] = categoryApi.useCreateCategoryMutation();
  const { baseRoute } = useBaseRoute();

//  handle add category function
  const handleAddCategory = async(data) => {
  
    try{
  
        const res = await createCategory(data);
        console.log(res)
        if(res?.data?.success){
            reset();
            console.log(res?.data?.message)
            toast.success(res?.data?.message)
        }

    } catch(error){
        toast.error(error?.data?.message)
        console.log(error)
    }
  };


  return (
    <div className=" container  p-6 mt-3">
       <div className=" flex justify-between px-5">
       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Category</h2>
       <Link to={`${baseRoute}/categories`} className="text-xl font-bold text-center text-white mb-6  px-2 py-1 bg-btnbg hover:bg-btnbghover rounded ">All Categories</Link>

       </div>
      <form onSubmit={handleSubmit(handleAddCategory)} className=" bg-white shadow-lg p-6 rounded-lg max-w-lg mx-auto">
        {/* Category Name */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          <label htmlFor="categoryName" className="block text-gray-700 font-medium mb-2 col-span-1">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Category Name is required" })}
            className={`w-full px-3 py-1 bg-white border col-span-3  ${
              errors.categoryName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-inputfocus  `}
            placeholder="Enter category name"
          />
          {errors.categoryName && (
            <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2 col-span-1">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            className={`w-full px-3 py-1 bg-white border col-span-3 ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-inputfocus`}
            placeholder="Enter category description"
            rows="3"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Slug */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          <label htmlFor="slug" className="block text-gray-700 font-medium mb-2 col-span-1">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            {...register("slug", {
              required: "Slug is required",
              pattern: {
                value: /^[a-z0-9-]+$/,
                message: "Slug must contain only lowercase letters, numbers, and hyphens",
              },
            })}
            className={`w-full px-3 py-1 bg-white border col-span-3 ${
              errors.slug ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-inputfocus`}
            placeholder="Enter slug"
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>

   


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full  text-white py-2 px-4 rounded-lg bg-btnbg hover:bg-btnbghover focus:outline-none focus:ring-2 focus:ring-inputfocus"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
