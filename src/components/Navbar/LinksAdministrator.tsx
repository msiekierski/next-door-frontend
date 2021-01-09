import React, { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

interface OwnProps {}

type Props = OwnProps;

const LinksAdministrator: FunctionComponent<Props> = (props) => {
  return (
    <Nav className="m-auto">
      <LinkContainer to="/administration">
        <Nav.Link className="pr-5 pl-5">Administration</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/chat">
        <Nav.Link className="pr-5 pl-5">Chat</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/payments">
        <Nav.Link className="pr-5 pl-5">Payments</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default LinksAdministrator;
