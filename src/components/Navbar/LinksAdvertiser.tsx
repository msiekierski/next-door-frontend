import React, { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router";

interface OwnProps {}

type Props = OwnProps;

const LinksAdvertiser: FunctionComponent<Props> = (props) => {
  return (
    <Nav className="m-auto">
      <Redirect to="/advertisements" />
      <LinkContainer to="/advertisements">
        <Nav.Link className="pr-5 pl-5">Advertisement</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default LinksAdvertiser;
