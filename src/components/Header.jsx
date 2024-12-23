import { Link } from "react-router-dom";
import winter from '../assets/winter.jpg';
import TNF from '../assets/TNF.jpg';

const HeaderSection = () => {
  const images = [
    {
      id: 1,
      src: winter ,
      alt: "Men's Fashion",
      link: "/men-fashion",
    },
    {
      id: 2,
      src: TNF ,
      alt: "Women's Fashion",
      link: "/women-fashion",
    },
    //USE ONLY TWO PHOTOS
  ];

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-screen bg-white text-white ">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center bg-midnight px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Make your <br /> Fashion look
        </h1>
        <p className="text-lg md:text-xl mb-6">More Charming</p>
        <Link
          to="/product"
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          Explore
        </Link>
        <div className="mt-8">
          <button
            onClick={handleScroll}
            className="text-sm animate-pulse flex flex-col items-center"
          >
            <p>Scroll down</p>
            <span className="block text-xl mt-2 animate-bounce">&#8595;</span>
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="grid grid-cols-2 gap-2 items-center">
        {images.map((image) => (
          <Link
            key={image.id}
            to={image.link}
            className="hover:opacity-80 transition"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeaderSection;
