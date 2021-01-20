import React, { FunctionComponent } from "react";
import { ListGroup } from "react-bootstrap";
import IComment from "../Comment/IComment";
import Comment from "../Comment/Comment";

interface OwnProps {
  comments: Array<IComment>;
}

type Props = OwnProps;

const CommentList: FunctionComponent<Props> = ({ comments }) => {
  return (
    <ListGroup>
      {comments
        .sort((a, b) => Number(new Date(b.creationDate)) - Number(new Date(a.creationDate)))
        .map((comment, index) => (
          <Comment
            key={index}
            idAccount={comment.idAccount}
            idAnnouncement={comment.idAnnouncement}
            creationDate={comment.creationDate}
            description={comment.description}
          />
        ))}
    </ListGroup>
  );
};

export default CommentList;
