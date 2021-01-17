import React from "react";
import IAnnouncementAdmin from "../Announcement/IAnnoucementAdmin";
import AnnouncementAdmin from "../Announcement/AnnoucementAdmin";
import Search from "../Search/Search";

const announcements: Array<IAnnouncementAdmin> = [
  {
    announcementType: "administrative",
    author: "John Doe",
    comments: [],
    creationDate: "new Date()",
    desc: "My first post",
    idAccount: 0,
    idAnnouncement: 0,
    title: "My Ann",
  },
  {
    announcementType: "administrative",
    author: "John Hoe",
    comments: [],
    creationDate: "new Date()",
    desc: "My first post",
    idAccount: 0,
    idAnnouncement: 0,
    title: "My Ann",
  },
  {
    announcementType: "administrative",
    author: "John Poe",
    comments: [],
    creationDate: "new Date()",
    desc: "My first post",
    idAccount: 0,
    idAnnouncement: 0,
    title: "My Ann",
  },
];

const Administration = () => {
  return (
    <div>
      {/*<Search />*/}
      {announcements.map(getAnnouncementComponent)}
    </div>
  );
};

function getAnnouncementComponent(announcement: IAnnouncementAdmin) {
  return (
    <AnnouncementAdmin
      idAnnouncement={announcement.idAnnouncement}
      idAccount={announcement.idAccount}
      announcementType={announcement.announcementType}
      title={announcement.title}
      desc={announcement.desc}
      creationDate={announcement.creationDate}
      author={announcement.author}
      comments={announcement.comments}
    />
  );
}

export default Administration;
