import IComment from "./Comment/IComment";

interface IAnnouncement {
  type: "announcement";
  idAnnouncement: number;
  idAccount: number;
  idAssoc: number;
  announcementType: number;
  title: string;
  description: string;
  creationDate: string;
  name: string;
  surname: string;
  replays: Array<IComment>;
}

export default IAnnouncement;
