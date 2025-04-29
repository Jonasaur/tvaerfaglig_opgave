const username = "Jonasmailhansen@gmail.com"; // your WP username
const password = "JonasLouiseWP"; // your WP password
const apiBase = "http://localhost:8000/wp-json/wc/v3";

export async function fetchProducts() {
  const response = await fetch(`${apiBase}/products`, {
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
  });

  const data = await response.json();
  console.log("📦 WooCommerce Products:", data);
  return data;
}