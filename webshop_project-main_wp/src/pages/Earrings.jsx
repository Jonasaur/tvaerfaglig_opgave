import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../api/woocommerce";
import ProductCard from "../components/ProductCard";

export default function Earrings() {
  const [earrings, setEarrings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEarrings = async () => {
      const allProducts = await fetchProducts();
      console.log("🎯 All products:", allProducts);

      const filtered = allProducts.filter((product) =>
        product.categories.some(
          (cat) => cat.name.toLowerCase() === "øreringe"
        )
      );

      console.log("✨ Filtered øreringe:", filtered);
      setEarrings(filtered);
    };

    getEarrings();
  }, []);

  return (
    <div className="p-4">
      <h1>Earrings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {earrings.length > 0 ? (
          earrings.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No earrings found.</p>
        )}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
