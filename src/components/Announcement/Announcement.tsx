import React, { FunctionComponent, MouseEvent, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import IAnnouncement from "./IAnnouncement";
import { IUser } from "../Login/IUser";
import { putAnnouncement } from "../../API/announcements";

export type Props = IAnnouncement;

const user: IUser = JSON.parse(localStorage.getItem("user") || "{}");

const Announcement: FunctionComponent<Props> = ({
  idAnnouncement,
  announcementType,
  title,
  description,
  creationDate,
  author,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);

  const handleReplyClick = (event: MouseEvent) => {
    console.log("reply shows");
    // event.preventDefault();
  };

  const handleShowRepliesClick = (event: MouseEvent) => {
    console.log("reply shows");
    event.preventDefault();
  };

  const handleCancelEditClick = (e: MouseEvent) => {
    e.preventDefault();
    clearEdit();
    setIsEditing(false);
  };

  const handleSaveEditClick = async (e: MouseEvent) => {
    e.preventDefault();
    const annType: number = announcementType === "communal" ? 1 : 2;
    putAnnouncement(idAnnouncement, annType, titleEdit, descriptionEdit);
    clearEdit();
    setIsEditing(false);
  };

  const clearEdit = () => {
    setDescriptionEdit(description);
    setTitleEdit(title);
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
              {user.name + " " + user.surname === author && !isEditing && (
                <AiOutlineEdit onClick={() => setIsEditing(!isEditing)} />
              )}
              {user.name + " " + user.surname === author && isEditing && (
                <div className={`d-flex justify-content-end`}>
                  <Button size="sm" variant="danger" className="mr-2">
                    Delete
                  </Button>
                  <Button size="sm" variant="warning" className="mr-2" onClick={handleCancelEditClick}>
                    Cancel
                  </Button>
                  <Button size="sm" variant="primary" onClick={handleSaveEditClick}>
                    Save
                  </Button>
                </div>
              )}
            </Card.Subtitle>
            <Card.Subtitle className={`text-muted text-right`}>{author}</Card.Subtitle>
          </div>
        </Card.Title>
        <Card.Text>
          {!isEditing ? (
            description
          ) : (
            <Form.Control
              type="text"
              value={descriptionEdit}
              onChange={(e) => setDescriptionEdit(e.target.value)}
            ></Form.Control>
          )}
        </Card.Text>
        <Card.Subtitle className={`text-muted text-right`}>
          {creationDate.toLocaleDateString()}
          <br />
          {creationDate.toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer className={`d-flex justify-content-between`}>
        <Card.Link href={``} onClick={handleReplyClick}>
          Reply
        </Card.Link>
        <Card.Link href={``} onClick={handleShowRepliesClick}>
          No replies yet
        </Card.Link>
      </Card.Footer>
    </Card>
  );
};

function lookUpVariant(variant: string) {
  if (variant === "communal") {
    return "primary";
  } else if (variant === "administrative") return "warning";
}

export default Announcement;
