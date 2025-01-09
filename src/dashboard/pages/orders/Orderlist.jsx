import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { orderApi } from "../../../redux/apis/orderApi";


const OrderList = () => {
  const { register, handleSubmit } = useForm();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ selectedProducts, setSelectedProducts ] = useState(null)
  const [modalType, setModalType] = useState("");
  const { data: ordersData, isLoading } = orderApi.useGetAllOrderQuery();
  const [updateOrderStatusById] =orderApi.useUpdateOrderStatusByIdMutation();
  
  const orders = ordersData?.data || [];
  
  console.log("selectedProducts: ", selectedProducts)

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


// handle update status
const hanldeUpdateStatus = async(data, id) => {
  console.log("status data: ", data?.status)
  const res = await updateOrderStatusById(id, data?.status);
  console.log(" stats update res: ", res)
  if(res?.data?.success){
    toast.success(res?.data?.message)
  } else if(res?.error){
    toast.error(res?.error?.data?.message)
  }
}


  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-3 text-gray-600">Order</th>
              <th className="text-left p-3 text-gray-600">Date</th>
              <th className="text-left p-3 text-gray-600">Status</th>
              <th className="text-left p-3 text-gray-600">Amount</th>
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
                <td className="p-3 text-gray-700">{order?.totalAmount}</td>
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
                  <button
                    onClick={() => openModal(order, "edit")}
                    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center"
                  >
                    <FaRegEdit />
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

                {modalType === "edit" && <div className=" px-3 py-5">
                 <h4 className="text-lg font-semibold">{selectedOrder.productName}</h4>

                    <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                    <p><strong>Date:</strong> {new Date(selectedOrder?.createdAt).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {selectedOrder?.status}</p>
                    <p><strong>Total Price:</strong> {selectedOrder?.totalAmount}</p>
                    
                    <form   onSubmit={handleSubmit((data) => hanldeUpdateStatus(data, selectedOrder?._id))}>
                    <label className="block mt-4">
                    <span className="text-gray-700">Change Status:</span>
                    <select
                      className="block w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                      defaultValue={selectedOrder?.status || ""}
                      {...register("status")}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                      <option value="returned">Returned</option>
                    </select>
                  </label>

                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                      Update Status
                    </button>
                    </form>
    
                
                </div> }
              </div>
            </div>
    
          </div>
       )}
    </div>
  );
};

export default OrderList;
