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

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter((ann) => ann.idAnnouncement !== id));
  };

  const updateAnnouncement = (id: number, newTitile: string, newDesc: string) => {
    let newAnn = [...announcements];
    const index: number = newAnn.findIndex((ann) => ann.idAnnouncement === id);
    newAnn[index].title = newTitile;
    newAnn[index].desc = newDesc;
    setAnnouncements(newAnn);
  };

  const getAnnouncementComponent = (announcement: IAnnouncement) => {
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
        removeAnnouncement={deleteAnnouncement}
        updateAnnouncement={updateAnnouncement}
      />
    );
  };

  return (
    <div>
      <Search />
      {announcements && announcements.length ? announcements.map(getAnnouncementComponent) : "Loading..."}
    </div>
  );
};

export default Community;
