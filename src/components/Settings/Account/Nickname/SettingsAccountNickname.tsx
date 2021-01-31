import React, { FormEvent, FunctionComponent, useContext, useEffect, useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { putUser } from "../../../../API/settings";
import { SetUserContext, UserContext } from "../../../Login/UserContext";

interface Props {
  closeNicknameChange: Function;
}

const SettingsAccountNickname: FunctionComponent<Props> = ({ closeNicknameChange }) => {
  const user = useContext(UserContext);
  const setUser = useContext(SetUserContext);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(nicknameRef.current?.value);
    await putUser(user?.idAccount!, nicknameRef.current?.value, undefined);
    const newUser = {
      ...JSON.parse(localStorage.getItem("user")!),
      login: nicknameRef.current?.value,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    closeNicknameChange();
  };

  return (
    <Card.Body>
      <Card.Title className="text-center mb-3">
        <h4>Change your login</h4>
      </Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Row className="form-row align-items-center d-flex justify-content-center">
          <Form.Label className="mr-2">New Login</Form.Label>
          <Form.Control required ref={nicknameRef} className="w-25 mr-2" type="text" placeholder={user?.login} />
          <Button className="mr-1" variant="warning" onClick={() => closeNicknameChange()}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Form.Row>
      </Form>
    </Card.Body>
  );
};

export default SettingsAccountNickname;
