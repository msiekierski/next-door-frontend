import React, { FunctionComponent } from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

interface OwnProps {}

type Props = OwnProps;

const LinksAdvertiser: FunctionComponent<Props> = (props) => {
  return (
    <Nav className="m-auto">
      <LinkContainer to="/advertisement">
        <Nav.Link className="pr-5 pl-5">Advertisement</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default LinksAdvertiser;
