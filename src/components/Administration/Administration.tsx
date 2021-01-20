import React, { useContext, useEffect, useState } from "react";
import Announcement from "../Announcement/Announcement";
import Search from "../Search/Search";
import IAnnouncement from "../Announcement/IAnnouncement";
import { getAllAnnouncements } from "../../API/announcements";
import { UserContext } from "../Login/UserContext";
import { Card } from "react-bootstrap";
import AnnouncementCreator from "../Announcement/Creator/AnnouncementCreator";
import Event from "../Event/Event";
import IEvent from "../Event/IEvent";
import { getAllEvents } from "../../API/events";
import {
  ACCOUNT_TYPE_ADMINISTRATOR,
  ANNOUNCEMENT_TYPE,
  ANNOUNCEMENT_TYPE_ADMINISTRATIVE,
  EVENT_TYPE,
  SEARCH_COMMUNITY,
} from "../../constants/constants";
import EventCreator from "../Event/Creator/EventCreator";

const Administration = () => {
  //login
  const user = useContext(UserContext);
  //general list
  const [feed, setFeed] = useState<Array<IAnnouncement>>([]);
  const [filter, setFilter] = useState("");

  //togglers
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  //fetch all data
  useEffect(() => {
    const fetchData = async () => {
      const announcements = await getAllAnnouncements(user?.idAssoc);
      //add types
      const administrativeAnnouncements = announcements.filter(
        (e) => e.announcementType == ANNOUNCEMENT_TYPE_ADMINISTRATIVE
      );
      setFeed([...administrativeAnnouncements]);
    };
    fetchData();
  }, []);

  //announcement functions
  const feedCallbacks = {
    createFeed: (announcement: IAnnouncement) => {
      setFeed((feed) => [announcement, ...feed]);
    },
    updateFeed: (id: number, titleEdit: string, descriptionEdit: string) => {
      let index = feed.findIndex((e) => e.idAnnouncement == id);
      const newFeed = [...feed];
      newFeed[index].title = titleEdit;
      newFeed[index].description = descriptionEdit;
      setFeed(newFeed);
    },
    removeFeed: (id: number) => {
      setFeed((feed) => feed.filter((e) => e.idAnnouncement != id));
    },
  };

  const generateFeedComponent = (feedElement: IAnnouncement, index: number) => {
    return <Announcement key={index} {...feedElement} {...feedCallbacks} />;
  };

  const getClassName = (): string => {
    if (!isCreatingAnnouncement && !isCreatingEvent) return "d-flex justify-content-between mt-3";
    else if (isCreatingAnnouncement) {
      return "text-left mt-3";
    } else {
      return "text-right mt-3";
    }
  };

  return (
    <div>
      <Search setFilter={setFilter} />
      {user?.accountType == ACCOUNT_TYPE_ADMINISTRATOR && (
        <div className={getClassName()}>
          {!isCreatingEvent && (
            <Card.Link href="#" onClick={() => setIsCreatingAnnouncement(!isCreatingAnnouncement)}>
              {isCreatingAnnouncement ? "Hide Creator" : "Create Announcement"}
            </Card.Link>
          )}
          {!isCreatingAnnouncement && (
            <div className="text-right">
              <Card.Link href="#" onClick={() => setIsCreatingEvent(!isCreatingEvent)}>
                {isCreatingEvent ? "Hide Creator" : "Create Event"}
              </Card.Link>
            </div>
          )}
        </div>
      )}
      {user?.accountType == ACCOUNT_TYPE_ADMINISTRATOR && isCreatingAnnouncement && (
        <AnnouncementCreator
          hideAnnouncementCreator={() => setIsCreatingAnnouncement(false)}
          createFeed={feedCallbacks.createFeed}
        />
      )}
      {user?.accountType == ACCOUNT_TYPE_ADMINISTRATOR && isCreatingEvent && (
        <EventCreator hideEventCreator={() => setIsCreatingEvent(false)} createFeed={feedCallbacks.createFeed} />
      )}
      {feed && feed.length ? feed.sort(sortByDate).filter(filterByPhrase).map(generateFeedComponent) : "Loading..."}
    </div>
  );

  function sortByDate(a: IAnnouncement, b: IAnnouncement) {
    return Number(new Date(b.creationDate)) - Number(new Date(a.creationDate));
  }
  function filterByPhrase(e: IAnnouncement): boolean {
    return e.title.toLowerCase().includes(filter);
  }
};

export default Administration;
