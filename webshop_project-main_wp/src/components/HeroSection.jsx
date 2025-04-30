import { Container, Row, Col, Button } from "react-bootstrap";
import heroImg from "../assets/images/hero.png"; // Adjust path as needed
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "var(--secondary-color)",
        color: "var(--foreground)",
        borderRadius: "1rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
            <img
              src={heroImg}
              alt="L.S.E Accessories Barbie"
              className="img-fluid rounded"
            />
          </Col>
          <Col md={6}>
            <h1 className="fs-2 fw-bold mb-3">Velkommen til L.S.E Accessories</h1>
            <p>
              Her finder du et stort udvalg af håndlavede farverige, sjove og
              feminine smykker og accessories!
            </p>
            <p>
              Husk at følge med på Instagram, hvor der løbende vil være giveaways og en masse forskellige tilbud!
            </p>
            <p className="mb-4">Happy Shopping! 🌸</p>
            <Button
              className="fw-bold px-4 py-2 rounded-pill"
              style={{
                backgroundColor: "var(--main-color)",
                color: "black",
                border: "none",
              }}
                as={Link} to={"/products"}
            >
              Alle Produkter
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
