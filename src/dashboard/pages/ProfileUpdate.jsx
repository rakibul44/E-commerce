import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ProfileUpdate = () => {
  const { register, handleSubmit } = useForm();
  const [profileImage, setProfileImage] = useState(null);

  // Profile fields data
  const profileFields = [
    { label: "First Name", name: "firstName", defaultValue: "Demo Name" },
    { label: "Last Name", name: "lastName", defaultValue: "Demo Name" },
    { label: "Email", name: "email", type: "email", defaultValue: "demoemail@gmail.com" },
    { label: "Phone Number", name: "phone", defaultValue: "012 3 ******" },
    { label: "Country", name: "country", defaultValue: "Country" },
    { label: "Address", name: "address", defaultValue: "your address here" },
    { label: "Town / City", name: "city", defaultValue: "Town/City" },
    { label: "Postcode / ZIP", name: "zip", defaultValue: "0000" },
  ];

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Updated Profile Information:", data);
    alert("Profile Updated Successfully!");
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loop through profileFields array to create inputs */}
        {profileFields.map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 mb-1">{field.label}*</label>
            <input
              {...register(field.name)}
              type={field.type || "text"} // Default to "text" if type is not provided
              defaultValue={field.defaultValue}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        ))}

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
