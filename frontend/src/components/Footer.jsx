import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../designs/Footer.css'

function Footer() {
  return (
    <footer id="footerbg">
      <Container id="footer" className="d-flex align-items-end" style={{ overflow: 'hidden'}}>
        <Row>
          <Col className="footerText py-3" id="footer-text">
            Copyright &copy; 2024. Check Learning Platform. All
            Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;