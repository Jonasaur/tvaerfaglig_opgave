import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/slices/cartSlice';
import { useState } from 'react';
import ToastMessage from './ToastMessage';

export default function TrendingProducts({ products = [] }) {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
    setShowToast(true);
  };

  return (
    <div
      style={{
        backgroundColor: '#ff77a3',
        padding: '2rem 0',
      }}
    >
      <Container
        className="mt-5 mb-5"
        style={{
          borderRadius: '1rem',
          padding: '2rem',
          backgroundColor: 'transparent',
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#333',
          }}
        >
          ✨ Nyeste Kollektion ✨
        </h2>

        <Row>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <Col md={6} lg={6} xl={6} key={product.id} className="mb-4">
                <Card
                  className="h-100 border-0 shadow-sm"
                  style={{
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                  }}
                >
                  <div className="text-center p-4">
                    <Card.Img
                      variant="top"
                      src={product.image || 'https://via.placeholder.com/300'}
                      style={{
                        objectFit: 'contain',
                        height: '300px',
                        width: 'auto',
                        maxWidth: '100%',
                      }}
                    />
                  </div>

                  <Card.Body className="text-center pt-0">
                    <Card.Title className="fw-semibold mb-2">
                      {product.name}
                    </Card.Title>
                    <div className="fw-bold mb-3" style={{ color: '#333' }}>
                      {product.price} DKK
                    </div>
                    <Button
                      onClick={() => handleAdd(product)}
                      style={{
                        backgroundColor: '#ff77a3',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: '600',
                        color: '#fff',
                        padding: '0.5rem 1.5rem',
                      }}
                    >
                      Tilføj til kurv
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-white">Ingen produkter fundet.</p>
          )}
        </Row>

        <ToastMessage show={showToast} onClose={() => setShowToast(false)} />
      </Container>
    </div>
  );
}
