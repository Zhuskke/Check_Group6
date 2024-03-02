import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import englishLogo from '../images/english.png';
import mathLogo from '../images/math.png';
import historyLogo from '../images/history.png';
import scienceLogo from '../images/science.png';
import physicsLogo from '../images/physics.png';
import calculusLogo from '../images/calculus.png';

const SubjectBar = () => {
  return (
    <Container id='subbar-container'>
      <Row>
        <Col>
          <Link to="/english">
            <div className="subject">
              <img src={englishLogo} alt="English" />
              <span>English</span>
            </div>
          </Link>
        </Col>
        <Col>
          <Link to="/math">
            <div className="subject">
              <img src={mathLogo} alt="Math" />
              <span>Math</span>
            </div>
          </Link>
        </Col>
        <Col>
          <Link to="/history">
            <div className="subject">
              <img src={historyLogo} alt="History" />
              <span>History</span>
            </div>
          </Link>
        </Col>
        <Col>
          <Link to="/science">
            <div className="subject">
              <img src={scienceLogo} alt="Science" />
              <span>Science</span>
            </div>
          </Link>
        </Col>
        <Col>
          <Link to="/physics">
            <div className="subject">
              <img src={physicsLogo} alt="Physics" />
              <span>Physics</span>
            </div>
          </Link>
        </Col>
        <Col>
          <Link to="/calculus">
            <div className="subject">
              <img src={calculusLogo} alt="Calculus" />
              <span>Calculus</span>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SubjectBar;