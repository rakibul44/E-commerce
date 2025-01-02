/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categoryApi } from "../../../redux/apis/categoryApi";
import { brandApi } from "../../../redux/apis/brandApi";
import { productApi } from "../../../redux/apis/productApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


// update product
const UpdateProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];
  const [ isNewImage, setNewImage] = useState(false)
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [ updateProductById ] = productApi.useUpdateProductByIdMutation();
  const [ updateProductWithImageById ] = productApi.useUpdateProductWithImageByIdMutation();

  const { id } = useParams();

  // api calling
  const { data: productData , refetch} = productApi.useGetProductByIdQuery(id);
  const { data: categoryData } = categoryApi.useGetAllCategoryQuery();
  const { data: brandData } =  brandApi.useGetAllBrandsQuery ();

  const categories = categoryData?.data || [];
  const brands = brandData?.data || [];
  const currentProduct = productData?.data;
  
  console.log("isNewImage: ", isNewImage)

    // Watch price and discountPercent fields
    const price = watch("price");
    const discountPercent = watch("discountPercent");


    useEffect(() => { 
        if (discountPercent > 100) {
            setValue("discountPercent", ""); // Reset discountPercent to a valid state
           toast.error("Discount percent cannot exceed 100");
          }
      
          if (price && discountPercent) {
            // Calculate discount price
            const discountPrice = Math.ceil(price - (price * (discountPercent / 100)));
            setValue("discountPrice", discountPrice); // Set discountPrice with 2 decimal places
          } else {
            setValue("discountPrice", ""); // Clear discountPrice if price or discountPercent is not available
          }
    }, [price, discountPercent, setValue]);


  
    useEffect(() => {
      setColors( currentProduct?.colors);
      setSelectedSizes( currentProduct?.sizes);
      setImages(currentProduct?.images)

      reset({
        category: `${currentProduct?.category},${currentProduct?.categoryName}`,
        brand: `${currentProduct?.brand},${currentProduct?.brandName}`,
        name: currentProduct?.name,
        price: currentProduct?.price,
        discountPercent: currentProduct?.discountPercent,
        stock: currentProduct?.stock,
      });

    }, [ currentProduct ]);


  // handel add new product function
  const handleUpdateProduct = async(data) => {
     let updateBrandId, updateBrandName, updateCategoryId, updateCategoryName;
    const formData = new FormData();
    if (data?.brand) {
      const [brandId, brandName] = data?.brand?.split(",");
      updateBrandId = brandId;
      updateBrandName = brandName;
      formData.append("brand", brandId);
      formData.append("brandName", brandName);
    }

    // Extract categoryId and categoryName if brand exists
    if (data?.category){
      const [categoryId, categoryName] = data?.category?.split(",");
      updateCategoryId = categoryId;
      updateCategoryName = categoryName;
      formData.append("category", categoryId);
      formData.append("categoryName", categoryName);
    }
    // update product without image 
    const updateProduct = {
        name: data?.name,
        description: data?.description ,
        brandName: updateBrandName ,
        brand: updateBrandId,
        categoryName: updateCategoryName ,
        category: updateCategoryId,
        price: Number(data?.price),
        discountPercent: Number(data?.discountPercent) ,
        discountPrice: Number(data?.discountPrice),
        sizes: selectedSizes ,
        colors: colors,
        images: images,
        stock: data?.stock ,
    }

   try{
    const res = await updateProductById({ id, data: updateProduct });
    console.log(res)
    if(res?.data?.success){
    refetch();
     toast.success(res?.data?.message)
    }
   } catch(error){
    console.log(error)
   }
    
    
  if(isNewImage){
    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("price", data?.price);
    formData.append("discountPrice", data?.discountPrice);
    formData.append("stock", data?.stock);
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("colors", JSON.stringify(colors));  
    images.forEach((image) => formData.append("images", image));

    console.log("FormData content: ");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try{
      const res = await updateProductWithImageById({ id, formData});
      if(res?.data?.success){
         refetch();
         toast.success(res?.data?.message);
         setNewImage(false)
      }
    } catch(error){
      console.log(error),
      toast.error(error?.data?.message)
    }
 }
    // Add your submission logic here
  };

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if(uploadedFiles?.length > 0){
        setNewImage(true)
    }
    setImages([...images, ...uploadedFiles]);
  };

  const handleImageDelete = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !colors.includes(colorInput)) {
      setColors([...colors, colorInput]);
      setColorInput("");
    }
  };

  const handleDeleteColor = (color) => {
    setColors(colors.filter((c) => c !== color));
  };

    // Toggle size selection
    const toggleSize = (size) => {
      setSelectedSizes((prev) =>
        prev.includes(size)
          ? prev.filter((s) => s !== size) // Remove if already selected
          : [...prev, size] // Add if not selected
      );
    };

  return (
    <form onSubmit={handleSubmit(handleUpdateProduct)} className="md:p-8 flex flex-col lg:flex-row gap-6">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Product name *</label>
          <input
            type="text"
            placeholder="Enter product name"
            {...register("name", { required: "Product name is required", maxLength: 20 })}
            className="w-full border p-2 rounded-md"
            defaultValue={ currentProduct?.name }
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Category *</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Choose category</option>
            {
              categories?.length > 0 && categories?.map((cat) => <option key={cat?._id} value={`${cat?._id},${cat?.name}`}>{cat?.name}</option>  )
            }
   
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Brand *</label>
          <select
            {...register("brand", { required: "Brand is required" })}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Choose brand</option>
            {
              brands?.length > 0 && brands?.map((brand) =>  <option key={brand?._id} value={ `${brand?._id},${brand.name}` }>{brand?.name}</option> )
            }

          </select>
          {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
        </div>

           {/* Regular Price */}
         <div className="mb-4">
        <label className="block font-medium text-sm capitalize">Regular Price *</label>
        <input
          type="number"
          step="any"
          placeholder="Regular Price"
          {...register("price", {
            required: "Price is required",
            min: { value: 1, message: "Regular Price must be a positive value" },
          })}
          className="w-full border p-2 rounded-md"
          defaultValue={currentProduct?.price}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price?.message}</p>}
      </div>
      
      {/* Discount Price %*/}
      <div className="mb-4">
        <label className="block font-medium text-sm capitalize">Discount Price % *</label>
        <input
          type="number"
          placeholder="Enter discount price Percent"
          {...register("discountPercent", {
            min: { value: 1, message: "Discount Price percent must be a positive value" },
            max: { value: 100, message: "Discount price percent not greater than 100" }
          })}
          className="w-full border p-2 rounded-md"
          defaultValue={currentProduct?.discountPercent}
        />
        {errors.discountPercent && <p className="text-red-500 text-sm">{errors.discountPercent?.message}</p>}
      </div>

      {/* Discount Price */}
      <div className="mb-4">
        <label className="block font-medium text-sm capitalize">Discount Price *</label>
        <input
          type="number"
          disabled
          placeholder="Discount Price"
          {...register("discountPrice", {
            min: { value: 1, message: "Discount Price must be a positive value" },
            max: { value: price ? price : 100, message: "Discount price not greater than regular price" }
          })}
          className="w-full border p-2 rounded-md"
        />
        {errors.discountPrice && <p className="text-red-500 text-sm">{errors.discountPrice?.message}</p>}
      </div>

        {/*  Stock limit */}
        <div className="mb-4">
        <label className="block font-medium text-sm capitalize"> Stock limit *</label>
        <input
          type="number"
          placeholder="Stock limit"
          {...register("stock", {
            required: "Stock limit is required",
            min: { value: 1, message: "Stock limit must be a positive value" },
          })}
          className="w-full border p-2 rounded-md"
          defaultValue={currentProduct?.stock}
        />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock?.message}</p>}
      </div>


        {/* Colors */}
        <div className="mb-4">
          <label className="block font-medium text-sm">Colors *</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Enter color"
              className="w-full border p-2 rounded-md"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="bg-btnbg  hover:bg-btnbghover   text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {colors?.map((color, idx) => (
              <div key={idx} className="flex items-center bg-gray-100 px-3 py-1 rounded-md">
                {color}
                <button
                  type="button"
                  onClick={() => handleDeleteColor(color)}
                  className="ml-2 text-red-500"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-sm">Description *</label>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full border p-2 rounded-md"
            defaultValue={currentProduct?.description}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-md shadow-sm">
        {/* Image Upload */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Upload images</h3>
          <div className="flex gap-4 mt-2 flex-wrap">
            {images?.length < 6 && (
              <label className="border-2 border-dashed flex items-center justify-center w-28 h-28 rounded-md cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="text-blue-500">+ Upload</span>
              </label>
            )}
            {images?.map((image, idx) => (
              <div key={idx} className="relative w-28 h-28">
                      {/* Check if the image is a file or URL */}
                      {typeof image === "string" ? (
              <img
                src={image}
                alt={`product-${idx}`}
                className="w-20 h-20 object-cover"
              />
            ) : (
              <img
                src={URL.createObjectURL(image)}
                alt={`uploaded-${idx}`}
                className="w-20 h-20 object-cover"
              />
            )}
                <button
                  type="button"
                  onClick={() => handleImageDelete(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Add size</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {sizes?.map((size, idx) => (
              <button 
              key={idx}
              type="button" 
              onClick={() => toggleSize(size)}
              className={`border p-2 rounded-md ${
                selectedSizes?.includes(size) ? "bg-btnbg hover:bg-btnbghover text-white" : "hover:bg-gray-100"
              }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button type="submit" className="bg-btnbg hover:bg-btnbghover text-white px-4 py-2 rounded-md">
            Save change
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateProduct;
