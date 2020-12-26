interface IEvent {
  idEvent: number;
  idAccount: number;
  title: string;
  description: string;
  creationDate: Date;
  dateOfEvent: Date;
}

export default IEvent;
