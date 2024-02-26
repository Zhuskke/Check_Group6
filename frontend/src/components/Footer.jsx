import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container id="footer" className="d-flex align-items-end" style={{ overflow: 'hidden'}}>
        <Row>
          <Col className="footerText py-3" id="footer-text">
            Copyright &copy; 2023. Check Learning Platform. All
            Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;