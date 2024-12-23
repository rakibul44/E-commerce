import  { useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../../redux/apis/productApi";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productData, isLoading } = productApi.useGetAllProductsQuery();


  if(isLoading){
    return <p>Loading..</p>
  }
 
  const products = productData?.data || [];
  const itemsPerPage = 3;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4">Product ID</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Sale</th>
              <th className="py-2 px-4">Stock</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-100 border-b transition duration-300"
              >
                <td className="py-2 px-4 flex items-center space-x-2">
                  <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{product?.name}</span>
                </td>
                <td className="py-2 px-4 text-center">
                {(() => {
                  const splitId = product.id.split('-');
                  return splitId[1];
                })()}
                </td>
                <td className="py-2 px-4 text-center">{product?.price}</td>
                <td className="py-2 px-4 text-center">{product?.quantity}</td>
                <td className="py-2 px-4 text-center">{product?.sale}</td>
                <td className="py-2 px-4 text-center">
                  <span className="text-red-500 bg-red-100 px-2 py-1 rounded">
                    {product?.stock}
                  </span>
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
