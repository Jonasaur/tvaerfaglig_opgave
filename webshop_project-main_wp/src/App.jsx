import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Earrings from "./pages/Earrings";
import Rings from "./pages/Rings";
import Necklaces from "./pages/Necklaces";
import Sale from "./pages/Sale";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CustomNavbar from "./components/NavBar";
import Products from "./pages/Products";
import Receipt from "./pages/Receipt";



function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/earrings" element={<Earrings />} />
        <Route path="/rings" element={<Rings />} />
        <Route path="/necklaces" element={<Necklaces />} />
        <Route path="/products" element={<Products />} /> 
        <Route path="/sale" element={<Sale />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </Router>
  );
}

export default App;
