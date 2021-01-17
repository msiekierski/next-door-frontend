import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import Advertisement from "../Advertisement/Advertisement";
import { IUser } from "../../Login/IUser";
import { UserContext } from "../../Login/UserContext";
import IAnnouncement from "../../Announcement/IAnnouncement";
import { getAllAnnouncements } from "../../../API/announcements";
import Announcement from "../../Announcement/Announcement";
import Search from "../../Search/Search";
import IAdvertisement from "../Advertisement/IAdvertisement";
import { getAllAdvertisements } from "../../../API/advertisement";
import { Card } from "react-bootstrap";
import AnnouncementCreator from "../../Announcement/Creator/AnnouncementCreator";
import AdvertisementCreator from "../AdvertisementAddForm/AdvertisementCreator";

interface OwnProps {}

type Props = OwnProps;

const AdvertisementsPage: FunctionComponent<Props> = (props) => {
  const user = useContext<IUser | null>(UserContext);
  const [advertisements, setAdvertisements] = useState<Array<IAdvertisement>>([]);
  const [isCreatingAdvertisement, setIsCreatingAdvertisement] = useState(false);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      setAdvertisements(await getAllAdvertisements(user?.idAccount));
    };
    fetchAdvertisements();
  }, []);

  const removeAdvertisement = (id: number) => {
    setAdvertisements(advertisements.filter((ad) => ad.idAd !== id));
  };

  const updateAdvertisement = (id: number, newTitle: string, newDesc: string) => {
    let newAd = [...advertisements];
    const index: number = newAd.findIndex((ad) => ad.idAd === id);
    newAd[index].title = newTitle;
    newAd[index].description = newDesc;
    setAdvertisements(newAd);
  };

  const hideAdvertisementCreator = () => {
    setIsCreatingAdvertisement(false);
  };

  const addNewAdvert = (newAdvert: IAdvertisement) => {
    setAdvertisements([newAdvert, ...advertisements]);
  };

  const getAdvertisementComponent = (advertisement: IAdvertisement) => {
    return (
      <Advertisement
        key={advertisement.idAd}
        idAd={advertisement.idAd}
        idAccount={advertisement.idAccount}
        title={advertisement.title}
        description={advertisement.description}
        price={advertisement.price}
        status={1}
        removeAdvertisement={removeAdvertisement}
        updateAdvertisement={updateAdvertisement}
      />
    );
  };

  return (
    <div>
      {/*<Search />*/}
      <div className="d-flex justify-content-between mt-3 ">
        <Card.Link href="#" onClick={() => setIsCreatingAdvertisement(!isCreatingAdvertisement)}>
          {isCreatingAdvertisement ? "Hide Creator" : "Create Advertisement"}
        </Card.Link>
      </div>
      {isCreatingAdvertisement && (
        <AdvertisementCreator hideAdvertisementCreator={hideAdvertisementCreator} addNewAdvertisement={addNewAdvert} />
      )}
      {advertisements.length ? advertisements.map(getAdvertisementComponent) : "Loading..."}
    </div>
  );
};

export default AdvertisementsPage;
