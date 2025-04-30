import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clearCart } from "../app/slices/cartSlice";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderCart, setOrderCart] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("orderCart", JSON.stringify(cartItems));
      setOrderCart(cartItems);
      dispatch(clearCart());
    } else {
      const savedOrder = localStorage.getItem("orderCart");
      if (savedOrder) {
        setOrderCart(JSON.parse(savedOrder));
      }
    }
  }, [cartItems, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = "Jonasmailhansen@gmail.com";
    const password = "JonasLouiseWP";
    const apiBase = "http://localhost:8000/wp-json/wc/v3";

    const line_items = orderCart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      payment_method: "cod",
      payment_method_title: "Cash on Delivery",
      set_paid: false,
      billing: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        postcode: "",
        country: "DK",
        email: formData.email,
        phone: formData.phone,
      },
      shipping: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        postcode: "",
        country: "DK",
      },
      line_items,
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
        alert(`✅ Ordre #${data.id} er sendt!`);
        localStorage.removeItem("orderCart");
        navigate('/receipt', { state: { order: data } });
      } else {
        alert(`❌ WooCommerce fejl: ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("Netværksfejl under bestilling.");
    }
  };

  if (orderCart.length === 0) return null;

  const totalPrice = orderCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Container className="mt-5 mb-5">
        <h1 className="text-center mb-4">Ordreoversigt</h1>

        <Row className="mb-4">
          {orderCart.map((item, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </div>
                  <div className="mt-3">
                    <p>
                      <strong>Antal:</strong> {item.quantity}
                    </p>
                    <p>
                      <strong>Pris:</strong> {item.price * item.quantity} DKK
                    </p>
                    {item.type && (
                      <p>
                        <strong>Type:</strong> {item.type}
                      </p>
                    )}
                    {item.color && (
                      <p>
                        <strong>Farve:</strong> {item.color}
                      </p>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="p-4 shadow-sm mb-5">
          <h4>Ordre Total</h4>
          <div className="d-flex justify-content-between mb-3">
            <span>Subtotal:</span>
            <span>{totalPrice} DKK</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Fragt:</span>
            <span>Gratis</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-4">
            <h5>Total:</h5>
            <h5>{totalPrice} DKK</h5>
          </div>
        </Card>

        <h2 className="mb-3">Leveringsoplysninger</h2>
        <Form onSubmit={handleSubmit} className="mb-5">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Fornavn</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Efternavn</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Telefonnummer</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>By</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="success">
            Afgiv Bestilling
          </Button>
        </Form>
      </Container>
    </>
  );
}
