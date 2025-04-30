import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/products");
    }
  }, [order, navigate]);

  if (!order) return null;

  const total = order.line_items.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );

  return (
    <Container className="mt-5 mb-5">
      <Card className="p-4 shadow-sm">
        <h1 className="mb-4 text-center">✅ Ordrebekræftelse</h1>
        <div className="text-center mt-4">
          <h2>Tak for din ordre!</h2>
          <p>Vi glæder os til at sende dine smykker til dig.</p>
        </div>
        <h4 className="mb-3">Ordrenummer: #{order.id}</h4>

        <Row className="mb-4">
          <Col md={6}>
            <h5>Kundeoplysninger</h5>
            <p>
              <strong>Navn:</strong> {order.billing.first_name}{" "}
              {order.billing.last_name}
            </p>
            <p>
              <strong>Email:</strong> {order.billing.email}
            </p>
            <p>
              <strong>Telefon:</strong> {order.billing.phone}
            </p>
          </Col>
          <Col md={6}>
            <h5>Leveringsadresse</h5>
            <p>{order.shipping.address_1}</p>
            <p>{order.shipping.city}</p>
            <p>Danmark</p>
          </Col>
        </Row>

        <h5 className="mb-3">Købte produkter</h5>
        <Row>
          {order.line_items.map((item) => (
            <Col key={item.id} md={6} className="mb-3">
              <Card className="p-3">
                {item.image && (
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{
                      objectFit: "cover",
                      height: "200px",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <strong>{item.name}</strong>
                <p>Antal: {item.quantity}</p>
                <p>Pris: {item.total} DKK</p>
              </Card>
            </Col>
          ))}
        </Row>

        <hr />
        <h5 className="text-end">Total: {total} DKK</h5>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => navigate("/products")}>
            Tilbage til Produkter
          </Button>
        </div>
      </Card>
    </Container>
  );
}
