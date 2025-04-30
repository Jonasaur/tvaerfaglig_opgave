import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

export default function SalePage() {
  const [saleItems, setSaleItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSaleItems() {
      try {
        const response = await fetch('/api/sale');
        const data = await response.json();
        setSaleItems(data);
      } catch (error) {
        console.error('Failed to fetch sale items:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSaleItems();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">🔥 On Sale</h1>
      <Row>
        {saleItems.length > 0 ? (
          saleItems.map((item) => (
            <Col key={item.id} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={item.image || 'https://via.placeholder.com/300'}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <Card.Body className="text-center">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <del className="text-muted me-2">{item.originalPrice} DKK</del>
                    <span className="fw-bold text-danger">{item.salePrice} DKK</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">Ingen udsalgsvarer fundet.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}
