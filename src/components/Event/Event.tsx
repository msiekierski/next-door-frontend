import React, { FunctionComponent, MouseEvent, useContext, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { IUser } from "../Login/IUser";
import { deleteAnnouncement, putAnnouncement } from "../../API/announcements";
import IEvent from "./IEvent";
import { UserContext } from "../Login/UserContext";

export type Props = IEvent;

const Event: FunctionComponent<Props> = ({ idAccount, title, description, creationDate, eventDate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);
  const user = useContext(UserContext);

  const handleJoinClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleShowParticipiants = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleCancelEditClick = (e: MouseEvent) => {
    e.preventDefault();
    clearEdit();
    setIsEditing(false);
  };

  const handleSaveEditClick = async (e: MouseEvent) => {
    e.preventDefault();
    //TODO
    clearEdit();
    setIsEditing(false);
  };

  const clearEdit = () => {
    setDescriptionEdit(description);
    setTitleEdit(title);
  };

  const handleDeleteEditClick = async (e: MouseEvent) => {
    e.preventDefault();
    //TODO
  };

  return (
    <Card className={`mt-3`}>
      <Card.Header className={`bg-info`} />
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
                <AiOutlineEdit onClick={() => setIsEditing(!isEditing)} />
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
            <Card.Subtitle className={`text-muted text-right mb-2`}>Takes place on:</Card.Subtitle>
            <Card.Subtitle className={`text-muted text-right`}>
              <u>{new Date(eventDate).toLocaleDateString()}</u>
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
        <Card.Subtitle className={`text-muted text-right`}>{new Date(creationDate).toLocaleDateString()}</Card.Subtitle>
      </Card.Body>
      <Card.Footer className={`d-flex justify-content-between`}>
        <Card.Link href={``} onClick={handleJoinClick}>
          Join
        </Card.Link>
        <Card.Link href={``} onClick={handleShowParticipiants}>
          0 participiants
        </Card.Link>
      </Card.Footer>
    </Card>
  );
};
export default Event;
