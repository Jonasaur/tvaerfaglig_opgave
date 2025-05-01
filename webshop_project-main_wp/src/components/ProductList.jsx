import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/slices/cartSlice";

export default function ProductList({ products, title }) {
  const [sortBy, setSortBy] = useState("bestsellers");
  const [filterOpen, setFilterOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.productID || product.id,
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

  let filteredProducts = [...products];

  // Filter
  if (inStockOnly) {
    filteredProducts = filteredProducts.filter(p => p.stock_status === "instock");
  }
  if (outOfStockOnly) {
    filteredProducts = filteredProducts.filter(p => p.stock_status === "outofstock");
  }

  // Sort
  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortBy === "newest") {
    filteredProducts.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
  }

  return (
    <Container className="my-5">
      <h1 className="mb-5" style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
        {title}
      </h1>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="filter-section">
          <span>Filter: </span>
          <button
            className="filter-button"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            Tilgængelighed {filterOpen ? "▲" : "▼"}
          </button>

          {filterOpen && (
            <div className="filter-dropdown mt-2 p-2 border rounded bg-light">
              <div className="filter-option">
                <input
                  type="checkbox"
                  id="in-stock"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                />
                <label htmlFor="in-stock" className="ms-2">
                  På lager
                </label>
              </div>
              <div className="filter-option mt-2">
                <input
                  type="checkbox"
                  id="out-of-stock"
                  checked={outOfStockOnly}
                  onChange={() => setOutOfStockOnly(!outOfStockOnly)}
                />
                <label htmlFor="out-of-stock" className="ms-2">
                  Ikke på lager
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="sort-section">
          <span>Sortér efter: </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select ms-2"
          >
            <option value="bestsellers">Mest populære</option>
            <option value="price-low">Pris (Lav til Høj)</option>
            <option value="price-high">Pris (Høj til Lav)</option>
            <option value="newest">Nyeste</option>
          </select>
        </div>
      </div>

      <div className="products-count mb-3">
        {filteredProducts.length} produkter
      </div>

      <Row>
        {filteredProducts.map((product) => (
          <Col
            md={4}
            sm={6}
            key={product.productID || product.id}
            className="mb-4"
          >
            <ProductCard
              product={product}
              showToast={() => handleAddToCart(product)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
