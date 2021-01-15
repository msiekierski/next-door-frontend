import React, { useContext, useEffect, useState } from "react";
import Announcement from "../Announcement/Announcement";
import Search from "../Search/Search";
import IAnnouncement from "../Announcement/IAnnouncement";
import { getAllAnnouncements } from "../../API/announcements";
import { UserContext } from "../Login/UserContext";
import { IUser } from "../Login/IUser";
import { Card } from "react-bootstrap";
import AnnouncementCreator from "../Announcement/Creator/AnnouncementCreator";
import Event from "../Event/Event";
import IEvent from "../Event/IEvent";
import { getAllEvents } from "../../API/events";
import { IANNOUNCEMENT_TYPE, IEVENT_TYPE } from "../../constants/constants";

const Community = () => {
  const user = useContext<IUser | null>(UserContext);
  const [feed, setFeed] = useState<Array<IAnnouncement | IEvent>>([]);
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      const annPromise = await getAllAnnouncements(user?.idAssoc);
      const eventsPromise: Array<IEvent> = await getAllEvents(user?.idAccount!);
      Promise.all([annPromise, eventsPromise]).then((result) => {
        result[0].map((ann) => (ann.type = IANNOUNCEMENT_TYPE));
        result[1].map((event) => (event.type = IEVENT_TYPE));
        setFeed([...result[0], ...result[1]]);
      });
    };
    fetchFeed();
  }, []);

  const deleteAnnouncement = (id: number) => {
    setFeed(feed.filter((feed) => feed.id !== id));
  };

  const updateAnnouncement = (id: number, newTitile: string, newDesc: string) => {
    let newAnn = [...feed];
    const index: number = newAnn.findIndex((ann) => ann.id === id);
    newAnn[index].title = newTitile;
    newAnn[index].desc = newDesc;
    setFeed(newAnn);
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
      id: idAnnouncement,
      announcementType: "communal",
      title: title,
      desc: description,
      creationDate: creationDate,
      author: user?.name + " " + user?.surname,
      comments: [],
      removeAnnouncement: deleteAnnouncement,
      updateAnnouncement: updateAnnouncement,
      type: IANNOUNCEMENT_TYPE,
    };
    setFeed([newAnnouncement, ...feed]);
  };

  const getFeedComponent = (feedElement: IAnnouncement | IEvent) => {
    if (feedElement.type === IANNOUNCEMENT_TYPE) {
      return (
        <Announcement
          key={feedElement.id}
          id={feedElement.id}
          idAccount={feedElement.idAccount}
          announcementType={feedElement.announcementType}
          title={feedElement.title}
          desc={feedElement.desc}
          creationDate={feedElement.creationDate}
          author={feedElement.author}
          comments={feedElement.comments}
          removeAnnouncement={deleteAnnouncement}
          updateAnnouncement={updateAnnouncement}
          type={feedElement.type}
        />
      );
    } else if (feedElement.type === IEVENT_TYPE) {
      console.log(feedElement.creationDate);
      return (
        <Event
          key={feedElement.id}
          id={feedElement.id}
          idAccount={feedElement.idAccount}
          title={feedElement.title}
          desc={feedElement.desc}
          creationDate={feedElement.creationDate}
          dateOfEvent={feedElement.dateOfEvent}
          type={IEVENT_TYPE}
        />
      );
    }
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
      {feed && feed.length ? feed.map(getFeedComponent) : "Loading..."}
    </div>
  );
};

export default Community;
