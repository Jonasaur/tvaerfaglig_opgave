import React, { useState } from "react";

export default function ProductCard({ product, showToast }) {
  const [hovered, setHovered] = useState(false);

  const productImage =
    product.image || product.images?.[0]?.src || "/images/placeholder.jpg";

  return (
    <div
      className="card h-100 shadow-sm border-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="position-relative">
        <img
          src={productImage}
          alt={product.name}
          className={`card-img-top ${hovered ? "scale-effect" : ""}`}
          style={{ height: "220px", objectFit: "cover" }}
        />
        {product.soldOut && (
          <div
            className="position-absolute top-0 start-0 bg-dark text-white px-3 py-1"
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            Udsolgt
          </div>
        )}
      </div>

      <div className="card-body text-center d-flex flex-column justify-content-between">
        <h5 className="card-title mb-2">{product.name}</h5>
        <p className="card-text fw-medium">{product.price} DKK</p>
        <button
          className="btn btn-outline-dark btn-sm mt-2"
          onClick={showToast}
        >
          Læg i kurv
        </button>
      </div>

      <style>
        {`
          .scale-effect {
            transform: scale(1.03);
            transition: transform 0.3s ease-in-out;
          }
          .card-img-top {
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
