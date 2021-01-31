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
  creatorName?: string;
  creatorSurname?: string;
  users: Array<IEventUser>;
}

export default IEvent;
