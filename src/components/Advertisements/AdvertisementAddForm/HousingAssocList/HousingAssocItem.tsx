import React, { ChangeEvent, FunctionComponent } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import { IHousingAssoc } from "./IHousingAssoc";
import { ADVERT_BOTTOM_PAYMENT } from "../../../../constants/constants";

type Props = IHousingAssoc & {
  setChecked: Function;
  setCharge: Function;
  setIsValid: Function;
};

const HousingAssocItem: FunctionComponent<Props> = ({ name, street, setChecked, idAssoc, setCharge, setIsValid }) => {
  function handleChecked(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setChecked((checked: number[]) => {
        const newChecked: number[] = [...checked, idAssoc];
        setCharge(100 * newChecked.length);
        if (newChecked.length >= 1) {
          setIsValid(true);
        }
        return newChecked;
      });
    } else {
      setChecked((checked: number[]) => {
        const newChecked: number[] = checked.filter((e) => e != idAssoc);
        setCharge(100 * newChecked.length);
        if (newChecked.length == 0) {
          setIsValid(false);
        }
        return newChecked;
      });
    }
  }

  return (
    <ListGroup.Item className={"pl-0 pr-0"}>
      <Container className={"d-flex justify-content-between"}>
        <Form.Label className={`mb-0`}>
          {name}, {street}
        </Form.Label>
        <Form.Check type="checkbox" onChange={handleChecked} />
      </Container>
    </ListGroup.Item>
  );
};

export default HousingAssocItem;
