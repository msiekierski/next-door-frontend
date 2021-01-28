import React, { FunctionComponent, useRef, FormEvent, useContext, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import IAdvertisementCreator from "./IAdvertisementCreator";
import { UserContext } from "../../Login/UserContext";
import { IUser } from "../../Login/IUser";
import HousingAssocList from "./HousingAssocList/HousingAssocList";
import IAdvertisement from "../Advertisement/IAdvertisement";
import { createAdvertisement } from "../../../API/advertisement";

export type Props = IAdvertisementCreator;

const AdvertisementCreator: FunctionComponent<Props> = ({ hideAdvertisementCreator, addNewAdvertisement }) => {
  const [charge, setCharge] = useState(0);
  const [checked, setChecked] = useState<Array<number>>([]);
  const [isValid, setIsValid] = useState(true);
  const inputTopic = useRef<HTMLInputElement>(null);
  const inputDesc = useRef<HTMLTextAreaElement>(null);
  const user = useContext<IUser | null>(UserContext);

  async function submitAdvert(e: FormEvent) {
    e.preventDefault();
    if (checked.length == 0) {
      setIsValid(false);
      return;
    }
    const newAdvert: IAdvertisement = {
      description: inputDesc?.current?.value ? inputDesc.current.value : "",
      idAccount: user?.idAccount ? user.idAccount : 0,
      idAd: 0,
      status: 1,
      price: charge,
      title: inputTopic?.current?.value ? inputTopic.current.value : "",
      housingAssocList: checked,
    };
    newAdvert.idAd = await createAdvertisement(newAdvert);
    addNewAdvertisement(newAdvert);
    hideAdvertisementCreator();
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
                <Button type="submit" className="btn-primary">
                  Submit
                </Button>
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
      {!isValid && <Alert variant={`danger`}>You have to check at least one housing association.</Alert>}
      <HousingAssocList setChecked={setChecked} setCharge={setCharge} setIsValid={setIsValid} />
    </Card>
  );
};

export default AdvertisementCreator;
