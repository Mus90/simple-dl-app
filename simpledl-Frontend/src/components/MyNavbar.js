import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class MyNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to={"/"}>
              SimpleDLMS
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/createInstance"}>
                Create Instance
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default MyNavbar;
