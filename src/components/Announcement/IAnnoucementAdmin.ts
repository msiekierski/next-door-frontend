import IComment from "./Comment/IComment";

interface IAnnouncementAdmin {
  idAnnouncement: number;
  idAccount: number;
  announcementType: string;
  title: string;
  desc: string;
  creationDate: string;
  author: string;
  comments: Array<IComment>;
}

export default IAnnouncementAdmin;
