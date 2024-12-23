import { Link } from "react-router-dom";
import { categoryApi } from "../../../redux/apis/categoryApi";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const Categories = () => {
   const { data: categoryData, isLoading, refetch } = categoryApi.useGetAllCategoryQuery();
   const [deleteCategory ] = categoryApi.useDeleteCategoryMutation();

   const categories = categoryData?.data || [];

// handle delete category 
   const handleDeleteCategory = async (id, categoryName) => {
   try{
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert ${categoryName}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id).then((res) => {
          console.log(res)
          if (res?.data?.success){
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${categoryName} has been deleted `,
              icon: "success",
            });
          }

        });
      }
    });
   } catch(err){
    console.log(err)
    toast.error(err?.message)
   }
  };

    return (
      <div className="container mx-auto mt-5">
      <div className="flex justify-between px-4 mb-3">
        <h3 className="text-xl font-semibold">All Categories</h3>
        <Link
          to={`/dashboard/add-category`}
          className="px-2 py-1 bg-btnbg hover:bg-btnbghover rounded text-white text-[16px]"
        >
          Add New Category
        </Link>
      </div>
    
      <div className="container overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Si</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Slug</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Row Loop */}
            {(!isLoading && categories) ? (
              categories.map((category, i) => (
                <tr key={category?._id} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{category?.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{category?.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                      {category?.slug}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <Link to={`/dashboard/edit-category/${category?._id}`}>
                      <FaEdit className="text-green-500 text-xl" />
                    </Link>
                    <MdOutlineDeleteForever
                      onClick={() => handleDeleteCategory(category?._id, category?.name)}
                      className="text-rose-600 text-xl cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Categories not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
    );
};

export default Categories;