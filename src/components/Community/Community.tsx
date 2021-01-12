import React, { useContext, useEffect, useState } from "react";
import Announcement from "../Announcement/Announcement";
import Search from "../Search/Search";
import IAnnouncement from "../Announcement/IAnnouncement";
import { getAllAnnouncements } from "../../API/announcements";
import { UserContext } from "../Login/UserContext";
import { IUser } from "../Login/IUser";
import { Card } from "react-bootstrap";
import AnnouncementCreator from "../Announcement/Creator/AnnouncementCreator";

const Community = () => {
  const user = useContext<IUser | null>(UserContext);
  const [announcements, setAnnouncements] = useState<Array<IAnnouncement>>([]);
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

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

  const hideAnnouncementCreator = () => {
    setIsCreatingAnnouncement(false);
  };

  const addNewAnnouncement = (
    idAccount: number,
    idAnnouncement: number,
    title: string,
    description: string,
    creationDate: string
  ) => {
    const newAnnouncement: IAnnouncement = {
      idAccount: idAccount,
      idAnnouncement: idAnnouncement,
      announcementType: "communal",
      title: title,
      desc: description,
      creationDate: creationDate,
      author: user?.name + " " + user?.surname,
      comments: [],
      removeAnnouncement: deleteAnnouncement,
      updateAnnouncement: updateAnnouncement,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
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
      <div className="d-flex justify-content-between mt-3 ">
        {!isCreatingEvent && (
          <Card.Link href="#" onClick={() => setIsCreatingAnnouncement(!isCreatingAnnouncement)}>
            {isCreatingAnnouncement ? "Hide Creator" : "Create Announcement"}
          </Card.Link>
        )}
        {!isCreatingAnnouncement && <Card.Link>Create Event</Card.Link>}
      </div>
      {isCreatingAnnouncement && (
        <AnnouncementCreator
          hideAnnouncementCreator={hideAnnouncementCreator}
          addNewAnnouncement={addNewAnnouncement}
        />
      )}
      {announcements && announcements.length ? announcements.map(getAnnouncementComponent) : "Loading..."}
    </div>
  );
};

export default Community;
