import React, { useContext, useEffect, useState } from "react";
import Announcement from "../Announcement/Announcement";
import Search from "../Search/Search";
import IAnnouncement from "../Announcement/IAnnouncement";
import { getAllAnnouncements } from "../../API/announcements";
import { UserContext } from "../Login/UserContext";
import { IUser } from "../Login/IUser";

const Community = () => {
  const user = useContext<IUser | null>(UserContext);
  const [announcements, setAnnouncements] = useState<Array<IAnnouncement>>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setAnnouncements(await getAllAnnouncements(user?.idAssoc));
    };
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <Search />
      {announcements.length ? announcements.map(getAnnouncementComponent) : "Loading..."}
    </div>
  );
};

function getAnnouncementComponent(announcement: IAnnouncement) {
  console.log(announcement);
  return (
    <Announcement
      key={announcement.idAnnouncement}
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

export default Community;
