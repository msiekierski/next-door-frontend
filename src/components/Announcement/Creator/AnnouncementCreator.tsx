import React, { FunctionComponent, useRef, FormEvent } from "react";
import { Card, Button } from "react-bootstrap";
import IAnnouncement from "../IAnnouncement";
import IAnnouncementCreator from "./IAnnouncementCreator";
import {UserContext} from "../../Login/UserContext"

export type Props = IAnnouncementCreator;

const AnnouncementCreator: FunctionComponent<Props> = ({ hideAnnouncementCreator }) => {
  const inputTopic = useRef<HTMLInputElement>(null);
  const inputDesc = useRef<HTMLTextAreaElement>(null);

  const submitAnnouncement = (e: FormEvent) => {
    e.preventDefault();

    let topic: string = "";
    let desc: string = "";
    if (inputTopic != null && inputTopic.current != null) {
      topic = inputTopic.current.value;
      console.log(topic);
    }
    if (inputDesc && inputDesc.current) {
      desc = inputDesc.current.value;
      console.log(desc);
    }

    //TODO: DODANIE FUNKCJI Z REQUESTEM, DODANIE ANN DO ARRAYA W COMMUNITY

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
              ref={inputTopic}
              type="text"
              className="form-control w-25"
              placeholder="A place for your topic..."
              required
            ></input>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea required ref={inputDesc} className="form-control" placeholder="What's on your mind?"></textarea>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default AnnouncementCreator;
