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
import { addUser, deleteUser, getAllEvents, getUsers } from "../../API/events";
import { ANNOUNCEMENT_TYPE, ANNOUNCEMENT_TYPE_COMMUNAL, EVENT_TYPE, SEARCH_COMMUNITY } from "../../constants/constants";
import EventCreator from "../Event/Creator/EventCreator";
import IEventUser from "../Event/IEventUser";
import { getAllAdvertisementsEstate } from "../../API/advertisement";
import IAdvertisement from "../Advertisements/Advertisement/IAdvertisement";
import Advertisement from "../Advertisements/Advertisement/Advertisement";

const Community = () => {
  const [seconds, setSeconds] = useState(0);
  //login
  const user = useContext(UserContext);
  //general list
  const [feed, setFeed] = useState<Array<IAnnouncement | IEvent>>([]);
  const [filter, setFilter] = useState("");

  const [ads, setAds] = useState<Array<IAdvertisement>>([]);
  //togglers
  const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const [currAd, setCurrAd] = useState(0);

  //fetch all data
  useEffect(() => {
    const fetchData = async () => {
      const announcements = await getAllAnnouncements(user?.idAssoc);
      const events = await getAllEvents(user?.idAssoc);
      const ads = await getAllAdvertisementsEstate(user?.idAssoc);
      setCurrAd(Math.floor(Math.random() * ads.length));
      setAds(ads);
      console.log(ads);
      const communalAnnouncements = announcements.filter((e) => e.announcementType == ANNOUNCEMENT_TYPE_COMMUNAL);
      communalAnnouncements.forEach((e) => (e.type = ANNOUNCEMENT_TYPE));
      events.forEach((e) => (e.type = EVENT_TYPE));
      setFeed([...communalAnnouncements, ...events]);
    };
    fetchData();
  }, []);

  //announcement functions
  const feedCallbacks = {
    createFeed: (announcement: IAnnouncement | IEvent) => {
      setFeed((feed) => [announcement, ...feed]);
    },
    updateFeed: (type: string, id: number, titleEdit: string, descriptionEdit: string, date: string) => {
      let index;
      if (type == ANNOUNCEMENT_TYPE) {
        index = feed.findIndex((e) => e.type == ANNOUNCEMENT_TYPE && e.idAnnouncement == id);
      } else {
        index = feed.findIndex((e) => e.type == EVENT_TYPE && e.idEvent == id);
      }
      const newFeed = [...feed];
      newFeed[index].title = titleEdit;
      newFeed[index].description = descriptionEdit;
      let elem = newFeed[index];
      if (elem.type === EVENT_TYPE) {
        elem.eventDate = date;
      }
      setFeed(newFeed);
    },
    removeFeed: (type: string, id: number) => {
      if (type == ANNOUNCEMENT_TYPE) {
        setFeed((feed) => feed.filter((e) => e.type != ANNOUNCEMENT_TYPE || e.idAnnouncement != id));
      } else {
        setFeed((feed) => feed.filter((e) => e.type != EVENT_TYPE || e.idEvent != id));
      }
    },
  };

  const joinUserToEvent = async (idEvent: number) => {
    if (
      feed.find(
        (element) =>
          element.type === EVENT_TYPE && element.users.find((u) => u.idAccount === user?.idAccount) === undefined
      )
    ) {
      await addUser(idEvent, user?.idAccount!);
      const newFeed = feed.map((element) => {
        if (element.type === EVENT_TYPE && element.idEvent == idEvent) {
          const newUser: IEventUser = {
            idAccount: user?.idAccount,
            name: user?.name,
            surname: user?.surname,
          };
          element.users = [newUser, ...element.users];
        }
        return element;
      });
      setFeed(newFeed);
    }
  };

  const deleteUserFromEvent = async (idEvent: number) => {
    if (
      feed.find(
        (element) =>
          element.type === EVENT_TYPE && element.users.find((u) => u.idAccount === user?.idAccount) !== undefined
      )
    ) {
      await deleteUser(idEvent, user?.idAccount!);
      const newFeed = feed.map((element) => {
        if (element.type === EVENT_TYPE && element.idEvent == idEvent) {
          element.users = element.users.filter((u) => u.idAccount !== user?.idAccount);
        }
        return element;
      });
      setFeed(newFeed);
    }
  };

  const generateFeedComponent = (feedElement: IAnnouncement | IEvent, index: number) => {
    if (feedElement.type == ANNOUNCEMENT_TYPE) {
      return <Announcement key={index} {...feedElement} {...feedCallbacks} />;
    }
    if (feedElement.type == EVENT_TYPE) {
      return (
        <Event
          key={index}
          {...feedElement}
          {...feedCallbacks}
          joinUser={joinUserToEvent}
          deleteUser={deleteUserFromEvent}
        />
      );
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
      <Search setFilter={setFilter} />
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
          createFeed={feedCallbacks.createFeed}
        />
      )}
      {isCreatingEvent && (
        <EventCreator hideEventCreator={() => setIsCreatingEvent(false)} createFeed={feedCallbacks.createFeed} />
      )}
      {ads.length ? <Advertisement {...ads[currAd]} /> : null}
      {feed && feed.length ? feed.sort(sortByDate).filter(filterByPhrase).map(generateFeedComponent) : "Loading..."}
    </div>
  );

  function sortByDate(a: IAnnouncement | IEvent, b: IAnnouncement | IEvent) {
    return Number(new Date(b.creationDate)) - Number(new Date(a.creationDate));
  }
  function filterByPhrase(e: IAnnouncement | IEvent): boolean {
    return e.title.toLowerCase().includes(filter);
  }
};

export default Community;
