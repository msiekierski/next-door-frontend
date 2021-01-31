import React, { FunctionComponent, useEffect, useState } from "react";
import HousingAssocItem from "./HousingAssocItem";
import { ListGroup } from "react-bootstrap";
import { getAllHousingAssoc } from "../../../../API/advertisement";
import { IHousingAssoc } from "./IHousingAssoc";

interface OwnProps {
  setChecked: Function;
  setCharge: Function;
  setIsValid: Function;
}

type Props = OwnProps;

const HousingAssocList: FunctionComponent<Props> = ({ setChecked, setCharge, setIsValid }) => {
  const [housingAssoc, setHousingAssoc] = useState<Array<IHousingAssoc>>([]);

  useEffect(() => {
    const fetchHousingAssoc = async () => setHousingAssoc(await getAllHousingAssoc());
    fetchHousingAssoc();
  }, []);

  return (
    <ListGroup variant={"flush"}>
      {housingAssoc.length
        ? housingAssoc.map((e, index) => (
            <HousingAssocItem
              key={index}
              idAssoc={e.idAssoc}
              city={e.city}
              street={e.street}
              postalCode={e.postalCode}
              name={e.name}
              setChecked={setChecked}
              setCharge={setCharge}
              setIsValid={setIsValid}
            />
          ))
        : "Loading"}
    </ListGroup>
  );
};

export default HousingAssocList;
