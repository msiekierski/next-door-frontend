import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import IComment from "./IComment";

type Props = IComment;

const Comment: FunctionComponent<Props> = ({ description, creationDate }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className={`d-flex justify-content-between`}>
          <Card.Subtitle className={`text-muted`}></Card.Subtitle>
          <Card.Subtitle className={`text-muted text-right`}>{creationDate}</Card.Subtitle>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
