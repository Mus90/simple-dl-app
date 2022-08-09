import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

class MyNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">SimpleDLMS</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="CreateInstance">CreateInstance</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default MyNavbar;
