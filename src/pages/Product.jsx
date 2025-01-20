/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GiSelfLove } from 'react-icons/gi';
import { FaCartPlus } from 'react-icons/fa';
// import winter from '../assets/winter.jpg';
import { productApi } from '../redux/apis/productApi';
import useFunc from '../hooks/useFunc';
import { cartsApi } from '../redux/apis/cartsApi';
import useAuth from '../hooks/useAuth';
import { categoryApi } from '../redux/apis/categoryApi';

function Product() {
  const [searchParams] = useSearchParams();
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    price: [],
    size: [],
    colors: [],
    brand: [],
  });
  const { handleAddToCart, handleAddToWishlist } = useFunc();
  const category =searchParams.get("category");
  const searchTerm =searchParams.get("searchTerm") || "";
  const { data: filtersOptions } = categoryApi.useGetFiltreOptionsByCategoriesBrandsAndOthersQuery();
  const filters = filtersOptions?.data || [];
  const filterParams = new URLSearchParams();
  

  console.log("searchTerm: ", searchTerm)
  // Add filters to query 
  if(category){
    filterParams.append('category', category)
  }
  if(searchTerm){
    filterParams.append('searchTerm', searchTerm);
  }
  if (selectedFilters.category.length) {
    filterParams.append('category', selectedFilters.category.join(','));
  }
  if (selectedFilters.price.length) {
    filterParams.append('price', selectedFilters.price.map((range) => `${range[0]}-${range[1]}`).join(','));
  }
  if (selectedFilters.size.length) {
    filterParams.append('size', selectedFilters.size.join(','));
  }
  if (selectedFilters.colors.length){
    console.log(selectedFilters.colors)
    filterParams.append('colors', selectedFilters.colors.join(','));
  }
  if (selectedFilters.brand.length) {
    filterParams.append('brand', selectedFilters.brand.join(','));
  }
 const { loggedInUser } = useAuth();
 // eslint-disable-next-line no-unused-vars
 const { data: cartsData , refetch: refetchCarts} = cartsApi.useGetAllCartsByUserIdQuery(loggedInUser?._id);
  
  const { data: productData, isLoading, refetch } = productApi.useGetAllProductsQuery(filterParams.toString(), searchTerm);

 useEffect(()=> { refetch()}, [selectedFilters])

  if(isLoading){
    return <p>Loading..</p>
  }





  const products = productData?.data || [];


  
  const toggleFilter = (filterName) => {
    setExpandedFilter((prev) => (prev === filterName ? null : filterName));
  };

  const handleCheckboxChange = (filterCategory, value) => {
    setSelectedFilters((prev) => {
      const current = prev[filterCategory];
      return {
        ...prev,
        [filterCategory]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const filteredProducts = products.filter((product) => {
    const { category, price, size, colors, brand } = selectedFilters;

    const matchesCategory = !category.length || category.includes(product.category);
    const matchesPrice =
      !price.length ||
      price.some((range) => product.price >= range[0] && product.price <= range[1]);
    const matchesSize = !size.length || size.includes(product.size);
    const matchesColor = !colors.length || colors.includes(product.colors);
    const matchesBrand = !brand.length || brand.includes(product.brand);

    return matchesCategory && matchesPrice && matchesSize && matchesColor && matchesBrand;
  });

  return (
    <div className="flex flex-wrap min-h-screen">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 p-4 border-r">
        <h2 className="font-bold text-lg mb-4">FILTER BY</h2>
        <button
          onClick={() => setSelectedFilters({ category: [], price: [], size: [], colors: [], brand: [] })}
          className="text-red-500 mb-2"
        >
          CLEAR ALL
        </button>

        {filters.map((filter) => (
          <div key={filter.name} className="mb-6">
            <h3 className="font-semibold text-md flex justify-between">
              {filter.name}
              <button onClick={() => toggleFilter(filter.name)} className="text-blue-500">
                {expandedFilter === filter.name ? '-' : '+'}
              </button>
            </h3>
            {expandedFilter === filter.name && (
              <ul className="mt-2 ml-4">
                {filter.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={
                          filter.key === 'price'
                            ? selectedFilters.price.some(
                                (range) => range[0] === item.range[0] && range[1] === item.range[1]
                              )
                            : selectedFilters[filter.key].includes(item.label)
                        }
                        onChange={() =>
                          handleCheckboxChange(
                            filter.key,
                            filter.key === 'price' ? item.range : item.label
                          )
                        }
                      />
                      {item.label}
                    </label>
                    {item.count && <span>{item.count}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </aside>

      {/* Product Grid */}
      <main className="w-full md:w-3/4 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts?.length > 0 ? filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative border p-2 rounded text-center group hover:shadow-lg transition"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden">
                <img
                  src={product?.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => handleAddToWishlist({ product: product?._id})}>
                  <GiSelfLove className="text-white text-3xl mx-2 cursor-pointer hover:scale-110 transition-transform" />
                    </button>              
                  <button
                    className="text-white text-3xl mx-2 cursor-pointer hover:scale-110 transition-transform flex justify-center items-center"
                    onClick={() =>
                      handleAddToCart({
                        product: product?._id,
                        quantity: 1,
                        price: product?.price,
                        size: product?.sizes[0],
                        color: product?.colors[0],
                      }, refetchCarts)
                    }
                  >
                    <FaCartPlus />
                  </button>
                </div>
              </div>
              <h4 className="mt-2 font-bold">{product.name}</h4>
              <p className="text-gray-500 mb-2">${product.price.toFixed(2)}</p>
              <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                <Link
                  to={`/buy-now/${product?._id}`}
                  className="bg-btnbg hover:bg-btnbghover text-white px-4 py-2 rounded text-sm sm:text-base"
                >
                  Buy Now
                </Link>
                <Link
                  to={`/product-details/${product?._id}`}
                  className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                >
                  Details
                </Link>
              </div>
            </div>
          )) :
            <div className=' h-screen flex items-center justify-center'>
              <p className=' text-center text-xl'>Product not found</p>
            </div>
          }
        </div>
      </main>
    </div>
  );
}

export default Product;
