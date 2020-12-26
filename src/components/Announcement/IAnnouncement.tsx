import IComment from "./Comment/IComment";

interface IAnnouncement {
  idAnnouncement: number;
  idAccount: number;
  announcementType: string;
  title: string;
  description: string;
  creationDate: Date;
  author: string;
  comments: Array<IComment>;
}

export default IAnnouncement;
