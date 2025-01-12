import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { brandApi } from "../../../redux/apis/brandApi";
import useBaseRoute from "../../../hooks/useBaseRoute";

const AddBrand = () => {
  const { register, handleSubmit, formState: { errors }, reset} = useForm();
  const [ createBrand ] = brandApi.useCreateBrandMutation();
  const { baseRoute } = useBaseRoute();

//  handle add Brand function
  const handleAddBrand = async(data) => {
    try{
  
        const res = await createBrand(data);
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
    <div className=" container p-6 mt-3">
       <div className=" flex justify-between px-5">
       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add brand</h2>
       <Link to={`${baseRoute}/brands`} className="text-xl font-bold text-center text-white mb-6  px-2 py-1 bg-btnbg hover:bg-btnbghover rounded ">All Brands</Link>

       </div>
      <form onSubmit={handleSubmit(handleAddBrand)} className=" bg-white shadow-lg p-6  max-w-lg mx-auto">
        {/* Brand Name */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2 col-span-1">
            Brand Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Brand Name is required" })}
            className={`w-full px-3 py-1 bg-white border col-span-3  ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-inputfocus  `}
            placeholder="Enter Brand name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
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
            placeholder="Enter Brand description"
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
          Add Brand
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
