interface IEvent {
  type: "event";
  idAccount: number;
  title: string;
  description: string;
  creationDate: string;
  dateOfEvent: string;
}

export default IEvent;
