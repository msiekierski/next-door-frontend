import React, { FunctionComponent, useEffect, useState } from "react";
import HousingAssocItem from "./HousingAssocItem";
import { ListGroup } from "react-bootstrap";
import { getAllHousingAssoc } from "../../../../API/advertisement";
import { IHousingAssoc } from "./IHousingAssoc";

interface OwnProps {
  setCharge: Function;
}

type Props = OwnProps;

const HousingAssocList: FunctionComponent<Props> = ({ setCharge }) => {
  const [housingAssoc, setHousingAssoc] = useState<Array<IHousingAssoc>>([]);

  useEffect(() => {
    const fetchHousingAssoc = async () => setHousingAssoc(await getAllHousingAssoc());
    fetchHousingAssoc();
  }, []);

  return (
    <ListGroup variant={"flush"}>
      {housingAssoc.length
        ? housingAssoc.map((e) => (
            <HousingAssocItem
              idAssoc={e.idAssoc}
              city={e.city}
              street={e.street}
              postalCode={e.postalCode}
              name={e.name}
              setCharge={setCharge}
            />
          ))
        : "Loading"}
    </ListGroup>
  );
};

export default HousingAssocList;
