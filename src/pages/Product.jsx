import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiSelfLove } from 'react-icons/gi';
import { FaCartPlus } from 'react-icons/fa';
import winter from '../assets/winter.jpg';

function Product() {
  const filters = [
    {
      name: 'PRODUCT TYPE',
      key: 'type',
      items: [
        { label: 'Blouses', count: 4 },
        { label: 'Denim', count: 2 },
        { label: 'Dresses', count: 3 },
        { label: 'Jacket', count: 4 },
        { label: 'T-Shirt', count: 4 },
        { label: 'Trousers', count: 7 },
      ],
    },
    {
      name: 'PRICE',
      key: 'price',
      items: [
        { label: '0-20', range: [0, 20] },
        { label: '21-50', range: [21, 50] },
        { label: '51-100', range: [51, 100] },
      ],
    },
    {
      name: 'SIZE',
      key: 'size',
      items: [
        { label: 'S', count: 10 },
        { label: 'M', count: 8 },
        { label: 'L', count: 6 },
        { label: 'XL', count: 2 },
        { label: 'XXL', count: 1 },
      ],
    },
    {
      name: 'COLOR',
      key: 'color',
      items: [
        { label: 'Red', count: 3 },
        { label: 'Blue', count: 5 },
        { label: 'Green', count: 4 },
      ],
    },
    {
      name: 'BRAND NAME',
      key: 'brand',
      items: [
        { label: 'Brand A', count: 6 },
        { label: 'Brand B', count: 4 },
        { label: 'Brand C', count: 3 },
      ],
    },
  ];

  const products = [
    { id: 1, name: 'Blouses', price: 10, img: winter, type: 'Blouses', size: 'S', color: 'Red', brand: 'Brand A' },
    { id: 2, name: 'Denim', price: 20, img: winter, type: 'Denim', size: 'M', color: 'Blue', brand: 'Brand B' },
    { id: 3, name: 'Dresses', price: 30, img: winter, type: 'Dresses', size: 'L', color: 'Green', brand: 'Brand C' },
    { id: 4, name: 'Jacket', price: 40, img: winter, type: 'Jacket', size: 'S', color: 'Red', brand: 'Brand A' },
    { id: 5, name: 'T-Shirt', price: 50, img: winter, type: 'T-Shirt', size: 'M', color: 'Blue', brand: 'Brand B' },
    { id: 6, name: 'Trousers', price: 60, img: winter, type: 'Trousers', size: 'L', color: 'Green', brand: 'Brand C' },
  ];

  const [expandedFilter, setExpandedFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    price: [],
    size: [],
    color: [],
    brand: [],
  });

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
    const { type, price, size, color, brand } = selectedFilters;

    const matchesType = !type.length || type.includes(product.type);
    const matchesPrice =
      !price.length ||
      price.some((range) => product.price >= range[0] && product.price <= range[1]);
    const matchesSize = !size.length || size.includes(product.size);
    const matchesColor = !color.length || color.includes(product.color);
    const matchesBrand = !brand.length || brand.includes(product.brand);

    return matchesType && matchesPrice && matchesSize && matchesColor && matchesBrand;
  });

  return (
    <div className="flex flex-wrap">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 p-4 border-r">
        <h2 className="font-bold text-lg mb-4">FILTER BY</h2>
        <button
          onClick={() => setSelectedFilters({ type: [], price: [], size: [], color: [], brand: [] })}
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
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative border p-2 rounded text-center group hover:shadow-lg transition"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <GiSelfLove className="text-white text-3xl mx-2 cursor-pointer hover:scale-110 transition-transform" />
                  <FaCartPlus className="text-white text-3xl mx-2 cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </div>
              <h4 className="mt-2 font-bold">{product.name}</h4>
              <p className="text-gray-500 mb-2">${product.price.toFixed(2)}</p>
              <div className="flex flex-col gap-2 md:flex-row md:justify-center">
                <Link
                  to={`/payment`}
                  className="bg-orange-700 hover:bg-orange-400 text-white px-4 py-2 rounded text-sm sm:text-base"
                >
                  Buy Now
                </Link>
                <Link
                  to={`/ProductDetails`}
                  className="bg-gray-700 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm sm:text-base"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Product;
