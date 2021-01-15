import React, { ChangeEvent, FunctionComponent } from "react";
import { Container, Form, InputGroup, ListGroup } from "react-bootstrap";
import { IHousingAssoc } from "./IHousingAssoc";

type Props = IHousingAssoc & {
  setCharge: Function;
};

const HousingAssocItem: FunctionComponent<Props> = ({ name, street, setCharge }) => {
  function handleChecked(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setCharge((p: number) => {
        setCharge(p + 10);
      });
    } else {
      setCharge((p: number) => {
        setCharge(p - 10);
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
