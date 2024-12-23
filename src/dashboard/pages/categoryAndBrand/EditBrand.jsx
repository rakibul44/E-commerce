import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { brandApi } from "../../../redux/apis/brandApi";

const EditBrand = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }} = useForm();

  const { data: brandData , isLoading, refetch,} = brandApi.useGetBrandByIdQuery(id);
  const [ updateBrand ] = brandApi.useUpdateBrandMutation();
  const  currentBrand = brandData?.data;

  console.log(brandData)

  


if(isLoading){
  return <p>Loading...</p>
}

//  handle add Brand function
  const handleUpdateBrand = async(data) => {
        const  res = await updateBrand({ id ,data});
      if(res?.data?.success){
          refetch()
            toast.success(res?.data?.message)
        }
  };





  return (
    <div className=" container bg-gray-50  rounded-lg p-6 mt-3">
       <div className=" flex justify-between px-5">
       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Brand</h2>
       <Link to={"/dashboard/brands"} className="text-xl font-bold text-center text-white mb-6  px-2 py-1 bg-btnbg hover:bg-btnbghover  rounded ">All Brands</Link>

       </div>
      <form onSubmit={handleSubmit(handleUpdateBrand)} className=" max-w-lg mx-auto bg-white shadow-lg  p-6 ">
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
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-inputfocus`}
            placeholder="Enter Brand name"
            defaultValue={currentBrand?.name}
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
            defaultValue={currentBrand?.description}
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
            defaultValue={currentBrand?.slug}
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

export default EditBrand;
