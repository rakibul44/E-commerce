
import { Link } from "react-router-dom";
import { usersApi } from "../../redux/apis/usersApi";



const Customer = () => {
  const { data: customersData } = usersApi.useGetAllCustomersQuery();

  const customers = customersData?.data || [];


  return (
    <div className="container mx-auto px-4">
      <h1 className="text-lg font-semibold my-4">
        All Customers <span className="text-gray-500">{customers.length}</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 text-sm leading-normal">
              <th className="py-3 px-4 text-left">ORDER</th>
              <th className="py-3 px-4 text-left">EMAIL</th>
              <th className="py-3 px-4 text-left">LOCATION</th>
              <th className="py-3 px-4 text-center">ORDERS</th>
              <th className="py-3 px-4 text-center">LAST ORDER</th>
              <th className="py-3 px-4 text-right">TOTAL SPENT</th>
              <th className="py-3 px-4 text-center">CANCELED</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {customers?.map((customer) => (
              <tr
                key={customer?._id}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="py-3 px-4 flex items-center space-x-3">
                  <img
                    src={customer?.profilePicture}
                    alt={customer.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <Link to="#" className="font-semibold text-gray-800 hover:underline">
                    {customer?.name}
                  </Link>
                </td>
                <td className="py-3 px-4">{customer?.email}</td>
                <td className="py-3 px-4">
                {`${customer?.location?.division || ""} , ${customer?.location?.district || ""} , ${customer?.location?.upazila || "N/A"}`}
                </td>
                <td className="py-3 px-4 text-center">{customer?.totalOrders}</td>
                <td className="py-3 px-4 text-center text-blue-500 hover:underline">
                  <Link to="#">{customer?.lastOrder}</Link>
                </td>
                <td className="py-3 px-4 text-right text-green-500 font-semibold">
                  {customer?.totalSpent}
                </td>
                <td className="py-3 px-4 text-center">{customer?.canceledOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Customer;
