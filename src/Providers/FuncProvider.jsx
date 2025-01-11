/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";
import { toast } from "react-toastify";
import { cartsApi } from "../redux/apis/cartsApi";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { wishlistApi } from "../redux/apis/wishlistApi";

export const FuncContext = createContext(null);


const FuncProvider = ({ children }) => {    
const { loggedInUser } = useAuth();
const [ addToCart ] = cartsApi.useAddToCartMutation();
const [ updateQuantityById ] = cartsApi.useUpdateQuantityByIdMutation();
const [ deleteCartById ] = cartsApi.useDeleteCartByIdMutation();
const [ addToWishlist ] = wishlistApi.useAddToWishlistMutation();
const [ deletewishlistById  ] = wishlistApi.useDeletewishlistByIdMutation();

// handle add to cart func
 const handleAddToCart = async(data) => {
 if(!loggedInUser){
  toast.error("Please login !");
  return;
 }

 try{
    const cartData = {
        user: loggedInUser?._id,
        product: data?.product,
        price: data?.price,
        quantity: data?.quantity,
        size: data?.size,
        color: data?.color
      }    
    const res =  await addToCart(cartData);
    if(res?.data?.success){
        toast.success(res?.data?.message)
    } else if(res?.error?.data){
      toast.error(res?.error?.data?.message)
    }

 } catch(error){
    console.log(error)
    toast.error(error);
 }
}

// handle delete data
const handleDeleteSingleData = async(deleteApi, id, title) => {
      try{
       Swal.fire({
         title: "Are you sure?",
         text: `You won't be able to revert ${title}!`,
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
       }).then((result) => {
         if (result.isConfirmed) {
          deleteApi(id).then((res) => {
             console.log(res)
             if (res?.data?.success){
               Swal.fire({
                 title: "Deleted!",
                 text: `${title} has been deleted `,
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
}

// handle delete cart
const handleDeleteCart = async(id ) => {
    try{

            Swal.fire({
              title: "Are you sure?",
              text: `You won't be able to revert !`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                deleteCartById(id).then((res) => {
                  console.log(res)
                  if (res?.data?.success){
                    Swal.fire({
                      title: "Deleted!",
                      text: `Product has been deleted from cart`,
                      icon: "success",
                    });
                  }
        
                });
              }
            });
  
    } catch(error){
        toast.error(error.message)
    }
}

  // handle quantity change
  const handleCartProductQuantityChange = async(id, quantityChange) => {
     try{
        const res = await updateQuantityById({id, quantityChange});
        if(res?.data?.success){
            toast.success(res?.data?.message)
        }
        else if(res?.error){
          toast.error(res?.error?.data?.message)
        }
        console.log("res:" , res)
     } catch(err){
        console.log("error: ", err)
        toast.error(err?.data?.message)
     }
  };



  
// handle add to cart func
 const handleAddToWishlist = async(data) => {
  try{
     const res =  await addToWishlist(data);
     if(res?.data?.success){
         toast.success(res?.data?.message);
     } else if(res?.error?.data){
       toast.error(res?.error?.data?.message);
     }
 
  } catch(error){
     console.log(error)
     toast.error(error);
  }
 }


//  handle delete wishlist
const handleDeleteWishlist = async(id, refetch ) => {
  try{
          Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              deletewishlistById(id).then((res) => {
                console.log(res)
                if (res?.data?.success){
                  refetch();
                  Swal.fire({
                    title: "Deleted!",
                    text: `Product has been deleted from wishlist`,
                    icon: "success",
                  });
                }
      
              });
            }
          });

  } catch(error){
      toast.error(error.message)
  }
}

    const functions = {
        handleAddToCart,
        handleDeleteCart,
        handleCartProductQuantityChange,
        handleAddToWishlist,
        handleDeleteWishlist,
        handleDeleteSingleData
        
    }
    return (
     <FuncContext.Provider value={functions}>{children}</FuncContext.Provider>      
    );
};

export default FuncProvider;