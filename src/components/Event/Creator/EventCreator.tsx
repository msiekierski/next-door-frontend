import React, { FormEvent, FunctionComponent, useContext, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { UserContext } from "../../Login/UserContext";
import { createAnnouncement } from "../../../API/announcements";
import { IUser } from "../../Login/IUser";
import DateToOracleDate from "../../../utils/DateConverter";
import IEventCreator from "./IEventCreator";
import IEvent from "../IEvent";
import { createEvent } from "../../../API/events";
import { EVENT_TYPE } from "../../../constants/constants";
import IEventUser from "../IEventUser";

export type Props = IEventCreator;

const EventCreator: FunctionComponent<Props> = ({ hideEventCreator, createFeed }) => {
  const inputTopic = useRef<HTMLInputElement>(null);
  const inputDesc = useRef<HTMLTextAreaElement>(null);
  const inputEventDate = useRef<HTMLInputElement>(null);
  const user = useContext<IUser | null>(UserContext);

  const submitEvent = async (e: FormEvent) => {
    e.preventDefault();
    const newUser:IEventUser = {
      idAccount: user?.idAccount,
      name: user?.name,
      surname: user?.surname
    }
    const newEvent: IEvent = {
      idAssoc: user?.idAssoc ? user.idAssoc : 0,
      creationDate: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      description: inputDesc?.current?.value ? inputDesc.current.value : "",
      idCreator: user?.idAccount ? user.idAccount : 0,
      title: inputTopic?.current?.value ? inputTopic.current.value : "",
      type: "event",
      idEvent: 0,
      eventDate: inputEventDate?.current?.value ? inputEventDate.current.value : "",
      users: [newUser]
    };
    //
    newEvent.idEvent = await createEvent(newEvent);
    createFeed(newEvent);
    hideEventCreator();
  };

  return (
    <Card className="mt-2">
      <Card.Body>
        <form onSubmit={submitEvent}>
          <div className="form-group justify-content-flex">
            <div className="d-flex justify-content-between">
              <label>Topic</label>
              <div>
                <Button type="submit" variant="warning" className="mr-2" onClick={(e) => hideEventCreator(e)}>
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
            <label>Event's date</label>
            <br />
            <input ref={inputEventDate} className="form-control w-25" required type="date" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              maxLength={250}
              ref={inputDesc}
              className="form-control"
              placeholder="Your event's description..."
            />
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default EventCreator;
