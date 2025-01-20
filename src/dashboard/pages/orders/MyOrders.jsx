import { useState } from "react";
import { MdPreview } from "react-icons/md";
import { orderApi } from "../../../redux/apis/orderApi";
import useAuth from "../../../hooks/useAuth";
import { FaBangladeshiTakaSign } from "react-icons/fa6";


const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ selectedProducts, setSelectedProducts ] = useState(null)
  const [modalType, setModalType] = useState("");
  const { loggedInUser } = useAuth()
  const { data: ordersData, isLoading } = orderApi.useGetAllMyOrdersQuery(loggedInUser?._id);
  
  const orders = ordersData?.data || [];
  
  console.log("orders: ", ordersData)

  const openModal = (order, type) => {
    setSelectedOrder(order);
    setSelectedProducts(order?.products)
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setSelectedProducts(null)
    setModalType("");
  };




  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4  ">Order List</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-100 border-b ">
            <tr>
              <th className="text-left p-3 text-gray-600">Order</th>
              <th className="text-left p-3 text-gray-600">Date</th>
              <th className="text-left p-3 text-gray-600">Status</th>
              <th className="text-left p-3 text-gray-600">Amount</th>
              <th className="text-left p-3 text-gray-600">Payment Status</th>
              <th className="text-left p-3 text-gray-600">Customer Details</th>
              <th className="text-left p-3 text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && orders?.map((order) => (
              <tr key={order?._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-700">{order.id}</td>
                <td className="p-3 text-gray-700">{ new Date(order?.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                <span
                   className={`px-2 py-1 rounded text-sm ${
                     order.status === "pending"
                       ? "bg-yellow-100 text-yellow-600"
                       : order.status === "processing"
                       ? "bg-blue-100 text-blue-600"
                       : order.status === "shipped"
                       ? "bg-purple-100 text-purple-600"
                       : order.status === "delivered"
                       ? "bg-green-100 text-green-600"
                       : order.status === "canceled"
                       ? "bg-red-100 text-red-600"
                       : order.status === "returned"
                       ? "bg-orange-100 text-orange-600"
                       : "bg-gray-100 text-gray-600" // default case
                   }`}
                  >  
                 {order?.status}
               </span>

                </td>
                <td className="p-3 text-gray-700 flex gap-1 items-center justify-center"> <FaBangladeshiTakaSign  className=" text-[14px]"/> {order?.totalAmount}</td>
                <td className="p-3 text-gray-700">{order?.paymentStatus}</td>
                <td className="p-3 text-gray-700">
                  <p>{order?.clientName}</p>
                  <p>{order.clientEmail}</p>
                  <p>{order.clientPhone}</p>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => openModal(order, "view")}
                    className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                  >
                    <MdPreview />
                  </button>
                </td>
         
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg  relative ">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 px-[10px] py-1 rounded-full bg-red-500 text-white "
            >
              ×
            </button>
   

              {/* Edit Details Section (Edit Modal) */}
              <div className=" w-full  ">
              
              {modalType === "view"  &&   <div className="max-h-screen overflow-y-auto px-3 py-5">
                {selectedProducts?.length > 0 && selectedProducts?.map((product, i) => (<div key={i}>
                 
                 <h3 className="text-xl font-bold mb-4">
                  {modalType === "view" ? "Product Details" : "Edit Order"}
                 </h3>
                 <div className="flex flex-col md:flex-row space-x-4 overflow-y-auto">
                  {/* Product Details Section (View Modal) */}
                 
                    <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
                      <img
                        src={product?.image}
                        alt="Product"
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>
                      <span className=" w-full">
                      <h4 className="text-lg font-semibold">{product?.product?.name}</h4>
                        <p><strong>Size:</strong> {product?.size}</p>
                        <p><strong>Color:</strong> {product?.color}</p>
                        <p><strong>Price:</strong> {product?.price}</p>
                        <p><strong>Quantity:</strong> {product?.quantity}</p>
                        <p><strong>Total Price:</strong> {product?.totalPrice}</p>
                      </span>
                  </div>
                 </div>
                 ))}
                </div>
                  }
              </div>
            </div>
          </div>
       )}
    </div>
  );
};

export default MyOrders;
