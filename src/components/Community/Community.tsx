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
import { ANNOUNCEMENT_TYPE, EVENT_TYPE, SEARCH_COMMUNITY } from "../../constants/constants";
import EventCreator from "../Event/Creator/EventCreator";

const Community = () => {
  //login
  const user = useContext(UserContext);
  //lists
  const [announcements, setAnnouncements] = useState<Array<IAnnouncement>>([]);
  const [events, setEvents] = useState<Array<IEvent>>([]);

  //general list
  const [feed, setFeed] = useState<Array<IAnnouncement | IEvent>>([]);
  const [filtered, setFiltered] = useState<Array<IAnnouncement | IEvent>>([]);
  //togglers
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  //fetch all data
  useEffect(() => {
    const fetchData = async () => {
      const announcements = await getAllAnnouncements(user?.idAssoc);
      const events = await getAllEvents(user?.idAssoc);
      //add types
      const communalAnnouncements = announcements.filter((e) => e.announcementType == 1);
      communalAnnouncements.forEach((e) => (e.type = ANNOUNCEMENT_TYPE));
      events.forEach((e) => (e.type = EVENT_TYPE));
      setAnnouncements(communalAnnouncements);
      setEvents(events);
      const initialFeed = [...communalAnnouncements, ...events].sort(sortByDate);
      setFeed(initialFeed);
      setFiltered(initialFeed);
    };
    fetchData();
  }, []);

  //announcement functions
  const announcementCallbacks = {
    createAnnouncement: (announcement: IAnnouncement) => {
      const newFeed = [announcement, ...feed].sort(sortByDate);
      updateFeeds(newFeed);
    },
    updateAnnouncement: (idAnnouncement: number, titleEdit: string, descriptionEdit: string) => {
      let index = feed.findIndex((e) => e.type == ANNOUNCEMENT_TYPE && e.idAnnouncement == idAnnouncement);
      const updated = [...feed];
      updated[index].title = titleEdit;
      updated[index].description = descriptionEdit;
      const newFeed = updated.sort(sortByDate);
      updateFeeds(newFeed);
    },
    removeAnnouncement: (idAnnouncement: number) => {
      const newAnnouncements = announcements.filter((e) => e.idAnnouncement != idAnnouncement);
      setAnnouncements(newAnnouncements);
      const newFeed = [...newAnnouncements, ...events];
      updateFeeds(newFeed);
    },
  };

  const updateFeeds = (newFeed: Array<IAnnouncement | IEvent>) => {
    setFeed(newFeed);
    setFiltered(newFeed);
  };

  const eventCallbacks = {
    createEvent: (event: IEvent) => {
      const newFeed = [event, ...feed].sort(sortByDate);
      updateFeeds(newFeed);
    },

    removeEvent: (idEvent: number) => {
      const newEvents = events.filter((e) => e.idEvent !== idEvent);
      setEvents(newEvents);
      const newFeed = [...announcements, ...newEvents];
      updateFeeds(newFeed);
    },

    updateEvent: (idEvent: number, titleEdit: string, descriptionEdit: string, eventDateEdit: string) => {
      let index = events.findIndex((e) => e.idEvent === idEvent);
      const newEvents = [...events];
      newEvents[index].title = titleEdit;
      newEvents[index].description = descriptionEdit;
      newEvents[index].eventDate = eventDateEdit;
      setEvents([...newEvents]);
      const newFeed = [...announcements, ...events].sort(sortByDate);
      updateFeeds(newFeed);
    },
  };

  const generateFeedComponent = (feedElement: IAnnouncement | IEvent, index: number) => {
    if (feedElement.type == ANNOUNCEMENT_TYPE) {
      return <Announcement key={index} {...feedElement} {...announcementCallbacks} />;
    }
    if (feedElement.type == EVENT_TYPE) {
      return <Event key={index} {...feedElement} {...eventCallbacks} />;
    }
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
      <Search baseFeed={feed} setFiltered={setFiltered} />
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
      {isCreatingAnnouncement && (
        <AnnouncementCreator
          hideAnnouncementCreator={() => setIsCreatingAnnouncement(false)}
          addNewAnnouncement={announcementCallbacks.createAnnouncement}
        />
      )}
      {isCreatingEvent && (
        <EventCreator hideEventCreator={() => setIsCreatingEvent(false)} addNewEvent={eventCallbacks.createEvent} />
      )}
      {filtered && filtered.length ? filtered.map(generateFeedComponent) : "Loading..."}
    </div>
  );
};

function sortByDate(a: IAnnouncement | IEvent, b: IAnnouncement | IEvent) {
  return Number(new Date(b.creationDate)) - Number(new Date(a.creationDate));
}

export default Community;
