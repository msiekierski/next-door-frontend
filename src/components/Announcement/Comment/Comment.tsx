import React, { FunctionComponent, useEffect } from "react";
import { Card } from "react-bootstrap";
import IComment from "./IComment";

type Props = IComment;

const Comment: FunctionComponent<Props> = ({ description, creationDate, name, surname }) => {
  useEffect(() => {}, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title className={`d-flex justify-content-between`}>
          <Card.Subtitle className={`text-muted`}>
            {name} {surname}
          </Card.Subtitle>
          <Card.Subtitle className={`text-muted text-right`}>
            {new Date(creationDate).toLocaleDateString()}
            <br />
            {new Date(creationDate).toLocaleTimeString()}
          </Card.Subtitle>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
