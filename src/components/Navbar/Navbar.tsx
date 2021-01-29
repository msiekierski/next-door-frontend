import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { SetUserContext, UserContext } from "../Login/UserContext";
import LinksResident from "./LinksResident";
import LinksAdvertiser from "./LinksAdvertiser";
import LinksAdministrator from "./LinksAdministrator";
import { ACCOUNT_TYPE_ADMINISTRATOR, ACCOUNT_TYPE_ADVERTISER, ACCOUNT_TYPE_RESIDENT } from "../../constants/constants";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  const user = useContext(UserContext);
  const setUser = useContext(SetUserContext);

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
      <Navbar.Collapse id="basic-navbar-nav">{Nav()}</Navbar.Collapse>
      <Dropdown>
        <Dropdown.Toggle style={{ fontSize: "2.5em" }} as={FaUserCircle} variant="success" id="dropdown-item-basic" />
        <Dropdown.Menu align="right" className="mt-2">
          <Link to="/settings">
            <Dropdown.Item as="button">Settings</Dropdown.Item>
          </Link>
          <Dropdown.Item onClick={(e) => {setUser(null); localStorage.removeItem("user"); localStorage.removeItem("login")}} as="button">
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

export default Navigation;
