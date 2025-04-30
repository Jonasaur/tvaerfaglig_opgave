import { useEffect, useState } from "react";
import { fetchProducts } from "../api/woocommerce";
import ProductList from "../components/ProductList";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const allProducts = await fetchProducts();
      setProducts(allProducts);
    };
    load();
  }, []);

  return (
    <ProductList products={products} title="Alle Produkter" />
  );
}
