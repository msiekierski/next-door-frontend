import React, { FunctionComponent, useRef, FormEvent, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import IAnnouncementCreator from "./IAnnouncementCreator";
import { UserContext } from "../../Login/UserContext";
import { createAnnouncement } from "../../../API/announcements";
import { ANNOUNCEMENT_TYPE_COMMUNAL } from "../../../constants/constants";
import { IUser } from "../../Login/IUser";
import DateToOracleDate from "../../../utils/DateConverter";

export type Props = IAnnouncementCreator;

const AnnouncementCreator: FunctionComponent<Props> = ({ hideAnnouncementCreator, addNewAnnouncement }) => {
  const inputTopic = useRef<HTMLInputElement>(null);
  const inputDesc = useRef<HTMLTextAreaElement>(null);
  const user = useContext<IUser | null>(UserContext);

  const submitAnnouncement = async (e: FormEvent) => {
    e.preventDefault();

    let topic: string = "";
    let desc: string = "";
    if (inputTopic != null && inputTopic.current != null) {
      topic = inputTopic.current.value;
    }
    if (inputDesc && inputDesc.current) {
      desc = inputDesc.current.value;
    }
    const creationDate = new Date();
    const newId = await createAnnouncement(
      user?.idAccount!,
      ANNOUNCEMENT_TYPE_COMMUNAL,
      topic,
      desc,
      DateToOracleDate(creationDate),
      user?.idAssoc!
    );
    console.log(newId);
    addNewAnnouncement(user?.idAccount, newId, topic, desc, creationDate.toString());
    hideAnnouncementCreator();
  };

  return (
    <Card className="mt-2">
      <Card.Body>
        <form onSubmit={submitAnnouncement}>
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <label>Topic</label>
              <div>
                <Button type="submit" variant="warning" className="mr-2" onClick={(e) => hideAnnouncementCreator(e)}>
                  Cancel
                </Button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
            <input
              maxLength={50}
              ref={inputTopic}
              type="text"
              className="form-control w-25"
              placeholder="A place for your topic..."
              required
            ></input>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              maxLength={250}
              ref={inputDesc}
              className="form-control"
              placeholder="What's on your mind?"
            ></textarea>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default AnnouncementCreator;
