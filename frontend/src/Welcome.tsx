import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from "./Header";

const WelcomePage = () => {
  return (
    <Container>
        <Header />
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          
            <h1>Welcome to New Dawn Acres!</h1>
            <p>Please Login and we can get started</p>
          
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
