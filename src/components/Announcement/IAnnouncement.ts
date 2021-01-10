import IComment from "./Comment/IComment";

interface IAnnouncement {
  idAnnouncement: number;
  idAccount: number;
  announcementType: string;
  title: string;
  desc: string;
  creationDate: string;
  author: string;
  comments: Array<IComment>;
  removeAnnouncement: Function;
  updateAnnouncement: Function;
}

export default IAnnouncement;
