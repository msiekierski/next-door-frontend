import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import IComment from "./IComment";

type Props = IComment;

const Comment: FunctionComponent<Props> = ({ author, date, description }) => {
  const fullDate = new Date(date);

  return (
    <Card>
      <Card.Body>
        <Card.Title className={`d-flex justify-content-between`}>
          <Card.Subtitle className={`text-muted`}>{author}</Card.Subtitle>
          <Card.Subtitle className={`text-muted text-right`}>
            {fullDate.toLocaleDateString()}
            <br />
            {fullDate.toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Card.Subtitle>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
