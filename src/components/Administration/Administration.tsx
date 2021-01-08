import React from "react";
import IAnnouncement from "../Announcement/IAnnouncement";
import Announcement from "../Announcement/Announcement";
import Search from "../Search/Search";

const announcements: Array<IAnnouncement> = [
  {
    announcementType: "administrative",
    author: "John Doe",
    comments: [],
    creationDate: new Date(),
    description: "My first post",
    idAccount: 0,
    idAnnouncement: 0,
    title: "My Ann",
  },
  {
    announcementType: "administrative",
    author: "John Hoe",
    comments: [],
    creationDate: new Date(),
    description: "My first post",
    idAccount: 0,
    idAnnouncement: 0,
    title: "My Ann",
  },
  {
    announcementType: "administrative",
    author: "John Poe",
    comments: [],
    creationDate: new Date(),
    description: "My first post",
    idAccount: 0,
    idAnnouncement: 0,
    title: "My Ann",
  },
];

const Administration = () => {
  return (
    <div>
      <Search />
      {announcements.map(getAnnouncementComponent)}
    </div>
  );
};

function getAnnouncementComponent(announcement: IAnnouncement) {
  return (
    <Announcement
      idAnnouncement={announcement.idAnnouncement}
      idAccount={announcement.idAccount}
      announcementType={announcement.announcementType}
      title={announcement.title}
      description={announcement.description}
      creationDate={announcement.creationDate}
      author={announcement.author}
      comments={announcement.comments}
    />
  );
}

export default Administration;
