import { MdOutlineDeleteForever, MdPreview } from "react-icons/md";
import { orderApi } from "../../../redux/apis/orderApi";
import useFunc from "../../../hooks/useFunc";


const PendingOrders = () => {
  const { data: orderData } = orderApi.useGetOrdersByStatusQuery("pending")
  const [ deletePendingOrderById  ] = orderApi.useDeletePendingOrderByIdMutation();
  const pendingOrders = orderData?.data || [];
  const { handleDeleteSingleData } = useFunc();


 // handle delete category 
    const handleDeletePendingOrder = async (id, title) => {
      await handleDeleteSingleData(deletePendingOrderById, id, title)
   };

   
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 text-gray-600">Order</th>
              <th className="text-left p-3 text-gray-600">Date</th>
              <th className="text-left p-3 text-gray-600">Payment Status</th>
              <th className="text-left p-3 text-gray-600">Amount</th>
              <th className="text-left p-3 text-gray-600">Customer Details</th>
              <th className="text-left p-3 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders?.map((order) => (
              <tr key={order?._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-700">{order?.id}</td>
                <td className="p-3 text-gray-700">{ new Date(order?.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      order?.paymentStatus === "paid"
                        ? "bg-green-100 text-green-600"
                        : order?.paymentStatus === "unpaid"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order?.paymentStatus}
                  </span>
                </td>
                <td className="p-3 text-gray-700">{order?.totalAmount}</td>
                <td className="p-3 text-gray-700">
                  <p>{order?.clientName}</p>
                  <p>{order?.clientEmail}</p>
                  <p>{order?.clientPhone}</p>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-btnbg text-white px-4 py-2 rounded hover:bg-btnbghover transition"
                  >
                    <MdPreview />
                  </button>
                  <button
                  onClick={() => handleDeletePendingOrder(order?._id, "Order ")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    <MdOutlineDeleteForever />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(pendingOrders.length / ordersPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default PendingOrders;
