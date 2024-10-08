"use client";

import { useState } from "react";

const NewItem = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center p-4 bg-gray-900">
      <div className="bg-white flex space-x-16 p-2 rounded">
        <div>
          <span className="text-xl font-medium text-black">{quantity}</span>
        </div>
        <div className="space-x-1">
          <button
            className={`bg-blue-600 text-white text-xl px-3 rounded-lg ${
              quantity === 1 && "opacity-50 cursor-not-allowed"
            }`}
            onClick={decrement}
            disabled={quantity === 1}
          >
            -
          </button>

          <button
            className={`bg-blue-600 text-white text-xl px-3 rounded-lg ${
              quantity === 20 && "opacity-50 cursor-not-allowed"
            }`}
            onClick={increment}
            disabled={quantity === 20}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
