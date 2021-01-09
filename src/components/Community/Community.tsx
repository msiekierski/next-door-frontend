import React from "react";
import Announcement from "../Announcement/Announcement";
import Search from "../Search/Search";
import IAnnouncement from "../Announcement/IAnnouncement";

const announcements: Array<IAnnouncement> = [
  {
    announcementType: "communal",
    author: "Amy Baker",
    comments: [],
    creationDate: new Date(),
    description: "My first post",
    idAccount: 1,
    idAnnouncement: 2,
    title: "My Ann",
  },
  {
    announcementType: "communal",
    author: "Amy Baker",
    comments: [],
    creationDate: new Date(),
    description: "My first post",
    idAccount: 1,
    idAnnouncement: 0,
    title: "My Ann",
  },
  {
    announcementType: "communal",
    author: "John Poe",
    comments: [],
    creationDate: new Date(),
    description: "My first post",
    idAccount: 0,
    idAnnouncement: 0,
    title: "My Ann",
  },
];

const Community = () => {
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

export default Community;
