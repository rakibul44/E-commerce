import { Link } from "react-router-dom";
import { productApi } from "../redux/apis/productApi";
// import man from "../assets/man.jpg";


const Collections = () => {
  const { data: collectionData} = productApi.useGetMenAndWomenCollectionProductsQuery();
  const collections = collectionData?.data || [];


  return (
    <section className="py-10 px-4">
      <div className="container mx-auto cursor-pointer">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections?.map((collection) => (
            <div
              key={collection?._id}
              className="relative bg-gray-100 rounded-lg overflow-hidden group"
            >
              {/* Image */}
              <img
                src={collection?.image}
                alt={collection?.title}
                className="w-full  object-cover h-96 md:h-[470px] "
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center items-start p-6 bg-white/20 group-hover:bg-white/50 transition">
                <p className="text-primarytext text-lg font-semibold">
                  {`Save up to ${collection?.discountPercent}%`}
                </p>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {collection?.title}
                </h2>
                <Link to='/product'>
                <button className="flex items-center bg-btnbg text-white px-6 py-2 rounded-lg shadow-lg hover:bg-btnbghover transition">
                  Shop Now
                  <span className="ml-2">→</span>
                </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections; 
