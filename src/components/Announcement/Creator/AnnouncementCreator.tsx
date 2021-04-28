import React, { FormEvent, FunctionComponent, useContext, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import IAnnouncementCreator from "./IAnnouncementCreator";
import { UserContext } from "../../Login/UserContext";
import { createAnnouncement } from "../../../API/announcements";
import { IUser } from "../../Login/IUser";
import IAnnouncement from "../IAnnouncement";

export type Props = IAnnouncementCreator;

const AnnouncementCreator: FunctionComponent<Props> = ({ hideAnnouncementCreator, createFeed }) => {
  const inputTopic = useRef<HTMLInputElement>(null);
  const inputDesc = useRef<HTMLTextAreaElement>(null);
  const user = useContext<IUser | null>(UserContext);

  const submitAnnouncement = async (e: FormEvent) => {
    e.preventDefault();

    const newAnnouncement: IAnnouncement = {
      idAssoc: user?.idAssoc ? user.idAssoc : 0,
      announcementType: user?.accountType == 1 ? 1 : 2,
      creationDate: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      description: inputDesc?.current?.value ? inputDesc.current.value : "",
      idAccount: user?.idAccount ? user.idAccount : 0,
      title: inputTopic?.current?.value ? inputTopic.current.value : "",
      type: "announcement",
      idAnnouncement: 0,
      replies: [],
      name: "",
      surname: "",
    };
    newAnnouncement.idAnnouncement = await createAnnouncement(newAnnouncement);
    createFeed(newAnnouncement);
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
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              maxLength={250}
              ref={inputDesc}
              className="form-control"
              placeholder="What's on your mind?"
            />
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default AnnouncementCreator;
