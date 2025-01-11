import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BDLocations } from "react-bd-location";
import { usersApi } from "../../redux/apis/usersApi";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const { register, handleSubmit } = useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [ imageFile, setImageFile ] = useState(null);
  const [ updateUser ] = usersApi.useUpdateUserMutation();
  const email = localStorage.getItem("email");
  const { data: userData, isLoading, refetch } = usersApi.useGetUserByEmailQuery(email);

  
  const loggedInUser = userData?.data;
  useEffect(() => {
    setProfileImage(loggedInUser?.profilePicture);
    setDivision(loggedInUser?.address?.division);
    setDistrict(loggedInUser?.address?.district);
    setUpazila(loggedInUser?.address?.upazila);
   }, [loggedInUser])


   console.log(loggedInUser)

  

  // Handle form submission
  const handleUpdateProfile = async(data) => {

   try{
    let res;
   
    if(imageFile){
      const formData = new FormData();
      formData.append("prpfilePicture", imageFile);
      formData.append("phone", data?.phone);
      formData.append("address.division", division);
      formData.append("address.district", district);
      formData.append("address.upazila", upazila);
      formData.append("fullAddress", data?.fullAddress);
    }
    res = await updateUser({ id: loggedInUser?._id, data});

    data.address.division = division;
    data.address.district = district;
    data.address.upazila = upazila;

    console.log(res);

    if(res?.data?.success){
      refetch();
      toast.success(res?.data?.message)
    }
   } catch(err){
    console.log(err)
   }

  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file)
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };


      // Handle location change
      const handleLocationChange = (location) => {
        console.log(location)
        if(location.id){
          setDivision(location?.name)
        }
       if(location.division_id){
        setDistrict(location?.name)
       }
       setUpazila(location?.name)
    };

  return (
    <div className={`max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 ${isLoading ? "blur-sm pointer-events-none" : ""}` }>
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center md:col-span-2">
          <label className="text-gray-700 font-bold mb-2">Update Profile Picture</label>
          <div className="relative w-32 h-32 mb-4">
            <img
              src={profileImage || "https://via.placeholder.com/300"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
            <label
              htmlFor="profilePic"
              className="absolute bottom-2 right-2 bg-black text-white p-1 rounded-full cursor-pointer hover:bg-gray-800"
            >
              ✎
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Individual Form Fields */}

        <div>
          <label className="block text-gray-700 mb-1">Full Name*</label>
          <input
            {...register("name")}
            disabled
            type="text"
            defaultValue={loggedInUser?.name}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email*</label>
          <input
            {...register("email")}
            type="email"
            defaultValue={loggedInUser?.email}
            disabled
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Phone Number*</label>
          <input
            {...register("phone")}
            type="text"
            defaultValue={loggedInUser?.phone}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
         {/* address selectior */}
             <div className=" my-3">
             <h1> Select Your Address</h1>
             <BDLocations 
                 onChange={handleLocationChange} 
                 bn={false} showLable={false} 
                 className =" my-2"
                 defaultDivision={division}
                 defaultDistrict={district}
                 defaultUpazila={upazila}
             />
           </div>

        <div>
          <label className="block text-gray-700 mb-1">Full Address*</label>
          <input
            {...register("fullAddress")}
            type="text"
            defaultValue={loggedInUser?.fullAddress}
            placeholder="Enter your full address here"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

 
        <div>
          <label className="block text-gray-700 mb-1">Postcode / ZIP*</label>
          <input
            {...register("zip")}
            type="text"
            defaultValue={loggedInUser?.zip}
            placeholder="Enter your postecode / ZIP"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 md:col-span-2">
          <button
            type="button"
            className="text-red-500 hover:text-red-700 font-bold"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
