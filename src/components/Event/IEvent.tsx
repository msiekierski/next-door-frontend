import IEventUser from "./IEventUser";

interface IEvent {
  idEvent: number;
  type: "event";
  idCreator: number;
  title: string;
  description: string;
  creationDate: string;
  eventDate: string;
  idAssoc: number;
  users: Array<IEventUser>;
}

export default IEvent;
