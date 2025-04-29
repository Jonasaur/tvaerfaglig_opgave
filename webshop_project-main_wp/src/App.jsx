import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Earrings from "./pages/Earrings";
import Rings from "./pages/Rings";
import Necklaces from "./pages/Necklaces";
import Checkout from "./pages/Checkout";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/earrings" element={<Earrings />} />
        <Route path="/rings" element={<Rings />} />
        <Route path="/necklaces" element={<Necklaces />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
