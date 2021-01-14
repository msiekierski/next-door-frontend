import IComment from "./Comment/IComment";

interface IAnnouncement {
  id: number;
  idAccount: number;
  announcementType: string;
  title: string;
  desc: string;
  creationDate: string;
  author: string;
  comments: Array<IComment>;
  removeAnnouncement: Function;
  updateAnnouncement: Function;
  type: "announcement";
}

export default IAnnouncement;
