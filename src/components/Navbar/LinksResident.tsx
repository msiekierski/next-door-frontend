import React, { FunctionComponent } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router";
import Nav from "react-bootstrap/Nav";

interface OwnProps {}

type Props = OwnProps;

const LinksResident: FunctionComponent<Props> = (props) => {
  return (
    <Nav className="m-auto">
      <Redirect to="/community" />
      <LinkContainer to="/community">
        <Nav.Link className="pr-5 pl-5">Community</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/administration">
        <Nav.Link className="pr-5 pl-5">Administration</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/chat">
        <Nav.Link className="pr-5 pl-5">Chat</Nav.Link>
      </LinkContainer>
      <LinkContainer to="groups">
        <Nav.Link className="pr-5 pl-5">Groups</Nav.Link>
      </LinkContainer>
      {/*<LinkContainer to="/groups">*/}
      {/*  <Nav.Link className="pr-5 pl-5">Groups</Nav.Link>*/}
      {/*</LinkContainer>*/}
      {/*<LinkContainer to="/chat">*/}
      {/*  <Nav.Link className="pr-5 pl-5">Chat</Nav.Link>*/}
      {/*</LinkContainer>*/}
      {/*<LinkContainer to="/payments">*/}
      {/*  <Nav.Link className="pr-5 pl-5">Payments</Nav.Link>*/}
      {/*</LinkContainer>*/}
    </Nav>
  );
};

export default LinksResident;
