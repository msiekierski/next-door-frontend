import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">NextDoor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <LinkContainer to="/community">
            <Nav.Link className="pr-5 pl-5">Community</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/administration">
            <Nav.Link className="pr-5 pl-5">Administration</Nav.Link>
          </LinkContainer>
        </Nav>

        <Button>Settings</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
