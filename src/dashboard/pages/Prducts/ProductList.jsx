import  { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { productApi } from "../../../redux/apis/productApi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productData, isLoading, refetch } = productApi.useGetAllProductsQuery();
  const [ deleteProductById ] = productApi.useDeleteProductByIdMutation();
  const location = useLocation();

  useEffect(() => { refetch()}, [location])

  if(isLoading){
    return <p>Loading..</p>
  }
 
  const products = productData?.data || [];
  const itemsPerPage = 5;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  // handle delete brand 
     const handleDeleteProduct = async (id, productName) => {
     try{
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert ${productName}!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProductById(id).then((res) => {
            console.log(res)
            if (res?.data?.success){
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: `${productName} has been deleted `,
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/dashboard/update"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add new
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="w-full bg-gray-200">
            <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Discount</th>
              <th className="py-2 px-4">Sale</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-100 border-b transition duration-300"
              >
              <td className="py-2 px-4 text-center">
                {(() => {
                  const splitId = product.id.split('-');
                  return splitId[1];
                })()}
                </td>
                <td className="py-2 px-4 flex items-center space-x-2">
                  <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className=" flex flex-col">
                  <span>{product?.name}</span>
                  <span className="  text-primarytext text-xs">({product?.brandName }) </span>
                  </span>
                </td>
     
                <td className="py-2 px-4 text-center">{product?.categoryName}</td>
                <td className="py-2 px-4 text-center">{product?.price}</td>
                <td className="py-2 px-4 text-center">
                   <span className=" flex flex-col">
                   <span className="text-primarytext text-sm">{ product?.discountPercent}%</span>
                   {product?.discountPrice}
                   </span>
                </td>
                <td className="py-2 px-4 text-center">{product?.sale}</td>
                <td className="py-2 px-4 text-center">
                  <span className="text-red-500 bg-red-100 px-2 py-1 rounded">
                    {product?.stock}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                    <Link to={`/dashboard/update-product/${product?._id}`}>
                      <FaEdit className="text-green-500 text-xl" />
                    </Link>
                    <MdOutlineDeleteForever
                      onClick={() => handleDeleteProduct(product?._id, product?.name)}
                      className="text-rose-600 text-xl cursor-pointer"
                    />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
