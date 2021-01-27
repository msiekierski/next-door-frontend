import React, { FunctionComponent, MouseEvent, useContext, useState, useRef, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { IUser } from "../Login/IUser";
import { deleteAnnouncement, putAnnouncement } from "../../API/announcements";
import IEvent from "./IEvent";
import { UserContext } from "../Login/UserContext";
import { deleteEvent, getUsers, putEvent } from "../../API/events";
import oracleDateToInputDate from "../../utils/DateConverter";
import { EVENT_TYPE } from "../../constants/constants";
import { getUser } from "../../API/login";
import IEventUser from "./IEventUser";
import EventUsers from "./Users/EventUsers"

export type Props = IEvent & {
  removeFeed: Function;
  updateFeed: Function;
};

const Event: FunctionComponent<Props> = ({
  idEvent,
  idCreator,
  title,
  description,
  creationDate,
  eventDate,
  removeFeed,
  updateFeed,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);
  const [descriptionEdit, setDescriptionEdit] = useState(description);
  const user = useContext(UserContext);
  const inputEventDate = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<Array<IEventUser>>([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const eventUsers = await getUsers(idEvent);
      setUsers(eventUsers);
    };
    fetch();
  }, []);

  const handleJoinClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleShowParticipiants = (e: MouseEvent) => {
    e.preventDefault();
    setShowUsers(true);
  };

  const handleCancelEditClick = (e: MouseEvent) => {
    e.preventDefault();
    clearEdit();
    setIsEditing(false);
  };

  const handleSaveEditClick = async (e: MouseEvent) => {
    e.preventDefault();
    await putEvent(
      idEvent,
      titleEdit,
      descriptionEdit,
      inputEventDate?.current?.value ? inputEventDate.current.value : ""
    );
    updateFeed(
      EVENT_TYPE,
      idEvent,
      titleEdit,
      descriptionEdit,
      inputEventDate?.current?.value ? inputEventDate.current.value : ""
    );
    clearEdit();
    setIsEditing(false);
  };

  const clearEdit = () => {
    setDescriptionEdit(description);
    setTitleEdit(title);
  };

  const handleDeleteEditClick = async (e: MouseEvent) => {
    e.preventDefault();
    await deleteEvent(idEvent);
    setIsEditing(false);
    removeFeed(EVENT_TYPE, idEvent);
  };
  return (
    <>
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
                {user?.idAccount === idCreator && !isEditing && (
                  <span className={`btn`}>
                    <AiOutlineEdit onClick={() => setIsEditing(!isEditing)} />{" "}
                  </span>
                )}
                {user?.idAccount === idCreator && isEditing && (
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
              {!isEditing && (
                <>
                  <Card.Subtitle className={`text-muted text-right mb-2`}>Takes place on:</Card.Subtitle>
                  <Card.Subtitle className={`text-muted text-right`}>
                    <u>{new Date(eventDate).toLocaleDateString()}</u>
                  </Card.Subtitle>
                </>
              )}
            </div>
          </Card.Title>
          {isEditing && (
            <Card.Text>
              <input defaultValue={eventDate} ref={inputEventDate} className="form-control w-25" required type="date" />
            </Card.Text>
          )}

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
          <Card.Link href={``} onClick={handleJoinClick}>
            Join
          </Card.Link>
          <Card.Link href={``} onClick={handleShowParticipiants}>
            {users.length} participants
          </Card.Link>
        </Card.Footer>
      </Card>
      <EventUsers show={showUsers} onHide={() => setShowUsers(false)} users={users} />
    </>
  );
};
export default Event;
