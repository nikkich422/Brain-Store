import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCompare, removeFromCompare } from "../redux/slice/compareSlice";

const comparePage = () => {
  const items = useSelector((state) => state.compare.items);
  const dispatch = useDispatch();
  const lowestPrice = Math.min(...items.map((i) => i.price));

  if (items.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        No products selected for comparison
      </div>
    );
  }

  const specs = [
    { label: "Title", key: "title" },
    { label: "Price", key: "price" },
    { label: "Rating", key: "rating" },
    { label: "Availability", key: "in_stock" },
    { label: "Discount", key: "discount" },
  ];

  return (
    <div className="container py-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Compare Products</h2>
        <button
          onClick={() => dispatch(clearCompare())}
          className="btn-primary"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        
        {/* GRID */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `200px repeat(${items.length}, minmax(220px, 1fr))`,
          }}
        >
          
          {/* EMPTY TOP LEFT */}
          <div></div>

          {/* PRODUCT CARDS */}
          {items.map((item) => (
            <div
              key={item._id}
              className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm text-center m-1 hover:shadow-md"
            >
              <img
                src={item.image}
                className="h-32 mx-auto object-contain mb-3"
              />

              <button
                onClick={() => dispatch(removeFromCompare(item._id))}
                className="text-xs btn-secondary text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          ))}

          {specs.map((spec) => (
            <>
              <div className="p-4 font-semibold bg-gray-50 border-t border-gray-300">
                {spec.label}
              </div>

              {items.map((item) => {
                let value = item[spec.key];

                if (spec.key === "price") {
                  value = (<span
                    className={`text-lg ${
                      item.price === lowestPrice
                        ? "text-green-600 font-bold"
                        : "text-gray-800"
                    }`}
                  >
                    ₹{item.price}
                  </span>);
                }

                if (spec.key === "rating") {
                  value = `⭐ ${value}`;
                }

                if (spec.key === "in_stock") {
                  value = value ? (
                    <span className="text-green-600 font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  );
                }

                return (
                  <div
                    key={item._id + spec.key}
                    className="p-4 border-t border-gray-300 text-sm text-center"
                  >
                    {value}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default comparePage;