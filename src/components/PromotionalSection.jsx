import { Link } from "react-router-dom";
import { productApi } from "../redux/apis/productApi";


const PromotionalSection = () => {
  const { data: productData } = productApi.useGetTopSevenDiscountCategoriesQuery();

  const products = productData?.data || [];
  const topOne = products?.length > 0 && products[0];
   
  
  return (
    <section className="p-4 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Large vertical card */}
        <div className="row-span-2 relative bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in">
          <Link to={topOne?.categoryName}>
            <img
              src={topOne?.image}
              alt={topOne?.categoryName}
              className="w-full h-full object-cover"
            />
            {/* Overlay content */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
              <p className="text-red-500 text-sm mb-1">
                Save up to {topOne?.discountPercent} %
              </p>
              <h3 className="text-lg font-bold mb-2">{topOne?.categoryName}</h3>
              <Link
                to={`/product?category=${topOne?.category}`}
                className="mt-4 text-black py-2 px-4 rounded-md bg-btnbg hover:bg-btnbghover"
              >
                {`Shop Now`}
                <span className="ml-2">→</span>
              </Link>
            </div>
          </Link>
        </div>

        {/* Smaller horizontal cards */}
        {products?.slice(1).map((product, index) => (
          <div
            key={product?.category}
            className={`relative bg-white shadow-lg rounded-lg overflow-hidden animate-fade-in`}
            style={{ animationDelay: `${index * 0.2}s` }} // Staggered fade-in
          >
            <Link to={product?.category}>
              <img
                src={product?.image}
                alt={product?.categoryName}
                className="w-full h-56 object-cover"
              />
              {/* Overlay content */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4">
                {index === 0 && (
                  <p className="text-red-500 text-sm mb-1">{'Limited offer'}</p>
                )}
                {index === 1 && (
                  <p className="text-red-500 text-sm mb-1">{'Weekend Offer'}</p>
                )}
                {index === 2 && (
                  <p className="text-red-500 text-sm mb-1">{'Special Offer'}</p>
                )}
                <h3 className="text-lg font-bold mb-2">{product?.categoryName}</h3>
                { index >= 3 && (
                  <p className="text-gray-300 text-sm mb-2">
                    Save up to {product?.discountPercent} %
                  </p>
                )}
                { index >= 3 && (
                  <Link
                    to={`/product?category=${product?.category}`}
                    className="mt-4 text-white py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-600"
                  >
                     Shop Now
                    <span className="ml-2">→</span>
                  </Link>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionalSection;
