"use client";

import React from "react";
// Define the type for the props
interface AddToCartProps {
  name: string; // 'name' is expected to be a string
}

const AddToCart: React.FC<AddToCartProps>  = ({ name }) => {
  return (
    <button
      className="text-white bg-green-500   hover:bg-green-600 rounded py-1 px-3 mt-5 client"
      onClick={() => {
        alert(`Added ${name} to cart`);
      }}
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
