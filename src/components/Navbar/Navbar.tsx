import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { UserContext } from "../Login/UserContext";
import LinksResident from "./LinksResident";
import LinksAdvertiser from "./LinksAdvertiser";
import LinksAdministrator from "./LinksAdministrator";
import { ACCOUNT_TYPE_ADMINISTRATOR, ACCOUNT_TYPE_ADVERTISER, ACCOUNT_TYPE_RESIDENT } from "../../constants/constants";

const Navigation = () => {
  const user = useContext(UserContext);

  function Nav() {
    if (user?.accountType == ACCOUNT_TYPE_RESIDENT) {
      return <LinksResident />;
    }
    if (user?.accountType == ACCOUNT_TYPE_ADVERTISER) {
      return <LinksAdvertiser />;
    }
    if (user?.accountType == ACCOUNT_TYPE_ADMINISTRATOR) {
      return <LinksAdministrator />;
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">NexDoor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {Nav()}
        <Button>Settings</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
