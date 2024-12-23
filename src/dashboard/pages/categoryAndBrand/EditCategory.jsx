import { useForm } from "react-hook-form";
import { categoryApi } from "../../../redux/apis/categoryApi";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }} = useForm();

  const { data: categoryData , isLoading, refetch,} = categoryApi.useGetCategoryByIdQuery(id);
  const [ updateCategory ] = categoryApi.useUpdateCategoryMutation();
  const  currentCategory = categoryData?.data;

  console.log(categoryData)

  


if(isLoading){
  return <p>Loading...</p>
}

//  handle add category function
  const handleUpdateCategory = async(data) => {
        const  res = await updateCategory({ id ,data});
      if(res?.data?.success){
          refetch()
            toast.success(res?.data?.message)
        }
  };





  return (
    <div className=" container bg-gray-50  rounded-lg p-6 mt-3">
       <div className=" flex justify-between px-5">
       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Category</h2>
       <Link to={"/dashboard/categories"} className="text-xl font-bold text-center text-white mb-6  px-2 py-1 bg-btnbg hover:bg-btnbghover  rounded ">All Categories</Link>

       </div>
      <form onSubmit={handleSubmit(handleUpdateCategory)} className=" max-w-lg mx-auto bg-white shadow-lg  p-6 ">
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
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-inputfocus`}
            placeholder="Enter category name"
            defaultValue={currentCategory?.name}
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
            defaultValue={currentCategory?.description}
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
            defaultValue={currentCategory?.slug}
          />
          {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-2 bg-btnbg hover:bg-btnbghover  text-white py-2 px-4 rounded-lg  focus:outline-none focus:ring-2 focus:ring-inputfocus"
        >
          Save change
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
