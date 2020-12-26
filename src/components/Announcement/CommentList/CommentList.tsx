import React, { FunctionComponent } from "react";
import { ListGroup } from "react-bootstrap";
import IComment from "../Comment/IComment";

interface OwnProps {
  comments: Array<IComment>;
}

type Props = OwnProps;

const CommentList: FunctionComponent<Props> = ({ comments }) => {
  return (
    <ListGroup>
      {comments.map((comment) => (
        <ListGroup.Item key={comment.id}>{comment}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;
