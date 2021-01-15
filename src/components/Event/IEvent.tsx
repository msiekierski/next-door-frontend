interface IEvent {
  type: "event";
  idAccount: number;
  title: string;
  description: string;
  creationDate: string;
  eventDate: string;
}

export default IEvent;
