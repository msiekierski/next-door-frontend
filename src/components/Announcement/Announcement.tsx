import React, { FunctionComponent, MouseEvent, useContext, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import IAnnouncement from "./IAnnouncement";
import { deleteAnnouncement, putAnnouncement } from "../../API/announcements";
import CommentList from "./CommentList/CommentList";
import Reply from "./Reply/Reply";
import IComment from "./Comment/IComment";
import { UserContext } from "../Login/UserContext";
import { ANNOUNCEMENT_TYPE } from "../../constants/constants";

export type Props = IAnnouncement & {
  removeFeed: Function;
  updateFeed: Function;
};

const Announcement: FunctionComponent<Props> = ({
  idAccount,
  idAnnouncement,
  announcementType,
  title,
  description,
  creationDate,
  name,
  surname,
  replies: replays,
  removeFeed,
  updateFeed,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(replays);
  const [reply, setReply] = useState(false);
  const user = useContext(UserContext);

  const commentAdd = (comment: IComment) => {
    setComments([comment, ...comments]);
  };

  const handleReplyClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!reply) {
      setReply(true);
      setShowComments(true);
    } else {
      setReply(false);
      setShowComments(false);
    }
  };

  const handleShowRepliesClick = (e: MouseEvent) => {
    e.preventDefault();
    setShowComments(!showComments);
  };

  const handleCancelEditClick = (e: MouseEvent) => {
    e.preventDefault();
    clearEdit();
    setIsEditing(false);
  };

  const handleSaveEditClick = async (e: MouseEvent) => {
    e.preventDefault();
    await putAnnouncement(idAnnouncement, announcementType, titleEdit, descriptionEdit);
    updateFeed(ANNOUNCEMENT_TYPE, idAnnouncement, titleEdit, descriptionEdit);
    clearEdit();
    setIsEditing(false);
  };

  const clearEdit = () => {
    setDescriptionEdit(description);
    setTitleEdit(title);
  };

  const handleDeleteEditClick = async (e: MouseEvent) => {
    e.preventDefault();
    await deleteAnnouncement(idAnnouncement);
    setIsEditing(false);
    removeFeed(ANNOUNCEMENT_TYPE, idAnnouncement);
  };

  const variant = lookUpVariant(announcementType);

  return (
    <Card className={`mt-3`}>
      <Card.Header className={`bg-${variant}`} />
      <Card.Body>
        <Card.Title className={`d-flex justify-content-between`}>
          <span>
            {!isEditing ? (
              title
            ) : (
              <Form.Control type="text" value={titleEdit} onChange={(e) => setTitleEdit(e.target.value)} />
            )}
          </span>
          <div className="flex-column">
            <Card.Subtitle className={`text-right mb-3`}>
              {user?.idAccount === idAccount && !isEditing && (
                <span className={`btn`}>
                  <AiOutlineEdit onClick={() => setIsEditing(!isEditing)} />{" "}
                </span>
              )}
              {user?.idAccount === idAccount && isEditing && (
                <div className={`d-flex justify-content-end`}>
                  <Button variant="danger" className="mr-2" onClick={handleDeleteEditClick}>
                    Delete
                  </Button>
                  <Button variant="warning" className="mr-2" onClick={handleCancelEditClick}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSaveEditClick}>
                    Save
                  </Button>
                </div>
              )}
            </Card.Subtitle>
            <Card.Subtitle className={`text-muted text-right`}>
              {name} {surname}
            </Card.Subtitle>
          </div>
        </Card.Title>
        <Card.Text>
          {!isEditing ? (
            description
          ) : (
            <Form.Control type="text" value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)} />
          )}
        </Card.Text>
        <Card.Subtitle className={`text-muted text-right`}>
          {new Date(creationDate).toLocaleDateString()}
          <br />
          {new Date(creationDate).toLocaleTimeString()}
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer className={`d-flex justify-content-between`}>
        <Card.Link href={``} onClick={handleReplyClick}>
          Reply
        </Card.Link>
        <Card.Link href={``} onClick={handleShowRepliesClick}>
          {comments.length ? `Show ${comments.length} replies` : null}
        </Card.Link>
      </Card.Footer>
      {reply ? <Reply commentAdd={commentAdd} idAnnouncement={idAnnouncement} /> : null}
      {showComments ? <CommentList comments={comments} /> : null}
    </Card>
  );
};

const lookUpVariant = (variant: number) => {
  if (variant === 1) {
    return "primary";
  } else if (variant === 2) return "warning";
};

export default Announcement;
