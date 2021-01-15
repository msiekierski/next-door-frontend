interface IEvent {
  id: number;
  idAccount: number;
  title: string;
  desc: string;
  creationDate: string;
  dateOfEvent: string;
  type: "event";
}

export default IEvent;
