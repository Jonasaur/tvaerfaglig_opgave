import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img
        src={product.images?.[0]?.src || "https://via.placeholder.com/300"}
        alt={product.name}
        className="h-48 w-full object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 font-medium">{product.price} DKK</p>
    </div>
  );
}
