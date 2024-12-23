import React, { useState, useEffect } from "react";
import man from "../assets/man.jpg"; // Import your local images
import boutique from "../assets/boutique.jpg";
import cloth from "../assets/cloth.jpg";

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: boutique,
      title: "Slide 1 Title",
      buttonText: "Learn More",
      link: "#",
    },
    {
      id: 2,
      image: man,
      title: "Slide 2 Title",
      buttonText: "Shop Now",
      link: "#",
    },
    {
      id: 3,
      image: cloth,
      title: "Slide 3 Title",
      buttonText: "Discover",
      link: "#",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full flex-shrink-0 relative h-full"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-center">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                {slide.title}
              </h2>
              <a
                href={slide.link}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;


