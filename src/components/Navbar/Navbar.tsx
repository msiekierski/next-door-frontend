import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { UserContext } from "../Login/UserContext";
import LinksResident from "./LinksResident";
import LinksAdvertiser from "./LinksAdvertiser";
import LinksAdministrator from "./LinksAdministrator";

const Navigation = () => {
  const user = useContext(UserContext);

  function Nav() {
    if (user?.accountType == 1) {
      return <LinksResident />;
    }
    if (user?.accountType == 2) {
      return <LinksAdvertiser />;
    }
    if (user?.accountType == 3) {
      return <LinksAdministrator />;
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">NextDoor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {Nav()}
        <Button>Settings</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
