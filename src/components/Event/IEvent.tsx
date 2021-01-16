interface IEvent {
  idEvent: number;
  type: "event";
  idCreator: number;
  title: string;
  description: string;
  creationDate: string;
  eventDate: string;
  idAssoc: number;
}

export default IEvent;
