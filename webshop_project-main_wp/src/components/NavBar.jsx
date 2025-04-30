import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useState, useRef } from "react";

export default function CustomNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const closeTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // delay closing to avoid flicker
  };

  const categories = [
    { name: "Earrings", path: "/earrings" },
    { name: "Necklaces", path: "/necklaces" },
    { name: "Rings", path: "/rings" },
  ];

  return (
    <div className="text-center mb-4">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="mb-3" style={{ fontSize: "3rem", fontWeight: "bold" }}>
          <span style={{ color: "#ff69b4", WebkitTextStroke: "1px black" }}>
            L
          </span>
          <span style={{ color: "#000", fontWeight: "bold" }}>•</span>
          <span style={{ color: "#ffa500", WebkitTextStroke: "1px black" }}>
            S
          </span>
          <span style={{ color: "#000", fontWeight: "bold" }}>•</span>
          <span style={{ color: "#32cd32", WebkitTextStroke: "1px black" }}>
            E
          </span>
        </h1>
      </Link>

      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: "relative" }}
              >
                
                <NavDropdown
                  title="Jewelry"
                  id="jewelry-dropdown"
                  show={showDropdown}
                >
                  {categories.map((category) => (
                    <NavDropdown.Item
                      key={category.name}
                      as={Link}
                      to={category.path}
                    >
                      {category.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </div>

              <Nav.Link as={Link} to="/sale">
                🔥 On Sale
              </Nav.Link>

              <Nav.Link as={Link} to="/cart">
                🛒 Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
