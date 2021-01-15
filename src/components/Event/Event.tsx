import React, { FunctionComponent, MouseEvent, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { IUser } from "../Login/IUser";
import { deleteAnnouncement, putAnnouncement } from "../../API/announcements";
import IEvent from "./IEvent";

export type Props = IEvent;

const user: IUser = JSON.parse(localStorage.getItem("user") || "{}");

const Event: FunctionComponent<Props> = ({ idAccount, id, title, desc, creationDate, dateOfEvent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(desc);

  console.log(dateOfEvent);

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
    setDescriptionEdit(desc);
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
              {user.idAccount === idAccount && !isEditing && <AiOutlineEdit onClick={() => setIsEditing(!isEditing)} />}
              {user.idAccount === idAccount && isEditing && (
                <div className={`d-flex justify-content-end`}>
                  <Button size="sm" variant="danger" className="mr-2" onClick={handleDeleteEditClick}>
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
            <Card.Subtitle className={`text-muted text-right`}>{dateOfEvent}</Card.Subtitle>
          </div>
        </Card.Title>
        <Card.Text>
          {!isEditing ? (
            desc
          ) : (
            <Form.Control type="text" value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)} />
          )}
        </Card.Text>
        <Card.Subtitle className={`text-muted text-right`}>
          {new Date(creationDate).toLocaleDateString()}
          <br />
          {new Date(creationDate).toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Card.Subtitle>
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
