import React, { useState } from "react";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📦 Customer Info:", formData);

    const username = "Jonasmailhansen@gmail.com"; // your WP username
    const password = "JonasLouiseWP"; // your WP password
    const apiBase = "http://localhost:8000/wp-json/wc/v3";

    const orderData = {
      payment_method: "cod", // Cash on Delivery
      payment_method_title: "Cash on Delivery",
      set_paid: false,
      billing: {
        first_name: formData.name,
        last_name: "",
        address_1: formData.address,
        city: "",
        postcode: "",
        country: "DK",
        email: formData.email,
        phone: "",
      },
      shipping: {
        first_name: formData.name,
        last_name: "",
        address_1: formData.address,
        city: "",
        postcode: "",
        country: "DK",
      },
      line_items: [
        {
          product_id: 64,  // 🔥 <- Replace with a real product ID that exists
          quantity: 1,
        },
      ],
    };

    try {
      const res = await fetch(`${apiBase}/orders`, {
        method: "POST",
        headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Order created:", data);
        alert(`Thank you! Your order #${data.id} has been placed.`);
      } else {
        console.error("❌ WooCommerce error:", data);
        alert(`Failed to place order: ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Network error placing order.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
