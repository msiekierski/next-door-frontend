import React, { FunctionComponent, useRef, FormEvent, useContext, useState, RefObject } from "react";
import { Card, Button, Container } from "react-bootstrap";
import IAdvertisementCreator from "./IAdvertisementCreator";
import { UserContext } from "../../Login/UserContext";
import { createAdvertisement } from "../../../API/advertisement";
import { ADVERT_BOTTOM_PAYMENT, ANNOUNCEMENT_TYPE_COMMUNAL } from "../../../constants/constants";
import { IUser } from "../../Login/IUser";
import DateToOracleDate from "../../../utils/DateConverter";
import HousingAssocList from "./HousingAssocList/HousingAssocList";
import { createAnnouncement } from "../../../API/announcements";
import IAdvertisement from "../Advertisement/IAdvertisement";

export type Props = IAdvertisementCreator;

const AdvertisementCreator: FunctionComponent<Props> = ({ hideAdvertisementCreator, addNewAdvertisement }) => {
  const inputTopic = useRef<HTMLInputElement>(null);
  const inputDesc = useRef<HTMLTextAreaElement>(null);
  const [charge, setCharge] = useState(ADVERT_BOTTOM_PAYMENT);
  const user = useContext<IUser | null>(UserContext);

  async function submitAdvert(e: FormEvent) {
    e.preventDefault();
    // const newAdvert: IAdvertisement = {
    //   idAccount: user?.idAccount,
    //   title: inputTopic?.current?.value,
    //   description: inputDesc?.current?.value,
    //   price: charge,
    //   status: 0,
    // };
  }

  return (
    <Card className="mt-2">
      <Card.Body>
        <form onSubmit={submitAdvert}>
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <label>Topic</label>
              <div>
                <Button variant="secondary" className="mr-2" onClick={(e) => hideAdvertisementCreator(e)}>
                  Cancel
                </Button>
                <button type="submit" className="btn btn-primary mr-2">
                  Submit
                </button>
                <button type="submit" className="btn btn-warning">
                  Submit and pay
                </button>
              </div>
            </div>
            <div className={`d-flex space-between`}>
              <input
                maxLength={50}
                ref={inputTopic}
                type="text"
                className="form-control w-25"
                placeholder="A place for your topic..."
                required
              />
              <h5 className={"ml-auto text-secondary font-md mt-2"}>{charge} PLN</h5>
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              maxLength={250}
              ref={inputDesc}
              className="form-control"
              placeholder="What's on your mind?"
            />
          </div>
        </form>
      </Card.Body>
      <HousingAssocList setCharge={setCharge} />
    </Card>
  );
};

export default AdvertisementCreator;
