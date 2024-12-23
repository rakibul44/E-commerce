import React from "react";

const quotes = [
  {
    id: 1,
    title:
      "“ Being perfectly well-dressed gives one a tranquillity that no religion can bestow ”",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.",
  },
  // You can add more quotes here
];

const Quote = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 bg-white">
      {/* Section Header */}
      <h3 className="text-sm uppercase font-medium tracking-widest text-gray-500">
        Our Mission
      </h3>

      {/* Map through quotes */}
      {quotes.map((quote) => (
        <div key={quote.id} className="mt-10 px-4 sm:px-8 lg:px-16">
          {/* Title */}
          <h1 className="text-xl sm:text-xl md:text-xl font-light uppercase italic mt-4">
            {quote.title}
          </h1>

          {/* Subtitle/Description */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-500 mx-auto text-center max-w-3xl">
            {quote.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Quote;
