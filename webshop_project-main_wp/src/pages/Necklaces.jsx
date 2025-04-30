import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../api/woocommerce";
import ProductCard from "../components/ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/slices/cartSlice";

export default function Necklaces() {
  const [necklaces, setNecklaces] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getNecklaces = async () => {
      const allProducts = await fetchProducts();
      const filtered = allProducts.filter((product) =>
        product.categories.some(
          (cat) => cat.name.toLowerCase() === "halskæder"
        )
      );
      setNecklaces(filtered);
    };

    getNecklaces();
  }, []);

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image || product.images?.[0]?.src,
      type: product.type,
      color: product.color,
      quantity: 1,
    };
    dispatch(addToCart(cartProduct));
    alert(`${product.name} tilføjet til kurven!`);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Halskæder</h1>

      <div className="row g-4">
        {necklaces.length > 0 ? (
          necklaces.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4">
              <ProductCard
                product={product}
                showToast={() => handleAddToCart(product)}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No necklaces found.</p>
        )}
      </div>

      <div className="text-center mt-5">
        <button
          onClick={() => navigate("/checkout")}
          className="btn btn-success btn-lg px-4 py-2"
        >
          Gå til Checkout
        </button>
      </div>
    </div>
  );
}
