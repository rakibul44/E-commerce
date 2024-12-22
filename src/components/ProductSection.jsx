
import { Link } from "react-router-dom";
import { productApi } from "../redux/apis/productApi";

const ProductSection = () => {

  const { data: productsData, isLoading } = productApi.useGetNewFeaturedBestDealAndOnSellProductsQuery();

  if(isLoading){
    return <p>Loading...</p>
  }
  const productData = productsData?.data || [];

  return (
    <section className="py-8 px-4 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productData?.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 relative">
            <h2 className="text-xl font-medium border-b border-gray-300 pb-2 mb-4">
              {category.category}
            </h2>
            <div className="space-y-4 mb-12">
              {category?.items.map((product) => (
                <div key={product?._id} className="flex gap-6">
                  <Link
                    to={`/${product?._id}`}
                  >
                    <img
                      src={product?.images[0]}
                      alt={product?.name}
                      className="w-20 h-20 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div>
                    <h3 className="text-lg font-medium">{product?.name}</h3>
                    <div className="flex items-center space-x-2 text-lg">
                      <span className="text-orange-500 font-bold">
                        {product?.discountPrice ? product?.discountPrice : product?.price }
                      </span>
                     { 
                      product?.discountPrice &&   <span className="line-through text-gray-500">
                      {product?.price}
                    </span>
                     }
                    </div>
                    <div className="text-yellow-500">
                      {"★".repeat(Math.floor(product?.ratings))}
                      {"☆".repeat(5 - Math.floor(product?.ratings))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to={`/${category?.category?.toLowerCase().replace(/ /g, "-")}`}
              className="block absolute bottom-2 right-2 mt-4 text-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-lg"
            >
              View More
              <span className="ml-2">→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
